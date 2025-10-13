<?php

namespace Database\Seeders;

use App\Models\Geo\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        Region::factory()->createMany(
            [
                [
                    'id' => 1,
                    'capital_city_id' => 3,
                    'code' => 'RD',
                    'name' => 'منطقة الرياض',
                    'name_en' => 'Riyadh',
                ],
                [
                    'id' => 2,
                    'capital_city_id' => 6,
                    'code' => 'MQ',
                    'name' => 'منطقة مكة المكرمة',
                    'name_en' => 'Makkah',
                ],
                [
                    'id' => 3,
                    'capital_city_id' => 14,
                    'code' => 'MN',
                    'name' => 'منطقة المدينة المنورة',
                    'name_en' => 'Madinah',
                ],
                [
                    'id' => 4,
                    'capital_city_id' => 11,
                    'code' => 'QA',
                    'name' => 'منطقة القصيم',
                    'name_en' => 'Qassim',
                ],
                [
                    'id' => 5,
                    'capital_city_id' => 13,
                    'code' => 'SQ',
                    'name' => 'المنطقة الشرقية',
                    'name_en' => 'Eastern Province',
                ],
                [
                    'id' => 6,
                    'capital_city_id' => 15,
                    'code' => 'AS',
                    'name' => 'منطقة عسير',
                    'name_en' => 'Asir',
                ],
                [
                    'id' => 7,
                    'capital_city_id' => 1,
                    'code' => 'TB',
                    'name' => 'منطقة تبوك',
                    'name_en' => 'Tabuk',
                ],
                [
                    'id' => 8,
                    'capital_city_id' => 10,
                    'code' => 'HA',
                    'name' => 'منطقة حائل',
                    'name_en' => 'Hail',
                ],
                [
                    'id' => 9,
                    'capital_city_id' => 2213,
                    'code' => 'SH',
                    'name' => 'منطقة الحدود الشمالية',
                    'name_en' => 'Northern Borders',
                ],
                [
                    'id' => 10,
                    'capital_city_id' => 17,
                    'code' => 'GA',
                    'name' => 'منطقة جازان',
                    'name_en' => 'Jazan',
                ],
                [
                    'id' => 11,
                    'capital_city_id' => 3417,
                    'code' => 'NG',
                    'name' => 'منطقة نجران',
                    'name_en' => 'Najran',
                ],
                [
                    'id' => 12,
                    'capital_city_id' => 1542,
                    'code' => 'BA',
                    'name' => 'منطقة الباحة',
                    'name_en' => 'Bahah',
                ],
                [
                    'id' => 13,
                    'capital_city_id' => 2237,
                    'code' => 'GO',
                    'name' => 'منطقة الجوف',
                    'name_en' => 'Jawf',
                ],
            ]
        );
    }
}
