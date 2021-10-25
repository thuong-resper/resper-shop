import { Box, Button, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Box>
        {step1 ? (
          <Link to="/login?redirect=shipping" className={classes.link}>
            <Button className={classes.button}>Giỏ hàng</Button>
            <ArrowRightIcon />
          </Link>
        ) : (
          <Button disabled className={classes.button}>
            Giỏ hàng
          </Button>
        )}
      </Box>
      <Box>
        {step2 ? (
          <Link to="/shipping" className={classes.link}>
            <Button className={classes.button}>Địa chỉ & thanh toán</Button>
            <ArrowRightIcon />
          </Link>
        ) : (
          <Button disabled className={classes.button}>
            Địa chỉ & thanh toán
          </Button>
        )}
      </Box>
      <Box>
        {step3 ? (
          <Link to="/payment" className={classes.link}>
            <Button className={classes.button}>Đặt hàng</Button>
            <ArrowRightIcon />
          </Link>
        ) : (
          <Button disabled className={classes.button}>
            Đặt hàng
          </Button>
        )}
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: { justifyContent: 'flex-start' },
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    textTransform: 'none',
    letterSpacing: '0.5px',
  },
}));

export default CheckoutSteps;
