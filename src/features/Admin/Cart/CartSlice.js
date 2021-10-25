import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getCart, checkOutCart, deleteCart, messagesCart } from './pathAPI';
const CartSlice = createSlice({
  name: 'cartAdmin',
  initialState: {
    loading: false,
    LoadingCheckOutCart: false,
    loadingDeleteCartAPI: false,
    data: [],
    length: 0,
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.data = action.payload.cart;
      state.length = action.payload.length;
      state.loading = false;
    },
    [getCart.rejected]: (state) => {
      state.loading = false;
    },
    // checkOutCart
    [checkOutCart.pending]: (state) => {
      state.LoadingCheckOutCart = true;
    },
    [checkOutCart.fulfilled]: (state, action) => {
      const { data } = state;
      const { cart, user } = action.payload.cart;
      const index = data.findIndex((product) => product.cart._id === cart._id);
      if (index !== -1) {
        data[index].cart = cart;
        data[index].user = user;
      }
      console.log({ index });
      state.LoadingCheckOutCart = false;
    },
    [checkOutCart.rejected]: (state) => {
      state.LoadingCheckOutCart = false;
    },
    // delete Cart
    [deleteCart.pending]: (state) => {
      state.loadingDeleteCartAPI = true;
    },
    [deleteCart.fulfilled]: (state, action) => {
      const { cart } = action.payload;
      const { data } = state;
      const index = data.findIndex((product) => product.cart._id === cart._id);
      if (index !== -1) {
        data.splice(index, 1);
        state.length = state.length - 1;
      }
      state.loadingDeleteCartAPI = false;
      message.success('Xóa thành công', 1.5);
    },
    [deleteCart.rejected]: (state) => {
      state.loadingDeleteCartAPI = false;
    },
    //messagesCart
    [messagesCart.fulfilled]: (state, action) => {
      const { cart } = action.payload;
      const { data } = state;
      const index = data.findIndex((product) => product.cart._id === cart._id);
      if (index !== -1) {
        data[index] = cart;
      }
    },
  },
});

const { reducer } = CartSlice;
export default reducer;
