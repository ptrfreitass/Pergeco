<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class SubcategoryController extends Controller
{
    /**
     * Cria uma nova subcategoria personalizada
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $subcategory = Subcategory::create([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'user_id' => Auth::id(),
        ]);

        return response()->json($subcategory, Response::HTTP_CREATED);
    }

    /**
     * Atualiza uma subcategoria personalizada do usuário
     */
    public function update(Request $request, $id)
    {
        $subcategory = Subcategory::where('id', $id)
            ->where(function ($q) {
                $q->whereNull('user_id')
                ->orWhere('user_id', Auth::id());
            })->firstOrFail();

        $subcategory->update($request->only(['name']));
        return response()->json($subcategory);
    }

    /**
     * Remove uma subcategoria personalizada do usuário
     */
    public function destroy($id)
    {   
        $userID = Auth::id();

        $subcategory = Subcategory::where('id', $id)
            ->where(function ($q) use ($userID) {
                $q->whereNull('user_id')
                ->orWhere('user_id', $userID);
            })
            ->firstOrFail();
        // Se for uma subcategoria padrão, apenas a oculta
        if ($subcategory->user_id === null) {
            DB::table('subcategory_user_exclusions')->insertOrIgnore([
                'user_id' => $userID,
                'subcategory_id' => $subcategory->id,
            ]);
        return response()->json(['message' => 'Subcategoria excluída com sucesso.']);
    }
    // Se for uma subcategoria personalizada, deleta
        $subcategory->delete();
        return response()->json(['message' => 'Subcategoria excluída com sucesso.']);
    }
}
