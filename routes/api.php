<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/user/register', 'ApiController@create');
Route::post('/user/login', 'ApiController@login');

Route::group([
    'prefix' => 'events',
], function () {
    Route::get('', 'EventController@index');
    Route::get('my', 'EventController@myEvents');
    Route::get('export', 'EventController@export');
    Route::post('new', 'EventController@store');
    Route::put('{event}', 'EventController@update');
});

Route::group([
    'prefix' => 'orders',
], function () {
    Route::get('', 'OrderController@index');
    Route::post('new', 'OrderController@store');
    Route::put('{order}', 'OrderController@update');
});