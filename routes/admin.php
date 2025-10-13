<?php

use App\Http\Controllers\Admin\CompaniesController;
use App\Http\Controllers\Admin\Geo\CityController;
use App\Http\Controllers\Admin\Geo\DistrictController;
use App\Http\Controllers\Admin\Geo\RegionController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\MapController;
use App\Http\Controllers\Admin\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->name('admin.')->prefix('admin')->group(function () {

    Route::middleware(['isAdmin'])->group(function () {

        Route::get(
            '/',
            [HomeController::class, 'index']

        )->name('dashboard.index');

        Route::resource('tasks', TaskController::class);
        Route::resource('companies', CompaniesController::class);

        Route::resource('regions', RegionController::class);
        Route::resource('cities', CityController::class);
        Route::resource('districts', DistrictController::class);

        Route::resource('map', MapController::class);

    });
});
