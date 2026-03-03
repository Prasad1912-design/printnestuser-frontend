import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000' // This should point to your Render backend
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log("Axios Interceptor Token:", token); // 🔹 debug
    if (token && token.trim() !== "") {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

export default instance;