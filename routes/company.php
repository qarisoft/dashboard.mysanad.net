<?php

use App\Http\Controllers\Company\TasksController;
use App\Http\Controllers\Company\CreateCompanyController;
use App\Http\Controllers\Company\CustomersController;
use App\Http\Controllers\Company\EmployeesController;
use App\Http\Controllers\Company\HelpController;
use App\Http\Controllers\Company\HomeController;
use App\Http\Controllers\Company\Mail\InboxController;
use App\Http\Controllers\Company\Mail\OutboxController;
use App\Http\Controllers\Company\MapController;
use App\Http\Controllers\Company\PrefrencessController;
use App\Http\Controllers\Company\TanseeqController;
use App\Http\Controllers\Company\TaskStatusController;
use App\Http\Controllers\Company\ViewersController;
use App\Http\Middleware\CanAccessCompany;
use Illuminate\Support\Facades\Route;




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('create-company', [CreateCompanyController::class,'create'])->name('company.create');
Route::post('create-company', [CreateCompanyController::class,'store'])->name('company.store');

    Route::middleware([CanAccessCompany::class])->name('company.')->group(function () {

        Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard.index');

        Route::resource('tasks', TasksController::class);

        Route::resource('task-status', TaskStatusController::class);
        Route::resource('prefrencess', PrefrencessController::class);

        Route::resource('tanseeq', TanseeqController::class);
        Route::post('tasks/{task}/publish', [TasksController::class, 'publish'])->name('tasks.publish');

        Route::resource('users', EmployeesController::class);
        Route::resource('viewers', ViewersController::class);
        Route::resource('customers', CustomersController::class);
        Route::post('users/{employee}/activate', [EmployeesController::class, 'activate'])->name('users.activate');
        Route::post('viewers/{viewer}/activate', [ViewersController::class, 'activate'])->name('viewers.activate');
        Route::resource('map', MapController::class);

        Route::name('mail.')->prefix('mail')->group(function () {
            Route::resource('inbox', InboxController::class);
            Route::post('inbox/{inbox}/mark_as_read', [InboxController::class, 'markAsRead'])->name('inbox.markAsRead');
            Route::post('inbox/{inbox}/reply', [InboxController::class, 'reply'])->name('inbox.reply');

            //
            Route::resource('outbox', OutboxController::class);
        });

        Route::resource('help', HelpController::class);

    });
});
