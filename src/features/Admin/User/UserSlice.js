import { createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  getListCommentsUser,
  deleteCommentUser,
  deleteAccountUser,
  getListCartUser,
  postActiveRoleUser,
  deleteAllCart,
} from './pathAPI';
import { checkOutCart, deleteCart } from '../Cart/pathAPI';
import { message } from 'antd';
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    lengthUser: 0,
    loading: false,
    // comments
    comment: [],
    lengthComment: 0,
    loadingComments: false,
    // delete account
    loadingDeleteAccount: false,
    // cart
    cart: [],
    lengthCart: 0,
    loadingCart: false,
  },
  extraReducers: {
    // get list users
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      const { length, user } = action.payload;
      state.loading = false;
      state.user = user;
      state.lengthUser = length;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
    },
    // get list comment user
    [getListCommentsUser.pending]: (state) => {
      state.loadingComments = true;
    },
    [getListCommentsUser.fulfilled]: (state, action) => {
      const { comment, length } = action.payload;
      state.comment = comment;
      state.lengthComment = length;
      state.loadingComments = false;
    },
    [getListCommentsUser.rejected]: (state) => {
      state.loadingComments = false;
    },
    // get cart user
    [getListCartUser.pending]: (state) => {
      state.loadingCart = true;
    },
    [getListCartUser.fulfilled]: (state, action) => {
      const { cart, length } = action.payload;
      state.cart = cart;
      state.lengthCart = length;
      state.loadingCart = false;
    },
    [getListCartUser.rejected]: (state) => {
      state.loadingCart = false;
    },
    // checkOutCart
    [checkOutCart.fulfilled]: (state, action) => {
      const cartRes = action.payload.cart;
      const { cart } = state;
      const index = cart.findIndex((product) => product._id === cartRes._id);
      cart[index] = cartRes;
    },
    [checkOutCart.rejected]: () => {
      message.error('Thao tác không thành công!', 2);
    },
    // delete Cart
    [deleteCart.fulfilled]: (state, action) => {
      const cartRes = action.payload.cart;
      const { cart, user } = state;
      const indexCart = cart.findIndex((product) => product._id === cartRes._id);
      const indexUser = user.findIndex((ur) => ur.user._id === cartRes.id_User);
      if (indexCart !== -1) {
        cart.splice(indexCart, 1);
        state.lengthCart = state.lengthCart - 1;
      }
      if (indexUser !== -1) {
        user[indexUser].length_cart = user[indexUser].length_cart - 1;
      }
    },
    [deleteCart.rejected]: () => {
      message.error('Thao tác không thành công!', 2);
    },
    // delete comments user
    [deleteCommentUser.fulfilled]: (state, action) => {
      const { length, id_comment, id_user } = action.payload;
      const { comment } = state;
      state.lengthComment = length;
      const indexCmt = comment.findIndex((cmt) => cmt._id === id_comment);
      const indexUser = state.user.findIndex((ur) => ur.user._id === id_user);
      if (indexCmt !== -1) {
        comment.splice(indexCmt, 1);
        message.success('Xóa Thành Công', 1.5);
      }
      if (indexUser !== -1) {
        state.user[indexUser].length_comment = length;
      }
    },
    [deleteCommentUser.rejected]: () => {
      message.error('Xóa thất bại !', 1.5);
    },
    // delete account user
    [deleteAccountUser.pending]: (state) => {
      state.loadingDeleteAccount = true;
    },
    [deleteAccountUser.fulfilled]: (state, action) => {
      const { id_user } = action.payload;
      const index = state.user.findIndex((ur) => ur.user._id === id_user);
      if (index !== -1) {
        state.user.splice(index, 1);
        message.success('Xóa Thành Công', 1.5);
        state.lengthUser = state.lengthUser - 1;
      }
      state.loadingDeleteAccount = false;
    },
    [getListCommentsUser.rejected]: (state) => {
      state.loadingDeleteAccount = false;
    },
    // active user and admin account
    [postActiveRoleUser.fulfilled]: (state, action) => {
      const { id_user, role } = action.payload;
      const index = state.user.findIndex((ur) => ur.user._id === id_user);
      if (index !== -1) {
        state.user[index].user.role = role;
      }
    },
    // delete all cart user
    [deleteAllCart.fulfilled]: (state, action) => {
      const { id_user, length } = action.payload;
      const index = state.user.findIndex((ur) => ur.user._id === id_user);
      if (index !== -1) {
        state.user[index].length_cart = length;
        message.success('Xóa Thành Công', 1.5);
      }
    },
  },
});

const { reducer } = UserSlice;
export default reducer;
