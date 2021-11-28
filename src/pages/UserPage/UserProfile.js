import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import UserSidebar from 'components/Navigation/MainMenu/UserSidebar';
import { UserContext } from 'contexts/UserContext';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const UserProfile = ({ location }) => {
  const state = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [token] = state.token;
  const [user] = state.user;

  if (!token) {
    history.push('/login?redirect=user/profile');
  }

  return (
    <>
      <Helmet>
        <title>My Account</title>
      </Helmet>
      <div className={classes.root}>
        <UserSidebar />
        <main className={classes.content}>
          {/* step 5 */}
          <Box m="0.5rem">
            <Box mb="1rem">
              <Typography variant="h5">Thông tin tài khoản</Typography>
            </Box>
            <Paper>
              <Box m="1rem" display="flex" flexDirection="column">
                <Box m="1rem 0" display="flex" alignItems="center">
                  <Typography variant="subtitle1" style={{ width: '100px' }}>
                    Họ tên
                  </Typography>
                  <TextField
                    multiline
                    variant="outlined"
                    size="small"
                    defaultValue={user?.name}
                    style={{ width: '400px' }}
                  />
                </Box>

                <Box mb="1rem" display="flex" alignItems="center">
                  <Typography variant="subtitle1" style={{ width: '100px' }}>
                    Email
                  </Typography>
                  <TextField
                    multiline
                    variant="outlined"
                    size="small"
                    defaultValue={user?.email}
                    style={{ width: '400px' }}
                  />
                </Box>

                <Box mb="1rem" display="flex" alignItems="center">
                  <Typography variant="subtitle1" style={{ width: '100px' }}>
                    Thanh toán
                  </Typography>
                  <TextField
                    multiline
                    variant="outlined"
                    size="small"
                    defaultValue={user?.paymentMethod}
                    style={{ width: '400px' }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </main>
      </div>
    </>
  );
};

export default UserProfile;
