import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Button, Form, Input, Select } from 'antd';
import { UserContext } from 'contexts/UserContext';
import dataCity from 'data.json';
import { saveAddressAndPayment } from 'features/Cart/CartSlice';
import { saveUserAddressAPI } from 'features/Cart/pathAPI';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  title: { margin: '1rem 0' },

  dflex: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div': { maxWidth: '254px' },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      '& div': { maxWidth: '100%' },
    },
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.5rem',
    },
  },
}));

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 24,
    },
  },
};
const ShippingPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const actionSaveAddress = (data) => dispatch(saveUserAddressAPI(data));
  const actionSaveAddressAndPayment = (data) => dispatch(saveAddressAndPayment(data));
  // --Contexts
  const state = useContext(UserContext);
  const [token] = state.token;

  if (!token) {
    history.push('/login?redirect=shipping');
  } // create state
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  // function
  const onChangeCity = (City) => {
    setCity(City);
  };
  const onChangeDistrict = (District) => {
    setDistrict(District);
  };

  const dispatch = useDispatch();

  const submitHandler = (value) => {
    const saveAddress = async (value) => {
      try {
        const { fullName, city, district, commune, incubation, numberPhone, payment } = value;
        const data = {
          address: `${fullName} - ${numberPhone} - ${incubation} - ${commune} - ${district} - ${city}`,
          paymentMethod: payment,
        };
        // save shipping & paymentMethod to redux
        actionSaveAddressAndPayment(data);
        const res = await actionSaveAddress(data);
        if (res) {
          history.push('/placeorder');
        }
      } catch (err) {}
    };
    saveAddress(value);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <CheckoutSteps step1 step2 />
        <Typography variant="h6" className={classes.title}>
          Địa chỉ và phương thức thanh toán
        </Typography>
        <Form {...formItemLayout} form={form} onFinish={submitHandler}>
          <div className={classes.dflex}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              hasFeedback
              className={classes.item}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đúng họ tên của bạn!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="numberPhone"
              label="Số Điện Thoại"
              hasFeedback
              className={classes.item}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đúng số điện thoại !',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            hasFeedback
            className={classes.item}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tỉnh hoặc thành phố bạn ở !',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Tỉnh/Thành phố"
              optionFilterProp="children"
              onChange={onChangeCity}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataCity.map((city, index) => (
                <Option value={city.name} key={index}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="Quận/Huyện"
            hasFeedback
            className={classes.item}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn quận hoặc huyện nơi bạn !',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Quận/Huyện"
              optionFilterProp="children"
              onChange={onChangeDistrict}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataCity.map(
                (itemCity, index) =>
                  itemCity.name === city &&
                  itemCity.huyen.map((huyen) => (
                    <Option value={huyen.name} key={index}>
                      {huyen.name}
                    </Option>
                  ))
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="commune"
            label="Xã/Thị Trấn"
            hasFeedback
            className={classes.item}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn xã bạn ở !',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Xã/Thị Trấn"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataCity.map(
                (itemCity) =>
                  itemCity.name === city &&
                  itemCity.huyen.map(
                    (huyen) =>
                      huyen.name === district &&
                      huyen.xa.sort().map((xa, index) => (
                        <Option value={xa.name} key={index}>
                          {xa.name}
                        </Option>
                      ))
                  )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="incubation"
            label="Ấp/Số Nhà/Tên Đường"
            className={classes.item}
            rules={[
              {
                required: true,
                message: 'Địa chỉ cụ thể !',
              },
            ]}
          >
            <TextArea
              maxLength={150}
              placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="payment"
            label="Thanh toán"
            hasFeedback
            className={classes.item}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn phuong thức thanh toán',
              },
            ]}
          >
            <Select placeholder="Thanh toán khi nhận hàng">
              <Option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Option>
              <Option value="paypal">Paypal</Option>
              <Option value="stripe">Stripe</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Paper>
    </main>
  );
};

export default ShippingPage;
