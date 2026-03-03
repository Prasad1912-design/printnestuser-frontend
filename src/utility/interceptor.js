import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://printnestuser-backend.onrender.com/' // This should point to your Render backend
});

instance.interceptors.request.use((config)=>{
  const token = localStorage.getItem('accessToken');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error)=> Promise.reject(error));

export default instance;