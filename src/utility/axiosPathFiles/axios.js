// axiosPathFiles/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if you are using cookies
});

// 🔹 Add token automatically before each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach it
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;