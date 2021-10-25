import { createSlice } from '@reduxjs/toolkit';
import { getListProductWoman } from './pathApi';

const ListProductWomanSlice = createSlice({
  name: 'productsWoman',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getListProductWoman.pending]: (state) => {
      state.loading = true;
    },
    [getListProductWoman.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.length = data.length;
      state.data = data;
    },
    [getListProductWoman.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
const { reducer } = ListProductWomanSlice;
export default reducer;
