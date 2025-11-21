import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function AdminLoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({ phone, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/admin/dashboard');
      } else {
        throw new Error("Token tidak diterima dari server");
      }
    } catch (err) {
      console.error("Login gagal:", err);
      const errorMessage = err.response?.data?.message || 'Nomor telepon atau password salah.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Latar Belakang Utama
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      {/* Kartu Form Login */}
      <div
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg"
        data-aos="fade-up"
      >

        {/* Header Form */}
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-800">
            Zoeliez Ilux
          </h1>
          <p className="mt-2 text-sm text-gray-600">Admin Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Input Nomor Telepon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="081234567890"
            />
          </div>

          {/* Input Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>

          {/* Pesan Error */}
          {error && (
            <p className="text-xs text-center text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;