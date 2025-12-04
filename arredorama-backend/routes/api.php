<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;

Route::get('/projects', [PortfolioController::class, 'index']);
Route::get('/projects/{id}', [PortfolioController::class, 'show']);
Route::post('/contact', [PortfolioController::class, 'storeContact']);