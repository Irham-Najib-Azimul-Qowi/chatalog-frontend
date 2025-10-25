import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; 

function ProductCard({ product, cartItem, onAddToCart, onRemoveFromCart }) {
  const quantity = cartItem ? cartItem.quantity : 0;

  // --- LOGIKA URL GAMBAR BARU UNTUK LOKAL IMAGE ---
  let imageUrl = 'https://via.placeholder.com/400x400?text=No+Image'; // Default fallback

  if (product.image) {
    // Asumsi: Jika product.image adalah path lokal (tidak dimulai dengan http/https),
    // maka kita perlu menambahkan base URL backend.
    // Contoh path lokal: 'dummy_images/products/keripik_singkong.jpg'
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      imageUrl = product.image; // Jika product.image sudah URL lengkap (dari admin atau seeder lain)
    } else {
      // Ini untuk gambar dari seeder dummy_images/products/
      imageUrl = `http://127.0.0.1:8000/${product.image}`; 
    }
  }
  // --- AKHIR LOGIKA ---

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full 
                            transform hover:-translate-y-1 transition-transform duration-300
                            w-full max-w-xs mx-auto min-w-0">

        <div className="relative w-full pb-[100%] bg-gray-100 overflow-hidden">
            <img
                src={imageUrl} // Gunakan imageUrl yang sudah diproses
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover" 
            />
        </div>

      <div className="p-3 flex-grow flex flex-col justify-between"> 
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{product.name}</h3> 

        <p className="text-lg font-bold text-orange-600 mt-1"> 
            Rp {product.price ? product.price.toLocaleString('id-ID') : '0'}
        </p>

        <div className="mt-3 flex justify-end"> 
          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-orange-500 text-white font-bold py-2 px-3 rounded-md transition-colors hover:bg-orange-600 flex items-center space-x-1 text-sm"
            >
              <FaPlus className="text-sm" />
              <span>Tambah</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1"> 
              <button
                onClick={() => onRemoveFromCart(product)}
                className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-base"
              >
              <FaMinus />
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors text-base"
              >
              <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;