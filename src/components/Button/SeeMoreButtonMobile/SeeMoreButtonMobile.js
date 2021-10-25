import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SeeMoreButtonMobile = (props) => {
  return (
    <>
      {props.link && (
        <Link to={props.link} className="see-all">
          Xem thêm&nbsp;{props.title}
        </Link>
      )}
    </>
  );
};

export default SeeMoreButtonMobile;
