import { Box, Grid, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { unwrapResult } from '@reduxjs/toolkit'
import { UserContext } from 'contexts/UserContext'
import { putPayOrderAPI, updateOrderStatus } from 'features/Order/pathAPI'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { statusOrder } from 'staticOptions'
import SimpleBackdrop from '../../components/Backdrop/Backdrop'
import SimpleAlerts from '../../components/UI/Alerts/Alerts'
import OrderUpdated from './OrderUpdated'
import { MainLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO.js'
import orderAPI from 'apis/orderAPI.js'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	wrapper_em: {
		borderRadius: '4px',
		margin: 0,
		padding: '1rem',
		backgroundColor: '#fff',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			position: 'fixed',
			bottom: 0,
			zIndex: 1,
			border: 'none',
		},
	},
	wrapper: {
		width: '100%',
		[theme.breakpoints.down('md')]: {},
		[theme.breakpoints.down('xs')]: { display: 'flex', flexDirection: 'column' },
	},
	left: {
		width: '100%',
		maxWidth: '820px',
		float: 'left',
		[theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
		[theme.breakpoints.down('xs')]: { padding: 0 },
	},
	right: {
		width: '100%',
		maxWidth: '400px',
		float: 'right',
		border: '1px solid #0000001a',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		margin: '0.5rem 0',
		[theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
		[theme.breakpoints.down('xs')]: { padding: '0.5rem', order: 1 },
	},
	item: {
		position: 'relative',
		border: '1px solid #0000001a',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		marginTop: '0.5rem',
	},
	brand: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: '4px',
		paddingBottom: '0.2rem',
		width: 'fit-content',
	},

	itemContent: { paddingTop: '0.5rem', borderTop: '1px solid #00000014' },
	media: {
		width: '100%',
		maxWidth: '100%',
		objectFit: 'cover',
		alignItems: 'center',
		padding: '.5rem',
	},
	itemName: {
		width: 'fit-content',
		display: 'block',
		'& p': { [theme.breakpoints.down('xs')]: { fontSize: '15px' } },
	},
	price: {
		'& h6': { [theme.breakpoints.down('xs')]: { fontSize: '15px' } },
	},
	priceCompare: {
		display: 'inline-block',
		verticalAlign: 'middle',
		fontsize: '12px',
		textDecoration: 'line-through',
		margin: '5px 0',
	},
	buttonDelete: { [theme.breakpoints.down('xs')]: { position: 'absolute', left: '0' } },
	qty: {
		display: 'flex',
		maxHeight: '2rem',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: { justifyContent: 'flex-end' },
	},
	order_row: {
		display: 'flex',
		width: '100%',
		marginBottom: '0.5rem',
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: { marginBottom: '0.25rem' },
	},

	fee: {
		display: 'block',
		fontSize: '0.75rem',
		color: '#424242',
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: { display: 'none' },
	},
	button: {
		height: '2.5rem',
		margin: '0',
		width: '100%',
	},
}))

const OrderPage = ({ location }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { id } = useParams()
	const history = useHistory()
	const formatter = new Intl.NumberFormat('vn')

	const [dataOrder, setDataOrder] = useState({})

	const [paypalAmount, setPaypalAmount] = useState(0)
	const [sdkReady, setSdkReady] = useState(false)

	const state = useContext(UserContext)
	const [user] = state.user
	const [token] = state.user
	useEffect(() => {
		if (!token) {
			history.push(`/login?redirect=order/${id}`)
		}
	}, [token, history, id])

	const convertVndToUsd = (num) => Number(num / 23000).toFixed(2)
	const actionPutPayOrderAPI = (data, token) => dispatch(putPayOrderAPI(data, token))
	const actionChangeOrderStatus = (data) => dispatch(updateOrderStatus(data))

	const getOrderById = async (id, token) => {
		const order = await orderAPI.getOrderByIdAPI(id, token)
		setDataOrder(order)
		setPaypalAmount(convertVndToUsd(order?.totalPayable))
	}

	useEffect(
		(id, token) => {
			getOrderById(id, token).catch(console.error)
			debugger
		},
		[id]
	)

	const addPayPalScript = async () => {
		const { data: clientId } = await axios.get('/api/config/paypal')
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
		script.async = true
		script.onload = () => {
			setSdkReady(true)
		}
		document.body.appendChild(script)
	}
	useEffect(() => {
		if (!dataOrder?.isPaid) {
			addPayPalScript()
		} else {
			setSdkReady(true)
		} // eslint-disable-next-line
	}, [dataOrder])

	const translateToVn = (key) => {
		for (let i = 0; i < statusOrder.length; i++) {
			if (statusOrder[i].value === key) {
				return statusOrder[i].vn
			}
		}
	}

	const successPaymentHandler = (paymentResult) => {
		const payOrder = async (paymentResult) => {
			const data = {
				paymentResult: paymentResult,
				id,
			}
			const isPaid = await actionPutPayOrderAPI(data, token)
			const res = unwrapResult(isPaid)
			if (res.ok) {
				getOrderById(id, token)
			}
		}
		payOrder(paymentResult) // eslint-disable-next-line
	}

	const handleStatusChange = async (orderId, orderStatus) => {
		try {
			const data = {
				orderId,
				orderStatus,
			}
			const order = await actionChangeOrderStatus(data)
			const res = unwrapResult(order)
			if (res) {
				getOrderById(id, token)
			}
		} catch (err) {}
	}

	let sumOrder = 0
	const showTotalAmount = (product) => {
		if (product?.length > 0) {
			for (let index = 0; index < product.length; index++) {
				sumOrder += product[index].product.price * product[index].quantity
			}
		}
		return sumOrder
	}

	return (
		<MainLayout>
			<SEO
				pageTitle={'Đặt hàng'}
				pageDescription={'Đặt hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/order/${id}`}
			/>
			{dataOrder && (
				<div className={classes.wrapper}>
					<div className={classes.left}>
						<div className={classes.item}>
							<Typography variant="h6" gutterBottom>
								Vận chuyển
							</Typography>
							<Typography variant="subtitle1">Thông tin giao hàng: {user?.address}</Typography>
							<SimpleAlerts
								severity="info"
								title={`Trạng thái đơn hàng: ${translateToVn(dataOrder?.orderStatus)}`}
							/>
						</div>
					</div>
					<div className={classes.right}>
						<Box p="1rem 0">
							<Typography variant="h6">Thanh toán</Typography>
							<div className={classes.itemContent}>
								<div className={classes.order_row}>
									<Typography variant="body2">Tổng tiền hàng</Typography>
									<Box textAlign="right">
										<Typography variant="body2" color="secondary">
											{formatter.format(showTotalAmount(dataOrder?.products))} <u>đ</u>
										</Typography>
									</Box>
								</div>
								{dataOrder?.feeDiscount !== 0 && (
									<div className={classes.order_row}>
										<Typography variant="body2">Tổng cộng Voucher giảm giá</Typography>
										<Box textAlign="right">
											<Typography variant="body2" color="secondary">
												-&nbsp;
												{formatter.format(dataOrder?.feeDiscount)}
												<u>đ</u>
											</Typography>
										</Box>
									</div>
								)}

								<div className={classes.order_row}>
									<Typography variant="subtitle1">
										<b>Tổng thanh toán</b>
									</Typography>
									<Box textAlign="right">
										<Typography variant="subtitle1" color="secondary">
											{formatter.format(dataOrder?.totalPayable)} <u>đ</u>
										</Typography>
										<small className={classes.fee}>Đã bao gồm VAT nếu có</small>
									</Box>
								</div>
								<Box>
									{!dataOrder?.isPaid && (
										<div>
											{!sdkReady ? (
												<SimpleBackdrop />
											) : (
												<PayPalButton amount={paypalAmount} onSuccess={successPaymentHandler} />
											)}
										</div>
									)}
								</Box>
							</div>
						</Box>
						{user?.role === 1 && (
							<OrderUpdated order={dataOrder} handleStatusChange={handleStatusChange} />
						)}
					</div>

					<div className={classes.left}>
						<div className={classes.item}>
							<Typography variant="h6" gutterBottom>
								Phương thức thanh toán
							</Typography>
							<Typography variant="subtitle1">{dataOrder?.paymentMethod}</Typography>
							{dataOrder?.isPaid ? (
								<SimpleAlerts
									severity="info"
									title={`Đã thanh toán ngày ${moment(dataOrder.paidAt)
										.utc()
										.format('DD/MM/YYYY hh:mm:ss')}`}
								/>
							) : (
								<SimpleAlerts severity="error" title="Chưa thanh toán" />
							)}
						</div>
					</div>
					<div className={classes.left}>
						<div className={classes.item}>
							<Typography variant="h6" gutterBottom>
								Sản phẩm đặt mua
							</Typography>
							{dataOrder?.products?.map((item, index) => (
								<div key={index}>
									<Grid container justify="center" className={classes.itemContent}>
										<Grid item xs={3} sm={2} className={classes.img}>
											<Link to={`/product?id=${item.product._id}`}>
												<img
													alt={item.product.name}
													className={classes.media}
													src={item.product.image[0].url}
												/>
											</Link>
										</Grid>
										<Grid item xs={6} sm={6}>
											<Link to={`/product?id=${item.product._id}`} className={classes.itemName}>
												<Typography variant="body1">{item.product.name}</Typography>
											</Link>
										</Grid>
										<Grid item xs={3} sm={2}>
											<div className={classes.price}>
												<Typography variant="h6" color="secondary">
													{formatter.format(item.product.price)}
													<abbr
														style={{
															textDecoration: 'underline dotted',
														}}
													>
														đ
													</abbr>
												</Typography>
												<Typography variant="body2">
													<span className={classes.priceCompare}>
														{formatter.format(item.product.priceCompare)}&nbsp;đ
													</span>
													&nbsp;
													<i>
														{(
															-(
																(item.product.priceCompare - item.product.price) /
																item.product.priceCompare
															) * 100
														).toFixed() + '%'}
													</i>
												</Typography>
											</div>
										</Grid>
										<Grid item xs={12} sm={2} className={classes.qty}>
											<Box p="0 0.5rem">
												<Typography variant="body1">{item.quantity}</Typography>
											</Box>
										</Grid>
									</Grid>
									<div className={classes.price}>
										<Typography variant="subtitle1" style={{ textAlign: 'right' }}>
											Tổng cộng: {formatter.format(item.product.price * item.quantity)} <u>đ</u>
										</Typography>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</MainLayout>
	)
}

export default OrderPage
