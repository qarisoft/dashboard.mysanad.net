<?php

namespace App\Models\Billing;

use App\Models\Task;
use App\Traits\BelongsToBill;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillItem extends Model
{
    /** @use HasFactory<\Database\Factories\Billing\BillItemFactory> */
    use BelongsToBill, HasFactory;

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
