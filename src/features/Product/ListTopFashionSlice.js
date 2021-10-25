import { createSlice } from '@reduxjs/toolkit';
import { getListProducts } from './pathApi';

const ListTopFashionSlice = createSlice({
  name: 'fashionWatches',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getListProducts.pending]: (state) => {
      state.loading = true;
    },
    [getListProducts.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.length = data.length;
      state.data = data;
    },
    [getListProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
const { reducer } = ListTopFashionSlice;
export default reducer;
