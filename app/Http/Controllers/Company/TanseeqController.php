<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Geo\City;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TanseeqController extends Controller
{
    private string $path = 'company/tanseeq';

    public function index()
    {
        $e = $this
            ->scopeCompany(
                Task::query()
                    ->with('customer.user:id,name', 'city', 'status', 'location')
                    ->published()
                    ->latest()
            )->paginate();

        return Inertia::render($this->path . '/index', ['page_data' => $e, 'search' => null]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
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
            'is_published' => $request->is_published,
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

        return to_route('tanseeq.show', $task->id);
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        Task::query()->find($id)->update([
            'code' => $request->code,
            'notes' => $request->notes,
            'is_published' => $request->is_published,
            'customer_id' => $request->customer_id,
            'city_id' => $request->city_id,
            'received_at' => $request->received_at,
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
        $task = Task::query()->find($id);
//        dd($task->location);
        $task->location()->update([
            'lat' => $request->location['lat'],
            'lng' => $request->location['lng'],
        ]);
        return to_route('tanseeq.edit', $id);

//
//        if (!$task->location()->exists()) {
//            $task->location()->create([
//                'lat' => $request->location['lat'] ?? 0,
//                'lng' => $request->location['lng'] ?? 0,
//            ]);
//        } else {
//        }
//        Task::find($id)->location->update([
//            'lat' => $request->location?->lat ?? 0,
//            'lng' => $request->location?->lng ?? 0,
//        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $task = Task::query()->where('id', $id)->with('city', 'customer', 'location','estate')->first();
        $price_e = $task->pricingEvaluations();
        $uploads = $task->uploads()->get();

        return Inertia::render($this->path . '/show', ['task' => $task, 'price' => $price_e, 'uploads' => $uploads]);
        //
    }

    public function sendBack()
    {

    }

    public function complete(Task $task)
    {

    }

    /**
     * Show the utils for editing the specified resource.
     */
    public function edit(int $id): Response
    {
        $task = Task::with('location')->find($id);
        $company_id = request()->user()->current_company;
        $customers = Company::find($company_id)->customers;
        $cities = City::all();

        return Inertia::render($this->path . '/edit', ['task' => $task, 'customers' => $customers, 'cities' => $cities]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
