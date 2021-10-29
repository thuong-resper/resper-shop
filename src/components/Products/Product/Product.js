import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import SkeletonProduct from './Skeleton/SkeletonProduct';

const useStyles = makeStyles((theme) => ({
  full: { width: '100%', height: '100%' },
  item: {
    backgroundColor: '#fff',
    listStyle: 'none',
    transition: '0.5ms',
    width: '100%',
    height: '100%',
    '&:hover': {
      boxShadow: '0 2px 12px rgb(0 0 0 / 12%)',
      '& div': {
        '& a': {
          '& div': {
            '& span': { '& img': { marginBottom: '20px', transition: 'all 300ms ease-in-out' } },
          },
        },
      },
    },
  },
  oneItem: {
    float: 'left',
    position: 'relative',
    overflow: 'hidden',
    transition: '0.4',
    border: '1px solid #f1f1f1',
    width: '100%',
    height: '100%',
    borderBottom: '1px solid #f1f1f1',
    borderTop: '1px solid #f1f1f1',
  },
  wrapItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    color: 'inherit',
    padding: '10px 0',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'unset',
    },
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '147.5px',
    },
    '& span': { width: '100%' },
  },
  imgItem: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '220px',
    display: 'block',
    '@media (max-width: 1280px)': {
      width: '180px',
      margin: 'auto',
    },
    '@media (max-width: 600px)': {
      display: 'block',
      width: '140px',
      height: '140px',
      margin: 'auto',
    },
  },
  name: {
    display: ['block', '-webkit-box'],
    lineHeight: '21px',
    height: '42px',
    fontSize: '14px',
    margin: '0 10px',
    color: 'var(--defaultTextColor)',
    overflow: 'hidden',
    width: '100%',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    maxWidth: 'fit-content',
  },
  price: {
    padding: '0',
    margin: '5px 10px 0',
    display: 'block',
    overflow: 'hidden',
    '& strong': {
      display: 'inline-block',
      verticalAlign: 'middle',
      overflow: 'hidden',
      fontSize: '14px',
      color: 'var(--secondary)',
      lineHeight: '15px',
    },
    '& span': {
      display: 'inline-block',
      verticalAlign: 'middle',
      fontSize: '12px',
      textDecoration: 'line-through',
      marginLeft: '5px',
      color: 'var(--defaultTextColor)',
      margin: '0 5px',
    },
    '& i': {
      fontSize: '12px',
      color: 'var(--secondary)',
      margin: '0 5px 0',
      display: 'inline-block',
      verticalAlign: 'middle',
      fontStyle: 'normal',
    },
  },
  pros: {
    margin: '10px',
    padding: '0',
    whiteSpace: 'unset',
    color: '#777',
    lineHeight: '22px',
    height: '20px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 0 10px',
    },
    '& span': {
      fontSize: '11px',
      textDecoration: 'none',
      color: '#777',
      borderRadius: '5px',
      position: 'relative',
      margin: '5px 0 0',
      border: '1px solid #eee',
      padding: '3px',
    },
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const { product, loading } = props;
  const rate = product.rating / product.numReviews;
  const formatter = new Intl.NumberFormat('vn');

  return (
    <Grid item className={classes.full}>
      {loading && <SkeletonProduct />}
      <li className={classes.item}>
        <div className={classes.oneItem}>
          <Link to={`/product?id=${product._id}`} className={classes.wrapItem}>
            <div className={classes.img}>
              <LazyLoadImage
                effect="blur"
                className={classes.imgItem}
                alt={product.name}
                src={product.image[0].url}
              />
            </div>
            <Box display="flex" flexDirection="column">
              <h3 className={classes.name}>{product.name}</h3>
              <div className={classes.pros}>
                <span>30 mm</span>
              </div>
              <div className={classes.price}>
                <strong>{formatter.format(product.price)} ₫</strong>
                <span>{formatter.format(product.priceCompare)}₫</span>
                <i>
                  {(
                    -((product.priceCompare - product.price) / product.priceCompare) * 100
                  ).toFixed() + '%'}
                </i>
              </div>
              <Box component="fieldset" borderColor="transparent" display="flex" m="5px 10px 0">
                <Rating name="read-only" value={rate} readOnly size="small" precision={0.5} />
                <Typography variant="body2" color="textSecondary">
                  {product.numReviews} đánh giá
                </Typography>
              </Box>
            </Box>
          </Link>
        </div>
      </li>
    </Grid>
  );
};

export default Product;
