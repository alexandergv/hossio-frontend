import axios from 'axios'
import configVariables from 'configVariables';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: configVariables.apiUrl,
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
