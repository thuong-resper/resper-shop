import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import SeeMoreButtonMobile from "../../../Button/SeeMoreButtonMobile/SeeMoreButtonMobile";
import { AntTab, AntTabs } from "../../../Tab/Tab";
import SimpleAlerts from "../../../UI/Alerts/Alerts";
import Product from "../../Product/Product";
import SkeletonProduct from "../../Product/Skeleton/SkeletonProduct";
import styles from "./styles.module.css";

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 600, itemsToShow: 3 },
  { width: 769, itemsToShow: 4 },
  { width: 960, itemsToShow: 4 },
];

const ProductMan = (props) => {
  const { loading, error, products } = props;

  const [value, setValue] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { width } = useWindowDimensions();

  // set show skeleton when switching tabs (value change)
  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
    return () => {
      return setSpinner(true);
    };
  }, [value]);

  return (
    <Grid container justify="space-between" className="top-15 rp1">
      <Grid item xs className="m-heading" sm={12}>
        <Link to="">
          <img
            data-original="https://cdn.tgdd.vn/v2015/Content/desktop/images/V5/category/desk-donghothoitrangbanner.png"
            src="https://cdn.tgdd.vn/v2015/Content/desktop/images/V5/category/desk-donghothoitrangbanner.png"
            className="img-m-heading img-m-heading-dk"
            alt="asd"
          />

          <img
            data-original="https://cdn.tgdd.vn/v2015/Content/mobile/images/V5/category/mb-bannerdonghothoitrang.png"
            src="https://cdn.tgdd.vn/v2015/Content/mobile/images/V5/category/mb-bannerdonghothoitrang.png"
            className="img-m-heading img-m-heading-mb"
            alt="asd"
          />
        </Link>
      </Grid>
      <Grid item xs className={styles.section}>
        <div className="skeleton-p">
          {loading ? (
            <Grid
              container
              spacing={1}
              direction="row"
              style={{ maxHeight: "46rem" }}
            >
              <div style={{ width: "100%", margin: "10px 0 10px 4px" }}>
                <Grid container direction="row" wrap="nowrap">
                  {[...Array(3)].map((item, index) => (
                    <Grid item key={index}>
                      <Box mr={1}>
                        <Skeleton
                          animation="pulse"
                          variant="rect"
                          height={40}
                          width={170}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <Grid container direction="row" spacing={1}>
                {[...Array(5)].map((item, index) => (
                  <Grid
                    item
                    key={index}
                    className="item-skeleton item-skeleton-4"
                  >
                    <SkeletonProduct />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : error ? (
            <SimpleAlerts severity="error" message={error} />
          ) : (
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
                  <AntTab label="Man" {...a11yProps(0)} />
                  <AntTab label="Woman" {...a11yProps(1)} />
                  <AntTab label="Couple" {...a11yProps(2)} />
                </AntTabs>
              </AppBar>
              {spinner ? (
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  style={{ maxHeight: "46rem" }}
                >
                  <Grid container direction="row" spacing={1}>
                    {[...Array(5)].map((item, index) => (
                      <Grid
                        key={index}
                        item
                        className="item-skeleton item-skeleton-4"
                      >
                        <Box mt={3}>
                          <SkeletonProduct />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ) : (
                <div>
                  <TabPanel value={value} index={0} className="tab-panel">
                    <Link to="/man-watches" className={styles.link}>
                      <span
                        className="seemore"
                        style={{ top: "0", lineHeight: "3rem" }}
                      >
                        <strong>Men's fashion watches</strong>
                      </span>
                    </Link>
                    {width < 600 ? (
                      <Grid container justify="flex-start" className="hide">
                        {products.map((product) => (
                          <Grid item xs={6} key={product._id}>
                            <Product product={product} loading={loading} />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        style={{ width: "100%" }}
                      >
                        <Carousel
                          breakPoints={breakPoints}
                          pagination={false}
                          enableSwipe={false}
                        >
                          {products.map((product) => (
                            <Product
                              product={product}
                              key={product._id}
                              loading={loading}
                            />
                          ))}
                        </Carousel>
                      </Grid>
                    )}

                    <SeeMoreButtonMobile
                      titleAfterClick="man's fashion watches"
                      isActive={true}
                      link="/man-watches"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1} className="tab-panel">
                    <Link to="/woman-watches" className={styles.link}>
                      <span
                        className="seemore"
                        style={{ top: "0", lineHeight: "3rem" }}
                      >
                        <strong>Woman's fashion watches</strong>
                      </span>
                    </Link>

                    {width < 600 ? (
                      <Grid container justify="flex-start" className="hide">
                        {products.map((product) => (
                          <Grid item xs={6} key={product._id}>
                            <Product product={product} loading={loading} />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        style={{ width: "100%" }}
                      >
                        <Carousel
                          breakPoints={breakPoints}
                          pagination={false}
                          enableSwipe={false}
                        >
                          {products.map((product) => (
                            <Product
                              product={product}
                              key={product._id}
                              loading={loading}
                            />
                          ))}
                        </Carousel>
                      </Grid>
                    )}

                    <SeeMoreButtonMobile
                      titleAfterClick="woman's fashion watches"
                      isActive={true}
                      link="/woman-watches"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2} className="tab-panel">
                    <Link to="/couple-watches" className={styles.link}>
                      <span
                        className="seemore"
                        style={{ top: "0", lineHeight: "3rem" }}
                      >
                        <strong>Couple watches</strong>
                      </span>
                    </Link>

                    {width < 600 ? (
                      <Grid container justify="flex-start" className="hide">
                        {products.map((product) => (
                          <Grid item xs={6} key={product._id}>
                            <Product product={product} loading={loading} />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                        style={{ width: "100%" }}
                      >
                        <Carousel
                          breakPoints={breakPoints}
                          pagination={false}
                          enableSwipe={false}
                        >
                          {products.map((product) => (
                            <Product
                              product={product}
                              key={product._id}
                              loading={loading}
                            />
                          ))}
                        </Carousel>
                      </Grid>
                    )}
                    <SeeMoreButtonMobile
                      titleAfterClick="couple watches"
                      isActive={true}
                      link="/couple-watches"
                    />
                  </TabPanel>
                </div>
              )}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductMan;

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
          <Typography component="div">{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
