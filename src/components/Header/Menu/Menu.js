import { Box, Button, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { useRouter } from 'hooks/useRouter';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStyles } from './styles';

const dashboardItems = [
  {
    id: 1,
    title: 'Premium',
    subtitles: [
      { name: 'Orient', link: '/products?brand=orient' },
      { name: 'Citizen', link: '/products?brand=citizen' },
      { name: 'Daumier', link: '/products?brand=daumier' },
      { name: 'Mathey Tissot', link: '/products?brand=mathey-tissot' },
      { name: 'Swiss Military', link: '/products?brand=swiss-military' },
      { name: 'Bulova', link: '/products?brand=bulova' },
    ],
  },
  {
    id: 2,
    title: 'Men',
    subtitles: [
      { name: 'Fashion', link: '/products?category=fashion&sex=men' },
      { name: 'Smart', link: '/products?category=smart&sex=men' },
    ],
  },
  {
    id: 3,
    title: 'Women',
    subtitles: [
      { name: 'Fashion', link: '/products?category=fashion&sex=women' },
      { name: 'Smart', link: '/products?category=smart&sex=women' },
    ],
  },
  {
    id: 4,
    title: 'Couple',
    subtitles: [
      { name: 'Leather strap', link: '/products?category=couple&st=leather' },
      { name: 'Metal strap', link: '/products?category=couple&st=metal' },
      { name: 'Kim', link: '/products?category=couple&st=kim' },
    ],
  },
  {
    id: 5,
    title: 'Kids',
    subtitles: [
      { name: 'Rubber strap', link: '/products?category=kids&st=rubber' },
      { name: 'Plastic strap', link: '/products?category=kids&st=plastic' },
      { name: 'Electronic', link: '/products?category=kids&st=electronic' },
    ],
  },
  {
    id: 6,
    title: 'Watch Straps',
    subtitles: [{ name: 'All straps', link: '/products?category=straps' }],
  },
];

const dashboardUserItems = [
  {
    id: 1,
    title: 'Tài khoản',
    link: '/user/profile',
  },
  {
    id: 2,
    title: 'Đơn mua',
    link: '/user/orders',
  },
  {
    id: 3,
    title: 'Yêu thích',
    link: '/user/favorites',
  },
  {
    id: 4,
    title: 'Cài đặt',
    link: '/user/settings',
  },
];

const MenuListUser = ({
  socket,
  user,
  setUser,
  idUser,
  setIdUser,
  token,
  setToken,
  loadingGetProfile,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
      initClassName: 'aos-init',
    });
  }, []);

  const router = useRouter();

  const classes = useStyles();
  const [anchorEl] = useState(null);

  // dashboard mobile
  const [open, setOpen] = useState({}); //nested
  const [selectedIndex, setSelectedIndex] = useState({});

  const handleClickNested = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setSelectedIndex((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // logout
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer, [anchor]: open });
    setOpen({});
    setSelectedIndex({});
  };

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

  //dashboard Mobile
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root_nested}>
        {user ? (
          <ListItem button onClick={toggleUserDrawer('right', true)}>
            <ListItemText primary={user.name} />
            <ChevronRightIcon />
          </ListItem>
        ) : null}

        {dashboardItems.map((item) => (
          <div key={item.id}>
            <ListItem
              button
              onClick={() => handleClickNested(item.id)}
              selected={selectedIndex[item.id]}
            >
              <ListItemText primary={item.title} />
              {open[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
              {item.subtitles.map((subtitle, index) => (
                <List key={index} component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <Link to={subtitle.link} onClick={toggleDrawer('right', false)}>
                      {subtitle.name}
                    </Link>
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </div>
        ))}
        <ListItem button className={classes.top_16}>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <Link to="/products/trending" onClick={toggleDrawer('right', false)}>
            <ListItemText primary="Trending" />
          </Link>
        </ListItem>
        {user ? (
          <ListItem button className={classes.top_16}>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <Link to="/favorites" onClick={toggleDrawer('right', false)}>
              <ListItemText primary="Favorites" />
            </Link>
          </ListItem>
        ) : (
          <Box m={4} fontSize={20} color="text.secondary">
            Become a member for the best products, sale, and stories in life.{' '}
            <Link to="/membership" onClick={toggleDrawer('right', false)} style={{ color: '#333' }}>
              Learn More
            </Link>
            <Box mt={4} display="flex" justifyContent="center">
              <Link to="/membership" onClick={toggleDrawer('right', false)} className={classes.btn}>
                Join Us
              </Link>
              <Link
                to="/login"
                onClick={toggleDrawer('right', false)}
                className={clsx(classes.btn, classes.btn_lg)}
              >
                Đăng nhập
              </Link>
            </Box>
          </Box>
        )}

        <ListItem button className={user ? classes.top_16 : null}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <Link to="/cart" onClick={toggleDrawer('right', false)}>
            <ListItemText primary="Cart" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <Link to="/orders" onClick={toggleDrawer('right', false)}>
            <ListItemText primary="Orders" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <Link to="/help" onClick={toggleDrawer('right', false)}>
            <ListItemText primary="Help" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

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
        {user?.role === 1 && (
          <ListItem button dense={true} onClick={() => wrapFunc('right', false)}>
            <Link to={'/admin/dashboard'}>
              <ListItemText primary={'Quản trị viên'} />
            </Link>
          </ListItem>
        )}
        <ListItem button dense={true} onClick={() => wrapFunc1('right', false)}>
          <ListItemText primary={'Đăng xuất'} />
        </ListItem>
      </List>
    </div>
  );

  //render dashboard mobile
  const renderMobileDrawer = (
    <>
      <Drawer anchor={'right'} open={drawer['right']} onClose={toggleDrawer('right', false)}>
        {list('right')}
      </Drawer>
      <Drawer
        anchor={'right'}
        open={userDrawer['right']}
        onClose={toggleUserDrawer('right', false)}
      >
        {token ? listUser('right') : null}
      </Drawer>
    </>
  );

  const userBtnMobile = (
    <IconButton onClick={toggleDrawer('right', true)}>
      <MenuIcon />
    </IconButton>
  );

  // menu list user
  const [openGrow, setOpenGrow] = React.useState(false);
  const anchorRefGrow = React.useRef(null);

  const handleToggleGrow = () => {
    setOpenGrow((prevOpen) => !prevOpen);
  };

  const handleClose = (event, to) => {
    if (anchorRefGrow.current && anchorRefGrow.current.contains(event.target)) {
      return;
    }
    if (to) {
      router.push(to);
    }
    setOpenGrow(false);
  };

  function wrapFunc2(event, to) {
    if (anchorRefGrow.current && anchorRefGrow.current.contains(event.target)) {
      return;
    }
    if (to) {
      router.push(to);
    }
    setOpenGrow(false);
    LoginOutlinedUser();
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenGrow(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openGrow);
  React.useEffect(() => {
    if (prevOpen.current === true && openGrow === false) {
      anchorRefGrow.current.focus();
    }

    prevOpen.current = openGrow;
  }, [openGrow]);

  return (
    <>
      {/* loading get profile */}
      {loadingGetProfile && <SimpleBackdrop />}
      {/* no token show sign in button */}
      {!token && !loadingGetProfile && (
        <>
          {width > 600 ? (
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
              Đăng nhập
            </Button>
          ) : null}
        </>
      )}

      {/* menu list user desktop */}
      {!loadingGetProfile && (
        <div className="main-user">
          <div className="profile-login">
            {/* show menu user when have token */}
            {token && user && (
              <>
                {width > 600 ? (
                  <Button
                    edge="end"
                    className={classes.button}
                    ref={anchorRefGrow}
                    aria-controls={openGrow ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleGrow}
                    startIcon={
                      <img
                        alt="avatar"
                        style={{ maxWidth: '1.3rem', borderRadius: '50%' }}
                        src={user.avatar}
                      ></img>
                    }
                  >
                    {user.name}
                  </Button>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
      <Popper
        open={openGrow}
        anchorEl={anchorRefGrow.current}
        role={undefined}
        transition
        disablePortal
        style={{
          zIndex: 1,
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              zIndex: 1,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={(e) => handleClose(e, '')}>
                <MenuList
                  autoFocusItem={openGrow}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {user?.role === 1 && (
                    <MenuItem dense onClick={(e) => handleClose(e, '/admin/dashboard')}>
                      <ListItemIcon>
                        <SupervisorAccountIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Quản trị viên" />
                    </MenuItem>
                  )}
                  <MenuItem dense onClick={(e) => handleClose(e, '/user/profile')}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Tài khoản" />
                  </MenuItem>
                  <MenuItem dense onClick={(e) => handleClose(e, '/user/orders')}>
                    <ListItemIcon>
                      <ShopIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Đơn mua" />
                  </MenuItem>
                  <MenuItem dense onClick={(e) => handleClose(e, '/user/settings')}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cài đặt" />
                  </MenuItem>
                  <MenuItem dense onClick={(e) => wrapFunc2(e, '/')}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Đăng xuất" style={{ color: '#f50057' }} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* loading when logout out */}
      {loading && <SimpleBackdrop />}
      {width < 600 ? userBtnMobile : null}
      {renderMobileDrawer}
    </>
  );
};

export default withRouter(MenuListUser);
