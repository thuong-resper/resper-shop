import axiosClient from './axiosClient';

const userAPI = {
  login: (data) => {
    const url = '/api/user/login';
    return axiosClient.post(url, data);
  },
  loginGoogle: (tokenId) => {
    const url = '/api/user/google-login';
    return axiosClient.post(url, { tokenId });
  },
  changePassword: (password, token) => {
    const url = '/api/user/change-password';
    return axiosClient.post(url, password, token);
  },
  profile: () => {
    const url = '/api/user/profile';
    return axiosClient.get(url);
  },
  register: (data) => {
    const url = '/api/user/register';
    return axiosClient.post(url, data);
  },
  activeEmail: (accessToken) => {
    const url = '/api/user/active-email';
    return axiosClient.post(url, accessToken);
  },
  forgotPassword: (email) => {
    const url = '/api/user/forgot-password';
    return axiosClient.post(url, email);
  },
  resetPassword: (data) => {
    const url = '/api/user/reset-password';
    return axiosClient.put(url, data);
  },
  updateInformationUser: (data, token) => {
    const url = '/api/user/update-information';
    return axiosClient.put(url, data, token);
  },
  uploadImage: (image, token) => {
    const url = '/api/user/update-image';
    return axiosClient.put(url, image, token);
  },
  diaryComment: (params, token) => {
    const url = '/comments/history-comments';
    return axiosClient.get(url, params, token);
  },
};
export default userAPI;
