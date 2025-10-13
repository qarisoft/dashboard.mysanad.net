<?php

namespace App\Http\Controllers\Admin\Geo;

use App\Http\Controllers\Controller;
use App\Models\Geo\District;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DistrictController extends Controller
{
    private string $path = 'admin/geo/districts';

    public function index(): Response
    {

        $districts = $this->paginate(
            District::query()
                ->with(['city', 'region'])
        );

        return Inertia::render($this->path.'/index', ['page_data' => $districts]);
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
    public function show(District $district)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(District $district)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, District $district)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(District $district)
    {
        //
    }
}
