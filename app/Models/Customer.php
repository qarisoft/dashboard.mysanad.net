<?php

namespace App\Models;

use App\Traits\BelongsToManyCompany;
use App\Traits\HasUser;
use Database\Factories\CustomerFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<CustomerFactory> */
    use BelongsToManyCompany, HasFactory, HasUser;

    protected $casts = [
        'is_active' => 'boolean',

    ];

    protected $fillable = [
        'name',
        'is_active',
        'user_id',
    ];

    public function scopeSearch2(Builder $query, $like): Builder
    {

        return $query->whereHas('user', function (Builder $q) use ($like) {
            $q->whereLike('username', "%{$like}%")
                ->orWhereLike('email', "%{$like}%")
                ->orWhereLike('name', "%{$like}%");
        });
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
