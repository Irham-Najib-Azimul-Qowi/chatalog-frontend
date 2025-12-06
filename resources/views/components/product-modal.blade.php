<!-- resources/views/components/product-modal.blade.php -->
<div id="product-modal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 hidden">
    <!-- Konten Modal -->
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form id="product-form" onsubmit="handleProductSubmit(event)">
            <!-- Header Modal -->
            <div class="p-4 border-b">
                <h2 id="modal-title" class="text-xl font-semibold">Tambah Produk Baru</h2>
            </div>

            <!-- Body Modal (Form) -->
            <div class="p-6 space-y-4">
                <input type="hidden" id="product-id" name="id">
                
                <div>
                    <label class="block text-sm font-medium">Nama Produk</label>
                    <input type="text" id="product-name" name="name" required class="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 border">
                </div>
                <div>
                    <label class="block text-sm font-medium">Harga</label>
                    <input type="number" id="product-price" name="price" required class="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 border">
                </div>
                <div>
                    <label class="block text-sm font-medium">Deskripsi</label>
                    <textarea id="product-description" name="description" rows="3" class="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 border"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium">Gambar Produk</label>
                    <img id="image-preview" src="https://via.placeholder.com/150" alt="Preview" class="w-32 h-32 object-cover rounded-md my-2">
                    <input type="file" id="product-image" name="image" onchange="handleImageChange(event)" class="text-sm" accept="image/*">
                </div>
            </div>

            <!-- Footer Modal -->
            <div class="p-4 border-t flex justify-end space-x-2">
                <button type="button" onclick="closeProductModal()" class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    Batal
                </button>
                <button type="submit" id="save-btn" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    function openProductModal(product = null) {
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('product-form');
        const preview = document.getElementById('image-preview');
        
        // Reset form
        form.reset();
        document.getElementById('product-id').value = '';
        preview.src = 'https://via.placeholder.com/150';

        if (product) {
            title.textContent = 'Edit Produk';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-description').value = product.description || '';
            
            if (product.image) {
                 if (product.image.startsWith('http')) {
                    preview.src = product.image;
                } else {
                    preview.src = `/storage/${product.image}`;
                }
            }
        } else {
            title.textContent = 'Tambah Produk Baru';
        }

        modal.classList.remove('hidden');
    }

    function closeProductModal() {
        document.getElementById('product-modal').classList.add('hidden');
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const preview = document.getElementById('image-preview');
            preview.src = URL.createObjectURL(file);
        }
    }

    function handleProductSubmit(event) {
        event.preventDefault();
        
        const saveBtn = document.getElementById('save-btn');
        const originalBtnText = saveBtn.textContent;
        saveBtn.disabled = true;
        saveBtn.textContent = 'Menyimpan...';

        const formData = new FormData(event.target);
        const productId = formData.get('id');
        const isEdit = !!productId;

        // Determine URL and Method
        // Note: For Laravel Update with FormData (file upload), we must use POST with _method: PUT
        let url = '/api/admin/products';
        if (isEdit) {
            url = `/api/admin/products/${productId}`;
            formData.append('_method', 'PUT'); 
        }

        // Get CSRF token if available (though API might use Sanctum, web routes use CSRF)
        // Assuming this is used in a Blade view which has the meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const headers = {};
        if (csrfToken) {
            headers['X-CSRF-TOKEN'] = csrfToken;
        }
        // Note: Do NOT set Content-Type header when sending FormData, browser sets it with boundary

        fetch(url, {
            method: 'POST', // Always POST for FormData with files in Laravel
            headers: headers,
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            closeProductModal();
            // Optional: Reload page or update list
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan: ' + (error.message || JSON.stringify(error)));
        })
        .finally(() => {
            saveBtn.disabled = false;
            saveBtn.textContent = originalBtnText;
        });
    }
</script>
