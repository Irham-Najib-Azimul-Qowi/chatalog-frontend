<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProductController extends Controller
{
    public function page()
    {
        $backendUrl = env('BACKEND_URL');
        $products = [];
        $settings = [];

        try {
            $productsResponse = Http::get("{$backendUrl}/api/products");
            if ($productsResponse->successful()) {
                $products = $productsResponse->json();
            }
            
            $settingsResponse = Http::get("{$backendUrl}/api/settings");
            if ($settingsResponse->successful()) {
                $settings = $settingsResponse->json();
            }
        } catch (\Exception $e) {
        }

        // Keep products as array for consistency with view components
        // $products = json_decode(json_encode($products)); 

        return view('products', compact('products', 'settings'));
    }
}
