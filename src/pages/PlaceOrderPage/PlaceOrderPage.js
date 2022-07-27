import { Box, Button, Grid, IconButton, TextField, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Alert } from '@material-ui/lab'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { cartClearItems } from 'features/Cart/CartSlice'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SEO from 'components/SEO/SEO.js'
import { AuthLayout } from 'components/Layout'
import orderAPI from 'apis/orderAPI.js'
import cartAPI from 'apis/cartAPI.js'
import { fVNDCurrency, fVNNumber } from 'utils/formatNumber'
import Iconify from 'components/Iconify'
import { useGetUserCart } from 'features/Cart'
import { NoProductsAdded } from 'components/Cart'
import { useGetUserProfile } from 'features/User'
import { AddressDialog } from 'components/Dialog'
import { UserContext } from 'contexts'
import { useRouter } from 'hooks'
import { PaymentOptions } from 'components/Tab'

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	orderItem: { borderBottom: '1px solid #0000001a' },
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

function BoxItem({ children }) {
	return (
		<Box
			style={{
				padding: 16,
				marginTop: 8,
				position: 'relative',
				border: '1px solid #0000001a',
				borderRadius: '0.5rem',
			}}
		>
			{children}
		</Box>
	)
}

const PlaceOrderPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const router = useRouter()
	const state = useContext(UserContext)
	const [user] = state.user

	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [coupon, setCoupon] = useState('')
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
	const [discountError, setDiscountError] = useState('')
	const [openAddressForm, setOpenAddressForm] = useState(false)

	const { data: userData } = useGetUserProfile()
	const { isLoading, data, error } = useGetUserCart(user || null)

	const actionCartClearItems = () => dispatch(cartClearItems())

	useEffect(() => {
		if (data) {
			setProducts(data?.products)
			setTotal(data?.cartTotal)
		}
	}, [data])

	const onClose = () => {
		setOpenAddressForm(false)
	}

	const applyDiscountCoupon = async (e) => {
		setLoading(true)
		e.preventDefault()
		const response = await cartAPI.applyCouponAPI({ coupon })
		if (response?.value) {
			setLoading(false)
			setTotalAfterDiscount(response.value)
			setCoupon('')
		}
		if (response?.err) {
			setLoading(false)
			setDiscountError(response.err)
		}
	}

	const checkOutOrder = async (e) => {
		e.preventDefault()
		setLoading(true)
		const order = {
			totalPayable: totalAfterDiscount !== 0 ? totalAfterDiscount : total,
			paymentMethod: userData.paymentMethod || 'Thanh toán khi nhận hàng',
			feeDiscount: totalAfterDiscount !== 0 ? total - totalAfterDiscount : 0,
			delivery: userData.address,
		}

		const response = await orderAPI.createOrderAPI(order)
		if (response) {
			setLoading(false)
			// remove cart from backend
			const removed = await cartAPI.deleteCartAPI()
			if (removed?.ok) {
				setProducts([])
				setTotal(0)
				setTotalAfterDiscount(0)
				setCoupon('')
			}
			// remove from local storage & redux
			actionCartClearItems()
			setTimeout(() => {
				router.push(`/order/${response._id}`)
			}, 1000)
		}
	}

	if (isLoading) return <SimpleBackdrop />

	if (error) return 'Error: ' + error.message

	return (
		<AuthLayout>
			<SEO
				pageTitle={'Đặt hàng'}
				pageDescription={'Đặt hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/placeorder`}
			/>
			{loading && <SimpleBackdrop />}
			{products?.length > 0 ? (
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<BoxItem>
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6" gutterBottom>
									Địa chỉ nhận hàng
								</Typography>
								<Tooltip title={userData?.address ? 'Thay đổi' : 'Tạo mới'}>
									<IconButton onClick={() => setOpenAddressForm(true)}>
										<Iconify
											icon={userData?.address ? 'eva:edit-2-fill' : 'carbon:add'}
											width="1.5rem"
											height="1.5rem"
											color="#2065d1"
										/>
									</IconButton>
								</Tooltip>
							</Box>
							{userData?.address && (
								<Typography>
									<b>{`${userData?.address.name} - ${userData?.address.phoneNumber}`}</b>
									{` - ${userData?.address.address} - ${userData?.address.commune} - ${userData?.address.district} - ${userData?.address.city}`}
								</Typography>
							)}
						</BoxItem>
						{/*Create or update the address*/}
						<AddressDialog
							open={openAddressForm}
							onClose={onClose}
							address={userData.address || null}
						/>

						<BoxItem>
							<PaymentOptions user={userData} />
						</BoxItem>
						<BoxItem>
							<Typography variant="h6" gutterBottom>
								Sản phẩm đặt mua
							</Typography>
							{products.map((item, index) => (
								<div key={index} className={classes.orderItem}>
									<Grid container justify="center">
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
														{fVNDCurrency(item.product.priceCompare)}
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
											Tổng cộng:&nbsp;
											{fVNDCurrency(item.product.price * item.quantity)}
										</Typography>
									</div>
								</div>
							))}
						</BoxItem>
					</Grid>
					<Grid item xs={12} md={4}>
						<BoxItem>
							<Typography variant="h6">Thành tiền</Typography>
							<Box marginBottom={1}>
								<Grid container alignItems="center" spacing={1}>
									<Grid item xs>
										<Typography>Mã Voucher</Typography>
									</Grid>
									<Grid item xs={5}>
										<TextField
											hiddenLabel
											id="filled-hidden-label-small"
											variant="outlined"
											size="small"
											onChange={(e) => {
												setCoupon(e.target.value)
												setDiscountError('')
											}}
											value={coupon}
										/>
									</Grid>
									<Grid item xs>
										<Button
											variant="outlined"
											onClick={applyDiscountCoupon}
											disabled={coupon.length === 0}
											className={classes.button}
										>
											Áp dụng
										</Button>
									</Grid>
								</Grid>
							</Box>
							{discountError && (
								<Alert severity="error">
									Rất tiếc! Không thể tìm thấy mã voucher này. Bạn vui lòng kiểm tra lại mã đăng
									nhập hoặc có thể mã đã hết hạn sử dụng.
								</Alert>
							)}
							{totalAfterDiscount !== 0 && (
								<Alert severity="success">
									Bạn đã sử dụng voucher - Giá đã giảm:&nbsp;
									<strong>{fVNDCurrency(total - totalAfterDiscount)}</strong>
								</Alert>
							)}
							<div>
								<div className={classes.order_row}>
									<Typography variant="subtitle1">
										{/* Total */}
										Tổng thanh toán
									</Typography>
									<Box textAlign="right">
										<Typography variant="subtitle1" color="secondary">
											{fVNDCurrency(totalAfterDiscount !== 0 ? totalAfterDiscount : total)}
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
								disabled={products?.length === 0 || !userData?.address}
								onClick={checkOutOrder}
							>
								{/* CONFIRM CART */}
								Tiến hành đặt hàng
							</Button>
						</BoxItem>
					</Grid>
				</Grid>
			) : (
				<NoProductsAdded />
			)}
		</AuthLayout>
	)
}

export default PlaceOrderPage
