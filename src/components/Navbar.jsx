import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null); 

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
    setProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* Bagian Kiri Navbar (Link Navigasi) */}
        {/* === PERUBAHAN DI SINI: Tambahkan pl-8 === */}
        <div className="flex-1 flex items-center space-x-8 pl-8"> {/* Tambahkan pl-8 di sini */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/produk" className="text-gray-600 hover:text-orange-500">Produk</Link>
            
            {isLoggedIn && (
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-orange-500">Admin</Link>
            )}
            
            {!isLoggedIn && (
              <>
                <Link to="/tentang" className="text-gray-600 hover:text-orange-500">Tentang Kami</Link>
                <Link to="/kontak" className="text-gray-600 hover:text-orange-500">Kontak</Link>
              </>
            )}
          </div>
        </div>

        {/* Bagian Tengah Navbar (Logo) - Akan diposisikan secara absolut di tengah */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="flex items-center">
            <img 
              src="/image/Logo-Zoeliez-Ilux.png" 
              alt="Zoeliez Ilux Snack Ponorogo Logo" 
              className="h-16 w-auto" 
            />
          </Link>
        </div>

        {/* Bagian Kanan Navbar (Tombol Profil/Login) */}
        <div className="flex-1 flex justify-end relative">
          {isLoggedIn ? (
            <button 
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} 
              className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              A {/* Inisial Admin */}
            </button>
          ) : (
            null
          )}

          {/* Menu Dropdown Profil */}
          {isProfileMenuOpen && isLoggedIn && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 animate-fade-in-down">
              <div className="py-2">
                <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                  Pengaturan Profil
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;