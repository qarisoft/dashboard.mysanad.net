<?php

namespace App\Models\Billing;

use App\Traits\BelongsToBill;
use App\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\Billing\InvoiceFactory> */
    use BelongsToBill, BelongsToCompany, HasFactory;
}
