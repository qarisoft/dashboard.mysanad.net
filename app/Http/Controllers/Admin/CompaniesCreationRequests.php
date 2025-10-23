<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompaniesCreationRequests extends Controller
{
    private string $path = 'admin/companies-applications';

    function index(): Response
    {
        $page_data = $this->paginate(Company::with(['owner'])->inactive());
        return Inertia::render($this->path . '/index', ['page_data' => $page_data]);
    }


    function create(): void {}
    function update(Company $company): void {
        // $company->ac
    }
}
