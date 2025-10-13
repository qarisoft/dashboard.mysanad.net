<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\EstateType;
use App\Models\Geo\City;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TasksController extends Controller
{

    private string $path = 'company/tasks';

    public function index(Request $request)
    {
        return Inertia::render('company/tasks/index', [
            'page_data' => fn() => $this
                ->scopeCompany(
                    Task::query()
                        ->with('customer.user:id,name', 'location', 'city', 'status')
                        ->latest()
                )->paginate(),
        ]);
    }

    /**
     * Show the utils for creating a new resource.
     */
    public function create(): Response
    {
        $search = request()->query('search');
        $company_id = request()->user()->current_company;

        return Inertia::render($this->path . '/create', [
            'customers' => fn() => Company::find($company_id)->customers,
            'cities' => fn() => City::search($search)
                ->take(10)->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255',
            'must_do_at' => 'required|string|max:255',
            'customer_id' => 'required',
            'city_id' => 'required',
        ]);

        $company_id = $request->user()->current_company;

        $company = Company::find($company_id);

        $task = $company->tasks()->create([
            'code' => $request->code,
            'notes' => $request->notes,
            'customer_id' => $request->customer_id,
            'city_id' => $request->city_id,
            'received_at' => $request->received_at,
            'must_do_at' => $request->must_do_at,
            'finished_at' => $request->finished_at,
            'published_at' => $request->published_at,
            'order_number' => $request->order_number,
            'suk_number' => $request->suk_number,
            'license_number' => $request->license_number,
            'scheme_number' => $request->scheme_number,
            'piece_number' => $request->piece_number,
            'age' => $request->age,
            'address' => $request->address,
            'district' => $request->district,
            'estate_type' => $request->estate_type,
            'near_south' => $request->near_south,
            'near_north' => $request->near_north,
            'near_west' => $request->near_west,
            'near_east' => $request->near_east,
            'company_feedback' => $request->company_feedback,
        ]);
        $task->location()->update(['lat' => $request->location?->lat ?? 0, 'lng' => $request->location?->lng ?? 0]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render($this->path . '/show', [
            'task' => Task::with('customer.user:id,name', 'location', 'city', 'status', 'estate')->find($id),
            'estates' => EstateType::all()
        ]);
    }

    /**
     * Show the utils for editing the specified resource.
     */
    public function edit(string $id)
    {
        $company_id = request()->user()->current_company;
        return Inertia::render($this->path . '/edit', [
            'task' => Task::with('customer.user:id,name', 'location', 'city', 'status')->find($id),
            'customers' => fn() => Company::find($company_id)->customers,
            'cities' => fn() => City::query()->get(),
            'estates' => fn() => EstateType::query()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::query()->find($id);
        $task->update([
            'code' => $request->code,
            'notes' => $request->notes,
//            'is_published' => $request->is_published,
            'customer_id' => $request->customer_id,
            'city_id' => $request->city_id,
//            'received_at' => $request->received_at,
            'must_do_at' => $request->must_do_at,
            'finished_at' => $request->finished_at,
            'order_number' => $request->order_number,
            'suk_number' => $request->suk_number,
            'license_number' => $request->license_number,
            'scheme_number' => $request->scheme_number,
            'piece_number' => $request->piece_number,
            'age' => $request->age,
            'address' => $request->address,
            'district' => $request->district,
            'estate_type' => $request->estate_type,
            'near_south' => $request->near_south,
            'near_north' => $request->near_north,
            'near_west' => $request->near_west,
            'near_east' => $request->near_east,
            'company_feedback' => $request->company_feedback,
        ]);

//        $task = Task::query()->find($id);

        $task->location()->update([
            'lat' => $request->location['lat'],
            'lng' => $request->location['lng'],
        ]);
        return to_route('tasks.edit', $id);
    }


    public function publish(Task $task): RedirectResponse
    {

        $task->is_published = request('is_published') ?? false;
        $task->published_at = now();
        $task->save();

        return to_route('tasks.index')->with('message', 'Task published successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
//        dd($id);
        return redirect()->back();
    }
}
