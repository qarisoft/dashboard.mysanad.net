<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\EstateType;
use App\Models\Geo\City;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
//                        ->latest()

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
            'cities' => fn() => City::search($search)->take(10)->get(),
            'estate_types' => fn() => EstateType::all()

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'must_do_at' => 'required|string|max:255',
            'customer_id' => 'required',
            'city_id' => 'required',
            'estate_type_id' => 'required',
            'order_number' => 'required|unique:tasks,order_number,company_id',
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
            'estate_type_id' => $request->estate_type_id,
        ]);

        $task->location()->update(['lat' => $request->location?->lat ?? 0, 'lng' => $request->location?->lng ?? 0]);
        $task = $this->_update_files($request, $task);

        $task->save();
        return to_route('company.tasks.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::with('customer.user:id,name', 'location', 'city', 'status', 'estate')->find($id);
        return Inertia::render($this->path . '/show', [
            'task' => $task,
            'suck_file' => storage_path('task-files'),
            'estates' => EstateType::all()
        ]);
    }

    /**
     * Show the utils for editing the specified resource.
     */
    public function edit(string $id)
    {

        $company_id = request()->user()->current_company;

        $task = Task::with('customer.user:id,name', 'location', 'city', 'status')->find($id);

        return Inertia::render($this->path . '/edit', [
            'task' => $task,
            'customers' => fn() => Company::find($company_id)->customers,
            'cities' => fn() => City::query()->get(),
            'estates' => fn() => EstateType::query()->get(),
            'suck_file' => Storage::url('/tasks-files') . '/' . $task->id . '/' . $task->suck_file,
            'licence_file' => Storage::url('/tasks-files') . '/' . $task->id . '/' . $task->licence_file,
            'other_file' => Storage::url('/tasks-files') . '/' . $task->id . '/' . $task->other_file,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
//        return $request->all();
//        dd($request->all());
        $task = Task::query()->find($id);
        $task->fill([
            'code' => $request->code,
            'notes' => $request->notes,
            'customer_id' => $request->customer_id,
            'city_id' => $request->city_id,
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
        $task = $this->_update_files($request, $task);

        $task->save();
//        return to_route('tasks.edit', $id);
    }

    private function _update_files(Request $request, Task $task)
    {
        $id = $task->id;
        if ($request->hasFile('suck_file')) {
            $file = $request->file('suck_file');
            $fileName = 'suck_file_' . '_' . $id . '_.' . $file->extension();
            $file->move(storage_path('app/public/tasks-files/' . $id), $fileName);
            $task->suck_file = $fileName;
        }
        if ($request->hasFile('licence_file')) {
            $file = $request->file('licence_file');
            $fileName = 'licence_file_' . '_' . $id . '_.' . $file->extension();
            $file->move(storage_path('app/public/tasks-files/' . $id), $fileName);
            $task->licence_file = $fileName;
        }
        if ($request->hasFile('other_file')) {
            $file = $request->file('other_file');
            $fileName = 'other_file_' . '_' . $id . '_.' . $file->extension();
            $file->move(storage_path('app/public/tasks-files/' . $id), $fileName);
            $task->other_file = $fileName;
        }

        return $task;

    }


    public function publish(Task $task): RedirectResponse
    {
        if (\request('is_published')) {

            $task->publish();
        } else {
            $task->depublish();

        }


        return to_route('company.tasks.index')->with('message', 'Task published successfully');
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
