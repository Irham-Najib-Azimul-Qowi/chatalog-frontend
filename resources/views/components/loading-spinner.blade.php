<!-- Loading Spinner Component -->
<!-- 
    Secara default hidden. 
    Gunakan JS untuk menghapus class 'hidden' saat ingin menampilkannya.
    Contoh: document.getElementById('loading-spinner').classList.remove('hidden');
-->
<div id="loading-spinner" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm hidden">
    <div class="flex flex-col items-center">
        <div class="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full mb-4"></div>
        <p class="text-orange-500 font-semibold">Memuat...</p>
    </div>
</div>
