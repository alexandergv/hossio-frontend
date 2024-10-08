import axios from 'axios'
import configVariables from 'configVariables';
import Cookies from 'js-cookie';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: configVariables.apiUrl,
});

axiosInstance.defaults.withCredentials = true;
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
