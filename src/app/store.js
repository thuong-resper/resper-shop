import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from 'features/Admin/Category/CategorySlice'
import CouponSlice from 'features/Admin/Coupon/CouponSlice'
import ProductAdminSlice from 'features/Admin/Product/ProductAdminSlice'
import SubSlice from 'features/Admin/Sub/SubSlice'
import CartSlice from 'features/Cart/CartSlice'
import CommentSlice from 'features/Comment/CommentSlice'
import OrderSlice from 'features/Order/OrderSlice'
import ListProductSlice from 'features/Product/ListProductSlice'
import SearchProductSlice from 'features/Search/SearchProductSlice'
import UserSlice from 'features/User/UserSlice'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = {
	ListProducts: ListProductSlice,
	user: UserSlice,
	cart: CartSlice,
	comment: CommentSlice,
	order: OrderSlice,
	search: SearchProductSlice,
	category: CategorySlice,
	coupon: CouponSlice,
	sub: SubSlice,
	productAdmin: ProductAdminSlice,
}
const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk, process.env.REACT_APP_NODE_ENV !== 'production' ? logger : null],
	devTools: process.env.REACT_APP_NODE_ENV !== 'production',
})
export default store
