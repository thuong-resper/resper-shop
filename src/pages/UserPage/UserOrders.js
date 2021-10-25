import { Box, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from '@material-ui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import UserDrawer from 'components/Drawer/UserDrawer';
import { UserContext } from 'contexts/UserContext';
import { getOrderUserAPI } from 'features/Order/pathAPI';
import moment from 'moment';
import queryString from 'query-string';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { statusOrder } from 'staticOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const UserOrders = ({ location }) => {
  const page = Number(queryString.parse(location.search).page) || 1;
  // --Contexts
  const state = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [token] = state.token;

  if (!token) {
    history.push('/login?redirect=user/orders');
  }

  const items = 10;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [length, setLength] = useState(0);
  console.log(orders);
  const formatter = new Intl.NumberFormat('vn');

  // dispatch API
  const actionGetUserOrder = (params) => dispatch(getOrderUserAPI(params));

  // scroll to top
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    const fetchOrders = async (params) => {
      try {
        setLoading(true);

        const orders = await actionGetUserOrder(params);
        const res = unwrapResult(orders);
        if (res) {
          setLoading(false);
          setOrders(res.orders);
          setLength(res.length);
        }
      } catch (err) {}
    };
    const params = {
      limit: items,
      page: page,
    };
    fetchOrders(params); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const translateToVn = (key) => {
    for (let i = 0; i < statusOrder.length; i++) {
      if (statusOrder[i].value === key) {
        return statusOrder[i].vn;
      }
    }
  };

  // function
  const onChangePage = (page, newPage) => {
    const data = {
      page: newPage,
      limit: items || 20,
    };
    const params = queryString.stringify(data);
    const url = `/user/orders?${params}`;
    history.push(url);
  };

  const showPagination = (length) => {
    if (length > 0) {
      return (
        <Box display="flex" justifyContent="end" width="100%" m="0.5rem 0">
          <Pagination
            variant="outlined"
            shape="rounded"
            count={Math.ceil(length / items)}
            page={page}
            onChange={onChangePage}
          />
        </Box>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Đơn hàng của tôi</title>
      </Helmet>
      <div className={classes.root} ref={divRef}>
        <UserDrawer i={1} />
        <main className={classes.content}>
          {/* step 5 */}
          <Box m="0.5rem">
            <Box mb="1rem">
              <Typography variant="h5">
                {loading ? 'Loading...' : `Đơn hàng của tôi (${length})`}
              </Typography>
            </Box>
            {loading ? (
              <Box display="flex" justifyContent="center">
                <ReactLoading type="balls" color="#007ff0" />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn hàng</TableCell>
                      <TableCell align="left">Ngày mua</TableCell>
                      <TableCell align="left">Sản phẩm</TableCell>
                      <TableCell align="left">Tổng tiền</TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.length > 0 &&
                      orders?.map((c, index) => (
                        <TableRow key={c._id} hover>
                          <TableCell component="th" scope="row">
                            <Link
                              style={{ color: '#007ff0', cursor: 'pointer' }}
                              to={`/order/${c._id}`}
                            >
                              {c._id}
                            </Link>
                          </TableCell>
                          <TableCell align="left">
                            {moment(c.timeOrder).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="left">
                            {c?.products.map((p) => (
                              <p key={p._id}>
                                {p?.product.name}&nbsp;x&nbsp;{p.quantity}
                              </p>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            {formatter.format(c.totalPayable)}&nbsp;đ
                          </TableCell>
                          <TableCell align="left">{translateToVn(c.orderStatus)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {!loading && showPagination(length)}
          </Box>
        </main>
      </div>
    </>
  );
};

export default UserOrders;
