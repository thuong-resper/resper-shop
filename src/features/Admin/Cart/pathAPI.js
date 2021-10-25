import { createAsyncThunk } from '@reduxjs/toolkit';
import CartSlice from 'api/adminAPI';

export const getCart = createAsyncThunk('getCart', async (params) => {
  const response = await CartSlice.getCart(params);
  return response;
});

export const checkOutCart = createAsyncThunk('putCart', async (id_cart, token) => {
  const response = await CartSlice.checkOutCart(id_cart, token);
  return response;
});

export const deleteCart = createAsyncThunk('delete', async (id_cart, token) => {
  const response = await CartSlice.deleteCart(id_cart, token);
  return response;
});

export const messagesCart = createAsyncThunk('messages', async (data, token) => {
  const response = await CartSlice.messagesCart(data, token);
  return response;
});
// Products
