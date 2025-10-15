import React, { useState, useEffect } from 'react';

function ProductModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mengisi form jika dalam mode edit
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
      });
      setImagePreview(product.image ? `http://127.0.0.1:8000/storage/${product.image}` : '');
    } else {
      // Reset form jika mode tambah
      setFormData({ name: '', price: '', description: '' });
      setImagePreview('');
    }
    setImageFile(null); // Selalu reset file
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // onSave akan menjadi fungsi handleSaveProduct dari dashboard
    await onSave(formData, imageFile);
    setIsLoading(false);
  };

  return (
    // Latar belakang gelap (overlay)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {/* Konten Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          {/* Header Modal */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          </div>

          {/* Body Modal (Form) */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Nama Produk</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Harga</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Deskripsi</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Gambar Produk</label>
              <img src={imagePreview || 'https://via.placeholder.com/150'} alt="Preview" className="w-32 h-32 object-cover rounded-md my-2" />
              <input type="file" onChange={handleImageChange} className="text-sm" accept="image/*" />
            </div>
          </div>

          {/* Footer Modal */}
          <div className="p-4 border-t flex justify-end space-x-2">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300">
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;