<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasUser
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSearch(Builder $query, $like): Builder
    {
        return $query->whereHas('user', function (Builder $q) use ($like) {
            $q->whereLike('username', "%{$like}%")
                ->orWhereLike('email', "%{$like}%")
                ->orWhereLike('name', "%{$like}%");
        });
    }
}
