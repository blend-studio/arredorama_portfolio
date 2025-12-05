<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminProjectController;

// Rotte pubbliche
Route::get('/projects', [PortfolioController::class, 'index']);
Route::get('/projects/{id}', [PortfolioController::class, 'show']);
Route::post('/contact', [PortfolioController::class, 'storeContact']);

// Rotte autenticazione
Route::post('/admin/login', [AuthController::class, 'login']);

// Rotte protette (richiedono autenticazione)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', [AuthController::class, 'me']);
    
    // CRUD Progetti
    Route::get('/admin/projects', [AdminProjectController::class, 'index']);
    Route::post('/admin/projects', [AdminProjectController::class, 'store']);
    Route::get('/admin/projects/{id}', [AdminProjectController::class, 'show']);
    Route::put('/admin/projects/{id}', [AdminProjectController::class, 'update']);
    Route::post('/admin/projects/{id}', [AdminProjectController::class, 'update']); // Per form-data con PUT
    Route::delete('/admin/projects/{id}', [AdminProjectController::class, 'destroy']);
});