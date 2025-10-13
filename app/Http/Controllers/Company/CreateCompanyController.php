<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Repositories\CreateCompanyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateCompanyController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/create-company');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'agree' => 'required|boolean|max:255',
        ]);
        $repo = CreateCompanyRepository::create(request()->user(), $request->name);
        if ($repo->validate()) {
            $this->success('well done');
        }


        return to_route('dashboard');
    }
}
