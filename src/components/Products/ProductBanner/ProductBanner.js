import { Grid } from "@material-ui/core";
import {
  NextBtn,
  PreviousBtn,
} from "components/Button/ButtonSlide/ButtonSlide";
import anh1 from "images/anh1.png";
import anh2 from "images/anh2.png";
import anh3 from "images/anh3.png";
import anh4 from "images/anh4.png";
import anh5 from "images/anh5.png";
import anhX from "images/anhx.png";
import anhY from "images/anhy.png";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./styles.css";

export default function Banner() {
  const dataBannerResult = [
    {
      banner: anh1,
    },
    {
      banner: anh2,
    },
    {
      banner: anh3,
    },
    {
      banner: anh4,
    },
    {
      banner: anh5,
    },
  ];

  const settings = {
    infinite: false,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 300,
    dots: true,
    slidesPerRow: 1,
    slidesToScroll: 1,
  };

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

  const ShowBanner = (data) => {
    if (data.length > 0) {
      return (
        <Slider
          className="list-item-banner"
          {...settings}
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
        >
          {data.map((igBanner, index) => (
            <Link
              className="items-banner"
              key={index}
              to="#"
              onClickCapture={handleOnItemClick}
            >
              <img src={igBanner.banner} alt={igBanner._id} />
            </Link>
          ))}
        </Slider>
      );
    }
  };
  return (
    <>
      <Grid container direction="row" wrap="nowrap">
        <div className="ground-banner">
          <div className="list-banner">{ShowBanner(dataBannerResult)}</div>
          <div className="list-banner-right">
            <Link className="items-banner" to="#">
              <img src={anhX} alt={anhX} />
            </Link>
            <Link className="items-banner" to="#">
              <img src={anhY} alt={anhY} />
            </Link>
          </div>
        </div>
      </Grid>
    </>
  );
}
