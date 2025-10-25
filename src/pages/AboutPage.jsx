import React from 'react';

function AboutPage() {
  // Base URL untuk gambar yang disimpan di folder public/dummy_images/about
  // PASTIKAN NAMA FILE GAMBAR DI SINI SAMA PERSIS DENGAN YANG ANDA SIMPAN
  const BASE_IMAGE_URL = 'http://127.0.0.1:8000/dummy_images/about/';

  // Data cerita yang akan ditampilkan
  const storySections = [
    {
      id: 1,
      title: "Awal Mula Zoeliez Ilux",
      text: "Di awal perjalanannya, Zoeliez Ilux dikenal sebagai surganya kue basah tradisional maupun modern. Dengan tangan terampil, kami menyajikan berbagai macam jajanan pasar yang selalu dirindukan, seperti Risol Sayur Sosis Mantenan yang gurih, Dadar Gulung pandan yang harum, Brownies cokelat yang lumer, hingga Kue Tart untuk momen spesial, Roti Pisang yang lembut, dan Lumpur Lapindo yang manis legit. Setiap gigitan adalah perpaduan rasa autentik dan kualitas terbaik, menjadikan Zoeliez Ilux pilihan favorit di berbagai acara dan perayaan.",
      image: "about_jajanan_pasar.jpg", // PASTIKAN NAMA FILE INI ADA DI FOLDER public/dummy_images/about/
      imageAlt: "Berbagai kue basah tradisional dan modern Zoeliez Ilux",
      layout: "image-left" // Layout: gambar di kiri, teks di kanan
    },
    {
      id: 2,
      title: "Perubahan Fokus ke Kering Kentang Mustofa",
      text: "Tiga tahun berjalan, di tahun 2019, kami mengambil sebuah keputusan besar yang mengubah arah perjalanan Zoeliez Ilux. Dengan melihat potensi dan tingginya permintaan pasar, kami memutuskan untuk memfokuskan seluruh energi dan kreativitas kami pada satu produk bintang: Kering Kentang Mustofa.",
      image: "about_proses_mustofa.jpg", // PASTIKAN NAMA FILE INI ADA DI FOLDER public/dummy_images/about/
      imageAlt: "Proses produksi Kering Kentang Mustofa",
      layout: "image-right" // Layout: gambar di kanan, teks di kiri
    },
    {
      id: 3,
      title: "Kesuksesan Kering Kentang Mustofa",
      text: "Keputusan ini terbukti tepat. Dedikasi kami untuk menyempurnakan Kering Kentang Mustofa dengan resep rahasia yang pedas, manis, dan renyah tak tertandingi, berhasil merebut hati banyak pelanggan. Tak lama setelah fokus ini, pesanan melonjak drastis. Kering Kentang Mustofa Zoeliez Ilux menjadi buah bibir dan hidangan wajib di setiap rumah. Dari camilan sehari-hari hingga pelengkap lauk yang menggugah selera, produk kami kini dikenal luas dan dicintai oleh berbagai kalangan.",
      image: "about_kentang_mustofa_sukses.jpg", // PASTIKAN NAMA FILE INI ADA DI FOLDER public/dummy_images/about/
      imageAlt: "Kering Kentang Mustofa Zoeliez Ilux yang sukses di pasaran",
      layout: "image-left" // Layout: gambar di kiri, teks di kanan
    }
  ];

  return (
    <div className="bg-orange-50 py-12 lg:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Bagian Judul Halaman */}
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-10 lg:mb-16">
          Tentang Zoeliez Ilux
        </h1>

        {/* Loop Melalui Setiap Bagian Cerita */}
        {storySections.map((section, index) => (
          <div 
            key={section.id} 
            className={`flex flex-col ${section.layout === 'image-left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12 mb-16 lg:mb-24`}
          >
            {/* Kolom Gambar */}
            <div className="w-full lg:w-1/2 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
              <img 
                src={`${BASE_IMAGE_URL}${section.image}`} 
                alt={section.imageAlt} 
                className="w-full h-auto object-cover" 
              />
            </div>

            {/* Kolom Teks */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {section.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;