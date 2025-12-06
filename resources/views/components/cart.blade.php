@props(['cart', 'totalPrice', 'totalItems'])

<!-- Cart Summary Modal -->
<div id="cart-modal" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50 hidden">
    <div class="bg-white rounded-t-2xl shadow-xl w-full max-w-lg animate-slide-in-up">
        <!-- Header Modal -->
        <div class="p-4 border-b text-center relative">
            <h3 class="text-lg font-semibold">Ringkasan Pesanan</h3>
            <button id="close-cart-btn" class="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <!-- Daftar Item -->
        <div class="p-4 max-h-64 overflow-y-auto">
            @forelse($cart as $item)
                <div class="flex items-center justify-between py-2">
                    <div class="flex items-center">
                        <div class="bg-orange-500 text-white font-bold rounded-md w-7 h-7 flex items-center justify-center mr-3">
                            {{ $item['quantity'] }}
                        </div>
                        <span class="font-medium">{{ $item['name'] }}</span>
                    </div>
                    <span class="text-gray-700">Rp {{ number_format($item['price'] * $item['quantity'], 0, ',', '.') }}</span>
                </div>
            @empty
                <div class="text-center text-gray-500 py-4">Keranjang kosong.</div>
            @endforelse
        </div>

        <!-- Total -->
        <div class="p-4 border-t">
            <div class="flex justify-between font-bold text-lg">
                <span>Total Pembayaran</span>
                <span>Rp {{ number_format($totalPrice, 0, ',', '.') }}</span>
            </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="p-4">
            <button
                onclick="window.location.href='/api/checkout'" 
                class="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-200"
            >
                Lanjut ke Pengiriman ({{ $totalItems }} item)
            </button>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('cart-modal');
        const openBtn = document.getElementById('open-cart-btn'); // Assumes a button with this ID exists in the parent
        const closeBtn = document.getElementById('close-cart-btn');

        if (openBtn) {
            openBtn.addEventListener('click', function() {
                modal.classList.remove('hidden');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.add('hidden');
            });
        }

        // Tutup modal jika klik di luar area konten (overlay)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
</script>
