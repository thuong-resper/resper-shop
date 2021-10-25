// import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import {
//   default as AccountCircle,
//   default as AccountCircleIcon
// } from '@material-ui/icons/AccountCircle';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import SettingsIcon from '@material-ui/icons/Settings';
// import ShopIcon from '@material-ui/icons/Shop';
// import { useRouter } from 'hooks/useRouter';
// import React, { useState } from 'react';

// export const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//     color: '#65676b',
//   },
// }));

// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//     minWidth: 200,
//   },
// })((props) => <Menu {...props} />);

// export default function InfoUser({ user, token, setToken, setUser, socket, idUser, setIdUser }) {
//   const router = useRouter();
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     if (anchorEl !== event.currentTarget) {
//       setAnchorEl(event.currentTarget);
//     }
//   };

//   const handleClose = (to) => {
//     router.push(to || null);
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Button
//         edge="end"
//         className={classes.button}
//         aria-label="account of current user"
//         color="inherit"
//         aria-owns={anchorEl ? 'simple-menu' : undefined}
//         aria-haspopup="true"
//         onClick={user ? handleClick : () => router.push('/login')}
//         onMouseOver={user ? handleClick : null}
//         startIcon={user ? user.avatar : <AccountCircle />}
//       >
//         {user ? user.name : 'Sign in'}
//       </Button>

//       <StyledMenu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         MenuListProps={{ onMouseLeave: handleClose }}
//       >
//         <MenuItem dense={true}>
//           <ListItemText primary="Account" />
//         </MenuItem>
//         <MenuItem dense={true} onClick={() => handleClose('/profile')}>
//           <ListItemIcon>
//             <AccountCircleIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Profile" />
//         </MenuItem>
//         <MenuItem dense={true} onClick={() => handleClose('/order')}>
//           <ListItemIcon>
//             <ShopIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Orders" />
//         </MenuItem>
//         <MenuItem dense={true} onClick={() => handleClose('/user/settings')}>
//           <ListItemIcon>
//             <SettingsIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Account Settings" />
//         </MenuItem>
//         <MenuItem dense={true} onClick={handleClose} color="red">
//           <ListItemIcon>
//             <ExitToAppIcon fontSize="small" color="secondary" />
//           </ListItemIcon>
//           <ListItemText primary="Log out" style={{ color: '#f50057' }} />
//         </MenuItem>
//       </StyledMenu>
//     </>
//   );
// }

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function InfoUser() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer('right', true)}>{'right'}</Button>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
