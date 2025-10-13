<?php

namespace App\Models;

use Database\Factories\EstateTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstateType extends Model
{
    /** @use HasFactory<EstateTypeFactory> */
    use HasFactory;


    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
