<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'company/users';

    public function index(): Response
    {
        $e = $this
            ->scopeCompany(
                Employee::query()->with(['user:id,name,email,username'])
            )->paginate();

        return Inertia::render($this->path.'/index', ['page_data' => $e]);
    }

    public function activate(Employee $employee)
    {
        $employee->is_active = ! $employee->is_active;
        $employee->save();
        request()->session()->flash('success', __('employee.activated').'!');
        return back();


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $company_id = request()->user()->company->id;

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'username' => 'required|string|lowercase|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::factory()->employee()->create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->setCurrentCompany($company_id);

        $e = $user->employee()->create([
            'company_id' => $company_id,

        ]);

        $e->is_active = true;
        $e->save();

        $request->session()->flash('success', __('employee.created').'!');
    }

    /**
     * Show the utils for creating a new resource.
     */
    public function create()
    {
        return Inertia::render($this->path.'/create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $e = Employee::with('user')->find($id);

        return Inertia::render($this->path.'/show', ['employee' => $e]);
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
        $u = Employee::find($id);
        if ($u->is_owner) {
            request()->session()->flash('failure', __('Employee is Company Owner Can not be deleted').'!');

            return;
        }
        $u->delete();
        request()->session()->flash('success', __('Employee deleted successfully').'!');
    }
}
