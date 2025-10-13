<?php

namespace App\Models\Geo;

use App\Traits\SearchNameTrait;
use Database\Factories\Geo\RegionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Region extends Model
{
    /** @use HasFactory<RegionFactory> */
    use HasFactory, SearchNameTrait;

    public function capitalCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'capital_city_id');
    }
}
