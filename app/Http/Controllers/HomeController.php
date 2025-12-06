<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index()
    {
        $backendUrl = env('BACKEND_URL');
        $settings = [];
        $slides = [];

        try {
            $backendUrl = rtrim($backendUrl, '/');
            $response = Http::get("{$backendUrl}/api/settings");
            if ($response->successful()) {
                $settings = $response->json();
            }
        } catch (\Exception $e) {
            // Handle error or use defaults
        }

        // Reconstruct slides logic from original HomeController
        $slides = [
            [
                'id' => 1,
                'image_url' => $settings['lp_slider_img1'] ?? null,
                'title' => $settings['landing_page_headline'] ?? 'Selamat Datang',
                'description' => $settings['landing_page_tagline'] ?? 'Temukan produk terbaik kami.'
            ],
            [
                'id' => 2,
                'image_url' => $settings['lp_slider_img2'] ?? null,
                'title' => $settings['landing_page_headline'] ?? 'Kualitas Terbaik',
                'description' => $settings['landing_page_tagline'] ?? 'Kami hanya menyajikan yang terbaik.'
            ],
            [
                'id' => 3,
                'image_url' => $settings['lp_slider_img3'] ?? null,
                'title' => $settings['landing_page_headline'] ?? 'Rasa Autentik',
                'description' => $settings['landing_page_tagline'] ?? 'Citarasa yang tidak terlupakan.'
            ]
        ];

        $slides = array_filter($slides, function($slide) {
            return !empty($slide['image_url']);
        });

        if (empty($slides)) {
            $slides = [
                [
                    'id' => 1,
                    'image_url' => null,
                    'title' => 'Selamat Datang',
                    'description' => 'Silakan upload gambar di admin.'
                ]
            ];
        }

        return view('home', compact('settings', 'slides'));
    }

    public function about()
    {
        $backendUrl = env('BACKEND_URL');
        $settings = [];

        try {
            $backendUrl = rtrim($backendUrl, '/');
            $response = Http::get("{$backendUrl}/api/settings");
            if ($response->successful()) {
                $settings = $response->json();
            }
        } catch (\Exception $e) {
        }

        $slides = [
            [
                'id' => 1,
                'image_url' => $settings['lp_slider_img1'] ?? null,
                'title' => $settings['about_title'] ?? 'Tentang Zoeliez Ilux',
                'description' => 'Kisah di balik setiap gigitan nikmat'
            ],
            [
                'id' => 2,
                'image_url' => $settings['lp_slider_img2'] ?? null,
                'title' => $settings['about_title'] ?? 'Tentang Zoeliez Ilux',
                'description' => 'Kisah di balik setiap gigitan nikmat'
            ],
            [
                'id' => 3,
                'image_url' => $settings['lp_slider_img3'] ?? null,
                'title' => $settings['about_title'] ?? 'Tentang Zoeliez Ilux',
                'description' => 'Kisah di balik setiap gigitan nikmat'
            ]
        ];

        $slides = array_filter($slides, function($slide) {
            return !empty($slide['image_url']);
        });

        if (empty($slides)) {
            $slides = [
                [
                    'id' => 1,
                    'image_url' => null,
                    'title' => 'Tentang Kami',
                    'description' => 'Kisah di balik setiap gigitan nikmat.'
                ]
            ];
        }

        $storySections = [
            [
                'id' => 1,
                'title' => "Awal Mula Zoeliez Ilux",
                'text' => "Di awal perjalanannya, Zoeliez Ilux dikenal sebagai surganya kue basah tradisional maupun modern. Dengan tangan terampil, kami menyajikan berbagai macam jajanan pasar yang selalu dirindukan, seperti Risol Sayur Sosis Mantenan yang gurih, Dadar Gulung pandan yang harum, Brownies cokelat yang lumer, hingga Kue Tart untuk momen spesial, Roti Pisang yang lembut, dan Lumpur Lapindo yang manis legit. Setiap gigitan adalah perpaduan rasa autentik dan kualitas terbaik, menjadikan Zoeliez Ilux pilihan favorit di berbagai acara dan perayaan.",
                'image' => "about_jajanan_pasar.jpg",
                'imageAlt' => "Berbagai kue basah tradisional dan modern Zoeliez Ilux",
                'layout' => "image-left"
            ],
            [
                'id' => 2,
                'title' => "Perubahan Fokus ke Kering Kentang Mustofa",
                'text' => "Tiga tahun berjalan, di tahun 2019, kami mengambil sebuah keputusan besar yang mengubah arah perjalanan Zoeliez Ilux. Dengan melihat potensi dan tingginya permintaan pasar, kami memutuskan untuk memfokuskan seluruh energi dan kreativitas kami pada satu produk bintang: Kering Kentang Mustofa.",
                'image' => "about_proses_mustofa.jpg",
                'imageAlt' => "Proses produksi Kering Kentang Mustofa",
                'layout' => "image-right"
            ],
            [
                'id' => 3,
                'title' => "Kesuksesan Kering Kentang Mustofa",
                'text' => "Keputusan ini terbukti tepat. Dedikasi kami untuk menyempurnakan Kering Kentang Mustofa dengan resep rahasia yang pedas, manis, dan renyah tak tertandingi, berhasil merebut hati banyak pelanggan. Tak lama setelah fokus ini, pesanan melonjak drastis. Kering Kentang Mustofa Zoeliez Ilux menjadi buah bibir dan hidangan wajib di setiap rumah. Dari camilan sehari-hari hingga pelengkap lauk yang menggugah selera, produk kami kini dikenal luas dan dicintai oleh berbagai kalangan.",
                'image' => "about_kentang_mustofa_sukses.jpg",
                'imageAlt' => "Kering Kentang Mustofa Zoeliez Ilux yang sukses di pasaran",
                'layout' => "image-left"
            ]
        ];

        return view('about', compact('settings', 'slides', 'storySections'));
    }

    public function contact()
    {
        $backendUrl = env('BACKEND_URL');
        $settings = [];
        try {
            $backendUrl = rtrim($backendUrl, '/');
            $response = Http::get("{$backendUrl}/api/settings");
            if ($response->successful()) {
                $settings = $response->json();
            }
        } catch (\Exception $e) {}
        
        return view('contact', compact('settings'));
    }
}
