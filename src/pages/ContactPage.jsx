import React, { useState, useEffect } from 'react';
import publicService from '../services/publicService';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'; 

function ContactPage() {
  const [settings, setSettings] = useState({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const targetWhatsAppNumber = "6289525456346";

  const whatsappMessage = `Halo Zoeliez Ilux Snack Ponorogo!\n\nNama: ${name}\nPesan: ${message}\n\nSaya ingin bertanya lebih lanjut.`;

  useEffect(() => {
    publicService.getSettings().then(res => setSettings(res.data));
  }, []);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = targetWhatsAppNumber.replace(/[\s+-]/g, '');

    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("Nomor telepon tidak tersedia. Silakan hubungi secara manual.");
      console.error("Nomor WhatsApp tidak ditemukan.");
    }

    setName('');
    setMessage('');
  };

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kolom Kiri: Informasi Kontak dengan ANIMASI */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {settings.contact_title || 'Hubungi Kami'}
            </h1>
            <p className="text-gray-600 mb-2 max-w-lg">
              {settings.contact_tagline || 'Punya pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami.'}
            </p>
            <p className="text-gray-600 mb-8 max-w-lg">
              Kami siap membantu Anda sebaik mungkin.
            </p>

            {/* Info Kontak dengan stagger animation */}
            <div className="space-y-4 text-gray-700 text-left mb-10">
              <div 
                className="flex items-start"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <span>6G37+MMH, Unnamed Road, Brahu, Mlilir, Kec. Dolopo, Kabupaten Madiun, Jawa Timur 63174</span>
              </div>
              <div 
                className="flex items-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <FaPhone className="text-orange-500 mr-3 flex-shrink-0" size={20} />
                <span>{settings.contact_phone || '0895-2545-6346'}</span>
              </div>
              <div 
                className="flex items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <FaEnvelope className="text-orange-500 mr-3 flex-shrink-0" size={20} />
                <span>zoeliezilux@gmail.com</span>
              </div>
            </div>

            {/* Ikon Media Sosial dengan animasi */}
            <h3 
              className="text-xl font-semibold text-gray-800 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Ikuti Kami
            </h3>
            <div 
              className="flex space-x-3"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <a href="https://www.instagram.com/sulisilux/" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaInstagram size={18} />
              </a>
              <a href={`https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`} 
                 target="_blank" rel="noopener noreferrer" 
                 className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaWhatsapp size={18} />
              </a>
              <a href="https://www.tiktok.com/@zoeliezilux?is_from_webapp=1&sender_device=pc" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaTiktok size={18} />
              </a>
              <a href="https://web.facebook.com/zoeliez.ilux" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Form WhatsApp dengan ANIMASI */}
          <div data-aos="fade-left" data-aos-duration="1000">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Terhubung dengan kami
              </h2>
              <p className="text-gray-600 mb-6">Hubungi kami kapan saja</p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                {/* Input Nama dengan animasi */}
                <div data-aos="fade-up" data-aos-delay="100">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Masukkan nama lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Input Pesan dengan animasi */}
                <div data-aos="fade-up" data-aos-delay="200">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                    Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                    placeholder="Masukkan pesan anda"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Tombol Kirim Pesan dengan animasi */}
                <div data-aos="fade-up" data-aos-delay="300">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Kirim Pesan via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;