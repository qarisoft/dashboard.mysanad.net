<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Repositories\CreateCompanyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use function Illuminate\Filesystem\join_paths;

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
            'company_name' => 'required|string|max:255',
            'agree' => 'required',
            'file' => 'required|file|mimes:jpeg,jpg,png,pdf',
        ]);
//        dd($request->agree?'yes':'no');
        if ( $request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = Carbon::now()->timestamp . '.' . $file->extension();
            $file->move(storage_path('uploads'), $fileName);
            $repo = CreateCompanyRepository::create(request()->user(), $request->company_name,$fileName);
            if ($repo->validate()) {
                $this->success('well done');
                return to_route('dashboard');
            }
        }
        return back();
    }


    public function waitingApproval(): Response
    {
        return Inertia::render('auth/waitting-approval');
    }
}
