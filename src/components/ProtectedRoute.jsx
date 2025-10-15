import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 1. Ambil token dari penyimpanan browser
  const token = localStorage.getItem('authToken');

  // 2. Cek apakah token ada dan tidak kosong
  if (!token) {
    // Jika tidak ada token, jangan tampilkan apa-apa,
    // tapi alihkan (redirect) pengguna ke halaman login admin.
    // `replace` berarti pengguna tidak bisa menekan tombol "back" untuk kembali ke dashboard.
    return <Navigate to="/admin" replace />;
  }

  // 3. Jika token ada, tampilkan komponen "anak" yang dibungkusnya
  //    (dalam kasus ini, <AdminDashboardPage />).
  return children;
}

export default ProtectedRoute;