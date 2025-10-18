import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../services/adminService';
import ProductModal from '../components/ProductModal';

// --- Komponen Pembantu untuk Upload Gambar Slider ---
function ImageUploadSlot({ settingKey, settings, onImageChange, imagePreviews, label }) {
    const previewUrl = imagePreviews[settingKey] || (settings[settingKey] ? 
        `http://127.0.0.1:8000/storage/${settings[settingKey]}` :
        'https://via.placeholder.com/400x200?text=Pilih+Gambar');

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
                <img
                    src={previewUrl}
                    alt={`Preview ${label}`}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                <input 
                    type="file" 
                    id={`imageUpload-${settingKey}`} 
                    className="hidden"
                    onChange={(e) => onImageChange(e, settingKey)} // Kirim key gambar
                    accept="image/*" 
                />
                <label htmlFor={`imageUpload-${settingKey}`} className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Ganti Gambar
                </label>
            </div>
        </div>
    );
}
// --- Akhir Komponen Pembantu ---


function AdminDashboardPage() {
    const [products, setProducts] = useState([]);
    const [settings, setSettings] = useState({});
    const navigate = useNavigate();

    // State untuk MULTIPLE SLIDER IMAGES
    const [imageFiles, setImageFiles] = useState({}); 
    const [imagePreviews, setImagePreviews] = useState({});
    
    // State untuk modal produk
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); 

    // Memuat semua data awal saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            const loadingToast = toast.loading('Memuat data...');
            try {
                const [productsRes, settingsRes] = await Promise.all([
                    adminService.getProducts(),
                    adminService.getSettings(),
                ]);
                setProducts(productsRes.data);
                setSettings(settingsRes.data);
                toast.success('Data berhasil dimuat!', { id: loadingToast });
            } catch (error) {
                console.error("Gagal memuat data:", error);
                toast.error('Gagal memuat data. Sesi mungkin berakhir.', { id: loadingToast });
                localStorage.removeItem('authToken');
                navigate('/admin');
            }
        };
        fetchData();
    }, [navigate]);
    
    // Menangani perubahan input teks di form pengaturan
    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    // Menangani pemilihan file gambar (untuk 3 slot slider)
    const handleImageChange = (e, key) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(prev => ({ ...prev, [key]: file }));
            setImagePreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
        }
    };

    // Menyimpan semua pengaturan (teks dan gambar)
    const handleSaveSettings = async () => {
        const promiseArr = [];
        const savingToast = toast.loading('Menyimpan pengaturan...');

        // 1. Siapkan semua data teks untuk diupdate
        const textSettings = {
            seller_whatsapp: settings.seller_whatsapp,
            landing_page_headline: settings.landing_page_headline,
            landing_page_tagline: settings.landing_page_tagline,
            landing_page_description: settings.landing_page_description,
            lp_section_title: settings.lp_section_title,
            lp_item1_title: settings.lp_item1_title,
            lp_item1_text: settings.lp_item1_text,
            lp_item2_title: settings.lp_item2_title,
            lp_item2_text: settings.lp_item2_text,
            lp_item3_title: settings.lp_item3_title,
            lp_item3_text: settings.lp_item3_text,
            lp_cta_title: settings.lp_cta_title,
            lp_cta_text: settings.lp_cta_text,
            about_title: settings.about_title,
            about_content: settings.about_content,
            contact_title: settings.contact_title,
            contact_tagline: settings.contact_tagline,
            contact_address: settings.contact_address,
            contact_email: settings.contact_email,
            contact_phone: settings.contact_phone,
        };
        promiseArr.push(adminService.updateSettings(textSettings));

        // 2. Siapkan upload gambar (Loop melalui semua imageFiles yang diubah)
        for (const key in imageFiles) {
            if (imageFiles[key]) {
                const formData = new FormData();
                formData.append('image', imageFiles[key]);
                formData.append('image_key', key); // Kirim key gambar ke backend (lp_slider_img1, dll.)
                promiseArr.push(adminService.uploadLandingImage(formData));
            }
        }

        try {
            // Jalankan semua promise secara paralel
            await Promise.all(promiseArr);
            
            toast.success('Pengaturan berhasil disimpan!', { id: savingToast });
            
            // Reset state gambar dan muat ulang data settings yang baru
            setImageFiles({});
            setImagePreviews({});
            const settingsRes = await adminService.getSettings();
            setSettings(settingsRes.data);

        } catch (error) {
            console.error("Gagal menyimpan:", error);
            toast.error('Gagal menyimpan pengaturan.', { id: savingToast });
        }
    };

    // --- FUNGSI CRUD PRODUK (Tidak Berubah) ---
    const handleOpenAddModal = () => { setEditingProduct(null); setIsModalOpen(true); };
    const handleOpenEditModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setEditingProduct(null); };

    const handleSaveProduct = async (formData, productImageFile) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (productImageFile) { data.append('image', productImageFile); }

        if (editingProduct) {
            data.append('_method', 'PUT');
            toast.promise(
                adminService.updateProduct(editingProduct.id, data).then(res => {
                    setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.data : p));
                    handleCloseModal();
                }),
                { loading: 'Memperbarui produk...', success: 'Produk berhasil diperbarui!', error: 'Gagal memperbarui produk.' }
            );
        } else {
            toast.promise(
                adminService.createProduct(data).then(res => {
                    setProducts(prev => [...prev, res.data]);
                    handleCloseModal();
                }),
                { loading: 'Menambahkan produk...', success: 'Produk berhasil ditambahkan!', error: 'Gagal menambahkan produk.' }
            );
        }
    };
    
    const handleDeleteProduct = (productId) => {
        if (window.confirm('Anda yakin ingin menghapus produk ini secara permanen?')) {
            toast.promise(
                adminService.deleteProduct(productId).then(() => {
                    setProducts(prev => prev.filter(p => p.id !== productId));
                }),
                { loading: 'Menghapus produk...', success: 'Produk berhasil dihapus!', error: 'Gagal menghapus produk.' }
            );
        }
    };

    return (
        <>
            <ProductModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
                product={editingProduct}
            />
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                    {/* Bagian Pengaturan Halaman Utama */}
                    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pengaturan Halaman Utama</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kolom Kiri: Form Teks */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Headline</label>
                                    <input type="text" name="landing_page_headline" value={settings.landing_page_headline || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tagline</label>
                                    <textarea name="landing_page_tagline" rows="2" value={settings.landing_page_tagline || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deskripsi di Halaman Produk</label>
                                    <textarea name="landing_page_description" rows="3" value={settings.landing_page_description || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                                    <input type="text" name="seller_whatsapp" value={settings.seller_whatsapp || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                                </div>
                            </div>
                            
                            {/* Kolom Kanan: Upload Gambar SLIDER BARU */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2">Pengaturan Slider (3 Slot Gambar)</h3>
                                
                                <ImageUploadSlot
                                    label="Gambar Slider 1"
                                    settingKey="lp_slider_img1"
                                    settings={settings}
                                    onImageChange={handleImageChange}
                                    imagePreviews={imagePreviews}
                                />
                                <ImageUploadSlot
                                    label="Gambar Slider 2"
                                    settingKey="lp_slider_img2"
                                    settings={settings}
                                    onImageChange={handleImageChange}
                                    imagePreviews={imagePreviews}
                                />
                                <ImageUploadSlot
                                    label="Gambar Slider 3"
                                    settingKey="lp_slider_img3"
                                    settings={settings}
                                    onImageChange={handleImageChange}
                                    imagePreviews={imagePreviews}
                                />
                            </div>
                        </div>

                        {/* Seksi "Kenapa Memilih Kami?" */}
                        <hr className="my-6"/>
                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Seksi "Kenapa Memilih Kami?"</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Judul Seksi</label>
                                <input type="text" name="lp_section_title" value={settings.lp_section_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border rounded-md">
                                    <div>
                                        <label className="block text-xs font-medium">Judul Poin {i}</label>
                                        <input type="text" name={`lp_item${i}_title`} value={settings[`lp_item${i}_title`] || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium">Teks Poin {i}</label>
                                        <input type="text" name={`lp_item${i}_text`} value={settings[`lp_item${i}_text`] || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Seksi "Call to Action" */}
                        <hr className="my-6"/>
                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Seksi "Call to Action"</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Judul CTA</label>
                                <input type="text" name="lp_cta_title" value={settings.lp_cta_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Teks CTA</label>
                                <input type="text" name="lp_cta_text" value={settings.lp_cta_text || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        </div>
                    </section>

                    {/* Bagian Pengaturan Halaman Lain */}
                    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pengaturan Halaman Lain</h2>
                        <div className="space-y-6">
                            {/* Halaman "Tentang Kami" */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-4">Halaman "Tentang Kami"</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Judul</label>
                                        <input type="text" name="about_title" value={settings.about_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Konten Paragraf</label>
                                        <textarea name="about_content" rows="5" value={settings.about_content || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                    </div>
                                </div>
                            </div>
                            {/* Halaman "Kontak" */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-4">Halaman "Kontak"</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Judul</label>
                                        <input type="text" name="contact_title" value={settings.contact_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Tagline</label>
                                        <input type="text" name="contact_tagline" value={settings.contact_tagline || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Alamat</label>
                                        <input type="text" name="contact_address" value={settings.contact_address || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Telepon</label>
                                        <input type="tel" name="contact_phone" value={settings.contact_phone || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tombol Simpan Global */}
                    <div className="text-right mt-6">
                        <button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md">
                            Simpan Semua Pengaturan
                        </button>
                    </div>

                    {/* Bagian Manajemen Produk */}
                    <section className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">Manajemen Produk</h2>
                            <button onClick={handleOpenAddModal} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
                                + Tambah Produk
                            </button>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full object-cover" src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : 'https://via.placeholder.com/40'} alt={product.name} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleOpenEditModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardPage;