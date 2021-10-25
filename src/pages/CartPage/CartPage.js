import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { UserContext } from 'contexts/UserContext';
import { deleteCartProduct, updateCartProduct } from 'features/Cart/CartSlice';
import { userCartAPI } from 'features/Cart/pathAPI';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CartList from '../../components/Cart/CartList';

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
}));

const CartPage = () => {
  document.querySelector('title').innerHTML = 'Giỏ hàng';
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  // dispatch API
  const actionUserCart = (cart, token) => dispatch(userCartAPI(cart, token));
  const actionDeleteCart = (index) => dispatch(deleteCartProduct(index));
  const actionUpdateCartProduct = (dataCart) => dispatch(updateCartProduct(dataCart));
  // --Contexts
  const state = useContext(UserContext);
  const [token] = state.token;
  // create state
  // store
  const dataCart = useSelector((state) => state.cart.dataCart);
  const loadingUserCart = useSelector((state) => state.cart.loadingUserCart);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
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
    </>
  );
};

export default CartPage;
