import { AppBar, Box, Grid } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile';
import Product from 'components/Products/Product/Product';
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct';
import { AntTab, AntTabs } from 'components/Tab/Tab';
import { getListProducts } from 'features/Product/pathApi';
import useWindowDimensions from 'hooks/useWindowDimensions';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
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
    label: 'Laptop nổi bật nhất',
    id: '6142bff8d0c33220905c8bd2',
    index: 0,
  },
  {
    label: 'Tablet nổi bật nhất',
    id: '6142c006d0c33220905c8bd3',
    index: 1,
  },
];

const TopTenLaptop = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //  fetched fashion watch first
  const [category, setCategory] = useState(fetchedCategories[0].id);

  const actionGetListProducts = (params) => dispatch(getListProducts(params));

  useEffect(() => {
    // dispatch API
    const params = {
      category: category,
      sort: '-sold',
      limit: 10,
    };

    const fetchDataProduct = async (params) => {
      try {
        setLoading(true);
        const product = await actionGetListProducts(params);
        const res = unwrapResult(product);
        if (res) {
          setData(res.data);
          setLoading(false);
        }
      } catch (err) {}
    };
    fetchDataProduct(params); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, category]);

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
      <div className="skeleton-p skeleton-p-top color-laptop">
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
          {showListProducts(data)}
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

export default TopTenLaptop;
