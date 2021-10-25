import axiosClient from './axiosClient';
const searchAPI = {
  getSearch: (params) => {
    const url = '/api/search/filters';
    return axiosClient.get(url, { params });
  },
};
export default searchAPI;
