import {
  faLaptop,
  faMobileAlt,
  faShareSquare,
  faTabletAlt,faCube
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'relative',
    border: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  list: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  listItem: { width: 'auto' },
  itemIcon: { marginRight: '8px' },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function HomeMenu({ i }) {
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
            <List className={classes.list}>
              <ListItem
                component={Link}
                to="/shop?category=6139b459b9a9f76d315ecf58"
                button
                selected={selectedIndex === 0}
                onClick={(value) => handleListItemClick(value)}
                className={classes.listItem}
              >
                <FontAwesomeIcon icon={faMobileAlt} className={classes.itemIcon} />
                <ListItemText primary="Điện thoại" />
              </ListItem>
              <ListItem
                component={Link}
                to="/laptop"
                button
                selected={selectedIndex === 1}
                onClick={(value) => handleListItemClick(value)}
                className={classes.listItem}
              >
                <FontAwesomeIcon icon={faLaptop} className={classes.itemIcon} />
                <ListItemText primary="Laptop" />
              </ListItem>
              <ListItem
                component={Link}
                to="/shop?category=6142c006d0c33220905c8bd3"
                button
                selected={selectedIndex === 2}
                onClick={(value) => handleListItemClick(value)}
                className={classes.listItem}
              >
                <FontAwesomeIcon icon={faTabletAlt} className={classes.itemIcon} />
                <ListItemText primary="Tablet" />
              </ListItem>
              <ListItem
                component={Link}
                to="/shop?category=61376ecfa8d3c977efbcfa07"
                button
                selected={selectedIndex === 3}
                onClick={(value) => handleListItemClick(value)}
                className={classes.listItem}
              >
                <FontAwesomeIcon icon={faCube} className={classes.itemIcon} />
                <ListItemText primary="Đồng hồ thông minh" />
              </ListItem>
              <ListItem
                component={Link}
                to="/watch"
                button
                selected={selectedIndex === 4}
                onClick={(value) => handleListItemClick(value)}
                className={classes.listItem}
              >
                <FontAwesomeIcon icon={faShareSquare} className={classes.itemIcon} />
                <ListItemText primary="Đồng hồ thời trang" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
