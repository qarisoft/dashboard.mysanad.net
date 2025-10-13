<?php

namespace App\Models;

// use Attribute;

use App\Traits\BelongsToCompany;
use App\Traits\BelongsToManyCompany;
use App\Traits\HasUser;
use Database\Factories\ViewerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Viewer extends Model
{
    /** @use HasFactory<ViewerFactory> */
    use BelongsToCompany, BelongsToManyCompany, HasFactory, HasUser;

    protected $fillable = [
        'is_active',
        'user_id',
        'company_id',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function visibleTasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'from_id', 'user_id');
    }

    public function hasTask(Task $task): bool
    {
        if ($task->viewer()->exists()) {
            return ($task->viewer_id ?? 0) == $this->id;
        }

        return false;
    }

    public function canTouchTask(Task $t): bool
    {
        return $this->id == $t->viewer_id;
    }

    public function canNotUpload(TaskUpload $u): bool
    {
        if (! $this->canTouchTask($u->task) || ! $u->task->is_closed) {
            return false;
        }

        return true;
    }
}
