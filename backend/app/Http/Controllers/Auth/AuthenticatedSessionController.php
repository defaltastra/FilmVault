<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\CSRFToken;
use Laravel\Sanctum\Sanctum;
class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();
        $csrfToken = csrf_token();
        return response()->json(['user' => $user,'token' => $csrfToken]);
    }

    /**
     * Destroy an authenticated session.
     */
/**
 * Destroy an authenticated session.
 */
public function destroy(Request $request)
{
    // Logout the user
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return $this->loggedOut($request) ?: response()->json(['message' => 'User logged out']);
}
protected function loggedOut(Request $request)
{
    return response()->json(['message' => 'User logged out']);
}
}
