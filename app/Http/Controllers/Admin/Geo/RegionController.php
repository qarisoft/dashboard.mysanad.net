<?php

namespace App\Http\Controllers\Admin\Geo;

use App\Http\Controllers\Controller;
use App\Models\Geo\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegionController extends Controller
{
    private string $path = 'admin/geo/regions';

    public function index(): Response
    {

        $regions = $this->paginate(
            Region::query()
                ->with(['capitalCity'])
        );

        return Inertia::render($this->path.'/index', ['page_data' => $regions]);
    }

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
    public function show(Region $region)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Region $region)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Region $region)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Region $region)
    {
        //
    }
}
