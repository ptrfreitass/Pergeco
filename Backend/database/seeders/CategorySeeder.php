<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Support\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $categories = [
            'Alimentação' => ['Mercado', 'Restaurante', 'Delivery'],
            'Transporte' => ['Combustível', 'Ônibus', 'Uber'],
            'Moradia' => ['Aluguel', 'IPTU', 'Água', 'Luz', 'Gás'],
            'Lazer' => ['Viagem', 'Cinema', 'Show', 'Assinatura'],
            'Saúde' => ['Plano de saúde', 'Exame', 'Medicação']
        ];

        foreach ($categories as $categoryName => $subcats) {
            $category = Category::create([
                'name' => $categoryName,
                'user_id' => null,
                'type' => 'despesa',
                'created_at' => $now,
                'updated_at' => $now,
            ]);

        $subsToInsert = [];
        foreach ($subcats as $subName) {
            $subsToInsert[] = [
                'name' => $subName,
                'category_id' => $category->id,
                'user_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        Subcategory::insert($subsToInsert);
        
        }

        // Remuneração
        $remuneracao = Category::create([
            'name' => 'Remuneração',
            'user_id' => null,
            'type' => 'receita',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        Subcategory::insert([
            ['name' => 'Salário CLT', 'category_id' => $remuneracao->id, 'user_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Freelance', 'category_id' => $remuneracao->id, 'user_id' => null, 'created_at' => $now, 'updated_at' => $now]
        ]);

        
        // Investimentos
        $investimento = Category::create([
            'name' => 'Investimento',
            'user_id' => null,
            'type' => 'receita',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        Subcategory::insert([
            ['name' => 'Rendimento', 'category_id' => $investimento->id, 'user_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Dividendos', 'category_id' => $investimento->id, 'user_id' => null, 'created_at' => $now, 'updated_at' => $now]
        ]);



    }
}