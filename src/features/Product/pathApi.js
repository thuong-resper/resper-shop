import { createAsyncThunk } from '@reduxjs/toolkit';
import productAPI from 'apis/productsApi';

export const getListProducts = createAsyncThunk('product/getListProducts', async (params) => {
  const response = await productAPI.getListProducts(params);
  return response;
});

export const getPremiumProducts = createAsyncThunk('product/getPremiumProducts', async (params) => {
  const response = await productAPI.getPremiumProducts(params);
  return response;
});

export const getListProductsMan = createAsyncThunk('product/getListProductsMan', async (params) => {
  const response = await productAPI.getListProducts(params);
  return response;
});

export const getListProductWoman = createAsyncThunk(
  'product/getListProductWoman',
  async (params) => {
    const response = await productAPI.getListProducts(params);
    return response;
  }
);

export const getProductId = createAsyncThunk('product/getProductId', async (id) => {
  const response = await productAPI.getProductId(id);
  return response;
});

export const getRelated = createAsyncThunk('product/getRelated', async (params) => {
  const response = await productAPI.getRelated(params);
  return response;
});

export const getProductTrademarkType = createAsyncThunk('trademarkType', async (params) => {
  const response = await productAPI.getProductTrademarkType(params);
  return response;
});
