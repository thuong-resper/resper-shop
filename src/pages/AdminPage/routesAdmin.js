import { lazy } from 'react'

const Dashboard = lazy(() => import('./src/pages/Dashboard/Dashboard.js'))
const Category = lazy(() => import('./src/pages/Category/Category.js'))
const Coupon = lazy(() => import('./src/pages/Coupon/Coupon.js'))
const Sub = lazy(() => import('./src/pages/Sub/Sub.js'))
const ProductCreate = lazy(() => import('./src/pages/Product/ProductCreate.js'))
const ProductUpdate = lazy(() => import('pages/AdminPage/src/pages/Product/ProductUpdate.js'))
const AdminProduct = lazy(() => import('./src/pages/Product/AdminProduct.js'))
const AdminOrder = lazy(() => import('./src/pages/Order/AdminOrder.js'))
const AdminPage = [
	// {

	//   path: '/admin-cart',
	//   exact: true,
	//   main: Cart,
	// },
	// product
	{
		path: '/admin/dashboard',
		exact: true,
		main: Dashboard,
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

	// {
	//   path: '/admin-edit-product/:id_product',
	//   exact: true,
	//   main: EditProduct,
	// },
	// {
	//   path: '/admin-new-product',
	//   exact: true,
	//   main: NewProduct,
	// },
	// // user
	// {
	//   path: '/admin-user',
	//   exact: true,
	//   main: UserManage,
	// },
]
export default AdminPage
