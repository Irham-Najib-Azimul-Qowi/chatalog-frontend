import React from 'react';

function ProductCard({ product, cartItem, onAddToCart, onRemoveFromCart }) {
  const quantity = cartItem ? cartItem.quantity : 0;

  // URL gambar, digabungkan dengan base URL backend
  const imageUrl = `http://127.0.0.1:8000/storage/${product.image}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img
        src={product.image ? imageUrl : 'https://via.placeholder.com/400x300'} // Gambar placeholder jika tidak ada
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
        
        <div className="mt-4 flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full transition-colors hover:bg-orange-600"
            >
              Tambah
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRemoveFromCart(product)}
                className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full font-bold text-lg"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-orange-500 text-white w-8 h-8 rounded-full font-bold text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;