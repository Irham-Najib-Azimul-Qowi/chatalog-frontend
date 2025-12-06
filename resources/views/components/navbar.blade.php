<nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between relative">

        <!-- Bagian Kiri Navbar (Link Navigasi) -->
        <div class="flex-1 flex items-center space-x-8 pl-8">
            <div class="hidden md:flex items-center space-x-6" id="nav-links">
                <a href="{{ url('/catalog') }}" class="text-gray-600 hover:text-orange-500">Produk</a>
                <a href="{{ url('/about') }}" class="text-gray-600 hover:text-orange-500">Tentang Kami</a>
                <a href="{{ url('/contact') }}" class="text-gray-600 hover:text-orange-500">Kontak</a>
                
                <!-- Admin Link (Hidden by default, shown via JS) -->
                <a href="{{ url('/admin/dashboard') }}" id="nav-admin-link" class="hidden text-orange-600 hover:text-orange-800 font-bold">Admin</a>
            </div>
        </div>

        <!-- Bagian Tengah Navbar (Logo) -->
        <div class="absolute left-1/2 -translate-x-1/2">
            <a href="{{ url('/home') }}" class="flex items-center">
                <img
                    src="{{ asset('dummy_images/logo/Logo-Zoeliez-Ilux.png') }}"
                    alt="Zoeliez Ilux Snack Ponorogo Logo"
                    class="h-16 w-auto"
                />
            </a>
        </div>


        <!-- Bagian Kanan Navbar (Tombol Profil/Login) -->
        <div class="flex-1 flex justify-end relative pr-8">
            <!-- Profile Dropdown (Hidden by default, shown via JS) -->
            <div id="nav-profile-container" class="hidden relative">
                <button
                    id="profile-menu-btn"
                    class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md focus:outline-none hover:bg-orange-600 transition"
                >
                    <i class="fas fa-user"></i>
                </button>

                <!-- Menu Dropdown Profil -->
                <div id="profile-menu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 hidden border border-gray-100">
                    <div class="py-2">
                        <div class="px-4 py-2 border-b">
                            <p class="text-sm font-bold text-gray-800">Admin</p>
                            <p class="text-xs text-gray-500">Administrator</p>
                        </div>
                        <a href="{{ url('/admin/profile') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                            <i class="fas fa-cog mr-2"></i> Pengaturan
                        </a>
                        <button onclick="handleLogout()" class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <i class="fas fa-sign-out-alt mr-2"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // --- AUTH CHECK ---
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            // User Logged In
            const adminLink = document.getElementById('nav-admin-link');
            const profileContainer = document.getElementById('nav-profile-container');
            
            if (adminLink) adminLink.classList.remove('hidden');
            if (profileContainer) profileContainer.classList.remove('hidden');
        } else {
            // User Guest
            // Nothing to do, elements are hidden by default
        }

        // --- MENU INTERACTION ---
        const profileBtn = document.getElementById('profile-menu-btn');
        const profileMenu = document.getElementById('profile-menu');

        if (profileBtn && profileMenu) {
            // Toggle menu
            profileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                profileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                    profileMenu.classList.add('hidden');
                }
            });
        }
    });

    function handleLogout() {
        // We will just clear the client side token and redirect
        // Ideally call backend API to invalidate token too
        localStorage.removeItem('adminToken');
        window.location.href = '/home';
    }

</script>
