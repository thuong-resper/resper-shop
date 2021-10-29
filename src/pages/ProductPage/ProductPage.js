import { Grid, makeStyles } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ProductImageTab from 'components/Products/ProductImageTab/ProductImageTab';
import { UserContext } from 'contexts/UserContext';
import { addCartProduct, clearState } from 'features/Cart/CartSlice';
import { getCommentOne } from 'features/Comment/pathAPI';
import { getProductId, getRelated } from 'features/Product/pathApi';
import { useSnackbar } from 'notistack';
import NotFound from 'pages/NotFound/NotFound';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SimpleBackdrop from '../../components/Backdrop/Backdrop';
import ProductDescription from '../../components/Products/ProductDescription/ProductDescription';
import Comment from './Comment';
import HistoryProduct from './HistoryProduct/HistoryProduct';
import InfoProduct from './InfoProduct';
import SeeMoreProduct from './SeeMoreProduct/SeeMoreProduct';

const useStyles = makeStyles((theme) => ({
  container: {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '15px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    clear: 'both',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  block_left: {
    width: 'calc(100% - 490px)',
    float: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      float: 'none',
    },
  },
  block_right: {
    width: '460px',
    float: 'right',
    marginLeft: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      float: 'none',
      marginLeft: 'auto',
    },
  },
  breadcrumb: { backgroundColor: '#fff', borderRadius: '4px 4px 0 0', padding: '1rem 0' },
  wrapper: { backgroundColor: '#fff', borderRadius: '4px' },
  mb15: { marginBottom: '1.5rem' },
}));

const ProductPage = ({ location }) => {
  const classes = useStyles();
  const { id } = queryString.parse(location.search);
  const page = Number(queryString.parse(location.search).page) || 1;
  const page_cmt = Number(queryString.parse(location.search).page_cmt) || 1;
  let historyProduct = JSON.parse(localStorage.getItem('history_product')) || [];
  // state default
  const history = useHistory();
  const dispatch = useDispatch();
  // dispatch API
  const actionGetProduct = (id) => dispatch(getProductId(id));
  const getRelatedAPI = (params) => dispatch(getRelated(params));
  const actionAddToCart = (cart) => dispatch(addCartProduct(cart));
  // create state
  const state = useContext(UserContext);
  const { socket } = state;
  const [user] = state.user;
  const [token] = state.token;
  const items = 10;
  // Data Product ID
  const loading = useSelector((state) => state.productId.loading);
  const [dataProductsId, setDataProductsId] = useState(null);

  // Data Product See More
  const dataRelated = useSelector((state) => state.related.listProductSlider);
  const lengthRelated = useSelector((state) => state.related.length);
  const loadingRelated = useSelector((state) => state.related.loading);

  // Data Comment
  const loadingComet = useSelector((state) => state.comment.loading);
  const [lengthComment, setLengthComment] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [checkDeleteCmt, setCheckDeleteCmt] = useState(false);
  const [sumStarRating, setSumStarRating] = useState(0);
  const [starRating, setStarRating] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [loadingDeleteProduct] = useState(false);

  // snackbar
  const { enqueueSnackbar } = useSnackbar();
  //store
  const isSuccess = useSelector((state) => state.cart.isSuccess);
  const isError = useSelector((state) => state.cart.isError);
  const message = useSelector((state) => state.cart.message);

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    }; // eslint-disable-next-line
  }, []);

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

  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', id);
    }
  }, [socket, id]);

  // delete reply comment
  useEffect(() => {
    if (socket) {
      socket.on('serverUserDeleteReplyComment', (msg) => {
        if (msg) {
          const { comment, id_array } = msg;
          const newReply = [...dataComment];
          const index = newReply.findIndex((comment) => comment._id === id_array);
          if (index !== -1) {
            newReply[index] = comment;
          }
          setCheckDeleteCmt(false);
          setDataComment(newReply);
        }
      });
      return () => socket.off('serverUserDeleteReplyComment');
    }
  }, [socket, dataComment]);

  // crete reply comment
  useEffect(() => {
    if (socket) {
      socket.on('ServerUserCreateCommentReply', (msg) => {
        if (msg) {
          const newReply = [...dataComment];
          const index = newReply.findIndex((comment) => comment._id === msg._id);
          if (index !== -1) {
            newReply[index] = msg;
          }
          setDataComment(newReply);
        }
      });
      return () => socket.off('ServerUserCreateCommentReply');
    }
  }, [socket, dataComment]);

  // update reply comment
  useEffect(() => {
    if (socket) {
      socket.on('serverUserUpdateReplyComment', (msg) => {
        if (msg) {
          const newReply = [...dataComment];
          const index = newReply.findIndex((comment) => comment._id === msg._id);
          if (index !== -1) {
            newReply[index] = msg;
          }
          setDataComment(newReply);
        }
      });
      return () => socket.off('serverUserUpdateReplyComment');
    }
  }, [socket, dataComment]);

  // create Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on('ServerUserCreateComment', (msg) => {
        document.getElementById('waitWriteComment').innerHTML = '';
        const { comment, length, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
          setLengthComment(length);
          setDataComment([comment, ...dataComment]);
          setCheckDeleteCmt(false);
          setDataProductsId(product);
        }
      });
      return () => socket.off('ServerUserCreateComment');
    }
  }, [socket, dataComment]);

  // delete Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on('serverUserDeleteComment', (msg) => {
        const { comment, length, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          const dataCommentNew = [...dataComment];
          const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id);
          dataCommentNew.splice(index, 1);
          setLengthComment(length);
          setDataComment(dataCommentNew);
          setCheckDeleteCmt(false);
          setDataProductsId(product);
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
        }
      });
      return () => socket.off('serverUserDeleteComment');
    }
  }, [socket, dataComment]);

  // update comment
  useEffect(() => {
    if (socket) {
      socket.on('serverUserUpdateComment', (msg) => {
        const { comment, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          const dataCommentNew = [...dataComment];
          const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id);
          if (index !== -1) {
            dataCommentNew[index] = comment;
          }
          setDataComment(dataCommentNew);
          setDataProductsId(product);
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
        }
      });
    }
    return () => socket.off('serverUserUpdateComment');
  }, [socket, dataComment]);

  // get comment
  const fetchComment = async (idProduct) => {
    const paramsComment = {
      _id_product: idProduct,
      page: page_cmt,
      limit: 5,
    };
    const resultComment = await dispatch(getCommentOne(paramsComment));
    const comment = unwrapResult(resultComment);
    if (comment) {
      setDataComment(comment.data);
      setLengthComment(comment.length);
      setStarRating(comment.starRating);
      setSumStarRating(comment.sumStarRating);
      setReviewRating(comment.reviewRating);
    }
  };
  useEffect(() => {
    if (id) {
      fetchComment(id);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_cmt, id]);

  // historyProductOld
  const showHistoryProduct = () => {
    const historyProductOld = [...historyProduct];
    historyProductOld.forEach((product, index) => {
      if (product === null || product._id === id) {
        historyProductOld.splice(index, 1);
      }
    });
    historyProductOld.unshift(dataProductsId);
    localStorage.setItem('history_product', JSON.stringify(historyProductOld));
  };
  //  get one product

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchDataProduct = async (id) => {
      try {
        const product = await actionGetProduct(id);
        const res = unwrapResult(product);
        setDataProductsId(res);
      } catch (err) {}
    };
    fetchDataProduct(id);
    showHistoryProduct(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const param = {
      limit: items,
      page: page,
      id: id,
    };
    getRelatedAPI(param); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id]);

  // onClick
  const onChangePageSeenMoreProduct = (_page) => {
    const data = {
      id: id,
      page: _page,
      page_cmt: page_cmt,
    };
    const params = queryString.stringify(data);
    const url = `/product?${params}`;
    history.push(url);
  };
  const onChangePageComment = (_page) => {
    const data = {
      id: id,
      page_cmt: page_cmt + 1,
      page: page,
    };
    const params = queryString.stringify(data);
    const url = `/product?${params}`;
    history.push(url);
  };
  const actionCheckDeleteCmt = () => {
    setCheckDeleteCmt(true);
  };

  return (
    <>
      {/* show loading when access or change the product */}
      {loading ? (
        <SimpleBackdrop />
      ) : dataProductsId ? (
        <>
          <Grid container direction="row">
            <Grid item xs={12} className={classes.breadcrumb}>
              <CustomizedBreadcrumbs
                step1="Home"
                step2={dataProductsId?.category.name}
                infoProduct={dataProductsId}
              />
            </Grid>
          </Grid>
          <div className={classes.container}>
            <div className={classes.block_left}>
              {dataProductsId.image ? (
                <div className={classes.wrapper}>
                  <ProductImageTab product={dataProductsId} />
                </div>
              ) : null}
            </div>
            <div className={classes.block_right}>
              {/* show product information */}
              <InfoProduct dataProductsId={dataProductsId} actionAddToCart={actionAddToCart} />
            </div>
            {/* description products */}
            <div className={classes.block_left}>
              <ProductDescription product={dataProductsId} className={classes.wrapper} />
            </div>
            {/* review */}
            <div className={classes.block_left}>
              {/* all comment and form write a comment */}
              <Comment
                infoProduct={dataProductsId}
                lengthComment={lengthComment}
                dataComment={dataComment}
                onChangePageComment={onChangePageComment}
                loadingComet={loadingComet}
                socket={socket}
                token={token}
                user={user}
                actionCheckDeleteCmt={actionCheckDeleteCmt}
                sumStarRating={sumStarRating}
                starRating={starRating}
                nameProduct={dataProductsId.name}
                reviewRating={reviewRating}
              />
            </div>
          </div>
          {/* related products */}
          <SeeMoreProduct
            items={items}
            data={dataRelated}
            onChangePage={onChangePageSeenMoreProduct}
            lengthProductsType={lengthRelated}
            loading={loadingRelated}
            pageUrl={page}
          />
          {/* show history products */}
          <HistoryProduct historyProduct={historyProduct} _id={id} />
        </>
      ) : (
        // when don't have products
        <NotFound />
      )}

      {/* show loading when delete comment */}
      {checkDeleteCmt && <SimpleBackdrop />}

      {/* show loading when admin delete product */}
      {loadingDeleteProduct && <SimpleBackdrop />}

      {/* check have product */}
    </>
  );
};

export default ProductPage;
