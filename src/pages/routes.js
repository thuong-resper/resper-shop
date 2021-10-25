import { lazy } from 'react';

const HomePage = lazy(() => {
  return import('./HomePage/HomePage/HomePage');
});

const WatchPage = lazy(() => {
  return import('./HomePage/WatchPage/WatchPage');
});

const ProductPage = lazy(() => {
  return import('./ProductPage/ProductPage');
});

const CartPage = lazy(() => {
  return import('./CartPage/CartPage');
});

const LoginPage = lazy(() => {
  return import('./LoginPage/LoginPage');
});

const SignupPage = lazy(() => {
  return import('./SignupPage/SignupPage');
});

const ActiveEmail = lazy(() => {
  return import('./SignupPage/ActiveEmail');
});

const CheckEmailActive = lazy(() => {
  return import('./SignupPage/CheckEmailActive');
});

const ForgetForm = lazy(() => {
  return import('./LoginPage/ForgetForm');
});

const CheckEmailForget = lazy(() => {
  return import('./LoginPage/CheckEmailForget');
});

const CreateAPassword = lazy(() => {
  return import('./LoginPage/CreateAPassword');
});

const ShippingPage = lazy(() => {
  return import('./ShippingPage/ShippingPage');
});

const PlaceOrderPage = lazy(() => {
  return import('./PlaceOrderPage/PlaceOrderPage');
});

const OrderPage = lazy(() => {
  return import('./OrderPage/OrderPage');
});

const SmartPhone = lazy(() => {
  return import('./ProductTypePages/SmartPhone');
});

const ShopPage = lazy(() => {
  return import('./Search/ShopPage');
});

const UserOrders = lazy(() => {
  return import('./UserPage/UserOrders');
});

const UserProfile = lazy(() => {
  return import('./UserPage/UserProfile');
});

const Page = [
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
    path: '/product',
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
    path: '/shipping',
    exact: true,
    main: ShippingPage,
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
    path: '/dtdt',
    exact: true,
    main: SmartPhone,
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
  // {
  //   path: '/product/:name_Trademark',
  //   exact: true,
  //   main: Trademark,
  // },
  // {
  //   path: '/:key/:nsx/:name/:_id',
  //   exact: true,
  //   main: DetailProducts,
  // },

  // {
  //   path: '/user/active-email/:accessToken',
  //   expect: true,
  //   main: ActiveEmail,
  // },
  // {
  //   path: '/user/reset-password/:accessToken',
  //   expect: true,
  //   main: ForgotPassword,
  // },
  // {
  //   path: '/history-comment',
  //   exact: true,
  //   main: HistoryComment,
  // },
  // {
  //   path: '/history-cart',
  //   exact: true,
  //   main: HistoryCart,
  // },
];
export default Page;
