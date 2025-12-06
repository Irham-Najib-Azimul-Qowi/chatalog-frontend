@extends('layouts.admin')

@section('content')
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Stats Card 1 -->
        <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-4 bg-orange-100 rounded-full text-orange-500 mr-4">
                <i class="fas fa-boxes text-2xl"></i>
            </div>
            <div>
                <p class="text-gray-500 text-sm">Total Produk</p>
                <p class="text-2xl font-bold text-gray-800" id="stat-products">...</p>
            </div>
        </div>
        
        <!-- Stats Card 2 -->
        <div class="bg-white rounded-lg shadow p-6 flex items-center">
            <div class="p-4 bg-blue-100 rounded-full text-blue-500 mr-4">
                <i class="fas fa-users text-2xl"></i>
            </div>
            <div>
                <p class="text-gray-500 text-sm">Total User</p>
                <p class="text-2xl font-bold text-gray-800">15+</p>
            </div>
        </div>

        <!-- Quick Action -->
        <div class="bg-white rounded-lg shadow p-6 flex items-center justify-between">
            <div>
                <h3 class="font-bold text-lg mb-1">Tambah Produk</h3>
                <p class="text-gray-500 text-sm">Upload produk baru ke katalog</p>
            </div>
            <a href="{{ url('/admin/products/create') }}" class="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg">
                <i class="fas fa-plus"></i>
            </a>
        </div>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="font-bold text-xl mb-4">Pengaturan Website</h3>
            <p class="text-gray-600 mb-4">Ubah gambar slider, teks landing page, dan informasi kontak.</p>
            <a href="{{ url('/admin/settings') }}" class="text-orange-600 font-semibold hover:underline">Kelola Konten &rarr;</a>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="font-bold text-xl mb-4">Akun Admin</h3>
            <p class="text-gray-600 mb-4">Update profil, password, dan kelola admin lainnya.</p>
            <a href="{{ url('/admin/profile') }}" class="text-orange-600 font-semibold hover:underline">Kelola Profil &rarr;</a>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Fetch dashboard stats
    fetch('{{ env('BACKEND_URL') }}/api/products') // Simple check
        .then(res => res.json())
        .then(data => {
            document.getElementById('stat-products').innerText = data.length || 0;
        })
        .catch(err => console.error(err));
</script>
@endpush
