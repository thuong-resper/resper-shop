import { createAsyncThunk } from '@reduxjs/toolkit';
import cartAPI from 'apis/cartAPI';

export const userCartAPI = createAsyncThunk('userCartAPI', async (cart, token) => {
  const response = await cartAPI.userCartAPI(cart, token);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response);
    }, 1300);
  });
});

export const getUserCartAPI = createAsyncThunk('getUserCartAPI', async (token) => {
  const response = await cartAPI.getUserCartAPI(token);
  return response;
});

export const deleteCartAPI = createAsyncThunk('deleteCartAPI', async (token) => {
  const response = await cartAPI.deleteCartAPI(token);
  return response;
});

export const saveUserAddressAPI = createAsyncThunk('saveUserAddressAPI', async (data, token) => {
  const response = await cartAPI.saveUserAddressAPI(data, token);
  return response;
});

export const applyCouponAPI = createAsyncThunk('applyCouponAPI', async (coupon, token) => {
  const response = await cartAPI.applyCouponAPI(coupon, token);
  return response;
});
