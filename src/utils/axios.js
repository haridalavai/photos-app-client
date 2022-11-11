import axios from 'axios';

const token = localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
});

export default axiosInstance;
