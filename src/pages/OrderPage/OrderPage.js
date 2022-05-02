import { Box, Grid, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import moment from 'moment-timezone'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import SimpleAlerts from 'components/UI/Alerts/Alerts'
import OrderUpdated from './OrderUpdated'
import { MainLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO.js'
import { UserContext } from 'contexts/index.js'
import { useGetOrderById } from 'features/Order/index.js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import orderAPI from 'apis/orderAPI.js'
import { useSnackbar } from 'notistack'
import { fVNDCurrency, fVNNumber } from 'utils/formatNumber'

const useStyles = makeStyles((theme) => ({
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
}))

const convertVndToUsd = (num) => Number(num / 23000).toFixed(2)

// paypal
const currency = 'USD'
const style = { layout: 'vertical' }

const OrderPage = () => {
	const classes = useStyles()
	const { id } = useParams()
	const history = useHistory()
	const { enqueueSnackbar } = useSnackbar()

	const state = useContext(UserContext)
	const [user] = state.user
	const [token] = state.user
	useEffect(() => {
		if (!token) {
			history.push(`/login?redirect=order/${id}`)
		}
	}, [token, history, id])

	const [dataOrder, setDataOrder] = useState({})
	const [loadingPayment, setLoadingPayment] = useState(false)
	const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

	const { status, data, error, refetch } = useGetOrderById(id)
	useEffect(() => {
		if (status === 'success') {
			setDataOrder(data)
		}
	}, [status, data])

	useEffect(() => {
		dispatch({
			type: 'resetOptions',
			value: {
				...options,
				currency: currency,
			},
		})
	}, [currency])

	const successPaymentHandler = async (paymentResult) => {
		setLoadingPayment(true)
		const data = {
			paymentResult,
			id,
		}
		const response = await orderAPI.putToPaymentOrderAPI(data)
		if (response.ok) {
			enqueueSnackbar('Thanh toán thành công', { variant: 'success' })
			setLoadingPayment(false)
			await refetch()
		}
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

			{status === 'loading' ? (
				<SimpleBackdrop />
			) : (
				<>
					{status === 'error' ? (
						<span>Error: {error.message}</span>
					) : (
						<Grid container spacing={2}>
							{loadingPayment && <SimpleBackdrop />}
							<Grid item xs={12} md={8}>
								<div className={classes.item}>
									<Typography variant="h6" gutterBottom>
										Vận chuyển
									</Typography>
									<Typography variant="subtitle1">Thông tin giao hàng: {user?.address}</Typography>
									<SimpleAlerts
										severity="info"
										title={`Trạng thái đơn hàng: ${dataOrder?.orderStatus}`}
									/>
								</div>
								<div className={classes.item}>
									<Typography variant="h6" gutterBottom>
										Phương thức thanh toán
									</Typography>
									<Typography variant="subtitle1">{dataOrder?.paymentMethod}</Typography>
									{dataOrder?.isPaid ? (
										<SimpleAlerts
											severity="info"
											title={`Đã thanh toán ngày ${moment(dataOrder.paidAt)
												.tz('Asia/Ho_Chi_Minh')
												.format('DD/MM/YYYY HH:mm:ss')}`}
										/>
									) : (
										<SimpleAlerts severity="error" title="Chưa thanh toán" />
									)}
								</div>
								<div className={classes.item}>
									<Typography variant="h6" gutterBottom>
										Sản phẩm đặt mua
									</Typography>
									{dataOrder?.products?.map((item, index) => (
										<div key={index}>
											<Grid container justify="center" className={classes.itemContent}>
												<Grid item xs={3} sm={2} className={classes.img}>
													<Link to={`/product/${item.product._id}`}>
														<img
															alt={item.product.name}
															className={classes.media}
															src={item.product.image[0].url}
														/>
													</Link>
												</Grid>
												<Grid item xs={6} sm={6}>
													<Link to={`/product/${item.product._id}`} className={classes.itemName}>
														<Typography variant="body1">{item.product.name}</Typography>
													</Link>
												</Grid>
												<Grid item xs={3} sm={2}>
													<div className={classes.price}>
														<Typography variant="h6" color="secondary">
															{fVNNumber(item.product.price)}&nbsp;
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
																{fVNDCurrency(item.product.priceCompare)}&nbsp;
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
													Tổng cộng:&nbsp; {fVNDCurrency(item.product.price * item.quantity)}
												</Typography>
											</div>
										</div>
									))}
								</div>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box className={classes.right}>
									<Typography variant="h6">Thanh toán</Typography>
									<div className={classes.itemContent}>
										<div className={classes.order_row}>
											<Typography variant="body2">Tổng tiền hàng</Typography>
											<Box textAlign="right">
												<Typography variant="body2" color="secondary">
													{fVNDCurrency(showTotalAmount(dataOrder?.products))}
												</Typography>
											</Box>
										</div>
										{dataOrder?.feeDiscount !== 0 && (
											<div className={classes.order_row}>
												<Typography variant="body2">Tổng cộng Voucher giảm giá</Typography>
												<Box textAlign="right">
													<Typography variant="body2" color="secondary">
														-&nbsp;
														{fVNDCurrency(dataOrder?.feeDiscount)}
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
													{fVNDCurrency(dataOrder?.totalPayable)}
												</Typography>
												<small className={classes.fee}>Đã bao gồm VAT nếu có</small>
											</Box>
										</div>
										<Box>
											{isPending && <SimpleBackdrop />}
											{!dataOrder?.isPaid && (
												<PayPalButtons
													style={style}
													disabled={false}
													forceReRender={[
														convertVndToUsd(dataOrder?.totalPayable),
														currency,
														style,
													]}
													fundingSource={undefined}
													createOrder={(data, actions) => {
														return actions.order
															.create({
																purchase_units: [
																	{
																		amount: {
																			currency_code: currency,
																			value: convertVndToUsd(dataOrder?.totalPayable),
																		},
																	},
																],
															})
															.then((orderId) => {
																console.log(orderId)
																// Your code here after create the order
																return orderId
															})
													}}
													onApprove={function (data, actions) {
														return actions.order.capture().then(() => successPaymentHandler(data))
													}}
												/>
											)}
										</Box>
									</div>
									{/*admin*/}
									{user?.role === 1 && (
										<Box>
											<Typography variant="h6">Cập nhật đơn hàng</Typography>
											<div className={classes.itemContent}>
												<OrderUpdated order={dataOrder} />
											</div>
										</Box>
									)}
								</Box>
							</Grid>
						</Grid>
					)}
				</>
			)}
		</MainLayout>
	)
}

export default OrderPage
