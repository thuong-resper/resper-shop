import axiosClient from './axiosClient';

const productAPI = {
  getListProducts: (params) => {
    const url = '/api/products';
    return axiosClient.get(url, { params });
  },
  getPremiumProducts: (params) => {
    const url = '/api/products?sort=-price';
    return axiosClient.get(url, { params });
  },
  getRelated: (params) => {
    const url = '/api/related';
    return axiosClient.get(url, { params });
  },
  getProductId: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },
  getListSimilarProducts: (params) => {
    const url = `/api/products/similar/${params}`;
    return axiosClient.get(url, { params });
  },
};
export default productAPI;
