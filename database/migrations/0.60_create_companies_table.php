<?php

use App\Models\Company;
use App\Models\Customer;
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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avatar_url')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
        Schema::create('company_customer', function (Blueprint $table) {
            $table->primary(['company_id', 'customer_id']);
            $table->foreignIdFor(Company::class);
            $table->foreignIdFor(Customer::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
