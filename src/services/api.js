import axios from 'axios';

// Buat instance Axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Base URL backend kita
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request admin
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Cek jika URL adalah untuk admin
      if (config.url.includes('/admin') || config.url.includes('/settings') || config.url.includes('/logout')) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;