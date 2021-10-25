import { Typography } from '@material-ui/core';
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide';
import anh1 from 'images/c-420x260border30-420x260-1.png';
import anh2 from 'images/c-420x260border30copy-420x260.png';
import anh3 from 'images/c-bst1-420x260-1.png';
import anh4 from 'images/c-bst2-420x260.png';
import anh5 from 'images/c-bst3-420x260-1.png';
import anh6 from 'images/c-bst4-420x260-1.png';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './styles.css';

export default function ProductCollections() {
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
    {
      banner: anh6,
    },
  ];

  const settings = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 300,
    dots: false,
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
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

  const showCollections = (data) => {
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
          {data.map((item, index) => (
            <Link
              className="items-banner banner-collections"
              key={index}
              to="#"
              onClickCapture={handleOnItemClick}
            >
              <img src={item.banner} alt={item} />
            </Link>
          ))}
        </Slider>
      );
    }
  };
  return (
    <>
      <Typography className="typo-collection" variant="h6" gutterBottom>
        Bộ sưu tập
      </Typography>
      {showCollections(dataBannerResult)}
    </>
  );
}
