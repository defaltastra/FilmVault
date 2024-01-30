<?php

namespace App\Http\Controllers;

use App\Models\User;
use Log;
use App\Models\Movie;
use GuzzleHttp\Client;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    private $apiKey;

    
    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key');
    }

    public function getMovieDetails($movieId)
    {
        $apiKey = config('services.tmdb.api_key'); // recuperer api depuis env

        $response = Http::get("https://api.themoviedb.org/3/movie/{$movieId}", [
            'api_key' => $apiKey,
            'append_to_response' => 'videos',
        ]);

        return $response->json();
    }
    public function searchMovies($query)
    {
        $client = new Client();
        $response = $client->get("https://api.themoviedb.org/3/search/movie?api_key={$this->apiKey}&query={$query}&language=en-US");

        return $response->getBody();
    }

  
    
    
    
    
    

public function getVideos($movieId)
    {
        $apiKey = config('services.tmdb.api_key'); 
        // recuperer le trailer du movie
        $response = Http::get("https://api.themoviedb.org/3/movie/{$movieId}/videos", [
            'api_key' => $apiKey,
        ]);

        return $response->json();
    }

    


public function getCsrfToken()
{
    return response()->json(['csrf_token' => csrf_token()]);
}
public function getPopularMovies()
{
    $client = new Client();
    $response = $client->get("https://api.themoviedb.org/3/movie/popular?api_key={$this->apiKey}&language=en-US&page=1");

    return $response->getBody();
}

public function getTopRatedMovies()
{
    $client = new Client();
    $response = $client->get("https://api.themoviedb.org/3/movie/top_rated?api_key={$this->apiKey}&language=en-US&page=1");

    return $response->getBody();
}

public function getTrendingMovies()
{
    $client = new Client();
    $response = $client->get("https://api.themoviedb.org/3/movie/popular?api_key={$this->apiKey}&language=en-US&page=2");

    return $response->getBody();
}

public function getUpcomingMovies()
{
    $client = new Client();
    $response = $client->get("https://api.themoviedb.org/3/movie/upcoming?api_key={$this->apiKey}&language=en-US&page=1");

    return $response->getBody();
}




public function addToFavorites(Request $request)
{
    Log::info('Request received to add to favorites.');

    // recuperer les données depuis l'api TMDB
    $movieId = $request->input('movie_id');
    $apiKey = config('services.tmdb.api_key');
    $response = Http::get("https://api.themoviedb.org/3/movie/{$movieId}", [
        'api_key' => $apiKey,
        'append_to_response' => 'videos',
    ]);

    $movieData = $response->json();

    // Creer l'objet film
    $movie = new Movie([
        'title' => $movieData['title'],
        'overview' => $movieData['overview'],
        'release_date' => $movieData['release_date'],
        'tmdb_id' => $movieId,
        'poster_path' => $movieData['poster_path'],
    ]);

    // associer le film avec l'id correspondant
    $userId =  $request->header('userId');
    $user = User::find($userId);
    $user->movies()->save($movie);

    Log::info('Movie added to favorites successfully.');

    return response()->json(['message' => 'Movie added to favorites successfully']);
}

public function getAuthenticatedUser()
{
    // recuperer l'utilisateur authentifié
    $user = Auth::user();

    if ($user) {
        return response()->json(['user' => $user]);
    } else {
        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
public function search(Request $request)
    {
        $query = $request->input('q');
        $apiKey = config('services.tmdb.api_key'); 
        $page = $request->input('page', 1);
        // requete pour faire la recherche
        $response = Http::get("https://api.themoviedb.org/3/search/movie", [
            'api_key' => $apiKey,
            'query' => $query,
        ]);

        $results = $response->json()['results'];

        return response()->json(['results' => $results]);
    }



}
