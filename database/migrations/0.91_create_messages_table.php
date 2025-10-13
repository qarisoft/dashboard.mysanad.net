<?php

use App\Models\Company;
use App\Models\User;
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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'from_id')->index();
            $table->foreignIdFor(Company::class)->index();
            $table->string('subject');
            $table->longText('body')->nullable();
            $table->foreignId('to_id')->nullable();
            $table->foreignId('thread_id')->nullable();
            $table->boolean('all')->default(false);
            $table->boolean('was_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
        Schema::create('message_user', function (Blueprint $table) {
            $table->primary(['message_id', 'to_id']);
            $table->foreignId('to_id')->index();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->boolean('was_read')->default(false);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
