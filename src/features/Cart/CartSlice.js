import { createSlice } from '@reduxjs/toolkit';
import { applyCouponAPI, deleteCartAPI, userCartAPI } from './pathAPI';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    dataCart: JSON.parse(localStorage.getItem('cart')) || [],
    //status
    isSuccess: false,
    isError: false,
    message: '',
    // shipping
    address: '',
    paymentMethod: '',
    // update
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;
      return state;
    },
    addCartProduct: (state, action) => {
      const { dataCart } = state;
      const { product, quantity } = action.payload;
      const sizeCart = action.payload.product.size;
      const fileIndex = (product, size, id) => {
        let result = -1;
        product.forEach((productCart, index) => {
          if (productCart.product.size === size && productCart.product._id === id) {
            result = index;
          }
        });
        return result;
      };
      const index = fileIndex(dataCart, sizeCart, product._id);
      if (index !== -1) {
        if (dataCart[index].quantity < 5) {
          if (quantity > 5) {
            dataCart[index].quantity = 5;
          } else {
            let newQuantity = dataCart[index].quantity + quantity;
            if (newQuantity > 5) {
              dataCart[index].quantity = 5;
            } else {
              dataCart[index].quantity += quantity;
            }
          }
          state.isSuccess = true;
          state.message = 'Thêm vào giỏ hàng thành công';
        } else {
          state.isError = true;
          state.message = 'Số lượng tối đa là 5';
        }
      } else {
        dataCart.unshift({
          product,
          quantity: quantity > 5 ? 5 : quantity,
        });
        state.isSuccess = true;
        state.message = 'Thêm vào giỏ hàng thành công';
      }
      localStorage.setItem('cart', JSON.stringify(dataCart));
    },
    deleteCartProduct: (state, action) => {
      const { dataCart } = state;
      const index = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart.splice(indexState, 1);
      }
      state.isSuccess = true;
      state.message = 'Đã xóa';
      localStorage.setItem('cart', JSON.stringify(dataCart));
    },
    updateCartProduct: (state, action) => {
      const { dataCart } = state;
      const { index, quantity } = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart[indexState].quantity = quantity;
      }
      state.isSuccess = true;
      state.message = 'Đã cập nhật';
      localStorage.setItem('cart', JSON.stringify(dataCart));
    },
    saveAddressAndPayment: (state, action) => {
      const { address, paymentMethod } = action.payload;
      state.address = address;
      state.paymentMethod = paymentMethod;
      localStorage.setItem('shippingAddress', JSON.stringify(address));
      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    },
    cartClearItems: (state, action) => {
      state.dataCart = [];
      localStorage.removeItem('cart');
    },
    extraReducers: {
      // get user cart
      [userCartAPI.pending]: (state) => {
        state.loading = true;
      },
      [userCartAPI.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [userCartAPI.rejected]: (state, action) => {
        state.loading = false;
      },
      // delete cart when order creat success
      [deleteCartAPI.pending]: (state) => {
        state.loading = true;
      },
      [deleteCartAPI.fulfilled]: (state, action) => {
        state.loading = false;
        state.message = 'Giỏ hàng trống, tiếp tục mua sắm';
      },
      [deleteCartAPI.rejected]: (state, action) => {
        state.loading = false;
      },
      // apply coupon
      [applyCouponAPI.pending]: (state) => {
        state.loading = true;
      },
      [applyCouponAPI.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [applyCouponAPI.rejected]: (state, action) => {
        state.loading = false;
      },
    },
  },
});
export const {
  clearState,
  addCartProduct,
  deleteCartProduct,
  updateCartProduct,
  saveAddressAndPayment,
  cartClearItems,
} = CartSlice.actions;
const { reducer } = CartSlice;

export default reducer;
