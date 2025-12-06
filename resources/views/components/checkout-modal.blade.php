<!-- resources/views/components/checkout-modal.blade.php -->
<div id="checkout-modal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onclick="closeCheckoutModal()"></div>

        <!-- Modal panel -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Checkout Pesanan
                        </h3>
                        <div class="mt-4">
                            <form id="checkout-form" onsubmit="handleCheckout(event)">
                                <div class="mb-4">
                                    <label for="customer_name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input type="text" id="customer_name" name="customer_name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500">
                                </div>
                                <div class="mb-4">
                                    <label for="customer_address" class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                                    <textarea id="customer_address" name="customer_address" rows="3" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500"></textarea>
                                </div>
                                
                                <div class="mt-4 border-t pt-4">
                                    <p class="text-sm text-gray-500">Total Pembayaran:</p>
                                    <p class="text-xl font-bold text-orange-600" id="checkout-total-price">Rp 0</p>
                                </div>

                                <div class="mt-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" id="checkout-btn" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Pesan via WhatsApp
                                    </button>
                                    <button type="button" onclick="closeCheckoutModal()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
