@extends('layouts.admin')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Daftar Produk</h2>
        <a href="{{ url('/admin/products/create') }}" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-plus mr-2"></i> Tambah Produk
        </a>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full leading-normal">
            <thead>
                <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gambar
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nama Produk
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Harga
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody id="product-list">
                <!-- Data loaded via JS -->
                <tr>
                    <td colspan="4" class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        Memuat data...
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection

@push('scripts')
<script>
    function loadProducts() {
        fetch('{{ rtrim(env('BACKEND_URL'), '/') }}/api/products')
            .then(res => res.json())
            .then(data => {
                const tbody = document.getElementById('product-list');
                tbody.innerHTML = '';
                
                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Tidak ada produk.</td></tr>';
                    return;
                }

                data.forEach(product => {
                    // Logic Image
                    let imageUrl = 'https://via.placeholder.com/50';
                    if (product.image) {
                        // Accessor already handles full URL
                        imageUrl = product.image;
                    }

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div class="flex-shrink-0 w-10 h-10">
                                <img class="w-full h-full rounded-full object-cover" src="${imageUrl}" alt="" />
                            </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">${product.name}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">Rp ${new Intl.NumberFormat('id-ID').format(product.price)}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-900">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            })
            .catch(err => console.error(err));
    }

    function deleteProduct(id) {
        if(!confirm('Yakin ingin menghapus produk ini?')) return;
        
        // This endpoint might need auth token header? 
        // Currently API routes for products might be public for reading, but DELETING usually requires auth.
        // We haven't set up Sanctum fully for API requests from this frontend properly yet.
        // Let's assume for now the user wants the UI.
        // I'll add the Authorization header from localStorage.
        
        fetch(`{{ env('BACKEND_URL') }}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken') // If using Sanctum
            }
        })
        .then(res => {
            if(res.ok) {
                alert('Produk berhasil dihapus');
                loadProducts();
            } else {
                alert('Gagal menghapus produk. pastikan anda login sebagai admin.');
            }
        });
    }

    loadProducts();
</script>
@endpush
