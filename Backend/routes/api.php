<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExtratoImportController;
use App\Http\Controllers\SubcategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/ping', function () {
    return response()->json([
        'message' => 'pong',
        'timestamp' => now(),
        'status' => 'ok'
    ]);
});

// Public routes (Authentication)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {

    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // User profile (legacy)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Categories
    Route::apiResource('categories', CategoryController::class);
    Route::post('/categories/restore-defaults', [CategoryController::class, 'restoreDefaults']);

    // Subcategories
    Route::prefix('subcategories')->group(function () {
        Route::post('/', [SubcategoryController::class, 'store']);
        Route::put('/{id}', [SubcategoryController::class, 'update']);
        Route::delete('/{id}', [SubcategoryController::class, 'destroy']);
    });

    // Bank statement import
    Route::post('/importar-extrato', [ExtratoImportController::class, 'importar']);
});