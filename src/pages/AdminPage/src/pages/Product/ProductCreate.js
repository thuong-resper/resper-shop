import {
  AndroidOutlined,
  AppleOutlined,
  CodeSandboxOutlined,
  LaptopOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/core';
import { Tabs } from 'antd';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import AdminDrawer from '../../../../../components/Drawer/AdminDrawer';
import FormProductCreateLaptop from './ProductCreate/FormProductCreateLaptop';
import FormProductCreatePhone from './ProductCreate/FormProductCreatePhone';
import FormProductCreateSmWatch from './ProductCreate/FormProductCreateSmWatch';
import FormProductCreateTablet from './ProductCreate/FormProductCreateTablet';
import FormProductCreateWatch from './ProductCreate/FormProductCreateWatch';
const { TabPane } = Tabs;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ProductCreate = () => {
  const classes = useStyles();

  //store
  const loading = useSelector((state) => state.category.loading);

  return (
    <>
      <Helmet>
        <title>Create A Product</title>
      </Helmet>
      <div className={classes.root}>
        {loading && <SimpleBackdrop />}
        <AdminDrawer i={1} />
        <main className={classes.content}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <AppleOutlined />
                  Điện thoại
                </span>
              }
              key="1"
            >
              <FormProductCreatePhone />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <LaptopOutlined />
                  Laptop
                </span>
              }
              key="2"
            >
              <FormProductCreateLaptop />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TabletOutlined />
                  Tablet
                </span>
              }
              key="3"
            >
              <FormProductCreateTablet />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Đồng hồ thông minh
                </span>
              }
              key="4"
            >
              <FormProductCreateSmWatch />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CodeSandboxOutlined />
                  Đồng hồ thời trang
                </span>
              }
              key="5"
            >
              <FormProductCreateWatch />
            </TabPane>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default ProductCreate;
