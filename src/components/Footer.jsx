import React from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Background warna oranye
    <footer className="bg-orange-500 text-white py-12 px-6 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: Logo dan Alamat */}
        <div className="flex flex-col space-y-4">
          <div className="text-3xl font-bold font-['Poppins'] tracking-wider">ZOELIEZ ILUX</div> 
          <p className="text-sm leading-relaxed max-w-sm">
            6G37+MMH, Unnamed Road, Brahu, Mlilir, Kec. Dolopo, Kabupaten Madiun, Jawa Timur 63174
          </p>
        </div>

        {/* Kolom 2: Link Cepat */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Link Cepat</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gray-300 transition-colors duration-200">Beranda</Link></li>
            <li><Link to="/produk" className="hover:text-gray-300 transition-colors duration-200">Produk</Link></li>
            <li><Link to="/tentang" className="hover:text-gray-300 transition-colors duration-200">Tentang Kami</Link></li>
            <li><Link to="/kontak" className="hover:text-gray-300 transition-colors duration-200">Kontak</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Kontak dan Media Sosial */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Hubungi Kami</h3>
          <p className="text-sm flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5" />
            <span>+62 895-2545-6346</span>
          </p>
          <p className="text-sm flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span>zoeliezilux@gmail.com</span>
          </p>
          
          <div className="flex space-x-4 mt-4">
            {/* Link menuju profil Instagram */}
            <a href="https://instagram.com/nama_instagram_anda" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors duration-200">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" className="h-6 w-6" />
            </a>
            
            {/* Link menuju WhatsApp (ganti dengan nomor Anda) */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors duration-200">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
            </a>
            
            {/* Link menuju profil TikTok */}
            <a href="https://tiktok.com/@nama_tiktok_anda" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors duration-200">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/tiktok.png" alt="TikTok" className="h-6 w-6" />
            </a>
            
            {/* Link menuju Facebook Messenger */}
            <a href="https://m.me/nama_facebook_anda" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors duration-200">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-messenger.png" alt="Messenger" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      {/* Tombol Back to Top SUDAH DIHAPUS DARI SINI */}
    </footer>
  );
};

export default Footer;