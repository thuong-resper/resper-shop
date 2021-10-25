import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function UserDrawer({ i }) {
  const history = useHistory();
  const classes = useStyles();
  const [selectedIndex] = React.useState(i);
  const handleListItemClick = (link, index) => {
    history.push(link);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              <ListItem
                component={Link}
                to="/user/profile"
                button
                selected={selectedIndex === 0}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <PermContactCalendarIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin tài khoản" />
              </ListItem>
              <ListItem
                component={Link}
                to="/user/orders"
                button
                selected={selectedIndex === 1}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Đơn hàng của tôi" />
              </ListItem>
              <ListItem
                component={Link}
                to="/user/favorite"
                button
                selected={selectedIndex === 2}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Yêu thích" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
