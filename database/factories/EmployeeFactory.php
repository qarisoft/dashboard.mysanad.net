<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        ];
    }

    public function withUser(): static
    {
        return $this->state(function (array $attributes) {
            return ['user_id' => User::factory()->employee()->create()->id];
        });
        //        return $this->for(User::factory()->employee()->create());
    }
}
