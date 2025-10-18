import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Impor komponen
import Navbar from './components/Navbar'; // <-- Impor Navbar
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProductPage from './pages/ProductPage'; // <-- 1. Impor halaman baru
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast'; // <-- 1. Impor Toaster
import AdminProfilePage from './pages/AdminProfilePage'; // <-- Impor halaman baru
import AboutPage from './pages/AboutPage';     // <-- Impor
import ContactPage from './pages/ContactPage';   // <-- Impor



function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar /> {/* <-- Tampilkan Navbar di sini */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produk" element={<ProductPage />} /> {/* <-- 2. Tambahkan rute ini */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={<ProtectedRoute><AdminProfilePage /></ProtectedRoute>} 
          />
          <Route path="/tentang" element={<AboutPage />} />  
          <Route path="/kontak" element={<ContactPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;