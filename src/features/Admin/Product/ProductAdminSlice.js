import { createSlice } from '@reduxjs/toolkit';
import { deleteCommentUser } from '../User/pathAPI';
import {
  createProduct,
  deleteProduct,
  getCommentProduct,
  getProducts,
  readProduct,
  updateProduct
} from './pathAPI';
const ProductAdminSlice = createSlice({
  name: 'productAdmin',
  initialState: {
    loading: false,
    isSuccess: false,
    isError: false,
    message: '',
    products: [],
    product: {},
    //
    loadingGetComment: false,
    lengthCommentProduct: 0,
    commentProduct: [],
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;
      return state;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.loading = false;
    },

    [readProduct.pending]: (state) => {
      state.loading = true;
    },
    [readProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [readProduct.rejected]: (state) => {
      state.loading = false;
    },

    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.message = 'Tạo mới thành công';
    },
    [createProduct.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.message = 'Tạo mới thất bại';
    },

    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.message = 'Cập nhật thành công';
    },
    [updateProduct.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.message = 'Cập nhật thất bại';
    },

    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.message = 'Xóa thành công';
    },
    [deleteProduct.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.message = 'Xóa thất bại';
    },

    // get comment products
    [getCommentProduct.pending]: (state) => {
      state.loadingGetComment = true;
    },
    [getCommentProduct.fulfilled]: (state, action) => {
      const { comment, length } = action.payload;
      state.lengthCommentProduct = length;
      state.commentProduct = comment;
      state.loadingGetComment = false;
    },
    [getCommentProduct.rejected]: (state) => {
      state.loadingGetComment = false;
    },
    [deleteCommentUser.pending]: (state) => {},
    [deleteCommentUser.fulfilled]: (state, action) => {
      const { id_product, id_comment } = action.payload;
      const { productData, commentProduct } = state;
      const indexProduct = productData.findIndex((prod) => prod.product._id === id_product);
      const indexUser = commentProduct.findIndex((comment) => comment._id === id_comment);
      if (indexProduct !== -1) {
        productData[indexProduct].length_comment = productData[indexProduct].length_comment - 1;
      }
      if (indexUser !== -1) {
        commentProduct.splice(indexUser, 1);
        state.lengthCommentProduct = state.lengthCommentProduct - 1;
      }
      state.message = 'Xóa thành công';
    },
  },
});

export const { clearState } = ProductAdminSlice.actions;
const { reducer } = ProductAdminSlice;
export default reducer;
