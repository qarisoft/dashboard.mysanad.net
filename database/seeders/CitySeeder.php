<?php

namespace Database\Seeders;

use App\Models\Geo\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run2()
    {
        $file = require 'database/seeders/cities.php';
        //        $file = file_get_contents('database/seeders/cities.php');
        //        foreach ()
        //        $a = collect($file);
        //        City::factory()->createMany($file);
    }

    public function run(): void
    {
        City::factory()->createMany([
            [
                'id' => 2268,
                'region_id' => 13,
                'name' => 'دومة الجندل',
                'name_en' => 'Dawmat Al Jandal',
            ],
            [
                'id' => 2269,
                'region_id' => 13,
                'name' => 'ميقوع',
                'name_en' => "Mayqu'",
            ],
            [
                'id' => 2270,
                'region_id' => 13,
                'name' => 'الأضارع',
                'name_en' => "Al Adari'",
            ],
            [
                'id' => 2271,
                'region_id' => 13,
                'name' => 'صفان',
                'name_en' => 'Safan',
            ],
            [
                'id' => 2272,
                'region_id' => 13,
                'name' => 'الرديفة',
                'name_en' => 'Ar Radifah',
            ],
            [
                'id' => 2273,
                'region_id' => 13,
                'name' => 'ابو عجرم',
                'name_en' => "Abu 'Ajram",
            ],
            [
                'id' => 2274,
                'region_id' => 13,
                'name' => 'الطوير',
                'name_en' => 'At Tuwayr',
            ],
            [
                'id' => 2275,
                'region_id' => 8,
                'name' => 'صديان',
                'name_en' => 'Sadyan',
            ],
            [
                'id' => 2276,
                'region_id' => 8,
                'name' => 'الوسيطاء',
                'name_en' => 'Al Wusayta',
            ],
            [
                'id' => 2277,
                'region_id' => 8,
                'name' => 'البير',
                'name_en' => 'Al Bir',
            ],
            [
                'id' => 2278,
                'region_id' => 8,
                'name' => 'البويطن',
                'name_en' => 'Al Buwaytin',
            ],
            [
                'id' => 2279,
                'region_id' => 8,
                'name' => 'بدائع العش',
                'name_en' => "Badai' Al 'Ishsh",
            ],
            [
                'id' => 2280,
                'region_id' => 8,
                'name' => 'صحي',
                'name_en' => 'Sahayy',
            ],
            [
                'id' => 2281,
                'region_id' => 8,
                'name' => 'الوبيرية',
                'name_en' => 'Al Wubayriyah',
            ],
            [
                'id' => 2282,
                'region_id' => 8,
                'name' => 'قصيريات',
                'name_en' => 'Qusayriyat',
            ],
            [
                'id' => 2283,
                'region_id' => 8,
                'name' => 'سعيدان',
                'name_en' => "Su'aydan",
            ],
            [
                'id' => 2284,
                'region_id' => 8,
                'name' => 'جفيفاء',
                'name_en' => 'Jufayfa',
            ],
        ]);
    }
}
