<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\CSRFToken; 
use App\Http\Controllers\Auth\NewPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Public Routes
Route::get('/movie/{id}', [MovieController::class, 'getMovieDetails']);
Route::get('/search-movies/{query}', [MovieController::class, 'searchMovies']);
Route::get('/actors/{query}', [MovieController::class, 'searchActors']);
Route::get('/movies/popular', [MovieController::class, 'getPopularMovies']);
Route::get('/movies/top_rated', [MovieController::class, 'getTopRatedMovies']);
Route::get('/movies/trending', [MovieController::class, 'getTrendingMovies']);
Route::get('/movies/search', [MovieController::class, 'searchMovies']);
Route::get('/movies/upcoming', [MovieController::class, 'getUpcomingMovies']);
Route::get('/authenticated-user', [MovieController::class, 'getAuthenticatedUser'])->name('authenticated-user');
Route::get('/movies', [UserController::class, 'getSavedShows']);
Route::put('/movies', [UserController::class, 'updateSavedShows']);
Route::get('/search', [MovieController::class, 'search']);

// Authenticated Routes
    Route::post('/add-to-favorites', [MovieController::class, 'addToFavorites']);
    Route::get('/get-favorites', [MovieController::class, 'getFavorites']);
    Route::get('/movie/{movieId}/videos', [MovieController::class, 'getVideos']);
    Route::delete('/user/{userId}/delete-show/{showId}', [UserController::class, 'deleteSavedShow']);
    Route::post('/update-password', [UserController::class, 'update']);
// CSRF Token Route
Route::get('/csrf-token', function () {
    $csrfToken = csrf_token();
    return response()->json(['csrf_token' => $csrfToken]);
});

require __DIR__.'/auth.php';