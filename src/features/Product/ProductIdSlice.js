import { createSlice } from '@reduxjs/toolkit';
import { getProductId } from './pathApi';

const ProductIdSlice = createSlice({
  name: 'productId',
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getProductId.pending]: (state) => {
      state.loading = true;
    },
    [getProductId.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    [getProductId.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
const { reducer } = ProductIdSlice;
export default reducer;
