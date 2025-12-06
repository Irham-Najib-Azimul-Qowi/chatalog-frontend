@extends('layouts.admin')

@section('content')
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Pengaturan Konten & Gambar</h2>

    <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Landing Page Slider</h3>
        <p class="text-gray-500 mb-4 text-sm">Upload gambar untuk slider di halaman utama.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Slider 1 -->
            <div>
                <label class="block font-bold mb-2">Slider 1</label>
                <img id="preview-slider1" src="https://via.placeholder.com/300x150" class="w-full h-32 object-cover mb-2 rounded bg-gray-100">
                <input type="file" onchange="uploadImage('lp_slider_img1', this)" class="text-sm">
            </div>
            <!-- Slider 2 -->
            <div>
                <label class="block font-bold mb-2">Slider 2</label>
                <img id="preview-slider2" src="https://via.placeholder.com/300x150" class="w-full h-32 object-cover mb-2 rounded bg-gray-100">
                <input type="file" onchange="uploadImage('lp_slider_img2', this)" class="text-sm">
            </div>
            <!-- Slider 3 -->
            <div>
                <label class="block font-bold mb-2">Slider 3</label>
                <img id="preview-slider3" src="https://via.placeholder.com/300x150" class="w-full h-32 object-cover mb-2 rounded bg-gray-100">
                <input type="file" onchange="uploadImage('lp_slider_img3', this)" class="text-sm">
            </div>
        </div>
    </div>

    <!-- Teks Landing Page (Contoh Cepat) -->
    <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Teks Halaman Utama</h3>
        <form onsubmit="updateSettings(event)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Headline</label>
                    <input type="text" id="landing_page_headline" class="shadow border rounded w-full py-2 px-3">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Tagline</label>
                    <input type="text" id="landing_page_tagline" class="shadow border rounded w-full py-2 px-3">
                </div>
            </div>
            <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Simpan Teks</button>
        </form>
    </div>
@endsection

@push('scripts')
<script>
    // Load Settings
    fetch('{{ env('BACKEND_URL') }}/api/settings')
        .then(res => res.json())
        .then(data => {
            // Set Images
            if(data.lp_slider_img1) document.getElementById('preview-slider1').src = data.lp_slider_img1;
            if(data.lp_slider_img2) document.getElementById('preview-slider2').src = data.lp_slider_img2;
            if(data.lp_slider_img3) document.getElementById('preview-slider3').src = data.lp_slider_img3;

            // Set Inputs
            if(data.landing_page_headline) document.getElementById('landing_page_headline').value = data.landing_page_headline;
            if(data.landing_page_tagline) document.getElementById('landing_page_tagline').value = data.landing_page_tagline;
        });

    function uploadImage(key, input) {
        if (!input.files || !input.files[0]) return;

        const formData = new FormData();
        formData.append('image_key', key);
        formData.append('image', input.files[0]);

        // Show loading state potentially
        
        fetch('{{ rtrim(env('BACKEND_URL'), '/') }}/api/settings/image', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert('Gambar berhasil diupdate');
            // Update preview
            // Ideally re-fetch or use file reader, but simplified:
            location.reload(); 
        })
        .catch(err => {
            console.error(err);
            alert('Gagal upload gambar');
        });
    }

    function updateSettings(e) {
        e.preventDefault();
        // This part requires a backend endpoint to update multiple key-values.
        // Assuming we could add one, orloop.
        alert('Fitur update teks belum diimplementasikan di backend demo ini, fokus pada gambar.');
    }
</script>
@endpush
