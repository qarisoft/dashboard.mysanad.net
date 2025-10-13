<?php

use App\Http\Controllers\Api\ApiTaskController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

//
// Broadcast::routes(['middleware' => ['auth:sanctum']]);

//
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);

    Route::get('/ping', function (Request $request) {
        return [
            'status' => 1,
            'message' => 'OK',
        ];
    });

    Route::post('/auth/token', [AuthController::class, 'token']);
    //    Route::post('auth/delete', [AuthController::class, 'delete']);

    Route::get('/home', [ApiTaskController::class, 'index']);
    //
    Route::post('/tasks/{task}/accept', [ApiTaskController::class, 'accept']);
    Route::post('/tasks/{task}/cancel', [ApiTaskController::class, 'cancelTask']);
    Route::post('/tasks/{task}/upload/create', [ApiTaskController::class, 'createUpload']);
    //
    Route::post('/tasks/uploads/{upload}', [ApiTaskController::class, 'upload']);

    Route::post('/home/upload/{upload}', [ApiTaskController::class, 'upload']);
    Route::post('/home/upload/create/{task}', [ApiTaskController::class, 'createUpload']);

    Route::post('/home/close/{task}', [ApiTaskController::class, 'close']);
    Route::post('/home/cancel/{task}', [ApiTaskController::class, 'cancelTask']);
});

Route::post('login', [AuthController::class, 'login']);
