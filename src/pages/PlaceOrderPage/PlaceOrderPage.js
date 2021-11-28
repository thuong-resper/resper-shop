import { Box, Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Alert } from '@material-ui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import CheckoutSteps from 'components/Checkout/CheckoutSteps';
import { UserContext } from 'contexts/UserContext';
import { cartClearItems } from 'features/Cart/CartSlice';
import { applyCouponAPI, deleteCartAPI, getUserCartAPI } from 'features/Cart/pathAPI';
import { clearState } from 'features/Order/OrderSlice';
import { createOrderAPI } from 'features/Order/pathAPI';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  wrapper_em: {
    borderRadius: '4px',
    margin: 0,
    padding: '1rem',
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 1,
      border: 'none',
    },
  },
  wrapper: {
    width: '100%',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('xs')]: { display: 'flex', flexDirection: 'column' },
  },
  left: {
    width: '100%',
    maxWidth: '820px',
    float: 'left',
    [theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
    [theme.breakpoints.down('xs')]: { padding: 0 },
  },
  right: {
    width: '100%',
    maxWidth: '400px',
    float: 'right',
    border: '1px solid #0000001a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    margin: '0.5rem 0',
    [theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
    [theme.breakpoints.down('xs')]: { padding: '0.5rem', order: 1 },
  },
  item: {
    position: 'relative',
    border: '1px solid #0000001a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    marginTop: '0.5rem',
  },

  itemContent: { paddingTop: '0.5rem', paddingRight: '0.5rem' },
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
  fieldCoupon: { width: '12rem', [theme.breakpoints.down('xs')]: { width: '10.5rem' } },
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
}));

const PlaceOrderPage = () => {
  document.querySelector('title').innerHTML = 'Đặt hàng';
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const formatter = new Intl.NumberFormat('vn');

  // dispatch API
  const actionAddOrderAPI = (order, token) => dispatch(createOrderAPI(order, token));
  const actionGetUserCartAPI = (token) => dispatch(getUserCartAPI(token));
  const actionEmptyCart = (token) => dispatch(deleteCartAPI(token));
  const actionApplyCoupon = (coupon, token) => dispatch(applyCouponAPI(coupon, token));
  const actionCartClearItems = () => dispatch(cartClearItems());

  // reducer
  const addressRedux = useSelector((state) => state.cart.address);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const isSuccess = useSelector((state) => state.order.isSuccess);
  const isError = useSelector((state) => state.order.isError);
  const message = useSelector((state) => state.order.message);

  // --Contexts
  const state = useContext(UserContext);
  const [token] = state.token;
  const [user] = state.user;

  //state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState('');
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  //redirect
  if (!token) {
    history.push('/login?redirect=placeorder');
  }

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    }; // eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' });
      dispatch(clearState());
    }

    if (isSuccess) {
      enqueueSnackbar(message, { variant: 'success' });
      dispatch(clearState());
    } // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchUserCart = async (token) => {
      setLoading(true);
      try {
        const product = await actionGetUserCartAPI(token);
        const res = unwrapResult(product);
        if (res) {
          setProducts(res.products);
          setTotal(res.cartTotal);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    fetchUserCart(token); // eslint-disable-next-line
  }, []);

  const actionClearCart = () => {
    // remove from local storage & redux
    actionCartClearItems();
    // remove from backend
    const emptyCart = async () => {
      try {
        const empty = await actionEmptyCart(token);
        const res = unwrapResult(empty);
        if (res.ok) {
          setProducts([]);
          setTotal(0);
          setTotalAfterDiscount(0);
          setCoupon('');
        }
      } catch (err) {}
    };
    emptyCart();
  };

  const applyDiscountCoupon = (e) => {
    e.preventDefault();
    const applyCoupon = async () => {
      try {
        const couponRes = await actionApplyCoupon({ coupon }, token);
        const res = unwrapResult(couponRes);
        if (res.value) {
          setTotalAfterDiscount(res.value);
          setCoupon('');
        }
        if (res.err) {
          setDiscountError(res.err);
        }
      } catch (err) {}
    };
    applyCoupon();
  };

  const checkOutOrder = (e) => {
    e.preventDefault();
    const order = {
      totalPayable: totalAfterDiscount !== 0 ? totalAfterDiscount : total,
      paymentMethod: paymentMethod ? paymentMethod : user?.paymentMethod,
      feeDiscount: totalAfterDiscount !== 0 ? total - totalAfterDiscount : 0,
    };
    const createOrder = async () => {
      try {
        //call create order API
        const orderRes = await actionAddOrderAPI(order, token);
        const res = unwrapResult(orderRes);
        if (res) {
          actionClearCart();
          // redirect
          setTimeout(() => {
            history.push(`/order/${res._id}`);
          }, 1000);
        }
        if (res.err) {
          setDiscountError(res.err);
        }
      } catch (err) {}
    };
    createOrder();
  };

  return loading ? (
    <SimpleBackdrop />
  ) : products?.length > 0 ? (
    <div className={classes.wrapper}>
      <CheckoutSteps step1 step2 step3 />
      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            Vận chuyển
          </Typography>
          <Typography variant="subtitle1">
            Thông tin giao hàng:&nbsp;{addressRedux ? addressRedux : user?.address}
          </Typography>
        </div>
      </div>
      <div className={classes.right}>
        <Box p="1rem 0">
          <Typography variant="h6">
            {/* Order Summary */}
            Thành tiền
          </Typography>
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
                  setCoupon(e.target.value);
                  setDiscountError('');
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
              Rất tiếc! Không thể tìm thấy mã voucher này. Bạn vui lòng kiểm tra lại mã đăng nhập
              hoặc có thể mã đã hết hạn sử dụng.
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
                  {formatter.format(totalAfterDiscount !== 0 ? totalAfterDiscount : total)} <u>đ</u>
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
      </div>

      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            Phương thức thanh toán:
          </Typography>
          <Typography variant="subtitle1">
            {paymentMethod ? paymentMethod : user?.paymentMethod}
          </Typography>
        </div>
      </div>
      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            Sản phẩm đặt mua
          </Typography>
          {products?.length > 0 &&
            products.map((item, index) => (
              <div key={index}>
                <Grid container justify="center" className={classes.itemContent}>
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
        </div>
      </div>
    </div>
  ) : (
    <Grid container justify="center" alignItems="flex-start" className={classes.wrapper_em}>
      <Grid item xs={12}>
        <CustomizedBreadcrumbs step1="Trang chủ" step2="Đặt hàng" />
      </Grid>
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
  );
};

export default PlaceOrderPage;
