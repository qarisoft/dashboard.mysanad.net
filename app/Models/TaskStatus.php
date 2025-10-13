<?php

namespace App\Models;

use App\Enums\TaskStatusEnum;
use App\Traits\SearchNameTrait;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskStatus extends Model
{
    use HasFactory, SearchNameTrait;

    protected $fillable = [
        'name',
        'color',
        'code',
    ];

    public function scopeAcceptedByViewer($q)
    {
        return $q->where('code', 'AcceptedByViewer');
    }

    #[Scope]
    public function equalTo($query, TaskStatusEnum $status): void
    {
        $query->where('code', '=', $status->name);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);

    }
}
