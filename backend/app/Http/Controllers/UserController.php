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
        $userName = $request->header('X-User-Name'); 
        
        
        $user = User::where('name', $userName)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        
        $movies = Movie::where('user_id', $user->id)->get();
    
        return response()->json(['savedShows' => $movies]);
    }
    
    
    public function deleteSavedShow($userId, $showId)
    {
        try {
            
    
            $user = User::findOrFail($userId);
    
            
            $movie = Movie::where('user_id', $userId)->where('id', $showId)->first();
    
            
            if ($movie) {
                $movie->delete();
                return response()->json(['message' => 'Saved show deleted successfully']);
            }
    
            
            return response()->json(['error' => 'Show not found'], 404);
        } catch (\Exception $e) {
            
            \Log::error('Error deleting show: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    
    
    
    
    private function validateAuthToken(User $user, $authToken)
    {
        
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
    
        
        $userName = $request->header('X-User-Name');
    
        
        $user = User::where('name', $userName)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 422);
        }
    
        
        $user->password = Hash::make($request->password);
        $user->save();
    
        return response()->json(['status' => 'Password updated successfully']);
    }
    
}
