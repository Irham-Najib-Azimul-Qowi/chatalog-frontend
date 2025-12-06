<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $settings['app_name'] ?? 'Chatalog' }} - Katalog Produk</title>
    
    <!-- Tailwind CSS -->
    <!-- Tailwind CSS (via CDN as requested to remove npm dependency) -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Slider Styles */
        .slider-container {
            position: relative;
            overflow: hidden;
            height: 400px; /* Adjust height as needed */
        }
        .slider-wrapper {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
        }
        .slide {
            min-width: 100%;
            height: 100%;
            position: relative;
        }
        .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .slide-content {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.4);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
            padding: 20px;
        }
    </style>
    
    <!-- AOS Animation CSS -->
    <!-- AOS Animation CSS Removed -->

    <style>
        /* Animations removed */
    </style>
</head>
<body class="bg-white">

    <x-navbar />

    <!-- Header Section -->
    <!-- Landing Page Slider -->
    @if(isset($settings['lp_slider_img1']) || isset($settings['lp_slider_img2']) || isset($settings['lp_slider_img3']))
        <div class="slider-container">
            <div class="slider-wrapper" id="hero-slider">
                @foreach(['lp_slider_img1', 'lp_slider_img2', 'lp_slider_img3'] as $key)
                    @if(!empty($settings[$key]))
                        <div class="slide">
                            <!-- Helper function or logic to handle full URL from accessor is already in Model, likely backend returns full URL if we use the API endpoint correctly. 
                                 However, if $settings is just key-value from API, we might need to verify if backend API returns full URL. 
                                 The SettingController in backend uses $item->value. 
                                 Wait, the accessor `getValueAttribute` is on the Model instance. 
                                 But in Controller `index` method: `Setting::all()->mapWithKeys(...)`. 
                                 If we access `$item->value`, it triggers the accessor AUTOMATICALLY in Laravel model? 
                                 YES, accessor format is get{Attribute}Attribute. 
                                 So simple $settings[$key] should be the full URL. 
                            -->
                            <img src="{{ $settings[$key] }}" alt="Slider Image">
                            <div class="slide-content">
                                <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $settings['landing_page_headline'] ?? 'Selamat Datang' }}</h1>
                                <p class="text-lg md:text-xl">{{ $settings['landing_page_tagline'] ?? '' }}</p>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
        
        <script>
            // Simple Auto Slider Script
            document.addEventListener('DOMContentLoaded', function() {
                const wrapper = document.getElementById('hero-slider');
                if(!wrapper) return;
                const slides = wrapper.children;
                if(slides.length <= 1) return;
                
                let index = 0;
                setInterval(() => {
                    index++;
                    if(index >= slides.length) index = 0;
                    wrapper.style.transform = `translateX(-${index * 100}%)`;
                }, 5000); // 5 seconds
            });
        </script>
    @else
        <!-- Fallback Static Header if no images -->
        <div class="bg-orange-50 py-12 text-black text-center">
            <div class="container mx-auto px-4 max-w-screen-xl">
                <h1 class="text-4xl font-bold">
                    {{ $settings['landing_page_headline'] ?? 'Katalog Produk' }}
                </h1>
                <p class="mt-2 text-lg">
                    {{ $settings['landing_page_tagline'] ?? 'Temukan dan pilih produk favorit Anda.' }}
                </p>
            </div>
        </div>
    @endif

    <div class="container mx-auto px-4 py-12 max-w-screen-xl min-h-screen">
        <!-- Search Bar -->
        <div class="mb-8">
            <input
                type="text"
                id="search-input"
                placeholder="Cari produk..."
                class="w-full max-w-lg mx-auto block px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                onkeyup="filterProducts()"
            />
        </div>

        <!-- Grid Produk -->
        <div class="flex justify-center">
            <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
                @foreach($products as $index => $product)
                    <div class="product-item" data-name="{{ strtolower($product['name']) }}">
                        <x-product-card :product="$product" />
                    </div>
                @endforeach
            </div>
            <div id="no-products-msg" class="hidden text-center text-gray-500 py-10">
                Produk tidak ditemukan.
            </div>
        </div>

        <!-- Cart Floating Button -->
        <div id="cart-float-btn" onclick="openCartModal()" class="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:w-auto bg-orange-500 text-white rounded-lg shadow-lg p-3 flex items-center justify-between gap-4 z-40 cursor-pointer hidden hover:bg-orange-600">
            <div class="flex items-center gap-3">
                <div class="bg-white text-orange-500 font-bold rounded-md w-8 h-8 flex items-center justify-center" id="cart-count">
                    0
                </div>
                <p>Item di Keranjang</p>
            </div>
            <div class="font-bold pr-2">
                Lihat Pesanan
            </div>
        </div>
    </div>

    <x-cart-summary-modal />
    <x-checkout-modal />

    <x-footer />

    <!-- Scripts -->
    <script>
        // AOS removed

        // Cart State
        let cart = [];

        // Load cart from localStorage if exists (optional, but good for persistence)
        // For now, we'll start empty as per React code which used state.
        // But to make it persistent across page reloads (since Blade reloads), we should use localStorage.
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Filter out invalid items (undefined price, id, etc)
                cart = parsedCart.filter(item => item && item.id && item.price && !isNaN(item.price));
                
                // If items were removed during cleanup, save the clean version
                if (cart.length !== parsedCart.length) {
                    saveCart();
                }
            } catch (e) {
                console.error("Error parsing cart:", e);
                cart = [];
                localStorage.removeItem('cart');
            }
            updateCartUI();
        }


        function filterProducts() {
            const input = document.getElementById('search-input');
            const filter = input.value.toLowerCase();
            const grid = document.getElementById('product-grid');
            const items = grid.getElementsByClassName('product-item');
            let visibleCount = 0;

            for (let i = 0; i < items.length; i++) {
                const name = items[i].getAttribute('data-name');
                if (name.includes(filter)) {
                    items[i].style.display = "";
                    visibleCount++;
                } else {
                    items[i].style.display = "none";
                }
            }

            const noMsg = document.getElementById('no-products-msg');
            if (visibleCount === 0) {
                noMsg.classList.remove('hidden');
            } else {
                noMsg.classList.add('hidden');
            }
        }

        // Global functions for ProductCard to call
        window.addToCart = function(id, name, price, imageUrl) {
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, image: imageUrl, quantity: 1 });
            }
            saveCart();
            updateCartUI();
        };

        window.removeFromCart = function(id) {
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    cart = cart.filter(item => item.id !== id);
                } else {
                    existingItem.quantity -= 1;
                }
                saveCart();
                updateCartUI();
            }
        };

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartUI() {
            // Update Floating Button
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const btn = document.getElementById('cart-float-btn');
            const countBadge = document.getElementById('cart-count');
            
            countBadge.innerText = totalItems;
            if (totalItems > 0) {
                btn.classList.remove('hidden');
                // Animation removed
            } else {
                btn.classList.add('hidden');
            }

            // Update Product Cards UI (Quantity badges)
            // This is tricky because ProductCard is rendered by Blade.
            // We need to update the DOM elements for each product card.
            // Assuming ProductCard has data-id attribute or similar.
            // In the previous step, ProductCard Blade component had JS to handle its own state?
            // Let's check ProductCard implementation.
            // It has `onclick="addToCart(...)"`.
            // We need to update the quantity display on the card itself if it exists.
            // The Blade component renders initial state.
            // We should add a JS function to update all cards based on cart state.
            
            document.querySelectorAll('.product-card-quantity').forEach(el => {
                const id = el.getAttribute('data-id');
                const item = cart.find(i => i.id == id);
                if (item) {
                    el.innerText = item.quantity;
                    el.closest('.product-card-actions').querySelector('.add-btn').classList.add('hidden');
                    el.closest('.product-card-actions').querySelector('.qty-controls').classList.remove('hidden');
                } else {
                    el.innerText = 0;
                    el.closest('.product-card-actions').querySelector('.add-btn').classList.remove('hidden');
                    el.closest('.product-card-actions').querySelector('.qty-controls').classList.add('hidden');
                }
            });
        }

        // Modal Functions
        function openCartModal() {
            const modal = document.getElementById('cart-summary-modal');
            const list = document.getElementById('cart-items-list');
            const totalEl = document.getElementById('cart-total-price');
            
            list.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                list.innerHTML = '<p class="text-gray-500 text-center py-4">Keranjang kosong.</p>';
            } else {
                cart.forEach(item => {
                    total += item.price * item.quantity;
                    const itemEl = document.createElement('div');
                    itemEl.className = 'flex justify-between items-center border-b pb-2 mb-2';
                    itemEl.innerHTML = `
                        <div class="flex items-center flex-1">
                            <img src="${item.image}" class="w-12 h-12 object-cover rounded mr-3">
                            <div>
                                <h4 class="font-medium text-gray-800 line-clamp-1">${item.name}</h4>
                                <p class="text-sm text-gray-500">Rp ${new Intl.NumberFormat('id-ID').format(item.price)} x ${item.quantity}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="font-bold text-gray-700">
                                Rp ${new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}
                            </div>
                            <button onclick="removeItemFromCart(${item.id})" class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50" title="Hapus Item">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `;
                    list.appendChild(itemEl);
                });
            }

            totalEl.innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(total);
            modal.classList.remove('hidden');
        }

        window.removeItemFromCart = function(id) {
            cart = cart.filter(item => item.id !== id);
            saveCart();
            updateCartUI();
            // Re-render modal list if it's open
            if (!document.getElementById('cart-summary-modal').classList.contains('hidden')) {
                openCartModal();
            }
        };


        function closeCartModal() {
            document.getElementById('cart-summary-modal').classList.add('hidden');
        }

        function openCheckoutModal() {
            closeCartModal();
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            document.getElementById('checkout-total-price').innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(total);
            document.getElementById('checkout-modal').classList.remove('hidden');
        }

        function closeCheckoutModal() {
            document.getElementById('checkout-modal').classList.add('hidden');
        }

        function handleCheckout(event) {
            event.preventDefault();
            const btn = document.getElementById('checkout-btn');
            btn.disabled = true;
            btn.innerText = 'Memproses...';

            const name = document.getElementById('customer_name').value;
            const address = document.getElementById('customer_address').value;

            const payload = {
                customer_name: name,
                customer_address: address,
                items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            };

            fetch('{{ rtrim(env('BACKEND_URL'), '/') }}/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },

                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.whatsapp_url) {
                    alert('Pesanan berhasil! Mengarahkan ke WhatsApp...');
                    // Clear cart
                    cart = [];
                    saveCart();
                    updateCartUI();
                    closeCheckoutModal();
                    window.location.href = data.whatsapp_url;
                } else {
                    alert('Gagal memproses pesanan.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat checkout.');
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerText = 'Pesan via WhatsApp';
            });
        }

        // Initialize UI on load
        updateCartUI();
    </script>
</body>
</html>
