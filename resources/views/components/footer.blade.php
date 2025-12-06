<footer class="bg-orange-500 text-white py-12 px-6 lg:px-24">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Kolom 1: Logo dan Alamat -->
        <div class="flex flex-col space-y-4">
            <div class="text-3xl font-bold font-serif tracking-wider">ZOELIEZ ILUX</div>
            <p class="text-sm leading-relaxed max-w-sm">
                6G37+MMH, Unnamed Road, Brahu, Mlilir, Kec. Dolopo, Kabupaten Madiun, Jawa Timur 63174
            </p>
        </div>

        <!-- Kolom 2: Link Cepat -->
        <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-semibold mb-2">Link Cepat</h3>
            <ul class="space-y-2 text-sm">
                <li><a href="{{ url('/home') }}" class="hover:text-gray-300">Beranda</a></li>
                <li><a href="{{ url('/api/products') }}" class="hover:text-gray-300">Produk</a></li>
                <li><a href="{{ url('/about') }}" class="hover:text-gray-300">Tentang Kami</a></li>
                <li><a href="{{ url('/contact') }}" class="hover:text-gray-300">Kontak</a></li>
            </ul>
        </div>

        <!-- Kolom 3: Kontak dan Media Sosial -->
        <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-semibold mb-2">Hubungi Kami</h3>
            <p class="text-sm flex items-center space-x-2">
                <!-- Phone Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>+62 895-2545-6346</span>
            </p>
            <p class="text-sm flex items-center space-x-2">
                <!-- Envelope Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>zoeliezilux@gmail.com</span>
            </p>

            <div class="flex space-x-4 mt-4">
                <!-- Link menuju profil Instagram -->
                <a href="https://www.instagram.com/sulisilux/" target="_blank" rel="noopener noreferrer" class="hover:text-teal-300">
                    <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" class="h-6 w-6" />
                </a>

                <!-- Link menuju WhatsApp -->
                <a href="https://wa.me/6289525456346" target="_blank" rel="noopener noreferrer" class="hover:text-teal-300">
                    <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" alt="WhatsApp" class="h-6 w-6" />
                </a>

                <!-- Link menuju profil TikTok -->
                <a href="https://www.tiktok.com/@zoeliezilux?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" class="hover:text-teal-300">
                    <img src="https://img.icons8.com/ios-filled/24/ffffff/tiktok.png" alt="TikTok" class="h-6 w-6" />
                </a>

                <!-- Link menuju Facebook Messenger -->
                <a href="https://web.facebook.com/zoeliez.ilux" target="_blank" rel="noopener noreferrer" class="hover:text-teal-300">
                    <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-messenger.png" alt="Messenger" class="h-6 w-6" />
                </a>
            </div>
        </div>
    </div>
</footer>
