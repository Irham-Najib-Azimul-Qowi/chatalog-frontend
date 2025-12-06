@props(['product', 'cartItem' => null])

@php
    $quantity = $cartItem ? $cartItem['quantity'] : 0;
    // Backend now returns full URL via Model Accessor
    $imageUrl = $product['image'] ?? 'https://via.placeholder.com/400x400?text=No+Image';
@endphp

<div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full 
            transform hover:-translate-y-1 transition-transform duration-300
            w-full max-w-xs mx-auto min-w-0">

    <div class="relative w-full pb-[100%] bg-gray-100 overflow-hidden">
        <img
            src="{{ $imageUrl }}"
            alt="{{ $product['name'] }}"
            class="absolute inset-0 w-full h-full object-cover"
        />
    </div>

    <div class="p-3 flex-grow flex flex-col justify-between">
        <h3 class="text-base font-semibold text-gray-800 line-clamp-2">{{ $product['name'] }}</h3>

        <p class="text-lg font-bold text-orange-600 mt-1">
            Rp {{ number_format($product['price'] ?? 0, 0, ',', '.') }}
        </p>

        <div class="mt-3 flex justify-end">
            @if($quantity === 0)
                <button
                    onclick="addToCart({{ $product['id'] }}, '{{ addslashes($product['name']) }}', {{ $product['price'] }}, '{{ $imageUrl }}')"
                    class="bg-orange-500 text-white font-bold py-2 px-3 rounded-md transition-colors hover:bg-orange-600 flex items-center space-x-1 text-sm"
                >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>Tambah</span>
                </button>
            @else
                <div class="flex items-center space-x-1">
                    <button
                        onclick="removeFromCart({{ $product['id'] }})"
                        class="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-base"
                    >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                    </button>
                    <span class="text-lg font-bold">{{ $quantity }}</span>
                    <button
                        onclick="addToCart({{ $product['id'] }}, '{{ addslashes($product['name']) }}', {{ $product['price'] }}, '{{ $imageUrl }}')"
                        class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors text-base"
                    >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </button>
                </div>
            @endif
        </div>
    </div>
</div>

