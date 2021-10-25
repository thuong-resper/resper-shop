import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../../constants/orderConstants';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// <Grid container direction="row" justify="space-between" alignItems="flex-start">
//   <Grid item xs={12} className={classes.checkout}>
//     <Typography variant="h5">Order: {order._id}</Typography>
//   </Grid>
//   <Grid item xs={8}>
//     <div className={classes.summary_section_content}>
//       <div className={classes.checkout_summary}>
//         <div className={classes.checkout}>
//           <Typography
//             variant="overline"
//             gutterBottom
//             style={{ fontWeight: '400', fontSize: '18px' }}
//           >
//             shipping
//           </Typography>
//           <div className={classes.checkout_row}>
//             <div className={classes.checkout_summary_label}>
//               <PersonIcon color="primary" style={{ fontSize: '1rem', marginRight: '5px' }} />
//               <Typography variant="body2" style={{ fontWeight: 'bold' }}>
//                 Name: {order.user.name}
//               </Typography>
//             </div>
//           </div>
//           <div className={classes.checkout_row}>
//             <div style={{ justifyContent: 'flex-start', display: 'flex' }}>
//               <div className={classes.checkout_summary_label}>
//                 <EmailIcon color="primary" style={{ fontSize: '1rem', marginRight: '5px' }} />
//                 <Link to={`mailto:${order.user.email}`}>
//                   <Typography variant="body2">Email: {order.user.email}</Typography>
//                 </Link>
//               </div>
//               <div className={classes.checkout_summary_label}>
//                 <PhoneIcon color="primary" style={{ fontSize: '1rem', margin: '0 5px 0 10px' }} />
//                 <Typography variant="body2">Phone Number: {order.shippingAddress.phone}</Typography>
//               </div>
//             </div>
//           </div>
//           <div className={classes.checkout_row}>
//             <div className={classes.checkout_summary_label}>
//               <LocationOnIcon color="primary" style={{ fontSize: '1rem', marginRight: '5px' }} />
//               Address:
//               <Chip
//                 label="HOME"
//                 size="small"
//                 color="secondary"
//                 style={{
//                   fontWeight: 'bold',
//                   padding: '0 5px',
//                   margin: '0 5px',
//                 }}
//               />
//               <Typography variant="body2">
//                 {order.shippingAddress.address}, {order.shippingAddress.province},{' '}
//                 {order.shippingAddress.city}, {order.shippingAddress.country}
//               </Typography>
//             </div>
//           </div>
//           <div className={classes.checkout_row}>
//             {order.isDelivered ? (
//               <SimpleAlerts severity="info" title={`Delivered on ${order.deliveredAt}`} />
//             ) : (
//               <SimpleAlerts severity="error" title="Not Delivered" />
//             )}
//           </div>
//         </div>
//         <div className={classes.checkout}>
//           <Typography
//             variant="overline"
//             gutterBottom
//             style={{ fontWeight: '400', fontSize: '18px' }}
//           >
//             payment method
//           </Typography>
//           <div className={classes.checkout_row}>
//             <div className={classes.checkout_summary_label}>
//               <PaymentIcon color="primary" style={{ fontSize: '1rem', marginRight: '5px' }} />
//               <Typography variant="body2">
//                 <strong>Payment Method: {order.paymentMethod}</strong>
//               </Typography>
//             </div>
//           </div>
//           <div className={classes.checkout_row}>
//             {order.isPaid ? (
//               <SimpleAlerts severity="info" title={`Paid on ${order.paidAt}`} />
//             ) : (
//               <SimpleAlerts severity="error" title="Not Paid" />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>

//     {order.orderItems.length === 0 ? (
//       <div style={{ marginTop: '16px' }}>
//         <SimpleAlerts
//           severity="info"
//           message="There are no items in this cart"
//           title="Info"
//           to="/"
//           titleLink="CONTINUE SHOPPING"
//         />
//       </div>
//     ) : (
//       <React.Fragment>
//         <Grid
//           container
//           direction="row"
//           justify="flex-start"
//           alignItems="flex-start"
//           className={classes.title}
//         >
//           <Grid item xs={8}>
//             <Typography variant="body2" style={{ marginLeft: '19px' }}>
//               {order.orderItems.reduce((acc, item) => acc + item.qty, 0)} ITEMS
//             </Typography>
//           </Grid>
//           <Grid item xs={2}>
//             <Typography variant="body2" style={{ marginLeft: '-3px' }}>
//               PRICE
//             </Typography>
//           </Grid>
//           <Grid item xs={2}>
//             <Typography variant="body2">QUANTITY</Typography>
//           </Grid>
//         </Grid>
//         <div>
//           {order.orderItems.map((item, index) => (
//             <CartItemsConfirm item={item} key={item.product} />
//           ))}
//         </div>
//       </React.Fragment>
//     )}
//   </Grid>

//   {/*order detail*/}
//   <Grid item xs={4} className={classes.orderDetail}>
//     <div className={classes.summary_section}>
//       <Typography variant="overline" gutterBottom style={{ fontWeight: '400', fontSize: '18px' }}>
//         order summary
//       </Typography>

//       <div className={classes.summary_section_content}>
//         <div className={classes.checkout_summary}>
//           <div className={classes.checkout_rows}>
//             <div className={classes.checkout_row}>
//               <div className={classes.checkout_summary_label} style={{ color: 'var(--whiteThin)' }}>
//                 Subtotal ({order.orderItems.reduce((acc, item) => acc + item.qty, 0)} items)
//               </div>
//               <div className={classes.checkout_summary_value}>$ {order.itemsPrice}</div>
//             </div>
//             <div className={classes.checkout_row}>
//               <div className={classes.checkout_summary_label} style={{ color: 'var(--whiteThin)' }}>
//                 Shipping Fee
//               </div>
//               <div className={classes.checkout_summary_value}>$ {order.shippingPrice}</div>
//             </div>
//             <div className={classes.checkout_row}>
//               <div className={classes.checkout_summary_label} style={{ color: 'var(--whiteThin)' }}>
//                 Tax
//               </div>
//               <div className={classes.checkout_summary_value}>$ {order.taxPrice}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={classes.checkout_order_total}>
//         <div className={classes.checkout_order_row}>
//           <div className={classes.checkout_order_total_title}>Total</div>
//           <div className={classes.checkout_order_total_fee}>
//             $ {order.totalPrice}
//             <small className={classes.checkout_order_total_fee_tip}>
//               VAT included, where applicable
//             </small>
//           </div>
//         </div>
//       </div>
//       {error && <SimpleAlerts title="Error" severity="danger" message={error}></SimpleAlerts>}
//       {!order.isPaid && (
//         <div>
//           {loadingPay && <SimpleBackdrop />}
//           {!sdkReady ? (
//             <SimpleBackdrop />
//           ) : (
//             <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
//           )}
//         </div>
//       )}
//     </div>
//   </Grid>
// </Grid>;
