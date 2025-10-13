<?php

namespace App\Http\Controllers\Admin\Geo;

use App\Http\Controllers\Controller;
use App\Models\Geo\City;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    private string $path = 'admin/geo/cities';

    public function index(): Response
    {

        $cities = $this->paginate(
            City::query()
                ->with(['region'])
        );

        return Inertia::render($this->path.'/index', ['page_data' => $cities]);
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
