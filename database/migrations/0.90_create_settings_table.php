<?php

use App\Models\Company;
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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            // $table->primary(['company_id']);
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();
            $table->enum('red_per', ['h', 'm', 'd'])->default('h');
            $table->enum('blue_per', ['h', 'm', 'd'])->default('h');
            $table->integer('red_minutes')->default(0);
            $table->integer('blue_minutes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
