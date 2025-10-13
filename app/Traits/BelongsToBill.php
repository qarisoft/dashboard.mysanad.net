<?php

namespace App\Traits;

use App\Models\Billing\Bill;

trait BelongsToBill
{
    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }
}
