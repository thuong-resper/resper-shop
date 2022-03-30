import { Box, Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Alert } from '@material-ui/lab'
import { unwrapResult } from '@reduxjs/toolkit'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import CheckoutSteps from 'components/Checkout/CheckoutSteps'
import { UserContext } from 'contexts/UserContext'
import { cartClearItems } from 'features/Cart/CartSlice'
import { applyCouponAPI, deleteCartAPI, getUserCartAPI } from 'features/Cart/pathAPI'
import { createOrderAPI } from 'features/Order/pathAPI'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import SEO from 'components/SEO/SEO.js'
import { MainLayout } from 'components/Layout'

const useStyles = makeStyles((theme) => ({
	right: {
		border: '1px solid #0000001a',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		margin: '0.5rem 0',
		[theme.breakpoints.down('xs')]: { padding: '0.5rem', order: 1 },
	},
	item: {
		position: 'relative',
		border: '1px solid #0000001a',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		marginTop: '0.5rem',
	},

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
	itemCoupon: { display: 'flex', alignItems: 'center' },
	fieldCoupon: { width: '10rem', [theme.breakpoints.down('xs')]: { width: '10.5rem' } },
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
		marginBottom: '1rem',
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

const PlaceOrderPage = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	const history = useHistory()
	const formatter = new Intl.NumberFormat('vn')

	const state = useContext(UserContext)
	const [token] = state.token
	const [user] = state.user
	if (!token) {
		history.push('/login?redirect=placeorder')
	}

	// dispatch API
	const actionAddOrderAPI = (order, token) => dispatch(createOrderAPI(order, token))
	const actionGetUserCartAPI = (token) => dispatch(getUserCartAPI(token))
	const actionEmptyCart = (token) => dispatch(deleteCartAPI(token))
	const actionApplyCoupon = (coupon, token) => dispatch(applyCouponAPI(coupon, token))
	const actionCartClearItems = () => dispatch(cartClearItems())

	const { addressRedux, paymentMethod } = useSelector((state) => state.cart)

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [total, setTotal] = useState(0)
	const [coupon, setCoupon] = useState('')
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
	const [discountError, setDiscountError] = useState('')

	useEffect(() => {
		const fetchUserCart = async (token) => {
			setLoading(true)
			try {
				const product = await actionGetUserCartAPI(token)
				const res = unwrapResult(product)
				if (res) {
					setProducts(res.products)
					setTotal(res.cartTotal)
					setLoading(false)
				}
			} catch (err) {
				setLoading(false)
			}
		}
		fetchUserCart(token) // eslint-disable-next-line
	}, [])

	// remove from backend
	const emptyCart = async () => {
		const empty = await actionEmptyCart(token)
		const res = unwrapResult(empty)
		if (res?.ok) {
			setProducts([])
			setTotal(0)
			setTotalAfterDiscount(0)
			setCoupon('')
		}
	}

	const actionClearCart = () => {
		// remove from local storage & redux
		actionCartClearItems()
		emptyCart()
	}

	const applyDiscountCoupon = async (e) => {
		e.preventDefault()
		const couponRes = await actionApplyCoupon({ coupon }, token)
		const res = unwrapResult(couponRes)
		if (res?.value) {
			setTotalAfterDiscount(res.value)
			setCoupon('')
		}
		if (res?.err) {
			setDiscountError(res.err)
		}
	}

	const checkOutOrder = async (e) => {
		e.preventDefault()
		const order = {
			totalPayable: totalAfterDiscount !== 0 ? totalAfterDiscount : total,
			paymentMethod: paymentMethod ? paymentMethod : user?.paymentMethod,
			feeDiscount: totalAfterDiscount !== 0 ? total - totalAfterDiscount : 0,
		}
		const orderRes = await actionAddOrderAPI(order, token)
		const res = unwrapResult(orderRes)
		if (res) {
			actionClearCart()
			setTimeout(() => {
				history.push(`/order/${res._id}`)
			}, 1000)
		}
	}

	return (
		<MainLayout>
			<SEO
				pageTitle={'Đặt hàng'}
				pageDescription={'Đặt hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/placeorder`}
			/>
			{loading ? (
				<SimpleBackdrop />
			) : products?.length > 0 ? (
				<Box>
					<Box p="8px 0">
						<CheckoutSteps step1 step2 step3 />
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} md={8}>
							<Box className={classes.item}>
								<Typography variant="h6" gutterBottom>
									Vận chuyển
								</Typography>
								<Typography variant="subtitle1">
									Thông tin giao hàng:&nbsp;{addressRedux ? addressRedux : user?.address}
								</Typography>
							</Box>
							<Box className={classes.item}>
								<Typography variant="h6" gutterBottom>
									Phương thức thanh toán:
								</Typography>
								<Typography variant="subtitle1">
									{paymentMethod ? paymentMethod : user?.paymentMethod}
								</Typography>
							</Box>
							<Box className={classes.item}>
								<Typography variant="h6" gutterBottom>
									Sản phẩm đặt mua
								</Typography>
								{products?.length > 0 &&
									products.map((item, index) => (
										<div key={index}>
											<Grid container justify="center">
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
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box className={classes.right}>
								<Typography variant="h6">Thành tiền</Typography>
								<div className={classes.itemContent}>
									<div className={classes.order_row}>
										<Typography className={classes.itemCoupon} variant="subtitle1">
											Mã Voucher
										</Typography>
										<TextField
											hiddenLabel
											className={classes.fieldCoupon}
											id="filled-hidden-label-small"
											variant="outlined"
											size="small"
											onChange={(e) => {
												setCoupon(e.target.value)
												setDiscountError('')
											}}
											value={coupon}
										/>
										<Button
											variant="outlined"
											size="small"
											onClick={applyDiscountCoupon}
											disabled={coupon.length === 0}
										>
											Áp dụng
										</Button>
									</div>
								</div>
								{discountError && (
									<Alert severity="error">
										Rất tiếc! Không thể tìm thấy mã voucher này. Bạn vui lòng kiểm tra lại mã đăng
										nhập hoặc có thể mã đã hết hạn sử dụng.
									</Alert>
								)}
								{totalAfterDiscount !== 0 && (
									<Alert severity="success">
										Bạn đã sử dụng voucher - Giá đã giảm:&nbsp; -
										{formatter.format(total - totalAfterDiscount)} <u>đ</u>
									</Alert>
								)}
								<div className={classes.itemContent}>
									<div className={classes.order_row}>
										<Typography variant="subtitle1">
											{/* Total */}
											Tổng thanh toán
										</Typography>
										<Box textAlign="right">
											<Typography variant="subtitle1" color="secondary">
												{formatter.format(totalAfterDiscount !== 0 ? totalAfterDiscount : total)}{' '}
												<u>đ</u>
											</Typography>
											<small className={classes.fee}>
												{/* VAT included, where applicable */}
												Đã bao gồm VAT nếu có
											</small>
										</Box>
									</div>
								</div>
								<Button
									variant="contained"
									color="secondary"
									className={classes.button}
									disabled={products?.length === 0}
									onClick={checkOutOrder}
								>
									{/* CONFIRM CART */}
									Tiến hành đặt hàng
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			) : (
				<Grid container justify="center" alignItems="flex-start">
					<Box width={'100%'} p={2}>
						<CustomizedBreadcrumbs step1="Trang chủ" step2="Đặt hàng" />
					</Box>
					<Box m="0 auto" fontSize="5rem" textAlign="center" color="#d3d3d4">
						<ShoppingCartIcon fontSize="inherit" />
						<Box m="1rem 0">
							<Typography variant="subtitle1" gutterBottom>
								{/* No products added to the cart */}
								Không có sản phẩm nào
							</Typography>
						</Box>
						<Button variant="contained" size="large" onClick={() => history.push('/')}>
							Mua sắm
						</Button>
					</Box>
				</Grid>
			)}
		</MainLayout>
	)
}

export default PlaceOrderPage
