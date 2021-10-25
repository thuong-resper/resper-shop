import { createAsyncThunk } from '@reduxjs/toolkit';
import searchAPI from 'apis/searchAPI';

export const getSearch = createAsyncThunk('getSearch', async (params) => {
  const response = await searchAPI.getSearch(params);
  return response;
});
