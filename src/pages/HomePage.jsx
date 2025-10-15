import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import publicService from '../services/publicService';

function HomePage() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsRes = await publicService.getSettings();
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
        toast.error("Tidak dapat memuat data dari server.");
      }
    };
    fetchSettings();
  }, []);

  const heroImageUrl = settings.landing_page_image 
    ? `http://127.0.0.1:8000/storage/${settings.landing_page_image}` 
    : 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1974&auto=format&fit=crop';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header 
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center p-4 relative"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-4 animate-fade-in-down">
            {settings.landing_page_headline || 'Selamat Datang'}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up">
            {settings.landing_page_tagline || 'Temukan produk terbaik kami di sini.'}
          </p>
        </div>
      </header>

      {/* --- SEKSI KONTEN BARU --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{settings.lp_section_title || 'Kenapa Memilih Kami?'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
            <div className="feature-item">
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item1_title || 'Bahan Terbaik'}</h3>
              <p className="text-gray-600">{settings.lp_item1_text || 'Deskripsi poin 1'}</p>
            </div>
            <div className="feature-item">
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item2_title || 'Dibuat Penuh Cinta'}</h3>
              <p className="text-gray-600">{settings.lp_item2_text || 'Deskripsi poin 2'}</p>
            </div>
            <div className="feature-item">
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item3_title || 'Jaminan Kualitas'}</h3>
              <p className="text-gray-600">{settings.lp_item3_text || 'Deskripsi poin 3'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKSI CALL TO ACTION BARU --- */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold text-gray-800 mb-4">{settings.lp_cta_title || 'Lihat Apa yang Kami Tawarkan'}</h2>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8">{settings.lp_cta_text || 'Jelajahi katalog lengkap kami.'}</p>
           <Link to="/produk" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform hover:scale-105">
             Lihat Semua Produk
           </Link>
        </div>
      </section>
      
      {/* Tombol Chat WA */}
    </div>
  );
}

export default HomePage;