// Data ini meniru respons dari endpoint /api/settings
// Perhatikan struktur { data: { ... } } yang umum di API Laravel
export const mockSettings = {
  data: {
    site_title: 'Pastela Laboratory (Data Lokal)',
    site_description: 'Ini adalah deskripsi dummy yang diambil dari file mockData.js. Nanti akan diganti dengan data asli dari API.',
    seller_whatsapp: '6281234567890', // Nomor WA dummy
  },
};

// Data ini meniru respons dari endpoint /api/products
export const mockProducts = {
  data: [
    {
      id: 1,
      name: 'Pastel Daging Sapi',
      description: 'Pastel renyah dengan isian daging sapi cincang premium dan sayuran segar.',
      price: 7500,
      image_url: 'https://via.placeholder.com/400x300.png/0088cc?text=Pastel+Sapi',
    },
    {
      id: 2,
      name: 'Pastel Ayam Jamur',
      description: 'Perpaduan klasik antara daging ayam suwir dan jamur champignon yang gurih.',
      price: 7000,
      image_url: 'https://via.placeholder.com/400x300.png/00cc88?text=Pastel+Ayam',
    },
    {
      id: 3,
      name: 'Risoles Ragout Sayur',
      description: 'Risoles lembut dengan isian ragout sayuran wortel dan kentang yang creamy.',
      price: 6000,
      image_url: 'https://via.placeholder.com/400x300.png/cc8800?text=Risoles+Sayur',
    },
  ],
};