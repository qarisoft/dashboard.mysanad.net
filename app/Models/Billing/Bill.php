<?php

namespace App\Models\Billing;

use App\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    /** @use HasFactory<\Database\Factories\Billing\BillFactory> */
    use BelongsToCompany, HasFactory;
}
