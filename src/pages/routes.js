import { lazy } from 'react'

const HomePage = lazy(() => {
	return import('./HomePage/HomePage/HomePage')
})

const WatchPage = lazy(() => {
	return import('./HomePage/WatchPage/WatchPage')
})

const ProductPage = lazy(() => {
	return import('./ProductPage/ProductPage')
})

const CartPage = lazy(() => {
	return import('./CartPage/CartPage')
})

const LoginPage = lazy(() => {
	return import('./LoginPage/LoginPage')
})

const SignupPage = lazy(() => {
	return import('./SignupPage/SignupPage')
})

const ActiveEmail = lazy(() => {
	return import('./SignupPage/ActiveEmail')
})

const CheckEmailActive = lazy(() => {
	return import('./SignupPage/CheckEmailActive')
})

const ForgetForm = lazy(() => {
	return import('./LoginPage/ForgetForm')
})

const CheckEmailForget = lazy(() => {
	return import('./LoginPage/CheckEmailForget')
})

const CreateAPassword = lazy(() => {
	return import('./LoginPage/CreateAPassword')
})

const PlaceOrderPage = lazy(() => {
	return import('./PlaceOrderPage/PlaceOrderPage')
})

const OrderPage = lazy(() => {
	return import('./OrderPage/OrderPage')
})

const ShopPage = lazy(() => {
	return import('./Search/ShopPage')
})

const UserOrders = lazy(() => {
	return import('./UserPage/UserOrders')
})

const UserProfile = lazy(() => {
	return import('./UserPage/UserProfile')
})

const Dashboard = lazy(() => {
	return import('./AdminPage/src/pages/Dashboard/Dashboard')
})

const AdminUser = lazy(() => {
	return import('./AdminPage/src/pages/User/AdminUser')
})

const Category = lazy(() => {
	return import('./AdminPage/src/pages/Category/Category')
})

const Coupon = lazy(() => {
	return import('./AdminPage/src/pages/Coupon/Coupon')
})

const Sub = lazy(() => {
	return import('./AdminPage/src/pages/Sub/Sub')
})

const AdminProduct = lazy(() => {
	return import('./AdminPage/src/pages/Product/AdminProduct')
})

const ProductCreate = lazy(() => {
	return import('./AdminPage/src/pages/Product/ProductCreate')
})

const ProductUpdate = lazy(() => {
	return import('./AdminPage/src/pages/Product/ProductUpdate')
})

const UserCreate = lazy(() => {
	return import('./AdminPage/src/pages/User/UserCreate')
})

const AdminOrder = lazy(() => {
	return import('./AdminPage/src/pages/Order/AdminOrder')
})

const UserPage = [
	{
		path: '/',
		exact: true,
		main: HomePage,
	},
	{
		path: '/watch',
		exact: true,
		main: WatchPage,
	},
	{
		path: '/product/:id',
		exact: true,
		main: ProductPage,
	},
	{
		path: '/login',
		exact: true,
		main: LoginPage,
	},
	{
		path: '/register',
		exact: true,
		main: SignupPage,
	},
	{
		path: '/recover',
		exact: true,
		main: ForgetForm,
	},
	{
		path: '/user/check-active',
		expect: true,
		main: CheckEmailActive,
	},
	{
		path: '/user/active-email/:accessToken',
		expect: true,
		main: ActiveEmail,
	},
	{
		path: '/user/forget-password',
		expect: true,
		main: CheckEmailForget,
	},
	{
		path: '/user/reset-password/:accessToken',
		expect: true,
		main: CreateAPassword,
	},
	{
		path: '/cart',
		exact: true,
		main: CartPage,
	},
	{
		path: '/placeorder',
		exact: true,
		main: PlaceOrderPage,
	},
	{
		path: '/order/:id',
		exact: true,
		main: OrderPage,
	},
	{
		path: '/shop',
		exact: true,
		main: ShopPage,
	},
	{
		path: '/user/orders',
		exact: true,
		main: UserOrders,
	},
	{
		path: '/user/profile',
		exact: true,
		main: UserProfile,
	},
	// admin
	{
		path: '/admin/dashboard',
		exact: true,
		main: Dashboard,
	},
	{
		path: '/admin/user',
		exact: true,
		main: AdminUser,
	},
	{
		path: '/admin/category',
		exact: true,
		main: Category,
	},
	{
		path: '/admin/coupon',
		exact: true,
		main: Coupon,
	},
	{
		path: '/admin/sub',
		exact: true,
		main: Sub,
	},
	{
		path: '/admin/product',
		exact: true,
		main: AdminProduct,
	},
	{
		path: '/admin/order',
		exact: true,
		main: AdminOrder,
	},
	{
		path: '/admin/product/create',
		exact: true,
		main: ProductCreate,
	},
	{
		path: '/admin/product/update/:id',
		exact: true,
		main: ProductUpdate,
	},
	{
		path: '/admin/user/create',
		exact: true,
		main: UserCreate,
	},
	{
		path: '/admin/product/update/:id',
		exact: true,
		main: ProductUpdate,
	},
]
export default UserPage
