import apiClient from './api';

// Fungsi ini akan secara otomatis menyertakan token karena interceptor di api.js

const getProducts = () => {
  return apiClient.get('/products');
};

const getSettings = () => {
  return apiClient.get('/settings');
};

const createProduct = (formData) => {
  return apiClient.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updateProduct = (id, formData) => {
  // Method spoofing sudah ada di formData (_method: 'PUT')
  return apiClient.post(`/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteProduct = (id) => {
  const formData = new FormData();
  formData.append('_method', 'DELETE');
  return apiClient.post(`/admin/products/${id}`, formData);
};

const updateSettings = (settingsData) => {
  return apiClient.put('/settings', { settings: settingsData });
};

const uploadLandingImage = (formData) => {
  return apiClient.post('/admin/settings/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const getProfile = () => {
  return apiClient.get('/user');
};

const updateProfile = (profileData) => {
  return apiClient.put('/user/profile', profileData);
};

export default {
  getProducts,
  getSettings,
  createProduct,
  updateProduct,
  deleteProduct,
  updateSettings,
  uploadLandingImage,
  getProfile,
  updateProfile,
};