import React, { useState } from 'react';

function CheckoutModal({ isOpen, onClose, onSubmit, cart, totalPrice }) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerAddress) {
      alert('Nama dan Alamat wajib diisi.');
      return;
    }
    setIsLoading(true);
    // onSubmit adalah fungsi handleCheckoutSubmit dari HomePage
    await onSubmit({ name: customerName, address: customerAddress });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Detail Pengiriman</h3>
            <p className="text-sm text-gray-500 mt-1">Satu langkah lagi untuk menyelesaikan pesanan Anda.</p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                id="customer_name" type="text"
                value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label htmlFor="customer_address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
              <textarea
                id="customer_address" rows="3"
                value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}
                required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Masukkan alamat lengkap Anda"
              ></textarea>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Item</span>
                <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total Harga</span>
                <span>Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300">
              {isLoading ? 'Memproses...' : 'Pesan via WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;