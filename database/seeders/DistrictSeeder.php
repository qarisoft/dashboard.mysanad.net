<?php

namespace Database\Seeders;

use App\Models\Geo\District;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    public function run(): void
    {
        District::factory()->createMany([
            [
                'id' => 11302268014,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي اليمامة',
                'name_en' => 'Al Yamamah Dist.',
            ],
            [
                'id' => 11302268015,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الخالدية',
                'name_en' => 'Al Khalidiyah Dist.',
            ],
            [
                'id' => 11302268016,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي المروج',
                'name_en' => 'Al Muruj Dist.',
            ],
            [
                'id' => 11302268017,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الصفاه الاول',
                'name_en' => 'Al Safat 1 Dist.',
            ],
            [
                'id' => 11302268018,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي أصفان',
                'name_en' => 'Asfan Dist.',
            ],
            [
                'id' => 11302268021,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الرديفة والرافعية',
                'name_en' => 'Ar Radifah Wal Rafeiyah Dist.',
            ],
            [
                'id' => 11302268022,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الدانة',
                'name_en' => 'Ad Danah Dist.',
            ],
            [
                'id' => 11302268023,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي التلال',
                'name_en' => 'At Talal Dist.',
            ],
            [
                'id' => 11302268024,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي البوداي',
                'name_en' => 'Al Bawadi Dist.',
            ],
            [
                'id' => 11302268025,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الصناعي',
                'name_en' => 'Industrial Dist.',
            ],
            [
                'id' => 11302268026,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي النزهة',
                'name_en' => 'An Nuzhah Dist.',
            ],
            [
                'id' => 11302268027,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الشفاء',
                'name_en' => 'Ash Shifa Dist.',
            ],
            [
                'id' => 11302268028,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الغدير',
                'name_en' => 'Al Ghadir Dist.',
            ],
            [
                'id' => 11302268029,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الجوهرة',
                'name_en' => 'Al Jawharah Dist.',
            ],
            [
                'id' => 11302268030,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي الصفاه الثاني',
                'name_en' => 'Al Safat 2 Dist.',
            ],
            [
                'id' => 11302268031,
                'city_id' => 2268,
                'region_id' => 13,
                'name' => 'حي المصيف',
                'name_en' => 'Al Masif Dist.',
            ],
            [
                'id' => 11302270001,
                'city_id' => 2270,
                'region_id' => 13,
                'name' => 'حي الملك فهد',
                'name_en' => 'King Fahd Dist.',
            ],
            [
                'id' => 11302270002,
                'city_id' => 2270,
                'region_id' => 13,
                'name' => 'حي السلام',
                'name_en' => 'As Salam Dist.',
            ],
        ]);
    }
}
