import Slider from '@ant-design/react-slick';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import Product from 'components/Products/Product/Product';
import useWindowDimensions from 'hooks/useWindowDimensions';
import React, { useCallback, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      width: '20%',
      flexBasis: '20%',
    },
  },
  titleSeeMore: {
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.5rem',
    },
  },
  minHeight: {
    height: '25.5rem',
    [theme.breakpoints.down('md')]: {
      height: '21.5rem',
    },
  },
}));

//react slick
const settings = {
  infinite: false,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 300,
  dots: false,
  slidesToShow: 5,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
export default function HistoryProduct({ _id, historyProduct }) {
  const classes = useStyles();

  //check the width of window
  const { width } = useWindowDimensions();

  //prevent click action when swipe
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);
  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);
  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) e.preventDefault();
    },
    [dragging]
  );
  const historyProductOld = [...historyProduct];
  historyProductOld.forEach((product, index) => {
    if (product === null || product._id === _id) {
      historyProductOld.splice(index, 1);
    }
  });
  const showListProducts = (data) => {
    if (data.length > 0) {
      return (
        <>
          {width < 600 ? (
            <>
              <Grid container justify="flex-start">
                {data.map((item, index) => (
                  <Grid item xs={6} key={index} className={classes.minHeight}>
                    <Product product={item} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <div className={classes.minHeight}>
                <Slider
                  className="list-item-banner"
                  {...settings}
                  prevArrow={<PreviousBtn />}
                  nextArrow={<NextBtn />}
                  beforeChange={handleBeforeChange}
                  afterChange={handleAfterChange}
                >
                  {data.map((item, index) => (
                    <div
                      onClickCapture={handleOnItemClick}
                      key={item._id}
                      className="one-slide-item"
                    >
                      <Product product={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="group-history-products">
      {historyProductOld.length > 0 && (
        <Typography variant="h5" className={classes.titleSeeMore} gutterBottom>
          Sản phẩm đã xem
        </Typography>
      )}
      {showListProducts(historyProductOld)}
    </div>
  );
}
