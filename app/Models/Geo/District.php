<?php

namespace App\Models\Geo;

use App\Traits\SearchNameTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class District extends Model
{
    /** @use HasFactory<\Database\Factories\Geo\DistrictFactory> */
    use HasFactory,SearchNameTrait;

    protected $fillable = ['name', 'name_en', 'region_id', 'city_id'];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
