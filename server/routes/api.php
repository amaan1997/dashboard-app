<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Auth Endpoints
Route::group([
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'UserController@login');
    // Route::post('logout', 'Auth\LogoutController@logout');
    Route::post('register', 'UserController@registerUser');
    // Route::post('forgot-password', 'Auth\ForgotPasswordController@email');
    // Route::post('password-reset', 'Auth\ResetPasswordController@reset');
    // Route::post('social-login', 'Auth\LoginController@socialLogin');
});
Route::get('v1/auth/pending-accounts', 'UserController@getPendingAccounts');
Route::post('v1/auth/update-user-account', 'UserController@updateAccountStatus');

