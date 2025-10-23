<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Message;
use App\Models\Task;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Viewer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RegionSeeder::class,
            DistrictSeeder::class,
            CitySeeder::class,
            TaskStatusSeeder::class,
            EstateTypeSeeder::class,
        ]);


        User::factory()->admin()->create([
            'email' => 'admin@t.t',
            'username' => 'admin',
        ]);
        $this->createCompanyWithViewer('company1', 'viewer1');
        // $this->createCompanyWithViewer('company2', 'viewer2');

        Company::factory()->count(10)->create();
    }

    public function createCompanyWithViewer(string $username, string $vUsername): void
    {
        $u = User::factory()->owner()->create([
            'username' => $username,
            'email' => $username . '@t.t',
        ]);

        $c = $this->createCompany($u, $vUsername);
        $this->v1($u, $c, $vUsername);
    }

    public function createCompany(User $u, string $viewerUserName): Collection|Model
    {
        return Company::factory()
            ->has(Employee::factory(10)->withUser())
            ->has(Customer::factory(10)->withUser())
            ->has(Viewer::factory()->state([
                'user_id' => User::factory()->viewer()->create([
                    'username' => $viewerUserName,
                ])->id,
            ]))
            ->create(['user_id' => $u->id, 'is_active' => true]);
    }

    public function v1(User $u, Company $c, $vuser): void
    {
        $u->setCurrentCompany($c->id);
        $v =
            Viewer::query()->whereHas('user', fn($q) => $q->where('username', $vuser))->first();
        $v?->companies()->sync([$c->id]);

        $c->customers->each(function ($customer) use ($c) {
            Task::factory()
                ->count(rand(20, 100))
                ->state(fn() => [
                    'company_id' => $c->id,
                    'customer_id' => $customer->id,
                    'task_status_id' => rand(1, 6),
                    'created_date' => '2025-' . rand(1, 3) . '-' . rand(1, 28),
                ])
                ->create();
        });

        $c->tasks->each(fn($task) => $task->publish());

        $v->visibleTasks()->sync($c->tasks->pluck('id')->toArray());


        //        Message::factory(5)
        //            ->create([
        //                'from_id' => $u->id,
        //                'company_id' => $c->id,
        //            ])
        //            ->each(function (Message $message) use ($c) {
        //                $message->users()->attach($c->employees->pluck('user_id'));
        //            });
        //
        //        Message::factory(3)->create([
        //            'from_id' => 2,
        //            'to_id'=>$u->id,
        //            'company_id' => $c->id,
        //        ]);

        //        Customer::factory(100)
        //            ->create()->each(function (Customer $customer) use ($c) {
        //                $customer->companies()->attach([$c->id]);
        //                Task::factory(1)->create(['company_id' => $c->id, 'customer_id' => $customer->id]);
        //            })
        //        ;
        //        $u=User::factory()->create();
        //
        //        $c = Company::factory()
        //            ->has(Employee::factory(10)->withUser())
        //            ->create(['name' => 'Test company 2', 'user_id' => $u->id]);
        //
        //        Message::factory(5)
        //            ->create([
        //                'from_id' => $u->id,
        //                'company_id' => $c->id,
        //            ])->each(function (Message $message) use ($c) {
        //                $message->users()->attach($c->employees->pluck('user_id'));
        //            });

    }
}
