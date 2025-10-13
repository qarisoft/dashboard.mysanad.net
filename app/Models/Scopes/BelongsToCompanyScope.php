<?php

namespace App\Models\Scopes;

use App\Models\Employee;
// use http\Client\Curl\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class BelongsToCompanyScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $company_id = 1;
        // $company_id = session('company_id', function ()  {
        //     $employee = Employee::query()->firstOrFail('user_id',auth()->id());
        //     return $employee->company_id;
        // });
        $builder->whereHas('company', function (Builder $builder) use ($company_id) {
            $builder->where('id', $company_id);
        });

    }
}
