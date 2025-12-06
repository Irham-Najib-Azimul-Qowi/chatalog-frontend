@props(['cart', 'totalPrice'])

<!-- Checkout Modal -->
<div id="checkout-modal" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 hidden">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
        <form id="checkout-form" action="{{ env('BACKEND_URL') }}/api/checkout" method="POST">
            @csrf
            <div class="p-5 border-b">
                <h3 class="text-xl font-semibold text-gray-800">Detail Pengiriman</h3>
                <p class="text-sm text-gray-500 mt-1">Satu langkah lagi untuk menyelesaikan pesanan Anda.</p>
            </div>

            <div class="p-6 space-y-4">
                <div>
                    <label htmlFor="customer_name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                        id="customer_name" name="customer_name" type="text"
                        required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Masukkan nama Anda"
                    />
                </div>
                <div>
                    <label htmlFor="customer_address" class="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
                    <textarea
                        id="customer_address" name="customer_address" rows="3"
                        required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Masukkan alamat lengkap Anda"
                    ></textarea>
                </div>
                <div class="border-t pt-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Total Item</span>
                        <span class="font-semibold" id="checkout-total-items">
                            {{ collect($cart)->sum('quantity') }}
                        </span>
                    </div>
                    <div class="flex justify-between font-bold text-lg mt-2">
                        <span>Total Harga</span>
                        <span>Rp {{ number_format($totalPrice, 0, ',', '.') }}</span>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-gray-50 flex justify-end space-x-3">
                <button type="button" id="close-checkout-btn" class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                    Batal
                </button>
                <button type="submit" id="submit-checkout-btn" class="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300 transition flex items-center">
                    <span id="btn-text">Pesan via WhatsApp</span>
                    <svg id="btn-spinner" class="animate-spin ml-2 h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const checkoutModal = document.getElementById('checkout-modal');
        const closeCheckoutBtn = document.getElementById('close-checkout-btn');
        const checkoutForm = document.getElementById('checkout-form');
        const submitBtn = document.getElementById('submit-checkout-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');

        // Logic to open modal should be handled by parent/trigger button
        // Example: document.getElementById('open-checkout-btn').addEventListener('click', () => checkoutModal.classList.remove('hidden'));

        if (closeCheckoutBtn) {
            closeCheckoutBtn.addEventListener('click', function() {
                checkoutModal.classList.add('hidden');
            });
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                // Optional: Prevent default if you want to handle via AJAX, 
                // but for now we let it submit to the API route or handle it here to redirect to WA.
                
                // If we want to simulate the "Pesan via WhatsApp" directly here without backend processing:
                /*
                e.preventDefault();
                const name = document.getElementById('customer_name').value;
                const address = document.getElementById('customer_address').value;
                // ... logic to construct WA link ...
                */
               
               // Visual feedback
               submitBtn.disabled = true;
               btnText.innerText = 'Memproses...';
               btnSpinner.classList.remove('hidden');
            });
        }
        
        // Close on click outside
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                checkoutModal.classList.add('hidden');
            }
        });
    });
</script>
