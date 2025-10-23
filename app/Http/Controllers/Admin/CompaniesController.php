<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'admin/companies';

    public function index()
    {
        $companies = $this->paginate(
            Company::query()
                ->with(['owner'])
                ->withCount(['tasks', 'publishedTasks', 'employees', 'viewers'])
        );

        return Inertia::render($this->path . '/index', ['page_data' => $companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $q2 = DB::table('tasks')
            ->select(DB::raw('count(*) as task_count,task_status_id,task_statuses.name,task_statuses.color'))
            ->join('task_statuses', 'tasks.task_status_id', '=', 'task_statuses.id')
            ->where('tasks.company_id', $id);
        $q2 = $q2->groupBy('task_status_id')->get();

        return Inertia::render($this->path . '/show', ['tasks_stats' => $q2, 'company' => Company::with('owner')->find($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
