<?php

namespace App\Models;

use App\Services\SetupCompany;
use App\Traits\SearchNameTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory, SearchNameTrait;

    protected $fillable = [
        'name',
        'user_id',
    ];

    public static function Current()
    {
        $id = 1;

        //        if ($id){
        //
        //        }
        //        return  null;
        return Company::find($id);
    }

    protected static function booted(): void
    {
        static::created(function (Company $company) {
            $a = new SetupCompany($company);
            $a->setup();
        });
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function viewers(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function customers(): BelongsToMany
    {
        return $this->belongsToMany(Customer::class);
    }

    public function tasks(): HasMany
    {
        //        $this->customers()->attach();
        return $this->hasMany(Task::class);
    }

    public function publishedTasks()
    {
        return $this->hasMany(Task::class)->where('is_published', true);
    }

    public function priceEvaluation(): HasMany
    {
        return $this->hasMany(EstatePricing::class);
    }
}
