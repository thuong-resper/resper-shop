import axiosClient from './axiosClient';
const orderAPI = {
  createOrderAPI: (order, token) => {
    const url = '/api/user/order';
    return axiosClient.post(url, order, token);
  },
  getOrderByIdAPI: (_id, token) => {
    const url = `/api/user/order/${_id}`;
    return axiosClient.get(url, null, token);
  },
  getUserOrdersAPI: (params) => {
    const url = '/api/user/orders';
    return axiosClient.get(url, { params });
  },
  putToPaymentOrderAPI: (data, token) => {
    const { id } = data;
    const url = `/api/user/order/${id}/pay`;
    return axiosClient.put(url, data, token);
  },

  //admin
  getAllOrders: (params) => {
    const url = '/api/admin/orders';
    return axiosClient.get(url, { params });
  },
  updateOrderStatus: (data) => {
    const url = '/api/admin/order-status';
    return axiosClient.put(url, { data });
  },
};
export default orderAPI;
