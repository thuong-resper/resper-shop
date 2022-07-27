import CartList from 'components/Cart/CartList'
import { deleteCartProduct, updateCartProduct } from 'features/Cart/CartSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO'
import { NoProductsAdded } from 'components/Cart'

const CartPage = () => {
	const dispatch = useDispatch()

	const actionDeleteCart = (index) => dispatch(deleteCartProduct(index))
	const actionUpdateCartProduct = (dataCart) => dispatch(updateCartProduct(dataCart))

	const { dataCart, loadingUserCart } = useSelector((state) => state.cart)

	return (
		<MainLayout>
			<SEO
				pageTitle={'Giỏ hàng'}
				pageDescription={'Giỏ hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/cart`}
			/>
			{dataCart.length === 0 && <NoProductsAdded />}
			<CartList
				dataCart={dataCart}
				loadingUserCart={loadingUserCart}
				actionUpdateCartProduct={actionUpdateCartProduct}
				actionDeleteCart={actionDeleteCart}
			/>
		</MainLayout>
	)
}

export default CartPage
