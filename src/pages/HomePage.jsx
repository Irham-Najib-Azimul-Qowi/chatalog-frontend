import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; 
import publicService from '../services/publicService';
// --- IMPORT IKON ---
import { FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa'; 

function HomePage() {
  const [settings, setSettings] = useState({});
  const [partnersCount, setPartnersCount] = useState(0); 
  const countRef = useRef(null); 
  const [hasAnimated, setHasAnimated] = useState(false); 

  const FINAL_PARTNERS_COUNT = 58; 

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateNumber(0, FINAL_PARTNERS_COUNT, setPartnersCount, 2000);
            setHasAnimated(true); 
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, 
      }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [hasAnimated, FINAL_PARTNERS_COUNT]);

  const animateNumber = (start, end, setter, duration) => {
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const getSliderImages = () => {
    const images = [
      settings.lp_slider_img1, 
      settings.lp_slider_img2,
      settings.lp_slider_img3
    ].filter(Boolean).map(path => 
      `http://127.0.0.1:8000/storage/${path}`
    );

    if (images.length === 0) {
      return ['#888888']; 
    }
    return images;
  };
  const sliderImages = getSliderImages();

  const isPlaceholderMode = sliderImages.length === 1 && sliderImages[0] === '#888888';

  const sliderSettings = {
    dots: true,          
    infinite: true,      
    speed: 1000,         
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,      
    autoplaySpeed: 5000, 
    fade: true,          
    arrows: !isPlaceholderMode, 
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Section dengan Slider */}
      <header className="relative w-full h-screen">
        <Slider {...sliderSettings} className="w-full h-full">
          {sliderImages.map((imageUrl, index) => (
            <div key={index} className="w-full h-full">
              <div 
                className="h-screen flex flex-col justify-end items-start text-white p-6 relative"
                style={{ 
                    backgroundImage: imageUrl.startsWith('#') ? 'none' : `url(${imageUrl})`,
                    backgroundColor: imageUrl.startsWith('#') ? imageUrl : 'transparent',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
              >
                {/* Lapisan Hitam Transparan */}
                <div className={`absolute inset-0 bg-black ${imageUrl.startsWith('#') ? 'opacity-0' : 'opacity-40'}`}></div>
                
                {/* Kontainer Teks Kiri Bawah (Sembunyi jika Placeholder) */}
                <div 
                    className={`relative z-10 transition-opacity duration-500 max-w-lg mb-12 ${isPlaceholderMode ? 'opacity-0' : 'opacity-100'}`}
                >
                    <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 animate-fade-in-down text-white">
                        {settings.landing_page_headline || 'Selamat Datang'}
                    </h1>
                    <p className="text-lg md:text-xl animate-fade-in-up text-white">
                        {settings.landing_page_tagline || 'Temukan produk terbaik kami di sini.'}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </header>

      {/* --- SEKSI KONTEN "KENAPA MEMILIH KAMI?" (DENGAN IKON) --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{settings.lp_section_title || 'Kenapa Memilih Kami?'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
            
            {/* POIN 1: BAHAN TERBAIK */}
            <div className="feature-item">
                <FaLeaf className="w-10 h-10 mx-auto mb-3 text-orange-500" /> 
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item1_title || 'Bahan Terbaik'}</h3>
              <p className="text-gray-600">{settings.lp_item1_text || 'Deskripsi poin 1'}</p>
            </div>
            
            {/* POIN 2: DIBUAT PENUH CINTA */}
            <div className="feature-item">
                <FaHeart className="w-10 h-10 mx-auto mb-3 text-orange-500" /> 
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item2_title || 'Dibuat Penuh Cinta'}</h3>
              <p className="text-gray-600">{settings.lp_item2_text || 'Deskripsi poin 2'}</p>
            </div>
            
            {/* POIN 3: JAMINAN KUALITAS */}
            <div className="feature-item">
                <FaShieldAlt className="w-10 h-10 mx-auto mb-3 text-orange-500" /> 
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item3_title || 'Jaminan Kualitas'}</h3>
              <p className="text-gray-600">{settings.lp_item3_text || 'Deskripsi poin 3'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEKSI PENGHITUNG MITRA (Disesuaikan lagi untuk layout horizontal) --- */}
      <section ref={countRef} className="bg-white py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
            
            {/* Teks Kiri: "Sebanyak" */}
            <div className="text-gray-600 text-base md:text-lg font-normal text-right"> {/* text-base/lg untuk ukuran, text-right jika ingin sejajar kanan angka */}
              <p>Sebanyak</p>
            </div>
            
            {/* Angka di Tengah: 58 */}
            <div className="text-orange-500 text-6xl md:text-8xl font-bold tracking-tight"> {/* Ukuran font lebih besar */}
              {partnersCount}
            </div>
            {/* Teks Kanan: "Menjadi Mitra Kami" */}
            <div > {/* text-base/lg untuk ukuran, text-left jika ingin sejajar kiri angka */}
              <p className="text-orange-500 text-base md:text-l font-normal text-left">Mitra</p>
            </div>
            {/* Teks Kanan: "Menjadi Mitra Kami" */}
            <div className="text-gray-600 text-base md:text-lg font-normal text-left"> {/* text-base/lg untuk ukuran, text-left jika ingin sejajar kiri angka */}
              <p>Bekerja Sama Dengan Kami</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SEKSI CALL TO ACTION --- */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold text-gray-800 mb-4">{settings.lp_cta_title || 'Lihat Apa yang Kami Tawarkan'}</h2>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8">{settings.lp_cta_text || 'Jelajahi katalog lengkap kami.'}</p>
           <Link to="/produk" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform hover:scale-105">
             Lihat Semua Produk
           </Link>
        </div>
      </section>
      
    </div>
  );
}

export default HomePage;