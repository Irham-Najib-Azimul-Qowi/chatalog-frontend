import React, { useState, useEffect } from 'react'; // <--- HANYA SATU BARIS INI
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  // 1. State untuk mengontrol visibilitas tombol Back to Top
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  // 2. Efek samping untuk menangani event scroll
  useEffect(() => {
    const handleScroll = () => {
      // Tampilkan tombol setelah menggulir 200px ke bawah
      if (window.scrollY > 200) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    };

    // Tambahkan event listener saat komponen mount
    window.addEventListener('scroll', handleScroll);

    // Cleanup function: hapus event listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat mount

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Pembungkus utama untuk layout sticky footer */}
      {/* min-h-screen: pastikan div ini setidaknya setinggi layar */}
      {/* flex flex-col: buat konten di dalamnya menjadi kolom fleksibel */}
      <div className="flex flex-col min-h-screen"> 
        <Navbar />

        <main className="flex-grow"> {/* main ini akan 'mengembang' mengisi ruang */}
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

        <Footer /> {/* Footer ditempatkan di sini */}
        
        {/* 3. Tombol Back to Top (Fixed) */}
        {showBackToTopButton && ( // Hanya render tombol jika showBackToTopButton adalah true
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            // Kelas Tailwind CSS untuk positioning fixed di kanan bawah dan styling
            className="fixed bottom-4 right-4 bg-white text-orange-500 p-3 rounded-full shadow-lg hover:bg-orange-200 transition-colors duration-200 z-50" // z-50 agar di atas konten lain
            aria-label="Back to top" // Untuk aksesibilitas
          >
            {/* Ikon panah ke atas (SVG) */}
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