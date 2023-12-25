<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{


    public function getSavedShows(Request $request)
    {
        $userName = $request->header('X-User-Name'); // Get the username from the request header
        
        // Assuming your movies table has a 'user_id' column
        $user = User::where('name', $userName)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Fetch movies associated with the user
        $movies = Movie::where('user_id', $user->id)->get();
    
        return response()->json(['savedShows' => $movies]);
    }
    
    
    public function deleteSavedShow($userId, $showId)
    {
        try {
            // Validate the request as needed
    
            $user = User::findOrFail($userId);
    
            // Assuming 'movies' table has 'user_id' and 'id' columns
            $movie = Movie::where('user_id', $userId)->where('id', $showId)->first();
    
            // If the movie is found, delete it
            if ($movie) {
                $movie->delete();
                return response()->json(['message' => 'Saved show deleted successfully']);
            }
    
            // If the movie is not found, return an error response
            return response()->json(['error' => 'Show not found'], 404);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error deleting show: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    
    
    
    
    private function validateAuthToken(User $user, $authToken)
    {
        // Validate the auth token against the stored token for the user
        return $user->authToken === $authToken;
    }
    
    public function updateSavedShows(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->update(['savedShows' => $request->input('savedShows')]);

        return response()->json(['message' => 'Saved shows updated successfully']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed:password_confirmation', Password::defaults()],
        ]);
    
        // Retrieve user name from headers
        $userName = $request->header('X-User-Name');
    
        // Assuming your users table has a 'name' column
        $user = User::where('name', $userName)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Verify the current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 422);
        }
    
        // Update the user's password
        $user->password = Hash::make($request->password);
        $user->save();
    
        return response()->json(['status' => 'Password updated successfully']);
    }
    
}
