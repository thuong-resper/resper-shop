import { createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from 'apis/adminAPI';

export const createProduct = createAsyncThunk('createProduct', async (data, token) => {
  const response = await adminAPI.createProduct(data, token);
  return response;
});

export const removeImage = createAsyncThunk('removeImage', async (data, token) => {
  const response = await adminAPI.removeImage(data, token);
  return response;
});

export const updateProduct = createAsyncThunk('updateProduct', async (data, token) => {
  const response = await adminAPI.updateProduct(data, token);
  return response;
});

export const deleteProduct = createAsyncThunk('deleteProduct', async (id, token) => {
  const response = await adminAPI.deleteProduct(id, token);
  return response;
});

export const getProducts = createAsyncThunk('getProducts', async (id) => {
  const response = await adminAPI.getProducts(id);
  return response;
});

export const readProduct = createAsyncThunk('readProduct', async (params) => {
  const response = await adminAPI.readProduct(params);
  return response;
});

export const getCommentProduct = createAsyncThunk('commentProduct', async (params, token) => {
  const response = await adminAPI.CommentProduct(params, token);
  return response;
});
