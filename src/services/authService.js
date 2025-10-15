import apiClient from './api';

const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

// Fungsi logout akan secara otomatis menyertakan token karena interceptor
const logout = () => {
  return apiClient.post('/logout');
};

export default {
  login,
  logout,
};