<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Login - Chatalog</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex justify-center items-center">

    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

        <form onsubmit="handleLogin(event)">
            <div class="mb-4">
                <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon</label>
                <input type="text" id="phone" name="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contoh: 628..." required>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="******************" required>
            </div>
            <div class="flex items-center justify-between">
                <button id="login-btn" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Masuk
                </button>
            </div>
        </form>
    </div>

    <script>
        function handleLogin(e) {
            e.preventDefault();
            const btn = document.getElementById('login-btn');
            const originalText = btn.innerText;
            btn.innerText = 'Memproses...';
            btn.disabled = true;

            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            // Simple fetch to backend login
            fetch('{{ env('BACKEND_URL') }}/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // No CSRF needed for simple API token based auth initiation usually, 
                    // but if using Sanctum stateful we need to handle cookies. 
                    // For this simple seed setup, we will try token response.
                },
                body: JSON.stringify({ phone, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    // Save token if implementing JWT flow, or just redirect if session driven
                    localStorage.setItem('adminToken', data.token);
                    alert('Login berhasil! Anda akan diarahkan kembali ke beranda.');
                    window.location.href = '/home'; // Redirect back to public site where Admin menu is now visible
                } else {
                    alert('Login gagal: ' + (data.message || 'Periksa kembali kredensial Anda.'));
                }
            })
            .catch(err => {
                console.error(err);
                alert('Terjadi kesalahan koneksi.');
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        }
    </script>
</body>
</html>
