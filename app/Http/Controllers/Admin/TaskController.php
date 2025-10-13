<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\LaravelPdf\Facades\Pdf;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'admin/tasks';

    public function index()
    {
        $status_id = \request()->query('status');
        $company_id = \request()->query('company');
        $q = Task::query()
            ->with(['company:id,name', 'customer', 'viewer.user', 'city:id,name', 'status:id,name,color']);
        if (! empty($status_id) && $status_id != 'all') {
            $q->where('task_status_id', $status_id);
        }
        if (! empty($company_id) && $company_id != 'all') {
            $q->where('company_id', $company_id);
        }
        $tasks = $this->paginate($q);
        $q2 = DB::table('tasks')
            ->select(DB::raw('count(*) as task_count,task_status_id,task_statuses.name,task_statuses.color'))
            ->join('task_statuses', 'tasks.task_status_id', '=', 'task_statuses.id');
        if (! empty($company_id) && $company_id != 'all') {
            $q2 = $q2->where('tasks.company_id', $company_id);
        }

        $q2 = $q2->groupBy('task_status_id')->get();

        return Inertia::render($this->path.'/index', [
            'tasks' => $tasks,
            'task_status' => TaskStatus::all(),
            'companies' => Company::query()->paginate(15, page: 1),
            'stats' => $q2,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Pdf::view('invoice', ['invoice' => '$invoice'])
            ->save('invoice.pdf');
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
        //
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
