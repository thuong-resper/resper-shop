import { Box, Button, IconButton, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Aos from 'aos';
import clsx from 'clsx';
import { UserContext } from 'contexts/UserContext';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useRouter } from '../../hooks/useRouter';
import SimpleBackdrop from '../Backdrop/Backdrop';
import { useStyles } from './styles';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    minWidth: 200,
  },
})((props) => <Menu {...props} />);

const dashboardUserItems = [
  {
    id: 1,
    title: 'Profile',
    link: '/profile',
  },
  {
    id: 2,
    title: 'Orders',
    link: '/orders',
  },
  {
    id: 3,
    title: 'Favorites',
    link: '/favorites',
  },
  {
    id: 4,
    title: 'Account Settings',
    link: '/settings',
  },
];

const MenuUser = ({
  socket,
  user,
  setUser,
  idUser,
  setIdUser,
  token,
  setToken,
  loadingGetProfile,
}) => {
  const state = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  console.log(user);

  const dataCart = useSelector((state) => state.cart.dataCart);

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
      initClassName: 'aos-init',
    });
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const LoginOutlinedUser = () => {
    setLoading(true);
    setTimeout(() => {
      setToken(null);
      setUser(null);
      setIdUser(null);
      localStorage.removeItem('token');
      setLoading(false);
      enqueueSnackbar('Logout success', { variant: 'success' });
    }, 1500);
  };

  // drawer desktop and tablet
  const [drawer, setDrawer] = useState({
    right: false,
  });

  const [userDrawer, setUserDrawer] = useState({
    right: false,
  });

  const toggleUserDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setUserDrawer({ ...userDrawer, [anchor]: open });
  };

  function wrapFunc(anchor, open) {
    setDrawer({ ...drawer, [anchor]: open });
    setUserDrawer({ ...userDrawer, [anchor]: open });
  }

  // log out mobile
  function wrapFunc1(anchor, open) {
    setDrawer({ ...drawer, [anchor]: open });
    setUserDrawer({ ...userDrawer, [anchor]: open });
    LoginOutlinedUser();
  }

  //dashboard user Mobile
  const listUser = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root_nested}>
        <ListItem button onClick={toggleUserDrawer('right', false)}>
          <ListItemIcon>
            <ChevronLeftIcon />
          </ListItemIcon>
          <ListItemText primary={'All'} />
        </ListItem>
        <Box mt={3} mb={3} pl={2} fontSize={20} color="text.primary">
          {user ? user.name : null}
        </Box>
        {dashboardUserItems.map((item) => (
          <ListItem key={item.id} button dense={true} onClick={() => wrapFunc('right', false)}>
            <Link to={item.link}>
              <ListItemText primary={item.title} />
            </Link>
          </ListItem>
        ))}
        <ListItem button dense={true} onClick={() => wrapFunc1('right', false)}>
          <ListItemText primary={'Log out'} />
        </ListItem>
      </List>
    </div>
  );

  //render dashboard mobile
  const renderMobileDrawer = (
    <>
      <Drawer
        anchor={'right'}
        open={userDrawer['right']}
        onClose={toggleUserDrawer('right', false)}
      >
        {user ? listUser('right') : null}
      </Drawer>
    </>
  );

  return (
    <div className={classes.wrap}>
      {loadingGetProfile && <SimpleBackdrop />}

      {/* no have token show login button */}
      {!token && !loadingGetProfile && (
        <Button
          edge="end"
          className={classes.button}
          aria-label="account of current user"
          color="inherit"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={() => router.push('/login')}
          startIcon={<AccountCircle />}
        >
          Sign in
        </Button>
      )}
      {renderMobileDrawer}
    </div>
  );
};

export default withRouter(MenuUser);
