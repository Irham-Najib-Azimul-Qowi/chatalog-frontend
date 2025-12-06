<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['app_name'] ?? 'Chatalog' }} - Tentang Kami</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Slick Carousel CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"/>
    
    <!-- AOS Animation CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

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

        <!-- Hero Slider -->
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
                        <div class="h-screen flex flex-col justify-center items-center text-white p-6 relative bg-cover bg-center bg-no-repeat"
                             style="background-image: url('{{ $imageUrl }}');">
                            
                            <div class="absolute inset-0 bg-black opacity-40"></div>

                            <div class="relative z-10 transition-opacity duration-500 max-w-lg text-center">
                                <h1 class="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-2 text-white"
                                    data-aos="fade-down" data-aos-delay="500">
                                    {{ $slide['title'] }}
                                </h1>
                                <p class="text-lg md:text-xl text-white"
                                   data-aos="fade-up" data-aos-delay="700">
                                    {{ $slide['description'] }}
                                </p>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </header>

        <!-- KONTEN CERITA dengan ANIMASI -->
        <div class="py-12 lg:py-20">
            <div class="container mx-auto px-6 max-w-6xl">
                @foreach($storySections as $section)
                    @php
                        $imageUrl = 'https://via.placeholder.com/1920x1080?text=No+Image';
                        if (!empty($section['image'])) {
                            if (Str::startsWith($section['image'], ['http://', 'https://'])) {
                                $imageUrl = $section['image'];
                            } elseif (Str::startsWith($section['image'], 'dummy_images')) {
                                $imageUrl = asset($section['image']);
                            } elseif (Str::startsWith($section['image'], 'storage/')) {
                                $imageUrl = asset($section['image']);
                            } else {
                                // Assuming images in storySections might be in dummy_images based on React code example
                                // React code: if (path.startsWith('dummy_images')) ...
                                // The hardcoded data has "about_jajanan_pasar.jpg".
                                // In React: BASE_IMAGE_URL = 'http://.../dummy_images/about/';
                                // So we should prepend 'dummy_images/about/' if it's just a filename?
                                // Let's check the hardcoded data in HomeController.
                                // It is just "about_jajanan_pasar.jpg".
                                // So we need to construct the path.
                                $imageUrl = asset('dummy_images/about/' . $section['image']);
                            }
                        }
                    @endphp
                    <div class="flex flex-col {{ $section['layout'] === 'image-left' ? 'lg:flex-row' : 'lg:flex-row-reverse' }} items-center gap-8 lg:gap-12 mb-16 lg:mb-24">
                        
                        <!-- Gambar dengan animasi slide dari samping -->
                        <div class="w-full lg:w-1/2 rounded-lg shadow-lg overflow-hidden flex-shrink-0"
                             data-aos="{{ $section['layout'] === 'image-left' ? 'fade-right' : 'fade-left' }}"
                             data-aos-duration="1000">
                            <img src="{{ $imageUrl }}"
                                 alt="{{ $section['imageAlt'] }}"
                                 class="w-full h-auto object-cover">
                        </div>

                        <!-- Teks dengan animasi fade dari arah berlawanan -->
                        <div class="w-full lg:w-1/2 text-center lg:text-left"
                             data-aos="{{ $section['layout'] === 'image-left' ? 'fade-left' : 'fade-right' }}"
                             data-aos-duration="1000"
                             data-aos-delay="200">
                            <h2 class="text-3xl font-semibold text-gray-800 mb-4">
                                {{ $section['title'] }}
                            </h2>
                            <p class="text-gray-700 leading-relaxed text-lg">
                                {{ $section['text'] }}
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <x-footer />

    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

    <script>
        $(document).ready(function(){
            // Initialize AOS
            AOS.init();

            // Initialize Slick Slider
            $('.hero-slider').slick({
                dots: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                fade: true,
                arrows: false, // React code had arrows: false
                pauseOnHover: true
            });
        });
    </script>
</body>
</html>
