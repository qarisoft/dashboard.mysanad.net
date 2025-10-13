<?php

namespace App\Traits;

use App\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method belongsToMany(string $class)
 */
trait BelongsToManyCompany
{
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }
}
