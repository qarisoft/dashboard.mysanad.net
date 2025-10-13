<?php

namespace Database\Seeders;

use App\Models\EstateType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstateTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EstateType::factory()->createMany([
            ['name' => 'قيلا'],
            ['name' => 'منزل'],
            ['name' => 'عمارة'],
            ['name' => 'قطعة ارض'],
            ['name' => 'شقة'],
//            ['name' => 'اخرى'],
        ]);
    }
}
