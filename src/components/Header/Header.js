import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Aos from 'aos';
import BadgeCart from 'components/Cart/BadgeCart/BadgeCart';
import Search from 'components/Search/Search';
import { UserContext } from 'contexts/UserContext';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useRouter } from '../../hooks/useRouter';
import MenuListUser from './Menu/Menu';
import { useStyles } from './styles';

const Header = (props) => {
  const state = useContext(UserContext);
  const { socket } = state;
  const [user, setUser] = state.user;
  const [idUser, setIdUser] = state.idUser;
  const [token, setToken] = state.token;
  const [, setPatchCart] = state.patchCart;

  const dataCart = useSelector((state) => state.cart.dataCart);
  const loadingGetProfile = useSelector((state) => state.user.loadingGetProfile);

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
      initClassName: 'aos-init',
    });
  }, []);

  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.grow}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography
                onClick={(e) => router.push('/')}
                className={classes.title}
                variant="h6"
                noWrap
              >
                Resper Shop
              </Typography>
              <Search />
              <div className={classes.grow} />
              <BadgeCart setPatchCart={setPatchCart} dataCart={dataCart} />
              <MenuListUser
                socket={socket}
                user={user}
                setUser={setUser}
                idUser={idUser}
                setIdUser={setIdUser}
                token={token}
                setToken={setToken}
                loadingGetProfile={loadingGetProfile}
              />
            </Toolbar>
          </AppBar>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
