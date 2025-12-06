<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['app_name'] ?? 'Chatalog' }} - Home</title>
    
    <!-- Tailwind CSS -->
    <!-- Tailwind CSS -->
    <!-- Tailwind CSS (via CDN) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Slick Carousel CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"/>

    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- AOS Animation CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- CountUp.js is not strictly needed for simple count, I can write a small function. -->

    <style>
        /* Custom Overrides for Slick Arrows */
        .slick-prev, .slick-next {
            z-index: 20;
            width: 40px;
            height: 40px;
        }
        .slick-prev { left: 20px; }
        .slick-next { right: 20px; }
        .slick-prev:before, .slick-next:before {
            font-size: 40px;
            opacity: 0.75;
        }
        
        /* Font Serif for Headings */
        .font-serif {
            font-family: 'Georgia', serif;
        }
    </style>
</head>
<body class="bg-gray-50">

    <x-navbar />

    <div class="min-h-screen">

        <!-- Hero Section dengan Slider -->
        <header class="relative w-full h-screen overflow-hidden">
            <div class="hero-slider w-full h-full">
                @foreach($slides as $slide)
                    @php
                        $imageUrl = 'https://via.placeholder.com/1920x1080?text=No+Image';
                        if (!empty($slide['image_url'])) {
                            if (Str::startsWith($slide['image_url'], ['http://', 'https://'])) {
                                $imageUrl = $slide['image_url'];
                            } elseif (Str::startsWith($slide['image_url'], 'dummy_images')) {
                                $imageUrl = asset($slide['image_url']);
                            } elseif (Str::startsWith($slide['image_url'], 'storage/')) {
                                $imageUrl = asset($slide['image_url']);
                            } else {
                                $imageUrl = asset('storage/' . $slide['image_url']);
                            }
                        }
                    @endphp
                    <div class="w-full h-full relative">
                        <div class="h-screen flex flex-col justify-end items-start text-white p-6 relative bg-cover bg-center"
                             style="background-image: url('{{ $imageUrl }}');">
                            
                            <div class="absolute inset-0 bg-black opacity-40"></div>

                            <div class="relative z-10 max-w-lg mb-12 lg:ml-20 md:ml-10 ml-5" data-aos="fade-up" data-aos-duration="1000">
                                <h1 class="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 text-white">
                                    {{ $slide['title'] }}
                                </h1>
                                <p class="text-lg md:text-xl text-white" data-aos="fade-up" data-aos-delay="200">
                                    {{ $slide['description'] }}
                                </p>
                                <a href="{{ url('/produk') }}"
                                   class="mt-6 inline-block bg-orange-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-orange-600"
                                   data-aos="fade-up" data-aos-delay="400">
                                    Lihat Produk
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </header>

        <!-- --- SEKSI "KENAPA MEMILIH KAMI?" dengan ANIMASI --- -->
        <section class="bg-white py-20">
            <div class="container mx-auto px-6 text-center">
                <!-- Judul Section -->
                <h2 class="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-down">
                    {{ $settings['lp_section_title'] ?? 'Kenapa Memilih Kami?' }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">

                    <!-- POIN 1 -->
                    <div class="feature-item flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                        <div class="bg-orange-100 text-orange-500 p-4 rounded-full mb-4 hover:scale-110 transition-transform">
                            <i class="fas fa-leaf text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">{{ $settings['lp_item1_title'] ?? 'Bahan Terbaik' }}</h3>
                        <p class="text-gray-600">{{ $settings['lp_item1_text'] ?? 'Kami hanya menggunakan bahan-bahan pilihan berkualitas tinggi.' }}</p>
                    </div>

                    <!-- POIN 2 -->
                    <div class="feature-item flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="bg-orange-100 text-orange-500 p-4 rounded-full mb-4 hover:scale-110 transition-transform">
                            <i class="fas fa-heart text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">{{ $settings['lp_item2_title'] ?? 'Dibuat Penuh Cinta' }}</h3>
                        <p class="text-gray-600">{{ $settings['lp_item2_text'] ?? 'Setiap produk dibuat dengan dedikasi dan perhatian penuh.' }}</p>
                    </div>

                    <!-- POIN 3 -->
                    <div class="feature-item flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                        <div class="bg-orange-100 text-orange-500 p-4 rounded-full mb-4 hover:scale-110 transition-transform">
                            <i class="fas fa-shield-alt text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">{{ $settings['lp_item3_title'] ?? 'Jaminan Kualitas' }}</h3>
                        <p class="text-gray-600">{{ $settings['lp_item3_text'] ?? 'Kepuasan Anda adalah prioritas utama kami.' }}</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- --- SEKSI PENGHITUNG MITRA dengan ANIMASI --- -->
        <section id="partners-section" class="bg-orange-50 py-20 text-center">
            <div class="container mx-auto px-6">
                <!-- Using Flexbox for Layout as before but added Counter Logic -->
                <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">

                    <div class="text-gray-600 text-base md:text-lg font-normal text-right" data-aos="fade-right">
                        <p>Sebanyak</p>
                    </div>

                    <div class="text-orange-500 text-6xl md:text-8xl font-bold tracking-tight" data-aos="zoom-in">
                        <span id="partners-count" data-target="58">0</span>
                    </div>

                    <div>
                        <p class="text-orange-500 text-base md:text-l font-normal text-left" data-aos="fade-left">Mitra</p>
                    </div>

                    <div class="text-gray-600 text-base md:text-lg font-normal text-left" data-aos="fade-left" data-aos-delay="100">
                        <p>Bekerja Sama Dengan Kami</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- --- SEKSI CALL TO ACTION dengan ANIMASI --- -->
        <section class="bg-white py-20">
            <div class="container mx-auto px-6 text-center" data-aos="fade-up">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">
                    {{ $settings['lp_cta_title'] ?? 'Lihat Apa yang Kami Tawarkan' }}
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto mb-8">
                    {{ $settings['lp_cta_text'] ?? 'Jelajahi katalog lengkap kami.' }}
                </p>
                <div>
                    <a href="{{ url('/produk') }}"
                       class="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 inline-block hover:scale-105 transition-transform">
                        Lihat Semua Produk
                    </a>
                </div>
            </div>
        </section>

        <x-footer />

    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    <!-- AOS JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

    <script>
        $(document).ready(function(){
            // Initialize AOS
            AOS.init({
                once: true, // Animation only happens once
                offset: 100,
            });

            // Initialize Slick Slider
            $('.hero-slider').slick({
                dots: true,
                infinite: true,
                speed: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true, // Enable autoplay
                autoplaySpeed: 5000,
                fade: false,
                cssEase: 'linear',
                arrows: true,
                pauseOnHover: true,
                prevArrow: '<button type="button" class="slick-prev text-white"><i class="fas fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next text-white"><i class="fas fa-chevron-right"></i></button>'
            });

            // Counter Animation
            const counters = document.querySelectorAll('#partners-count');
            const speed = 200; // The lower the slower

            const animateCounters = () => {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Lower inc to slow and higher to slow
                        const inc = target / speed;

                        if (count < target) {
                            // Add inc to count and output in counter
                            counter.innerText = Math.ceil(count + inc);
                            // Call function every ms
                            setTimeout(updateCount, 15);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            };

            // Trigger animation when section is in view using Intersection Observer
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const partnersSection = document.querySelector('#partners-section');
            if(partnersSection) {
                observer.observe(partnersSection);
            }
        });
    </script>
</body>
</html>
