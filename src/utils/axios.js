import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = token;
  }
  
  return config;
}, (error) => {
  // Обработка ошибки запроса
  return Promise.reject(error);
});

export default instance;