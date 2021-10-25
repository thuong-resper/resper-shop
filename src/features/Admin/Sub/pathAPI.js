import { createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from 'apis/adminAPI';

export const createSub = createAsyncThunk('createSub', async (data, token) => {
  const response = await adminAPI.createSub(data, token);
  return response;
});

export const getSubs = createAsyncThunk('getSubs', async () => {
  const response = await adminAPI.getSubs();
  return response;
});

export const getSub = createAsyncThunk('getSub', async (slug) => {
  const response = await adminAPI.getSub(slug);
  return response;
});

export const updateSub = createAsyncThunk('updateSub', async (data, token) => {
  const response = await adminAPI.updateSub(data, token);
  return response;
});

export const deleteSub = createAsyncThunk('deleteSub', async (slug, token) => {
  const response = await adminAPI.deleteSub(slug, token);
  return response;
});
