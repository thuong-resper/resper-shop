import { makeStyles } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar';
import { getProductId } from 'features/Product/pathApi';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import FormProductEdit from './FormProductEdit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export default function ProductEdit() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useRouteMatch().params;
  //state
  const [valuesEdit, setValuesEdit] = useState([]);
  const loading = useSelector((state) => state.productId.loading);
  // dispatch action
  const actionGetProduct = (id) => dispatch(getProductId(id));
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchDataProduct = async (id) => {
      const product = await actionGetProduct(id);
      const res = unwrapResult(product);
      if (res) {
        setValuesEdit(res);
      }
    };
    fetchDataProduct(id); // eslint-disable-next-line
  }, []);
  return (
    <>
      <>
        <Helmet>
          <title>Create A Product</title>
        </Helmet>
        <div className={classes.root}>
          {loading && <SimpleBackdrop />}
          <AdminSidebar />
          <main className={classes.content}>
            <FormProductEdit id_product={id} valuesEdit={valuesEdit} />
          </main>
        </div>
      </>
    </>
  );
}
