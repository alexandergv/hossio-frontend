import axios from 'axios'
import configs from 'config';


// Create an axios instance
const axiosInstance = axios.create({
  baseURL: configs.apiUrl
});

axiosInstance.defaults.withCredentials = true;
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
