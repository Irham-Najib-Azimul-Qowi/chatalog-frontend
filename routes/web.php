<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index']);
Route::get('/about', [HomeController::class, 'about']);
Route::get('/contact', [HomeController::class, 'contact']);
Route::get('/catalog', [ProductController::class, 'page']);
Route::get('/admin/login', function () {
    return view('admin.login');
});
Route::get('/admin/dashboard', function () {
    return view('admin.dashboard');
})->name('dashboard');

// Placeholder Routes for Admin Pages
Route::get('/admin/products', function () {
    return view('admin.products.index');
});
Route::get('/admin/products/create', function () {
    return view('admin.products.create');
});
Route::get('/admin/settings', function () {
    return view('admin.settings');
});
Route::get('/admin/profile', function () {
    return view('admin.profile');
});
Route::get('/admin/users', function () {
    return view('admin.users');
});

