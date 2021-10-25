import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LabelIcon from '@material-ui/icons/Label';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ReceiptIcon from '@material-ui/icons/Receipt';
import React from 'react';
import { Helmet } from 'react-helmet-async';
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

export default function AdminDrawer({ i }) {
  const history = useHistory();
  const classes = useStyles();
  const [selectedIndex] = React.useState(i);
  const handleListItemClick = (link, index) => {
    history.push(link);
  };

  return (
    <>
      <Helmet>
        <title>Quản trị viên</title>
      </Helmet>
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
                to="/admin/dashboard"
                button
                selected={selectedIndex === 0}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Thống kê" />
              </ListItem>
              <ListItem
                component={Link}
                to="/admin/product"
                button
                selected={selectedIndex === 1}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="Sản phẩm" />
              </ListItem>
              <ListItem
                component={Link}
                to="/admin/category"
                button
                selected={selectedIndex === 2}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Danh mục" />
              </ListItem>
              <ListItem
                component={Link}
                to="/admin/sub"
                button
                selected={selectedIndex === 3}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <BrandingWatermarkIcon />
                </ListItemIcon>
                <ListItemText primary="Thương hiệu" />
              </ListItem>
              <ListItem
                component={Link}
                to="/admin/coupon"
                button
                selected={selectedIndex === 4}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <LocalAtmIcon />
                </ListItemIcon>
                <ListItemText primary="Khuyến mãi" />
              </ListItem>
              <ListItem
                component={Link}
                to="/admin/order"
                button
                selected={selectedIndex === 5}
                onClick={(value) => handleListItemClick(value)}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Đơn hàng" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
