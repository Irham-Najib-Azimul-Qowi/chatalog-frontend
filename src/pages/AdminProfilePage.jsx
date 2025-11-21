import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import adminService from '../services/adminService';

function AdminProfilePage() {
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await adminService.getProfile();
        setProfile(res.data);
      } catch (error) {
        toast.error('Gagal memuat profil.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: profile.name,
      phone: profile.phone,
    };

    if (password) {
      if (password !== passwordConfirmation) {
        toast.error('Konfirmasi password tidak cocok.');
        setIsLoading(false);
        return;
      }
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    toast.promise(
      adminService.updateProfile(payload),
      {
        loading: 'Menyimpan profil...',
        success: (res) => {
          setProfile(res.data.user); // Update data profil di state
          setPassword('');
          setPasswordConfirmation('');
          setIsLoading(false);
          return 'Profil berhasil diperbarui!';
        },
        error: (err) => {
          setIsLoading(false);
          return err.response?.data?.message || 'Gagal menyimpan profil.';
        },
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profil Saya</h1>
        <div
          className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
        >
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Nama</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Nomor Telepon</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <hr />
            <p className="text-sm text-gray-500">Kosongkan jika tidak ingin mengubah password.</p>
            <div>
              <label className="block text-sm font-medium">Password Baru</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Konfirmasi Password Baru</label>
              <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="text-right">
              <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-orange-300">
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;