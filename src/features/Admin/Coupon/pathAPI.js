import { createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from 'apis/adminAPI';

export const createCoupon = createAsyncThunk('createCoupon', async (coupon, token) => {
  const response = await adminAPI.createCoupon(coupon, token);
  return response;
});

export const getCoupons = createAsyncThunk('getCoupons', async (token) => {
  const response = await adminAPI.getCoupons(token);
  return response;
});

export const deleteCoupon = createAsyncThunk('deleteCoupon', async (couponId, token) => {
  const response = await adminAPI.deleteCoupon(couponId, token);
  return response;
});
