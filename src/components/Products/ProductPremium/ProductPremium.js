import { AppBar, Box, Grid } from '@material-ui/core';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile';
import { AntTab, AntTabs } from 'components/Tab/Tab';
import SimpleAlerts from 'components/UI/Alerts/Alerts';
import { getPremiumProducts } from 'features/Product/pathApi';
import useWindowDimensions from 'hooks/useWindowDimensions';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from '../Product/Product';
import img from './DHCaocapDesk-330x428.png';
import img1 from './DHCaocapmobile2x-720x240-1.jpg';
import './styles.css';

const settings = {
  infinite: false,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 300,
  dots: false,
  slidesToShow: 4,
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

// static temporary, can get from server later :)
const fetchedCategories = [
  {
    _id: '614575e8b871a402dd465b44',
    name: 'Citizen',
    index: 0,
  },
  {
    _id: '614575dbb871a402dd465b43',
    name: 'Orient',
    index: 1,
  },
  {
    _id: '6145760bb871a402dd465b48',
    name: 'Bulova',
    index: 2,
  },
  {
    _id: '614865075eee941ee8d5019e',
    name: 'FREDERIQUE CONSTANT',
    index: 3,
  },
  {
    _id: '614865315eee941ee8d5019f',
    name: 'MOVADO',
    index: 4,
  },
  {
    _id: '6148654d5eee941ee8d501a0',
    name: 'CANDINO',
    index: 5,
  },
];

// get premium products each brands by the price ascending
const ProductPremium = () => {
  const dispatch = useDispatch();
  const category = '61376edaa8d3c977efbcfa08'; //fashion watches
  const [value, setValue] = useState(0);
  const [sub, setSub] = useState('614575e8b871a402dd465b44'); //fashion watches

  useEffect(() => {
    // dispatch API
    const params = {
      category: category,
      subs: sub,
    };
    const actionGetListProducts = (params) => dispatch(getPremiumProducts(params));
    actionGetListProducts(params);
  }, [category, sub, dispatch]);

  const data = useSelector((state) => state.ListPremiumProducts.data);
  const loading = useSelector((state) => state.ListPremiumProducts.loading);
  const error = useSelector((state) => state.ListPremiumProducts.error);

  const handleChange = (event, newValue) => {
    for (let i = 0; i < fetchedCategories.length; i++) {
      if (fetchedCategories[i].index === newValue) {
        setSub(fetchedCategories[i]._id);
      }
    }
    setValue(newValue);
  };

  const { width } = useWindowDimensions();

  //prevent click when swipe
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
                    <Product product={item} loading={loading} />
                  </Grid>
                ))}
                {/* button see more on mobile */}
                {fetchedCategories.map((c) => (
                  <SeeMoreButtonMobile
                    key={c.index}
                    title={c.index === value ? `Đồng hồ cao cấp ${c.name}` : null}
                    link={c.index === value ? `products?category=${category}&subs=${c._id}` : null}
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
                      to={c.index === value ? `products?category=${category}&subs=${c._id}` : null}
                      className="seemore"
                    >
                      {c.index === value ? (
                        <span>
                          Xem thêm Đồng hồ cao cấp&nbsp;<strong>{`${c.name}`}</strong>
                        </span>
                      ) : null}
                    </Link>
                  ))}
                  <div className="list-item list-top-ten">
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
                          <Product product={item} loading={loading} />
                        </div>
                      ))}
                    </Slider>
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
      <div className="watch-type premium-section">
        <div className="premium-type">
          <Link to="/premium-products">
            <img src={width > 1024 ? img : img1} alt="premium-products"></img>
          </Link>
        </div>
        <aside>
          <div className="skeleton-p skeleton-p-pre">
            <div className="tab">
              <AppBar position="static" className="app-bar">
                <AntTabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  scrollButtons="on"
                  textColor="primary"
                  variant="scrollable"
                  aria-label="scrollable auto tabs example"
                >
                  {/* {data.brands.map((item, index) => (
                  <AntTab key={index} label={item.brand} {...a11yProps(index)} />
                ))} */}
                  {fetchedCategories.map((c) => (
                    <AntTab key={c.index} label={c.name} />
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
        </aside>
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
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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

export default ProductPremium;
