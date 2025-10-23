<?php

namespace App\Models;

use App\Traits\BelongsToUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AppLogger extends Model
{
    use  BelongsToUser;


    protected $fillable = [
        'user_id',
        'title'
    ];

    public function loggable(): morphTo
    {
        return $this->morphTo();
    }


    protected static function boot(): void
    {
        parent::boot();
        static::creating(function (  $model) {
            $model->user_id = auth()?->user()?->id ?? 1;
        });
    }
}
