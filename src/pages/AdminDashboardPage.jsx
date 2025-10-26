import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../services/adminService';
import ProductModal from '../components/ProductModal';
// --- IMPORT ICON BARU ---
import { HiCube, HiCog } from 'react-icons/hi';

// --- Komponen Pembantu untuk Upload Gambar Slider (Tidak Berubah) ---
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
                    onChange={(e) => onImageChange(e, settingKey)}
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

    // --- STATE NAVIGASI DIUBAH (Default ke 'products') ---
    const [activeView, setActiveView] = useState('products'); // 'products' or 'content'

    // Memuat semua data awal (Tidak Berubah)
    useEffect(() => {
        const fetchData = async () => {
            const loadingToast = toast.loading('Memuat data admin...');
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
    
    // --- SEMUA FUNGSI HANDLER (SETTINGS & PRODUK) DI BAWAH INI TIDAK BERUBAH ---

    // Menangani perubahan input teks di form pengaturan
    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    // Menangani pemilihan file gambar
    const handleImageChange = (e, key) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(prev => ({ ...prev, [key]: file }));
            setImagePreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
        }
    };

    // Menyimpan semua pengaturan
    const handleSaveSettings = async () => {
        const promiseArr = [];
        const savingToast = toast.loading('Menyimpan pengaturan...');

        const textSettings = {
            seller_whatsapp: settings.seller_whatsapp,
            landing_page_headline: settings.landing_page_headline,
            // ... (semua key settings lainnya seperti di kode Anda)
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

        for (const key in imageFiles) {
            if (imageFiles[key]) {
                const formData = new FormData();
                formData.append('image', imageFiles[key]);
                formData.append('image_key', key); 
                promiseArr.push(adminService.uploadLandingImage(formData));
            }
        }

        try {
            await Promise.all(promiseArr);
            toast.success('Pengaturan berhasil disimpan!', { id: savingToast });
            setImageFiles({});
            setImagePreviews({});
            const settingsRes = await adminService.getSettings();
            setSettings(settingsRes.data);
        } catch (error) {
            console.error("Gagal menyimpan:", error);
            toast.error('Gagal menyimpan pengaturan.', { id: savingToast });
        }
    };

    // --- FUNGSI LOGOUT (handleLogout) DIHAPUS KARENA TOMBOLNYA DIHILANGKAN ---

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

    // --- Fungsi Helper BARU untuk Styling Sidebar ---
    const getSidebarLinkClassName = (viewName) => {
        const baseStyle = "flex items-center space-x-3 w-full px-4 py-3 rounded-md font-medium text-sm transition-all duration-150";
        if (activeView === viewName) {
            // Style saat aktif
            return `${baseStyle} bg-orange-500 text-white shadow-md`;
        }
        // Style normal
        return `${baseStyle} text-gray-600 hover:bg-gray-200 hover:text-gray-900`;
    };


    return (
        <>
            <ProductModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
                product={editingProduct}
            />
            
            {/* Latar belakang halaman dashboard */}
            <div className="bg-gray-100 min-h-screen">
                
                {/* Container utama (Navbar utama Anda akan ada di atas div ini) */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    

                    {/* --- LAYOUT BARU: SIDEBAR + KONTEN --- */}
                    <div className="flex flex-col md:flex-row md:space-x-8">

                        {/* --- NAVIGASI SIDEBAR --- */}
                        <aside className="w-full md:w-60 flex-shrink-0 mb-6 md:mb-0">
                            {/* Dibuat sticky agar tetap terlihat saat scroll. Sesuaikan 'top-24' jika perlu. */}
                            <nav className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-md sticky top-24">
                                <button 
                                    onClick={() => setActiveView('products')} 
                                    className={getSidebarLinkClassName('products')}
                                >
                                    <HiCube className="h-5 w-5" />
                                    <span>Manajemen Produk</span>
                                </button>
                                <button 
                                    onClick={() => setActiveView('content')} 
                                    className={getSidebarLinkClassName('content')}
                                >
                                    <HiCog className="h-5 w-5" />
                                    <span>Pengaturan Konten</span>
                                </button>
                            </nav>
                        </aside>

                        {/* --- AREA KONTEN UTAMA --- */}
                        <main className="flex-1 min-w-0">

                            {/* === HALAMAN PENGATURAN KONTEN === */}
                            {activeView === 'content' && (
                                <div className="animate-fadeIn space-y-8">
                                    
                                    {/* Card 1: Pengaturan Halaman Utama */}
                                    <section className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">Pengaturan Halaman Utama</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Kolom Kiri: Form Teks */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Headline</label>
                                                    <input type="text" name="landing_page_headline" value={settings.landing_page_headline || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Tagline</label>
                                                    <textarea name="landing_page_tagline" rows="2" value={settings.landing_page_tagline || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Deskripsi di Halaman Produk</label>
                                                    <textarea name="landing_page_description" rows="3" value={settings.landing_page_description || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp (cth: 6281234...)</label>
                                                    <input type="text" name="seller_whatsapp" value={settings.seller_whatsapp || ''} onChange={handleSettingsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                </div>
                                            </div>
                                            {/* Kolom Kanan: Upload Gambar SLIDER */}
                                            <div className="space-y-6">
                                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2">Pengaturan Slider (3 Slot Gambar)</h3>
                                                <ImageUploadSlot label="Gambar Slider 1" settingKey="lp_slider_img1" settings={settings} onImageChange={handleImageChange} imagePreviews={imagePreviews} />
                                                <ImageUploadSlot label="Gambar Slider 2" settingKey="lp_slider_img2" settings={settings} onImageChange={handleImageChange} imagePreviews={imagePreviews} />
                                                <ImageUploadSlot label="Gambar Slider 3" settingKey="lp_slider_img3" settings={settings} onImageChange={handleImageChange} imagePreviews={imagePreviews} />
                                            </div>
                                        </div>
                                        {/* Seksi "Kenapa Memilih Kami?" */}
                                        <hr className="my-8"/>
                                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Seksi "Kenapa Memilih Kami?"</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium">Judul Seksi</label>
                                                <input type="text" name="lp_section_title" value={settings.lp_section_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                            </div>
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border rounded-md bg-gray-50">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600">Judul Poin {i}</label>
                                                        <input type="text" name={`lp_item${i}_title`} value={settings[`lp_item${i}_title`] || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600">Teks Poin {i}</label>
                                                        <input type="text" name={`lp_item${i}_text`} value={settings[`lp_item${i}_text`] || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Seksi "Call to Action" */}
                                        <hr className="my-8"/>
                                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Seksi "Call to Action"</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium">Judul CTA</label>
                                                <input type="text" name="lp_cta_title" value={settings.lp_cta_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Teks CTA</label>
                                                <input type="text" name="lp_cta_text" value={settings.lp_cta_text || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                            </div>
                                        </div>
                                    </section>
                                    
                                    {/* Card 2: Pengaturan Halaman Lain */}
                                    <section className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">Pengaturan Halaman Lain</h2>
                                        <div className="space-y-8">
                                            {/* Halaman "Tentang Kami" */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-4">Halaman "Tentang Kami"</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium">Judul</label>
                                                        <input type="text" name="about_title" value={settings.about_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium">Konten Paragraf</label>
                                                        <textarea name="about_content" rows="5" value={settings.about_content || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Halaman "Kontak" */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-4">Halaman "Kontak"</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium">Judul</label>
                                                        <input type="text" name="contact_title" value={settings.contact_title || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium">Tagline</label>
                                                        <input type="text" name="contact_tagline" value={settings.contact_tagline || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium">Alamat</label>
                                                        <input type="text" name="contact_address" value={settings.contact_address || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium">Email</label>
                                                        <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium">Telepon</label>
                                                        <input type="tel" name="contact_phone" value={settings.contact_phone || ''} onChange={handleSettingsChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Tombol Simpan Global (Sticky) */}
                                    <div className="text-right p-4 sticky bottom-4">
                                        <button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200">
                                            Simpan Semua Pengaturan Konten
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* === HALAMAN MANAJEMEN PRODUK === */}
                            {activeView === 'products' && (
                                <section className="animate-fadeIn bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-700">Manajemen Produk</h2>
                                        <button onClick={handleOpenAddModal} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
                                            + Tambah Produk
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {products.length > 0 ? products.map((product) => (
                                                    <tr key={product.id} className="hover:bg-gray-50">
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
                                                )) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                                            Belum ada produk. Silakan "Tambah Produk".
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}

                        </main>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardPage;