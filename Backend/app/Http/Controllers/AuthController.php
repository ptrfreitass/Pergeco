<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validação básica dos campos
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Verifica se o usuário existe e a senha está correta
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        // Cria o token Sanctum
        $token = $user->createToken('api_token')->plainTextToken;

        // Retorna o usuário + token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
    
    public function register(Request $request)
    {
        // Validação básica dos campos
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Cria o usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Cria o token Sanctum
        $token = $user->createToken('api_token')->plainTextToken;

        // Retorna o usuário + token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function getUser()
    {
        return User::class;
    }
}
