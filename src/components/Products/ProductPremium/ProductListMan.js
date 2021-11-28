import { AppBar, Box, Grid } from '@material-ui/core';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile';
import { AntTabBlack, AntTabs } from 'components/Tab/Tab';
import SimpleAlerts from 'components/UI/Alerts/Alerts';
import { getListProductsMan } from 'features/Product/pathApi';
import useWindowDimensions from 'hooks/useWindowDimensions';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Product from '../Product/Product';
import SkeletonProduct from '../Product/Skeleton/SkeletonProduct';
import img1 from './DHNammobile-720x240.jpg';
import img from './DHphaimanh-330x428.png';
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

const fetchedCategories = [
  {
    label: 'Đồng hồ thời trang',
    id: '61376edaa8d3c977efbcfa08',
    index: 0,
    sex: 'man',
  },
  {
    label: 'Đồng hồ thông minh',
    id: '61376ecfa8d3c977efbcfa07',
    index: 1,
    sex: 'man',
  },
];

const ProductListMan = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [sex] = useState('man');
  const [category, setCategory] = useState('61376edaa8d3c977efbcfa08');

  useEffect(() => {
    // dispatch API
    const params = {
      category: category,
      sex: sex,
    };
    const actionGetListProducts = (params) => dispatch(getListProductsMan(params));
    actionGetListProducts(params);
  }, [category, sex, dispatch]);

  const data = useSelector((state) => state.ListProductMan.data);
  const loading = useSelector((state) => state.ListProductMan.loading);
  const error = useSelector((state) => state.ListProductMan.error);

  const handleChange = (event, newValue) => {
    for (let i = 0; i < fetchedCategories.length; i++) {
      if (fetchedCategories[i].index === newValue) {
        setCategory(fetchedCategories[i].id);
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
                    {loading ? <SkeletonProduct /> : <Product product={item} />}
                  </Grid>
                ))}
                {/* button see more on mobile */}
                {fetchedCategories.map((c) => (
                  <SeeMoreButtonMobile
                    key={c.index}
                    title={c.index === value ? `${c.label} nam` : null}
                    link={c.index === value ? `products?category=${c.id}&sex=${c.sex}` : null}
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
                      to={`products?category=${c.id}&sex=${c.sex}`}
                      className="seemore"
                    >
                      {c.index === value ? (
                        <span>
                          Xem thêm&nbsp;<strong>{`${c.label} nam`}</strong>
                        </span>
                      ) : null}
                    </Link>
                  ))}
                  <div className="list-item list-top-ten">
                    {loading ? (
                      <Box display="flex" justify="space-between">
                        {[...Array(4)].map((item, index) => (
                          <Box width="25%">
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
      <div className="watch-type premium-section watchforman">
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
                  {fetchedCategories.map((c) => (
                    <AntTabBlack key={c.index} label={c.label} />
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

export default ProductListMan;
