<?php

namespace App\Models;

use App\Casts\Json;
use Database\Factories\TaskUploadFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class TaskUpload extends Model implements HasMedia
{
    /** @use HasFactory<TaskUploadFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = ['pricing'];

    protected function casts(): array
    {
        return [
            'pricing' => Json::class,
        ];
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(Viewer::class);
    }
}
