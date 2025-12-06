@extends('layouts.admin')

@section('content')
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Tambah Produk Baru</h2>
        
        <form onsubmit="handleCreateProduct(event)">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Nama Produk</label>
                <input type="text" id="name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Deskripsi</label>
                <textarea id="description" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Harga (Rp)</label>
                <input type="number" id="price" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">Gambar Produk</label>
                <input type="file" id="image" accept="image/*" class="w-full">
            </div>
            
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Simpan Produk
                </button>
                <a href="{{ url('/admin/products') }}" class="text-gray-500 hover:text-gray-800 font-bold">Batal</a>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
<script>
    function handleCreateProduct(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        
        const imageFile = document.getElementById('image').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        fetch('{{ env('BACKEND_URL') }}/api/products', {
            method: 'POST',
            // headers: { 'Authorization': ... }, // Add auth if strictly enforced
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert('Produk berhasil ditambahkan!');
            window.location.href = '/admin/products';
        })
        .catch(err => {
            console.error(err);
            alert('Gagal menambahkan produk.');
        });
    }
</script>
@endpush
