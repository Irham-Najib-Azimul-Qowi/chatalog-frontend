@extends('layouts.admin')

@section('content')
    <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Profil Admin</h2>
        
        <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center mb-8">
                <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
                    A
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Admin Utama</h3>
                    <p class="text-gray-500">Administrator</p>
                </div>
            </div>

            <form onsubmit="handleProfileUpdate(event)">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">Nama Lengkap</label>
                        <input type="text" id="name" class="w-full border rounded px-3 py-2" value="Admin">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">Nomor Telepon</label>
                        <input type="text" id="phone" class="w-full border rounded px-3 py-2" value="6289525456346">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Password Baru (Opsional)</label>
                    <input type="password" id="password" class="w-full border rounded px-3 py-2" placeholder="Kosongkan jika tidak ingin mengubah">
                </div>

                <button type="submit" class="bg-orange-500 text-white font-bold py-2 px-6 rounded hover:bg-orange-600">Simpan Perubahan</button>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    function handleProfileUpdate(e) {
        e.preventDefault();
        alert('Fitur update profil akan berfungsi jika endpoint API backend terhubung sepenuhnya. UI sudah siap.');
    }
</script>
@endpush
