<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use App\Models\Viewer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class ViewersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'company/viewers';

    public function index(): Response
    {

        $e = $this->scopeCompany(
            Viewer::query()->with(['user:id,name,email,username'])
        );

        $e = $this->paginate($e);

        return Inertia::render($this->path . '/index', ['page_data' => $e]);
    }

    public function activate(Viewer $viewer): \Illuminate\Http\RedirectResponse
    {
        $viewer->is_active = !$viewer->is_active;
        $viewer->save();
        request()->session()->flash('success', __('viewer is activated successfully') . '!');
        return back();
        //        return Redirect::route('users.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'username' => 'required|string|lowercase|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $company = request()->user()->company;

        $user = User::factory()->viewer()->create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $v = Viewer::create([
            'company_id' => $company->id,
            'is_active' => true,
            'user_id' => $user->id,
        ]);
        $user->setCurrentCompany($company->id);

        $request->session()->flash('success', __('Viewer created successfully') . '!');
    }

    /**
     * Show the utils for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        //        Employee::query()->findOrFail($id);
        $e = Employee::with('user')->find($id);

        return Inertia::render($this->path . '/show', ['employee' => $e]);
    }

    /**
     * Show the utils for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $u = Viewer::find($id);
        //        dd($u);
        //        $u->user()->delete();
        $u->delete();

//        return redirect()->route('users.index');
    }
}
