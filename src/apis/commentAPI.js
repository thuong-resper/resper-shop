import axiosClient from './axiosClient';
const commentAPI = {
  getCommentOne: (params) => {
    const url = '/api/comments/get-comments';
    return axiosClient.get(url, { params });
  },
  deleteComment: (data, token) => {
    const url = `/api/comments/delete-comments?id=${data._id}&_id_product=${data._id_product}`;
    return axiosClient.delete(url, null, token);
  },
};

export default commentAPI;
