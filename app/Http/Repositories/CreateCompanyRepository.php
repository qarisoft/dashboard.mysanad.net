<?php

namespace App\Http\Repositories;

use App\Enums\UserType;
use App\Models\Company;
use App\Models\User;

class CreateCompanyRepository
{
    private User $user;

    private string $company_name;
    private string $file_name;

    public function __construct(User $user, string $company_name, string $fileName)
    {
        $this->user = $user;
        $this->company_name = $company_name;
        $this->file_name = $fileName;
    }

    public static function create(User $user, string $company_name,string $fileName): static
    {
        $repo = new CreateCompanyRepository($user, $company_name, $fileName);
        $repo->make();

        return $repo;
    }

    public function make(): static
    {
        $company = Company::create([
            'name' => $this->company_name,
            'user_id' => $this->user->id,
            'file'=> $this->file_name,
        ]);

        $this->user->changeType(UserType::EMPLOYEE);

        $this->user->setCurrentCompany($company->id);

        $this->user->employee()->create([
            'company_id' => $company->id,
            'is_active' => true,
        ]);

        return $this;
    }

    public function validate(): bool
    {
        $this->user->refresh();

        return $this->user->isCompanyOwner() && $this->user->employee()->exists();
    }
}
