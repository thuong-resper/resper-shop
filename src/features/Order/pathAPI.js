import { createAsyncThunk } from '@reduxjs/toolkit';
import orderAPI from 'apis/orderAPI';

export const createOrderAPI = createAsyncThunk('createOrderAPI', async (order, token) => {
  const response = await orderAPI.createOrderAPI(order, token);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response);
    }, 1300);
  });
});

export const getOrderByIdAPI = createAsyncThunk('getOrderByIdAPI', async (_id, token) => {
  const response = await orderAPI.getOrderByIdAPI(_id, token);
  return response;
});

export const getOrderUserAPI = createAsyncThunk('getOrderUserAPI', async (params) => {
  const response = await orderAPI.getUserOrdersAPI(params);
  return response;
});

export const putOrderAddressesAPI = createAsyncThunk('putOrderAddress', async (data, token) => {
  const response = await orderAPI.putToOrderAddressesAPI(data, token);
  return response;
});

export const putPayOrderAPI = createAsyncThunk('payOrder', async (data, token) => {
  const response = await orderAPI.putToPaymentOrderAPI(data, token);
  return response;
});

export const deleteOrderAPI = createAsyncThunk('deleteOrder', async (id_card, token) => {
  const response = await orderAPI.deleteToOrderAPI(id_card, token);
  return response;
});

//admin
export const getAllOrders = createAsyncThunk('getAllOrders', async (params) => {
  const response = await orderAPI.getAllOrders(params);
  return response;
});

export const updateOrderStatus = createAsyncThunk('updateOrderStatus', async (data) => {
  const response = await orderAPI.updateOrderStatus(data);
  return response;
});
