import apiClient from './api'; // Menggunakan instance Axios terpusat kita

// Fungsi untuk mengambil semua produk
const getProducts = () => {
  return apiClient.get('/products');
};

// Fungsi untuk mengambil semua pengaturan website
const getSettings = () => {
  return apiClient.get('/settings');
};

// Mengirim data pesanan ke backend
const processCheckout = (orderData) => {
  return apiClient.post('/checkout', orderData);
};

// Export semua fungsi agar bisa digunakan di tempat lain
export default {
  getProducts,
  getSettings,
  processCheckout,
};