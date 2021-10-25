import { configureStore } from '@reduxjs/toolkit';
import CategorySlice from 'features/Admin/Category/CategorySlice';
import CouponSlice from 'features/Admin/Coupon/CouponSlice';
import ProductAdminSlice from 'features/Admin/Product/ProductAdminSlice';
import SubSlice from 'features/Admin/Sub/SubSlice';
import CartSlice from 'features/Cart/CartSlice';
import CommentSlice from 'features/Comment/CommentSlice';
import OrderSlice from 'features/Order/OrderSlice';
import ListPremiumProductSlice from 'features/Product/ListPremiumProductSlice';
import ListProductManSlice from 'features/Product/ListProductManSlice';
import ListProductSlice from 'features/Product/ListProductSlice';
import ListProductWomanSlice from 'features/Product/ListProductWomanSlice';
import ListTopFashionSlice from 'features/Product/ListTopFashionSlice';
import ProductIdSlice from 'features/Product/ProductIdSlice';
import ListRelatedSlice from 'features/Product/ListRelatedSlice';
import SearchProductSlice from 'features/Search/SearchProductSlice';
import UserSlice from 'features/User/UserSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = {
  ListProducts: ListProductSlice,
  TopTenFashion: ListTopFashionSlice,
  ListPremiumProducts: ListPremiumProductSlice,
  ListProductMan: ListProductManSlice,
  ListProductWoman: ListProductWomanSlice,
  productId: ProductIdSlice,
  user: UserSlice,
  cart: CartSlice,
  comment: CommentSlice,
  related: ListRelatedSlice,
  order: OrderSlice,
  search: SearchProductSlice,
  category: CategorySlice,
  coupon: CouponSlice,
  sub: SubSlice,
  productAdmin: ProductAdminSlice,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
