import axiosClient from './axiosClient';
const cartAPI = {
  userCartAPI: (cart, token) => {
    const url = '/api/user/cart';
    return axiosClient.post(url, cart, token);
  },
  getUserCartAPI: (token) => {
    const url = `/api/user/cart`;
    return axiosClient.get(url, null, token);
  },
  deleteCartAPI: (token) => {
    const url = '/api/user/cart';
    return axiosClient.delete(url, null, token);
  },
  saveUserAddressAPI: (data, token) => {
    const url = '/api/user/address';
    return axiosClient.post(url, data, token);
  },
  applyCouponAPI: (coupon, token) => {
    const url = '/api/user/cart/coupon';
    return axiosClient.post(url, coupon, token);
  },
};
export default cartAPI;
