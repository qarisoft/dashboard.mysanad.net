<?php

use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('estate_pricings', function (Blueprint $table) {
        //     $table->id();
        //     $table->float('total_price')->default(0);
        //     $table->float('meter_square_price')->default(0);
        //     $table->float('meter_square_area')->default(0);
        //     $table->string('name');
        //     $table->string('key');
        //     $table->foreignIdFor(Task::class)->constrained()->cascadeOnDelete();
        //     $table->nullableTimestamps();
        // });
        Schema::create('estate_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id');
            $table->boolean('is_default')->default(false);
            //            $table->float('total_price')->default(0);
            //            $table->float('meter_square_price')->default(0);
            //            $table->float('meter_square_area')->default(0);
            $table->string('name');
            $table->string('key');
            $table->unique(['company_id', 'key']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estate_pricings');
    }
};
