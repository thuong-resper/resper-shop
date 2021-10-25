import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, grey } from '@material-ui/core/colors';

const RoundedButton = withStyles((theme) => ({
  root: {
    borderRadius: 16,
    margin: 10,
    minWidth: 100,
    color: grey[50],
    backgroundColor: grey[900],
    '&:hover': {
      backgroundColor: grey[900],
    },
  },
}))(Button);

const SignInBtn = withStyles((theme) => ({
  root: {
    borderRadius: 16,
    borderColor: grey[900],
    margin: 10,
    minWidth: 100,
    color: grey[900],
    backgroundColor: grey[50],
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export const JoinUsMbBtn = ({ content, onClick }) => {
  return (
    <RoundedButton variant="contained" onClick={onClick}>
      {content}
    </RoundedButton>
  );
};

export const SignInMbBtn = ({ content, onClick }) => {
  return (
    <SignInBtn variant="contained" onClick={onClick}>
      {content}
    </SignInBtn>
  );
};

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      <RoundedButton variant="contained" color="primary" className={classes.margin}>
        Custom CSS
      </RoundedButton>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          Theme Provider
        </Button>
      </ThemeProvider>
    </div>
  );
}
