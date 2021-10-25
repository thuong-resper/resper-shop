import axiosClient from './axiosClient';

const adminAPI = {
  //------------------cart------------------
  getCart: (params) => {
    const url = '/admin/get-cart';
    return axiosClient.get(url, { params });
  },
  checkOutCart: (id_cart, token) => {
    const url = `/admin/check-out-cart?id_cart=${id_cart}`;
    return axiosClient.put(url, null, token);
  },
  deleteCart: (id_cart, token) => {
    const url = `/admin/delete-cart?id_cart=${id_cart}`;
    return axiosClient.delete(url, null, token);
  },
  messagesCart: ({ message, id_cart }, token) => {
    const url = `/admin/messages-cart?id_cart=${id_cart}`;
    return axiosClient.post(url, { message }, token);
  },
  //------------------Product------------------
  listProduct: (params, token) => {
    const url = '/admin/list-product';
    return axiosClient.get(url, { params }, token);
  },
  CommentProduct: (params, token) => {
    const url = '/admin/get-comments-product';
    return axiosClient.get(url, { params }, token);
  },
  addProduct: (data, token) => {
    const url = '/admin/add-product';
    return axiosClient.post(url, data, token);
  },

  //------------------user------------------
  getAllUser: (params, token) => {
    const url = '/admin/get-users';
    return axiosClient.get(url, { params }, token);
  },
  getListCommentsUser: (params, token) => {
    const url = '/admin/get-list-comments-user';
    return axiosClient.get(url, { params }, token);
  },
  getListCommentsCart: (params, token) => {
    const url = '/admin/get-list-cart-user';
    return axiosClient.get(url, { params }, token);
  },
  deleteCommentUser: (params, token) => {
    const url = '/admin/delete-comments-user';
    return axiosClient.delete(url, { params }, token);
  },
  deleteAccountUser: (params, token) => {
    const url = '/admin/delete-account-user';
    return axiosClient.delete(url, params, token);
  },
  postActiveRoleUser: (id_user, token) => {
    const url = '/admin/active-role-user';
    return axiosClient.post(url, id_user, token);
  },
  deleteAllCart: (id_user, token) => {
    const url = `/admin/delete-all-cart?_id_user=${id_user}`;
    return axiosClient.delete(url, null, token);
  },

  // ----admin section----
  // category
  createCategory: (data, token) => {
    const url = '/api/category';
    return axiosClient.post(url, data, token);
  },
  getCategories: () => {
    const url = '/api/categories';
    return axiosClient.get(url);
  },
  getCategory: () => {
    const url = `/api/category/:slug`;
    return axiosClient.get(url);
  },
  getCategorySubs: (_id) => {
    const url = `/api/category/subs/${_id}`;
    return axiosClient.get(url);
  },
  updateCategory: (data, token) => {
    const { slug } = data;
    const url = `/api/category/${slug}`;
    return axiosClient.put(url, data, token);
  },
  deleteCategory: (slug, token) => {
    const url = `/api/category/${slug}`;
    return axiosClient.delete(url, null, token);
  },
  getSubsC: () => {
    const url = `/api/category/subs/:_id`;
    return axiosClient.get(url);
  },
  // subs
  createSub: (data, token) => {
    const url = '/api/sub';
    return axiosClient.post(url, data, token);
  },
  getSubs: () => {
    const url = '/api/subs';
    return axiosClient.get(url);
  },
  getSub: (slug) => {
    const url = `/api/sub/${slug}`;
    return axiosClient.get(url);
  },
  updateSub: (data, token) => {
    const { slug } = data;
    const url = `/api/sub/${slug}`;
    return axiosClient.put(url, data, token);
  },
  deleteSub: (slug, token) => {
    const url = `/api/sub/${slug}`;
    return axiosClient.delete(url, null, token);
  },
  // coupon
  createCoupon: (coupon, token) => {
    const url = '/api/coupon';
    return axiosClient.post(url, coupon, token);
  },
  getCoupons: (token) => {
    const url = '/api/coupons';
    return axiosClient.get(url, null, token);
  },
  deleteCoupon: (couponId, token) => {
    const url = `/api/coupons/${couponId}`;
    return axiosClient.delete(url, null, token);
  },
  // products
  createProduct: (data, token) => {
    const url = '/api/product';
    return axiosClient.post(url, data, token);
  },
  uploadImage: (data, token) => {
    const url = '/api/upload';
    return axiosClient.post(url, data, token);
  },
  removeImage: (data, token) => {
    const url = '/api/removeimage';
    return axiosClient.post(url, data, token);
  },
  getProducts: () => {
    const url = '/api/products';
    return axiosClient.get(url);
  },
  getProduct: (id) => {
    const url = `/api/sub/${id}`;
    return axiosClient.get(url);
  },
  updateProduct: (data, token) => {
    const { id_product } = data;
    const url = `/api/product/${id_product}`;
    return axiosClient.put(url, data, token);
  },
  deleteProduct: (id, token) => {
    const url = `/api/product/${id}`;
    return axiosClient.delete(url, null, token);
  },
};
export default adminAPI;
