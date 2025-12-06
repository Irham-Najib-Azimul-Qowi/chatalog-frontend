@extends('layouts.admin')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Manajemen Pengguna</h2>
        <button onclick="alert('Fitur tambah admin')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-user-plus mr-2"></i> Tambah Admin
        </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full leading-normal">
            <thead>
                <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Telepon</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <!-- Placeholder Data -->
                <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">Admin Utama</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">6289525456346</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"><span class="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Admin</span></td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button class="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">User Spesifik</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">087864307597</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"><span class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">User</span></td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button class="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button class="text-red-600 hover:text-red-900">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection
