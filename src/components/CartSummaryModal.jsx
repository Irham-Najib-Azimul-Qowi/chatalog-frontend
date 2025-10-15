import React from 'react';

function CartSummaryModal({ isOpen, onClose, onCheckout, cart, totalPrice, totalItems }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50">
      <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-lg animate-slide-in-up">
        {/* Header Modal */}
        <div className="p-4 border-b text-center relative">
          <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
          <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-500">&times;</button>
        </div>

        {/* Daftar Item */}
        <div className="p-4 max-h-64 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="bg-orange-500 text-white font-bold rounded-md w-7 h-7 flex items-center justify-center mr-3">
                  {item.quantity}
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-gray-700">Rp {new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Pembayaran</span>
            <span>Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}</span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="p-4">
          <button
            onClick={onCheckout}
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Lanjut ke Pengiriman ({totalItems} item)
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryModal;