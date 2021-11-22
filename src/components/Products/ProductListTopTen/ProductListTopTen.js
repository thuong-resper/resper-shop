import { AppBar, Box, Grid } from '@material-ui/core';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile';
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct';
import { AntTab, AntTabs } from 'components/Tab/Tab';
import SimpleAlerts from 'components/UI/Alerts/Alerts';
import { getListProducts } from 'features/Product/pathApi';
import useWindowDimensions from 'hooks/useWindowDimensions';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from '../Product/Product';
import './styles.css';

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

const fetchedCategories = [
  {
    label: 'Đồng hồ thời trang',
    id: '61376edaa8d3c977efbcfa08',
    index: 0,
  },
  {
    label: 'Đồng hồ thông minh',
    id: '61376ecfa8d3c977efbcfa07',
    index: 1,
  },
];

const ProductListTopTen = () => {
  const dispatch = useDispatch();

  const [sold] = useState(0); //0 best seller
  const [value, setValue] = useState(0);
  //  fetched fashion watch first
  const [category, setCategory] = useState(fetchedCategories[0].id);

  useEffect(() => {
    // dispatch API
    const params = {
      category: category,
      sold: sold,
    };
    const actionGetListProducts = (params) => dispatch(getListProducts(params));
    actionGetListProducts(params);
  }, [category, sold, dispatch]);

  const data = useSelector((state) => state.ListProducts.data);
  const loading = useSelector((state) => state.ListProducts.loading);
  const error = useSelector((state) => state.ListProducts.error);

  const handleChange = (event, newValue) => {
    for (let i = 0; i < fetchedCategories.length; i++) {
      if (fetchedCategories[i].index === newValue) {
        setCategory(fetchedCategories[i].id);
      }
    }
    setValue(newValue);
  };

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

  const showListProducts = (data) => {
    if (data.length > 0) {
      return (
        <>
          {width < 600 ? (
            <>
              <Grid container justify="flex-start">
                {data.slice(0, 4).map((item, index) => (
                  <Grid item xs={6} key={index}>
                    {loading ? <SkeletonProduct /> : <Product product={item} />}
                  </Grid>
                ))}
                {/* button see more on mobile */}
                {fetchedCategories.map((c) => (
                  <SeeMoreButtonMobile
                    key={c.index}
                    title={c.index === value ? c.label : null}
                    link={c.index === value ? `shop?category=${c.id}` : null}
                  />
                ))}
              </Grid>
            </>
          ) : (
            <>
              {data.map((item, index) => (
                <TabPanel className="tab-panel" value={value} index={index} key={index}>
                  {fetchedCategories.map((c) => (
                    <Link
                      key={c.index}
                      to={c.index === value ? `shop?category=${c.id}` : null}
                      className="seemore"
                    >
                      {c.index === value ? (
                        <span>
                          Xem thêm&nbsp;<strong>{c.label}</strong>
                        </span>
                      ) : null}
                    </Link>
                  ))}
                  <div className="list-item list-top-ten">
                    {loading ? (
                      <Box display="flex" justify="space-between">
                        {[...Array(5)].map((item, index) => (
                          <Box width="20%" key={index}>
                            <SkeletonProduct />
                          </Box>
                        ))}
                      </Box>
                    ) : (
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
                    )}
                  </div>
                </TabPanel>
              ))}
            </>
          )}
        </>
      );
    }
  };
  return (
    <>
      <div className="skeleton-p skeleton-p-top">
        <div className="tab">
          <AppBar position="static" className="app-bar">
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {fetchedCategories.map((c) => (
                <AntTab key={c.label} label={c.label} />
              ))}
            </AntTabs>
          </AppBar>
          {error ? (
            <SimpleAlerts severity="error" message={error} />
          ) : (
            <>{showListProducts(data)}</>
          )}
        </div>
      </div>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default ProductListTopTen;
