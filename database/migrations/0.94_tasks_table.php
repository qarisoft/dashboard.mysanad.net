<?php

use App\Models\Company;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\EstateType;
use App\Models\Geo\City;
use App\Models\Geo\District;
use App\Models\Location;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\Viewer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
//            $table->primary(['company_id', 'customer_id']);
            $table->foreignId('company_id');
            $table->unsignedInteger('task_number');
            $table->unique(['company_id', 'task_number']);
            $table->unique(['company_id', 'order_number']);
            $table->string('code')->nullable();

            $table->string('notes')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_done')->default(true);

            $table->foreignIdFor(Viewer::class)->nullable();
            $table->foreignIdFor(Customer::class)->nullable();
            $table->foreignIdFor(TaskStatus::class)->default(1);
            $table->foreignIdFor(City::class)->nullable();
            $table->foreignIdFor(District::class)->nullable();
            $table->foreignIdFor(Location::class)->nullable();
            $table->foreignIdFor(EstateType::class)->nullable();

            $table->timestamp('received_at')->nullable();
            $table->timestamp('must_do_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamp('published_at')->nullable();

            $table->unsignedInteger('order_number');
            $table->string('suk_number')->nullable();
            $table->string('license_number')->nullable();
            $table->string('scheme_number')->nullable();
            $table->string('piece_number')->nullable();
            $table->string('age')->nullable();

            $table->string('address')->nullable();
            $table->string('district')->nullable();
            $table->string('estate_type')->nullable();
            $table->string('near_south')->nullable();
            $table->string('near_north')->nullable();
            $table->string('near_west')->nullable();
            $table->string('near_east')->nullable();
            $table->string('suck_file')->nullable();
            $table->string('licence_file')->nullable();
            $table->json('other_file')->nullable();

            $table->string('company_feedback')->nullable();
            $table->json('attach')->nullable();
            $table->string('created_date')->default(now());
            $table->timestamps();
        });

        Schema::create('employee_task', function (Blueprint $table) {
            $table->primary(['task_id', 'employee_id']);
            $table->foreignIdFor(Task::class);
            $table->foreignIdFor(Employee::class);
        });

        Schema::create('task_viewer', function (Blueprint $table) {
            $table->primary(['task_id', 'viewer_id']);
            $table->foreignIdFor(Task::class);
            $table->foreignIdFor(Viewer::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
