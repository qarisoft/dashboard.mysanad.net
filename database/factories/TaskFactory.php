<?php

namespace Database\Factories;

use App\Models\EstateType;
use App\Models\Geo;
use App\Models\Location;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
function str_rand(int $length = 10): string
{ // 64 = 32
    $length = ($length < 4) ? 4 : $length;

    return bin2hex(random_bytes(($length - ($length % 2)) / 2));
}

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $district = Geo\District::all()[rand(1, 10)];

        return [
            'code' => str_rand(), // ->unique(),
            'city_id' => $district->city?->id,
            'must_do_at' => Carbon::now()->add(rand(1, 50), 'hours'),
            'received_at' => date('Y-m-d H:i:s'),
            'district_id' => $district?->id,
            'location_id' => Location::factory()->create()->id,
            'estate_type_id' => rand(1, EstateType::query()->count()),
        ];
    }
}
