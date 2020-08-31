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
    Route::post('register', 'UserController@registerUser');
    Route::get('pending-accounts', 'UserController@getPendingAccounts');
    Route::post('update-user-account', 'UserController@updateAccountStatus');
    Route::post('deactivate-user', 'UserController@deactivateUser');
    Route::post('block-user', 'UserController@updateBlockStatus');
    Route::get('get-all-users', 'UserController@getAllUsers');
});
Route::group([
    'prefix' => 'v1'
], function ($router) {
    Route::post('upload-profile-image','UserProfileController@uploadImage');
    Route::get('get-user-profile','UserProfileController@index')->middleware('auth-token');
    Route::post('update-user-profile','UserProfileController@store')->middleware('auth-token');
});

