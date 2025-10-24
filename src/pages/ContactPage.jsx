import React, { useState, useEffect } from 'react';
import publicService from '../services/publicService';
// Impor ikon media sosial yang baru
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaTiktok } from 'react-icons/fa'; 

function ContactPage() {
  const [settings, setSettings] = useState({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    publicService.getSettings().then(res => setSettings(res.data));
  }, []);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `Halo Zoeliez Ilux Snack Ponorogo!\n\nNama: ${name}\nPesan: ${message}\n\nSaya ingin bertanya lebih lanjut.`;
    const phoneNumber = settings.contact_phone ? settings.contact_phone.replace(/[\s+-]/g, '') : '';

    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("Nomor telepon tidak tersedia. Silakan hubungi secara manual.");
      console.error("Nomor WhatsApp tidak ditemukan di pengaturan.");
    }

    setName('');
    setMessage('');
  };

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {settings.contact_title || 'Hubungi Kami'}
            </h1>
            <p className="text-gray-600 mb-2 max-w-lg">
              {settings.contact_tagline || 'Punya pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami.'}
            </p>
            <p className="text-gray-600 mb-8 max-w-lg">
              Kami siap membantu Anda sebaik mungkin.
            </p>

            <div className="space-y-4 text-gray-700 text-left mb-10"> {/* Tambahkan mb-10 */}
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <span>{settings.contact_address || '6G37+MMH, Unnamed Road, Brahu, Mlilir, Kec. Dolopo, Kabupaten Madiun, Jawa Timur 63174'}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-orange-500 mr-3 flex-shrink-0" size={20} />
                <span>{settings.contact_phone || '+62 895-2545-6346'}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-orange-500 mr-3 flex-shrink-0" size={20} />
                <span>{settings.contact_email || 'zoeliezilux@gmail.com'}</span>
              </div>
            </div>

            {/* Ikon Media Sosial - DISAMAKAN DENGAN FOOTER/ORANGE */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ikuti Kami</h3>
            <div className="flex space-x-3">
              {/* Instagram */}
              <a href="#" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaInstagram size={18} />
              </a>
              {/* WhatsApp */}
              <a href={`https://wa.me/${settings.contact_phone ? settings.contact_phone.replace(/[\s+-]/g, '') : ''}`} 
                 target="_blank" rel="noopener noreferrer" 
                 className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaWhatsapp size={18} />
              </a>
              {/* TikTok */}
              <a href="#" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaTiktok size={18} />
              </a>
              {/* Facebook */}
              <a href="#" className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Form WhatsApp */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Terhubung dengan kami
              </h2>
              <p className="text-gray-600 mb-6">Hubungi kami kapan saja</p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                {/* Input Nama */}
                <div>
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

                {/* Input Pesan */}
                <div>
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

                {/* Tombol Kirim Pesan */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Kirim Pesan via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;