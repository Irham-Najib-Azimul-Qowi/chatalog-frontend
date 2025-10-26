  import React, { useState, useEffect, useRef, useCallback } from 'react'; // Tambah useCallback
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

    // Effect untuk mengambil Settings (judul, tagline umum)
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

    // Effect untuk mengambil data Homepage Slides dari API baru
    useEffect(() => {
      const fetchHomepageSlides = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/homepage-slides`);
          setHomepageSlides(response.data);
        } catch (error) {
          console.error('Error fetching homepage slides:', error);
          toast.error("Tidak dapat memuat slide homepage.");
          setHomepageSlides([
            { id: 1, image_url: '/landing-page/placeholder.jpg', title: 'Selamat Datang', description: 'Temukan produk terbaik kami.' },
          ]);
        }
      };
      fetchHomepageSlides();
    }, [API_BASE_URL]);

    // Fungsi untuk animasi angka
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

    // <<< PERBAIKAN PENTING DI SINI: MENGGUNAKAN CALLBACK REF
    const countRef = useRef(null); // Tetap gunakan useRef
    const setRef = useCallback(node => {
      if (countRef.current) {
        // Clean up previous observer if it exists
        // Ini penting jika ref berubah atau komponen di-re-render
        // Meskipun dalam kasus ini, kita hanya ingin animasi sekali
        if (countRef.current.observer) {
          countRef.current.observer.disconnect();
        }
      }

      countRef.current = node; // Set ref.current ke node DOM yang baru

      if (node && !hasAnimated) {
        console.log('Callback Ref: Node is attached and not animated. Setting up observer.');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log('Callback Ref - IntersectionObserver callback fired. isIntersecting:', entry.isIntersecting);
              if (entry.isIntersecting && !hasAnimated) {
                console.log('Callback Ref - Element is intersecting and not animated. Starting animation!');
                animateNumber(0, FINAL_PARTNERS_COUNT, setPartnersCount, 2000);
                setHasAnimated(true); 
                observer.unobserve(node); // Hentikan observasi setelah terpicu
              }
            });
          },
          {
            threshold: 0.5, 
          }
        );
        observer.observe(node);
        node.observer = observer; // Simpan observer ke node untuk cleanup
      }
    }, [hasAnimated, FINAL_PARTNERS_COUNT]); // Dependensi untuk useCallback

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

    if (homepageSlides.length === 0) {
      return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Memuat slide homepage...</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        
        {/* Hero Section dengan Slider */}
        <header className="relative w-full h-screen">
          <Slider {...sliderSettings} className="w-full h-full">
            {homepageSlides.map((slide) => (
              <div key={slide.id} className="w-full h-full">
                <div 
                  className="h-screen flex flex-col justify-end items-start text-white p-6 relative"
                  style={{ 
                      backgroundImage: `url(${API_BASE_URL}${slide.image_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}
                >
                  {/* Lapisan Hitam Transparan */}
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  
                  {/* Kontainer Teks Kiri Bawah */}
                  <div 
                      className="relative z-10 transition-opacity duration-500 max-w-lg mb-12 lg:ml-20 md:ml-10 ml-5"
                  >
                      <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 animate-fade-in-down text-white">
                          {slide.title || 'Selamat Datang'}
                      </h1>
                      <p className="text-lg md:text-xl animate-fade-in-up text-white">
                          {slide.description || 'Temukan produk terbaik kami di sini.'}
                      </p>
                      <Link to="/produk" className="mt-6 inline-block bg-orange-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300">
                        Lihat Produk
                      </Link>
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
              <div className="feature-item flex flex-col items-center">
                  <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                      <FaLeaf className="w-8 h-8" /> 
                  </div>
                <h3 className="text-xl font-semibold mb-2">{settings.lp_item1_title || 'Bahan Terbaik'}</h3>
                <p className="text-gray-600">{settings.lp_item1_text || 'Kami hanya menggunakan bahan-bahan pilihan berkualitas tinggi.'}</p>
              </div>
              
              {/* POIN 2: DIBUAT PENUH CINTA */}
              <div className="feature-item flex flex-col items-center">
                  <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                      <FaHeart className="w-8 h-8" /> 
                  </div>
                <h3 className="text-xl font-semibold mb-2">{settings.lp_item2_title || 'Dibuat Penuh Cinta'}</h3>
                <p className="text-gray-600">{settings.lp_item2_text || 'Setiap produk dibuat dengan dedikasi dan perhatian penuh.'}</p>
              </div>
              
              {/* POIN 3: JAMINAN KUALITAS */}
              <div className="feature-item flex flex-col items-center">
                  <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-4">
                      <FaShieldAlt className="w-8 h-8" /> 
                  </div>
                <h3 className="text-xl font-semibold mb-2">{settings.lp_item3_title || 'Jaminan Kualitas'}</h3>
                <p className="text-gray-600">{settings.lp_item3_text || 'Kepuasan Anda adalah prioritas utama kami.'}</p>
              </div>

            </div>
          </div>
        </section>

        {/* --- SEKSI PENGHITUNG MITRA (ref diubah ke setRef) --- */}
        <section ref={setRef} className="bg-orange-50 py-20 text-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
              
              {/* Teks Kiri: "Sebanyak" */}
              <div className="text-gray-600 text-base md:text-lg font-normal text-right"> 
                <p>Sebanyak</p>
              </div>
              
              {/* Angka di Tengah: 58 */}
              <div className="text-orange-500 text-6xl md:text-8xl font-bold tracking-tight"> 
                {partnersCount}
              </div>
              {/* Teks Kanan: "Mitra" */}
              <div > 
                <p className="text-orange-500 text-base md:text-l font-normal text-left">Mitra</p>
              </div>
              {/* Teks Kanan: "Bekerja Sama Dengan Kami" */}
              <div className="text-gray-600 text-base md:text-lg font-normal text-left"> 
                <p>Bekerja Sama Dengan Kami</p>
              </div>
            </div>

          </div>
        </section>

        {/* --- SEKSI CALL TO ACTION --- */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{settings.lp_cta_title || 'Lihat Apa yang Kami Tawarkan'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">{settings.lp_cta_text || 'Jelajahi katalog lengkap kami.'}</p>
            <Link to="/Produk" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform hover:scale-105">
              Lihat Semua Produk
            </Link>
          </div>
        </section>
        
      </div>
    );
  }

  export default HomePage;