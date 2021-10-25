import { createSlice } from '@reduxjs/toolkit';
import { getListProductsMan } from './pathApi';

const ListProductManSlice = createSlice({
  name: 'productsMan',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getListProductsMan.pending]: (state) => {
      state.loading = true;
    },
    [getListProductsMan.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.length = data.length;
      state.data = data;
    },
    [getListProductsMan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
const { reducer } = ListProductManSlice;
export default reducer;
