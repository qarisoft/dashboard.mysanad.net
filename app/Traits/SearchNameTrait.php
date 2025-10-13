<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

trait SearchNameTrait
{
    #[Scope]
    protected function search(Builder $query, $like): Builder
    {
        return $query->whereLike('name', "%{$like}%");
    }
}
