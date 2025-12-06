<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['app_name'] ?? 'Chatalog' }} - Hubungi Kami</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- AOS Animation CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body class="bg-white">

    <x-navbar />

    <div class="py-20">
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <!-- Kolom Kiri: Informasi Kontak dengan ANIMASI -->
                <div data-aos="fade-right" data-aos-duration="1000">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">
                        {{ $settings['contact_title'] ?? 'Hubungi Kami' }}
                    </h1>
                    <p class="text-gray-600 mb-2 max-w-lg">
                        {{ $settings['contact_tagline'] ?? 'Punya pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami.' }}
                    </p>
                    <p class="text-gray-600 mb-8 max-w-lg">
                        Kami siap membantu Anda sebaik mungkin.
                    </p>

                    <!-- Info Kontak dengan stagger animation -->
                    <div class="space-y-4 text-gray-700 text-left mb-10">
                        <div class="flex items-start" data-aos="fade-up" data-aos-delay="100">
                            <i class="fas fa-map-marker-alt text-orange-500 mt-1 mr-3 flex-shrink-0 text-xl"></i>
                            <span>{{ $settings['contact_address'] ?? '6G37+MMH, Unnamed Road, Brahu, Mlilir, Kec. Dolopo, Kabupaten Madiun, Jawa Timur 63174' }}</span>
                        </div>
                        <div class="flex items-center" data-aos="fade-up" data-aos-delay="200">
                            <i class="fas fa-phone text-orange-500 mr-3 flex-shrink-0 text-xl"></i>
                            <span>{{ $settings['contact_phone'] ?? '0895-2545-6346' }}</span>
                        </div>
                        <div class="flex items-center" data-aos="fade-up" data-aos-delay="300">
                            <i class="fas fa-envelope text-orange-500 mr-3 flex-shrink-0 text-xl"></i>
                            <span>{{ $settings['contact_email'] ?? 'zoeliezilux@gmail.com' }}</span>
                        </div>
                    </div>

                    <!-- Ikon Media Sosial dengan animasi -->
                    <h3 class="text-xl font-semibold text-gray-800 mb-4" data-aos="fade-up" data-aos-delay="400">
                        Ikuti Kami
                    </h3>
                    <div class="flex space-x-3" data-aos="zoom-in" data-aos-delay="500">
                        <a href="https://www.instagram.com/sulisilux/" class="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="https://wa.me/6289525456346" target="_blank" rel="noopener noreferrer" class="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-whatsapp text-lg"></i>
                        </a>
                        <a href="https://www.tiktok.com/@zoeliezilux?is_from_webapp=1&sender_device=pc" class="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-tiktok text-lg"></i>
                        </a>
                        <a href="https://web.facebook.com/zoeliez.ilux" class="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 w-10 h-10 flex items-center justify-center">
                            <i class="fab fa-facebook-f text-lg"></i>
                        </a>
                    </div>
                </div>

                <!-- Kolom Kanan: Form WhatsApp dengan ANIMASI -->
                <div data-aos="fade-left" data-aos-duration="1000">
                    <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
                            Terhubung dengan kami
                        </h2>
                        <p class="text-gray-600 mb-6">Hubungi kami kapan saja</p>

                        <form onsubmit="handleWhatsAppSubmit(event)" class="space-y-5">
                            <!-- Input Nama dengan animasi -->
                            <div data-aos="fade-up" data-aos-delay="100">
                                <label for="name" class="block text-gray-700 text-sm font-semibold mb-2">
                                    Nama Lengkap <span class="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Masukkan nama lengkap Anda"
                                    required
                                />
                            </div>

                            <!-- Input Pesan dengan animasi -->
                            <div data-aos="fade-up" data-aos-delay="200">
                                <label for="message" class="block text-gray-700 text-sm font-semibold mb-2">
                                    Pesan <span class="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                                    placeholder="Masukkan pesan anda"
                                    required
                                ></textarea>
                            </div>

                            <!-- Tombol Kirim Pesan dengan animasi -->
                            <div data-aos="fade-up" data-aos-delay="300">
                                <button
                                    type="submit"
                                    class="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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

    <x-footer />

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();

        function handleWhatsAppSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            const targetWhatsAppNumber = "6289525456346";
            
            const whatsappMessage = `Halo Zoeliez Ilux Snack Ponorogo!\n\nNama: ${name}\nPesan: ${message}\n\nSaya ingin bertanya lebih lanjut.`;
            
            const phoneNumber = targetWhatsAppNumber.replace(/[\s+-]/g, '');

            if (phoneNumber) {
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            } else {
                alert("Nomor telepon tidak tersedia. Silakan hubungi secara manual.");
            }

            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
        }
    </script>
</body>
</html>
