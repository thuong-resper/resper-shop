import { Box, Button, Grid, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import CartList from 'components/Cart/CartList'
import { MainLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import { UserContext } from 'contexts/UserContext'
import { deleteCartProduct, updateCartProduct } from 'features/Cart/CartSlice'
import { userCartAPI } from 'features/Cart/pathAPI'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	wrapper_em: {
		borderRadius: '4px',
		margin: 0,
		padding: '1rem',
		backgroundColor: '#fff',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			bottom: 0,
			zIndex: 1,
			border: 'none',
		},
	},
}))

const CartPage = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const history = useHistory()

	const actionUserCart = (cart, token) => dispatch(userCartAPI(cart, token))
	const actionDeleteCart = (index) => dispatch(deleteCartProduct(index))
	const actionUpdateCartProduct = (dataCart) => dispatch(updateCartProduct(dataCart))

	const state = useContext(UserContext)
	const [token] = state.token
	if (!token) {
		history.push('/login?redirect=cart')
	}

	const { dataCart, loadingUserCart } = useSelector((state) => state.cart)

	return (
		<MainLayout>
			<SEO
				pageTitle={'Giỏ hàng'}
				pageDescription={'Giỏ hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/cart`}
			/>
			{dataCart.length === 0 && (
				<Grid container justify="center" alignItems="flex-start" className={classes.wrapper_em}>
					<Grid item xs={12}>
						<CustomizedBreadcrumbs step1="Trang chủ" step2="Giỏ hàng" />
					</Grid>
					<Box m="1rem auto" fontSize="5rem" textAlign="center" color="#d3d3d4">
						<ShoppingCartIcon fontSize="inherit" />
						<Typography variant="subtitle1">
							{/* No products added to the cart */}
							Không có sản phẩm nào
						</Typography>
						<Button variant="contained" size="large" onClick={() => history.push('/')}>
							Mua sắm
						</Button>
					</Box>
				</Grid>
			)}
			<CartList
				dataCart={dataCart}
				loadingUserCart={loadingUserCart}
				token={token}
				actionUpdateCartProduct={actionUpdateCartProduct}
				actionDeleteCart={actionDeleteCart}
				actionUserCart={actionUserCart}
			/>
		</MainLayout>
	)
}

export default CartPage
