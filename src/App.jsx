import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos'; // <<<< IMPORT AOS
import 'aos/dist/aos.css'; // <<<< IMPORT CSS AOS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Impor komponen
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProductPage from './pages/ProductPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import AdminProfilePage from './pages/AdminProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

function App() {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  // <<<< INITIALIZE AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi (ms)
      once: true, // Animasi hanya terjadi sekali
      offset: 100, // Offset dari trigger point (px)
      easing: 'ease-in-out', // Jenis easing
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col min-h-screen"> 
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produk" element={<ProductPage />} />
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

        <Footer />
        
        {showBackToTopButton && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-4 right-4 bg-white text-orange-500 p-3 rounded-full shadow-lg hover:bg-orange-200 transition-colors duration-200 z-50"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;