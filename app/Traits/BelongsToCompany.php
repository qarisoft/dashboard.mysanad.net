<?php

namespace App\Traits;

use App\Models\Company;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToCompany
{
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    #[Scope]
    public function ofCompany($q, int $company_id): void
    {
        $q->where('company_id', $company_id);
    }
}
