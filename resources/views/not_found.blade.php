<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['app_name'] ?? 'Chatalog' }} - Halaman Tidak Ditemukan</title>
    
    <!-- Tailwind CSS -->
    <!-- Tailwind CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 min-h-screen flex flex-col">

    <x-navbar />

    <div class="flex-grow flex items-center justify-center p-10">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-orange-500 mb-4">404</h1>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
            <p class="text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
            <a href="/home" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md">
                Kembali ke Beranda
            </a>
        </div>
    </div>

    <x-footer />

</body>
</html>
