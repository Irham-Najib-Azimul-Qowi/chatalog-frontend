import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import publicService from '../services/publicService';
import ProductCard from '../components/ProductCard';
import CheckoutModal from '../components/CheckoutModal';
import CartSummaryModal from '../components/CartSummaryModal'; 

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicService.getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
        toast.error("Tidak dapat memuat daftar produk.");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (accumulator, currentItem) => {
        accumulator.totalItems += currentItem.quantity;
        accumulator.totalPrice += currentItem.price * currentItem.quantity;
        return accumulator;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [cart]);

  const handleProceedToCheckout = () => {
    setSummaryModalOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = async (customerData) => {
    const payload = {
      customer_name: customerData.name,
      customer_address: customerData.address,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
    };
    const checkoutToast = toast.loading('Mempersiapkan pesanan...');
    try {
      const response = await publicService.processCheckout(payload);
      const whatsappUrl = response.data.whatsapp_url;
      toast.success('Berhasil! Mengarahkan ke WhatsApp...', { id: checkoutToast });
      setCart([]);
      setCheckoutModalOpen(false);
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error('Checkout Gagal:', error);
      toast.error('Gagal memproses pesanan.', { id: checkoutToast });
    }
  };

  return (
    <>
      <CartSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        onCheckout={handleProceedToCheckout}
        cart={cart}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onSubmit={handleCheckoutSubmit}
        cart={cart}
        totalPrice={totalPrice}
      />

      <div className="bg-orange-50 py-12 text-black text-center">
        <div className="container mx-auto px-4 max-w-screen-xl"> {/* Ganti max-w-7xl menjadi max-w-screen-xl */}
          <h1 className="text-4xl font-bold">Katalog Produk</h1>
          <p className="mt-2 text-lg">Temukan dan pilih produk favorit Anda.</p>
        </div>
      </div>

      {/* Ganti max-w-7xl menjadi max-w-screen-xl di container utama produk */}
      <div className="container mx-auto px-4 py-12 max-w-screen-xl"> {/* Ganti max-w-7xl menjadi max-w-screen-xl */}
        <div className="mb-8">
          <input 
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg mx-auto block px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-center">
          {/* Tambahkan w-full di grid untuk memaksa mengisi lebar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full"> 
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cart.find((item) => item.id === product.id)}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div 
            onClick={() => setSummaryModalOpen(true)}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:w-auto bg-orange-500 text-white rounded-lg shadow-lg p-3 flex items-center justify-between z-40 animate-slide-in-up cursor-pointer"
          >
            <div className='flex items-center gap-3'>
              <div className='bg-white text-orange-500 font-bold rounded-md w-8 h-8 flex items-center justify-center'>
                {totalItems}
              </div>
              <p> </p>
            </div>
            <div className="font-bold pr-2">
              Lihat Pesanan 
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPage;