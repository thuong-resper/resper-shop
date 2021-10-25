import { lazy } from 'react';
const Dashboard = lazy(() => import('./src/pages/Dashboard.js'));
const Category = lazy(() => import('./src/pages/Category/Category.js'));
const Coupon = lazy(() => import('./src/pages/Coupon/Coupon.js'));
const Sub = lazy(() => import('./src/pages/Sub/Sub.js'));
const SubEdit = lazy(() => import('./src/pages/Sub/SubEdit.js'));
const ProductCreate = lazy(() => import('./src/pages/Product/ProductCreate.js'));
const ProductEdit = lazy(() => import('./src/pages/Product/ProductEdit.js'));
const AdminProduct = lazy(() => import('./src/pages/Product/AdminProduct.js'));
const AdminOrder = lazy(() => import('./src/pages/Order/AdminOrder.js'));

const Page = [
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
    path: '/admin/sub/:slug',
    exact: true,
    main: SubEdit,
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
    path: '/admin/product/edit/:id',
    exact: true,
    main: ProductEdit,
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
];
export default Page;
