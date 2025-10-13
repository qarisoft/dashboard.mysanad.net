<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return to_route('company.dashboard.index');
//    return Inertia::render('welcome');
})->name('dashboard');

//Route::middleware(['auth', 'verified'])->group(function () {
//    Route::get('dashboard', function () {
//        return Inertia::render('dashboard');
//    })->name('dashboard');
//});
Route::get('not-found', function () {
    return Inertia::render('error/not-found');
})->name('error.not-found');

require __DIR__ . '/admin.php';
require __DIR__ . '/company.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
