import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import publicService from '../services/publicService';
import axios from 'axios';

// --- IMPORT IKON ---
import { FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';

function HomePage() {
  const [settings, setSettings] = useState({});
  const [partnersCount, setPartnersCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [homepageSlides, setHomepageSlides] = useState([]);

  const FINAL_PARTNERS_COUNT = 58;
  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsRes = await publicService.getSettings();
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Gagal memuat data settings:", error);
        toast.error("Tidak dapat memuat pengaturan dari server.");
      }
    };
    fetchSettings();
  }, []);

  const animateNumber = (start, end, setter, duration) => {
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setter(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const countRef = useRef(null);
  const setRef = useCallback(node => {
    if (countRef.current) {
      if (countRef.current.observer) {
        countRef.current.observer.disconnect();
      }
    }

    countRef.current = node;

    if (node && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              animateNumber(0, FINAL_PARTNERS_COUNT, setPartnersCount, 2000);
              setHasAnimated(true);
              observer.unobserve(node);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(node);
      node.observer = observer;
    }
  }, [hasAnimated, FINAL_PARTNERS_COUNT]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: true,
    pauseOnHover: true,
  };

  // --- HELPER UNTUK URL GAMBAR ---
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Image';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('dummy_images')) return `${API_BASE_URL}/${path}`;
    if (path.startsWith('storage/')) return `${API_BASE_URL}/${path}`;
    return `${API_BASE_URL}/storage/${path}`;
  };

  // Menggabungkan data slide dari settings
  const slidesFromSettings = [
    {
      id: 1,
      image_url: settings.lp_slider_img1,
      title: settings.landing_page_headline || 'Selamat Datang',
      description: settings.landing_page_tagline || 'Temukan produk terbaik kami.'
    },
    {
      id: 2,
      image_url: settings.lp_slider_img2,
      title: settings.landing_page_headline || 'Kualitas Terbaik',
      description: settings.landing_page_tagline || 'Kami hanya menyajikan yang terbaik.'
    },
    {
      id: 3,
      image_url: settings.lp_slider_img3,
      title: settings.landing_page_headline || 'Rasa Autentik',
      description: settings.landing_page_tagline || 'Citarasa yang tidak terlupakan.'
    }
  ].filter(slide => slide.image_url);

  const finalSlides = slidesFromSettings.length > 0 ? slidesFromSettings : [
    { id: 1, image_url: null, title: 'Selamat Datang', description: 'Silakan upload gambar di admin.' }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section dengan Slider */}
      <header className="relative w-full h-screen">
        <Slider {...sliderSettings} className="w-full h-full">
          {finalSlides.map((slide) => (
            <div key={slide.id} className="w-full h-full">
              <div
                className="h-screen flex flex-col justify-end items-start text-white p-6 relative"
                style={{
                  backgroundImage: `url(${getImageUrl(slide.image_url)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>

                <div className="relative z-10 transition-opacity duration-500 max-w-lg mb-12 lg:ml-20 md:ml-10 ml-5">
                  <h1
                    className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 text-white"
                    data-aos="fade-down"
                    data-aos-delay="500"
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-lg md:text-xl text-white"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    {slide.description}
                  </p>
                  <Link
                    to="/produk"
                    className="mt-6 inline-block bg-orange-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300"
                    data-aos="zoom-in"
                    data-aos-delay="900"
                  >
                    Lihat Produk
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </header>

      {/* --- SEKSI "KENAPA MEMILIH KAMI?" dengan ANIMASI --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          {/* Judul Section - Fade Up */}
          <h2
            className="text-3xl font-bold text-gray-800 mb-4"
            data-aos="fade-up"
          >
            {settings.lp_section_title || 'Kenapa Memilih Kami?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">

            {/* POIN 1: BAHAN TERBAIK - Zoom In dengan delay */}
            <div
              className="feature-item flex flex-col items-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                <FaLeaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item1_title || 'Bahan Terbaik'}</h3>
              <p className="text-gray-600">{settings.lp_item1_text || 'Kami hanya menggunakan bahan-bahan pilihan berkualitas tinggi.'}</p>
            </div>

            {/* POIN 2: DIBUAT PENUH CINTA - Zoom In dengan delay lebih lama */}
            <div
              className="feature-item flex flex-col items-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                <FaHeart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item2_title || 'Dibuat Penuh Cinta'}</h3>
              <p className="text-gray-600">{settings.lp_item2_text || 'Setiap produk dibuat dengan dedikasi dan perhatian penuh.'}</p>
            </div>

            {/* POIN 3: JAMINAN KUALITAS - Zoom In dengan delay paling lama */}
            <div
              className="feature-item flex flex-col items-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                <FaShieldAlt className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{settings.lp_item3_title || 'Jaminan Kualitas'}</h3>
              <p className="text-gray-600">{settings.lp_item3_text || 'Kepuasan Anda adalah prioritas utama kami.'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SEKSI PENGHITUNG MITRA dengan ANIMASI --- */}
      <section ref={setRef} className="bg-orange-50 py-20 text-center">
        <div className="container mx-auto px-6">
          <div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4"
            data-aos="fade-up"
          >

            <div className="text-gray-600 text-base md:text-lg font-normal text-right">
              <p>Sebanyak</p>
            </div>

            <div
              className="text-orange-500 text-6xl md:text-8xl font-bold tracking-tight"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {partnersCount}
            </div>

            <div>
              <p className="text-orange-500 text-base md:text-l font-normal text-left">Mitra</p>
            </div>

            <div className="text-gray-600 text-base md:text-lg font-normal text-left">
              <p>Bekerja Sama Dengan Kami</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKSI CALL TO ACTION dengan ANIMASI --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-3xl font-bold text-gray-800 mb-4"
            data-aos="fade-down"
          >
            {settings.lp_cta_title || 'Lihat Apa yang Kami Tawarkan'}
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {settings.lp_cta_text || 'Jelajahi katalog lengkap kami.'}
          </p>
          <div data-aos="zoom-in" data-aos-delay="200">
            <Link
              to="/Produk"
              className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform hover:scale-105"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;