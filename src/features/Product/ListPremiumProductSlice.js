import { createSlice } from '@reduxjs/toolkit';
import { getPremiumProducts } from './pathApi';

const ListPremiumProductSlice = createSlice({
  name: 'premiumProducts',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getPremiumProducts.pending]: (state) => {
      state.loading = true;
    },
    [getPremiumProducts.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.length = data.length;
      state.data = data;
    },
    [getPremiumProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
const { reducer } = ListPremiumProductSlice;
export default reducer;
