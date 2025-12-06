<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Dashboard - Chatalog</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        // Auth Guard
        if (!localStorage.getItem('adminToken')) {
            window.location.href = '/admin/login';
        }
    </script>
</head>
<body class="bg-gray-50 flex flex-col min-h-screen">

    <!-- Re-use Public Navbar -->
    <x-navbar />

    <!-- Admin Sub-Menu / Header -->
    <div class="bg-gray-800 text-white shadow-md">
        <div class="container mx-auto px-6 py-3 flex overflow-x-auto space-x-6">
            <a href="{{ url('/admin/dashboard') }}" class="hover:text-orange-400 {{ request()->is('admin/dashboard') ? 'text-orange-400 font-bold' : '' }}">
                <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
            </a>
            <a href="{{ url('/admin/products') }}" class="hover:text-orange-400 {{ request()->is('admin/products*') ? 'text-orange-400 font-bold' : '' }}">
                <i class="fas fa-box mr-2"></i> Produk
            </a>
            <a href="{{ url('/admin/settings') }}" class="hover:text-orange-400 {{ request()->is('admin/settings*') ? 'text-orange-400 font-bold' : '' }}">
                <i class="fas fa-images mr-2"></i> Konten
            </a>
            <a href="{{ url('/admin/users') }}" class="hover:text-orange-400 {{ request()->is('admin/users*') ? 'text-orange-400 font-bold' : '' }}">
                <i class="fas fa-users mr-2"></i> Users
            </a>
        </div>
    </div>

    <!-- Main Content Area -->
    <main class="flex-grow container mx-auto px-6 py-8">
        @yield('content')
    </main>

    <!-- Re-use Public Footer -->
    <x-footer />

    @stack('scripts')
</body>
</html>
