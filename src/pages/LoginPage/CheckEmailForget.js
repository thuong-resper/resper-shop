import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { useData } from 'contexts/DataContext';
import { UserContext } from 'contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStyles } from './styles';

const tokenLocal = localStorage.getItem('token');

export default function CheckEmailForget() {
  const classes = useStyles();
  const history = useHistory();
  const state = useContext(UserContext);
  const { data } = useData();

  const [email, setEmail] = useState(null);

  // create
  const [token] = state.token;
  const [patchCart] = state.patchCart;

  useEffect(() => {
    async function forgotPassword() {
      if (token && patchCart) {
        history.push(patchCart);
      } else if (tokenLocal || token) {
        history.push('/');
      }
    }
    forgotPassword();
  }, [token, history, patchCart]);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      history.push('/login');
    } else setEmail(data.value);
    // eslint-disable-next-line
  }, [data]);
  console.log(email);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.pageCenter}
      >
        <div className={classes.paper}>
          <Box m="1rem auto">
            <ContactMailIcon color="primary" className={classes.iconEmail} />
          </Box>
          <Typography variant="h5" align="center">
            <b>Check your mail</b>
          </Typography>
          <Box m="2rem auto">
            <Typography variant="body1" align="center">
              We have sent password recovery instructions to your email <b>{email}</b>
            </Typography>
          </Box>
          <Box m="1rem auto">
            <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">
              <Button variant="contained" color="primary">
                Open mail app
              </Button>
            </a>
          </Box>
          <Box m="3rem auto 1rem" maxWidth="20rem" display="flex">
            <Typography variant="body2" align="center">
              Did not receive the email? Check your spam filter, or{' '}
              <Link to="/recover" style={{ color: '#f50057' }}>
                <b>try another email address</b>
              </Link>
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
