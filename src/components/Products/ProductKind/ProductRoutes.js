import { Grid, Typography } from "@material-ui/core";
import anh10 from "images/anh10.png";
import anh7 from "images/anh7.png";
import anh8 from "images/anh8.png";
import anh9 from "images/anh9.png";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const ProductRoutes = () => {
  const dataResult = [
    { link: "/fashion-watch", title: "fashion watch", image: anh7 },
    { link: "smart-watch", title: "smart watch", image: anh8 },
    { link: "for-child", title: "for child", image: anh10 },
    { link: "watch-straps", title: "watch straps", image: anh9 },
  ];

  const showRoutes = (data) => {
    if (data.length > 0) {
      return (
        <Grid container className="routes">
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Link to={item.link} className="route-link">
                <div className="kind-item">
                  <img src={item.image} alt={item.title} className="img-kind" />
                  <Typography
                    className="kind-name"
                    variant="button"
                    display="block"
                  >
                    {item.title}
                  </Typography>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return <>{showRoutes(dataResult)}</>;
};

export default ProductRoutes;
