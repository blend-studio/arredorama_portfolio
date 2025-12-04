<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;

Route::get('/projects', [PortfolioController::class, 'index']);
Route::post('/contact', [PortfolioController::class, 'storeContact']);