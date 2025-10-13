<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'company/map';

    public function index(): Response
    {
        $page = request()->query('page');
        $perPage = request()->query('perPage') ?? 50;
        $search = request()->query('search');
        $company_id = \request()->user()->current_company;
        $tasks = Task::query()->with('location', 'customer')->whereHas('company', function ($query) use ($company_id) {
            $query->where('company_id', $company_id);
        });

        return Inertia::render($this->path . '/index', ['tasks' => Inertia::defer(fn() => $tasks->get())]);
    }

    /**
     * Show the utils for creating a new resource.
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
        //
    }

    /**
     * Show the utils for editing the specified resource.
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
