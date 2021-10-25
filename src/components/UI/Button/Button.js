import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SgBtn = withStyles((theme) => ({
  root: {
    textTransform: 'none',
  },
}))(Button);

export const SignupBtn = ({ loading, children, ...props }) => {
  const styles = useStyles();

  return (
    <SgBtn
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={styles.root}
      {...props}
    >
      {children}
    </SgBtn>
  );
};

const LgBtn = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 20,
    padding: '8px 12px',
    margin: '10px 0',
  },
}))(Button);

export const LogInBtn = ({ loading, children, ...props }) => {
  return (
    <LgBtn type="submit" variant="contained" color="primary" fullWidth {...props}>
      {children}
    </LgBtn>
  );
};
