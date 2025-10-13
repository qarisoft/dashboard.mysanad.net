<?php

namespace App\Models\Geo;

use App\Traits\SearchNameTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class City extends Model
{
    /** @use HasFactory<\Database\Factories\Geo\CityFactory> */
    use HasFactory,SearchNameTrait;

    protected $fillable = ['name', 'name_en', 'region_id'];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
