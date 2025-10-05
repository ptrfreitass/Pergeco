<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Lista todas as categorias (padrão + personalizadas do usuário)
     */
    public function index()
    {
        $userId = Auth::id();

        // Exclui categorias que o usuário optou por não ver
        $categoriasExcluidas = DB::table('category_user_exclusions')
            ->where('user_id', $userId)
            ->pluck('category_id');

        // Exclui subcategorias que o usuário optou por não ver
        $subcategoriasExcluidas = DB::table('subcategory_user_exclusions')
            ->where('user_id', $userId)
            ->pluck('subcategory_id');

        // Busca categorias que não estão excluídas e pertencem ao usuário ou são padrão
        $categories = Category::whereNotIn('id', $categoriasExcluidas)
            ->where(function($q) use ($userId) {
                $q->whereNull('user_id')
                  ->orWhere('user_id', $userId);
            })
            ->with(['subcategories' => function ($q) use ($userId, $subcategoriasExcluidas) {
                $q->whereNotIn('id', $subcategoriasExcluidas)
                  ->where(function ($subq) use ($userId) {
                    $subq->whereNull('user_id')
                         ->orWhere('user_id', $userId);
                });
            }])
            ->get();

        return response()->json($categories);
    }

    /**
     * Cria uma nova categoria personalizada
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
        ]);

        $category = Category::create([
            'name' => $validated['name'],
            'type' => $validated['type'] ?? null,
            'user_id' => Auth::id(),
        ]);

        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Mostra uma categoria específica (se for do usuário ou padrão)
     */
    public function show($id)
    {
    $userId = Auth::id();

    $category = Category::where('id', $id)
        ->where(function ($query) use ($userId) {
            $query->whereNull('user_id')
                  ->orWhere('user_id', $userId);
        })
        ->with(['subcategories' => function ($q) use ($userId) {
            $excluidas = DB::table('subcategory_user_exclusions')
                ->where('user_id', $userId)
                ->pluck('subcategory_id');

            $q->whereNotIn('id', $excluidas)
              ->where(function ($subq) use ($userId) {
                  $subq->whereNull('user_id')
                       ->orWhere('user_id', $userId);
              });
        }])
        ->firstOrFail();

     return response()->json($category);
    }


    /**
     * Atualiza uma categoria personalizada do usuário
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
        ]);

        $category = Category::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $category->update($validated);

        return response()->json($category);
    }

    /**
     * Remove uma categoria personalizada do usuário
     */
    public function destroy($id)
    {
        $userId = Auth::id();

        $category = Category::where('id', $id)
            ->where(function($q) use ($userId) {
                $q->whereNull('user_id')
                  ->orWhere('user_id', $userId);
            })
            ->firstOrFail();
        
        if ($category->user_id === null) {
            // Oculta categoria padrão ao invés de deletar
            DB::table('category_user_exclusions')->insertOrIgnore([
                'user_id' => $userId,
                'category_id' => $category->id,
            ]);

            return response()->json(['message' => 'Categoria padrão oculta com sucesso.']);
        }    

        $category->delete();

        return response()->json(['message' => 'Categoria removida com sucesso.']);
    }

    /**
     * Restaura categorias padrão removidas pelo usuário
     */
    public function restoreDefaults()
    {
        $userId = Auth::id();

        // Remove exclusões personalizadas
        DB::table('category_user_exclusions')
            ->where('user_id', $userId)
            ->delete();

        DB::table('subcategory_user_exclusions')
            ->where('user_id', $userId)
            ->delete();

        return response()->json(['message' => 'Categorias padrão restauradas com sucesso.']);
    }
}