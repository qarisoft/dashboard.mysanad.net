<?php

namespace Database\Seeders;

use App\Enums\TaskStatusEnum;
use App\Models\TaskStatus;
use Illuminate\Database\Seeder;

class TaskStatusSeeder extends Seeder
{
    public function run(): void
    {
        TaskStatus::factory()->createMany(
            [
                ['default' => true, 'name' => 'مسودة', 'color' => '#b3abab', 'code' => TaskStatusEnum::DRAFT->name],
                ['default' => true, 'name' => 'تم الغاء النشر', 'color' => '#b3abab', 'code' => TaskStatusEnum::DEPUBLISHED->name],
                ['default' => true, 'name' => 'تم النشر', 'color' => '#ffff00', 'code' => TaskStatusEnum::PUBLISHED->name],
                ['default' => true, 'name' => 'تم الأرسال للمعاين', 'color' => '#f2f2f2', 'code' => TaskStatusEnum::ACCEPTED_BY_VIEWER->name],
                ['default' => true, 'name' => 'بأنتضار التعميد', 'color' => '#76933c', 'code' => TaskStatusEnum::UPLOADED->name],
                ['default' => true, 'name' => 'أكتملت', 'color' => '#92d050', 'code' => TaskStatusEnum::CLOSED->name],
                ['default' => true, 'name' => 'ملغية', 'color' => '#92d050', 'code' => TaskStatusEnum::CANCELED->name],

            ]
        );
    }
}
