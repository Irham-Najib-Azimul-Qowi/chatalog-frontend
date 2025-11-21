import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 

function AboutPage() {
  const [homepageSlides, setHomepageSlides] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  const API_BASE_URL = 'http://127.0.0.1:8000'; 

  useEffect(() => {
    const fetchHomepageSlides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/homepage-slides`);
        setHomepageSlides(response.data);
      } catch (err) {
        console.error('Error fetching homepage slides for About Page:', err);
        setError("Gagal memuat slide untuk halaman About Us.");
        setHomepageSlides([
          { id: 1, image_url: '/dummy_images/about/about_hero_fallback1.jpg', title: 'Tentang Kami', description: 'Kisah di balik setiap gigitan nikmat.' },
          { id: 2, image_url: '/dummy_images/about/about_hero_fallback2.jpg', title: 'Tentang Kami', description: 'Kisah di balik setiap gigitan nikmat.' },
        ]);
      } finally {
        setLoading(false); 
      }
    };
    fetchHomepageSlides();
  }, [API_BASE_URL]); 

  const sliderSettings = {
    dots: true,           
    infinite: true,       
    speed: 1000,          
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 5000,  
    fade: true,           
    arrows: false,        
    pauseOnHover: true, 
  };

  const BASE_IMAGE_URL = 'http://127.0.0.1:8000/dummy_images/about/';

  const storySections = [
    {
      id: 1,
      title: "Awal Mula Zoeliez Ilux",
      text: "Di awal perjalanannya, Zoeliez Ilux dikenal sebagai surganya kue basah tradisional maupun modern. Dengan tangan terampil, kami menyajikan berbagai macam jajanan pasar yang selalu dirindukan, seperti Risol Sayur Sosis Mantenan yang gurih, Dadar Gulung pandan yang harum, Brownies cokelat yang lumer, hingga Kue Tart untuk momen spesial, Roti Pisang yang lembut, dan Lumpur Lapindo yang manis legit. Setiap gigitan adalah perpaduan rasa autentik dan kualitas terbaik, menjadikan Zoeliez Ilux pilihan favorit di berbagai acara dan perayaan.",
      image: "about_jajanan_pasar.jpg", 
      imageAlt: "Berbagai kue basah tradisional dan modern Zoeliez Ilux",
      layout: "image-left" 
    },
    {
      id: 2,
      title: "Perubahan Fokus ke Kering Kentang Mustofa",
      text: "Tiga tahun berjalan, di tahun 2019, kami mengambil sebuah keputusan besar yang mengubah arah perjalanan Zoeliez Ilux. Dengan melihat potensi dan tingginya permintaan pasar, kami memutuskan untuk memfokuskan seluruh energi dan kreativitas kami pada satu produk bintang: Kering Kentang Mustofa.",
      image: "about_proses_mustofa.jpg", 
      imageAlt: "Proses produksi Kering Kentang Mustofa",
      layout: "image-right" 
    },
    {
      id: 3,
      title: "Kesuksesan Kering Kentang Mustofa",
      text: "Keputusan ini terbukti tepat. Dedikasi kami untuk menyempurnakan Kering Kentang Mustofa dengan resep rahasia yang pedas, manis, dan renyah tak tertandingi, berhasil merebut hati banyak pelanggan. Tak lama setelah fokus ini, pesanan melonjak drastis. Kering Kentang Mustofa Zoeliez Ilux menjadi buah bibir dan hidangan wajib di setiap rumah. Dari camilan sehari-hari hingga pelengkap lauk yang menggugah selera, produk kami kini dikenal luas dan dicintai oleh berbagai kalangan.",
      image: "about_kentang_mustofa_sukses.jpg", 
      imageAlt: "Kering Kentang Mustofa Zoeliez Ilux yang sukses di pasaran",
      layout: "image-left" 
    }
  ];

  if (loading) {
    return <div className="h-screen bg-gray-200 flex items-center justify-center text-gray-600">Memuat Slides...</div>;
  }

  if (error) {
    return <div className="h-screen bg-red-100 flex items-center justify-center text-red-700">Error: {error}</div>;
  }

  if (homepageSlides.length === 0) {
      return <div className="h-screen bg-gray-200 flex items-center justify-center text-gray-600">Tidak ada slide yang tersedia.</div>;
  }

  return (
    <div className="bg-white"> 
      
      {/* HERO SLIDER - Tanpa animasi AOS karena sudah ada animasi slider */}
      <header className="relative w-full h-screen overflow-hidden">
        <Slider {...sliderSettings} className="w-full h-full">
          {homepageSlides.map((slide) => (
            <div key={slide.id} className="w-full h-full">
              <div 
                className="w-full h-screen flex flex-col justify-center items-center text-white p-6 relative"
                style={{ 
                    backgroundImage: `url(${API_BASE_URL}${slide.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat', 
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                
                <div className="relative z-10 transition-opacity duration-500 max-w-lg text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 animate-fade-in-down text-white">
                        Tentang Zoeliez Ilux 
                    </h1>
                    <p className="text-lg md:text-xl animate-fade-in-up text-white">
                        Kisah di balik setiap gigitan nikmat
                    </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </header>

      {/* KONTEN CERITA dengan ANIMASI */}
      <div className="py-12 lg:py-20"> 
        <div className="container mx-auto px-6 max-w-6xl">
          {storySections.map((section, index) => (
            <div 
              key={section.id} 
              className={`flex flex-col ${section.layout === 'image-left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12 mb-16 lg:mb-24`}
            >
              {/* Gambar dengan animasi slide dari samping */}
              <div 
                className="w-full lg:w-1/2 rounded-lg shadow-lg overflow-hidden flex-shrink-0"
                data-aos={section.layout === 'image-left' ? 'fade-right' : 'fade-left'}
                data-aos-duration="1000"
              >
                <img 
                  src={`${BASE_IMAGE_URL}${section.image}`} 
                  alt={section.imageAlt} 
                  className="w-full h-auto object-cover" 
                />
              </div>
              
              {/* Teks dengan animasi fade dari arah berlawanan */}
              <div 
                className="w-full lg:w-1/2 text-center lg:text-left"
                data-aos={section.layout === 'image-left' ? 'fade-left' : 'fade-right'}
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;