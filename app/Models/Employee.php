<?php

namespace App\Models;

// use Attribute;

use App\Traits\BelongsToCompany;
use App\Traits\HasUser;
use Database\Factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    /** @use HasFactory<EmployeeFactory> */
    use BelongsToCompany, HasFactory, HasUser;

    protected $casts = [
        'is_active' => 'boolean',
        'is_owner' => 'boolean',
    ];

    // protected $guarded=[]
    protected $fillable = [
        'name',
        'username',
        'email',
        'user_id',
        'company_id',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch(Builder $query, $like): Builder
    {

        return $query->whereHas('user', function (Builder $q) use ($like) {
            $q->whereLike('username', "{$like}%")
                ->orWhereLike('email', "{$like}%")
                ->orWhereLike('name', "{$like}%");
        });
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'from_id', 'user_id');
    }

    protected static function booted(): void
    {
        static::created(function (Employee $employee) {
            $employee->is_owner = $employee->user->ownCompany()->exists();
            $employee->save();
        });
    }
}
