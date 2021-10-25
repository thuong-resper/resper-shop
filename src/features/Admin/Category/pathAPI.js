import { createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from 'apis/adminAPI';

export const createCategory = createAsyncThunk('createCategory', async (data, token) => {
  const response = await adminAPI.createCategory(data, token);
  return response;
});

export const getCategories = createAsyncThunk('getCategories', async () => {
  const response = await adminAPI.getCategories();
  return response;
});

export const getCategory = createAsyncThunk('getCategory', async () => {
  const response = await adminAPI.getCategory();
  return response;
});

export const getCategorySubs = createAsyncThunk('getCategorySubs', async (_id) => {
  const response = await adminAPI.getCategorySubs(_id);
  return response;
});

export const updateCategory = createAsyncThunk('updateCategory', async (data, token) => {
  const response = await adminAPI.updateCategory(data, token);
  return response;
});

export const deleteCategory = createAsyncThunk('deleteCategory', async (slug, token) => {
  const response = await adminAPI.deleteCategory(slug, token);
  return response;
});

export const getSubs = createAsyncThunk('getSubs', async () => {
  const response = await adminAPI.getSubs();
  return response;
});
