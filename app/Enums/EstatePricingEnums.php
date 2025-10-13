<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum EstatePricingEnums
{
    case PieceOfLand;
    case Basement;
    case GroundFloor;
    case FirstFloor;
    case RecurringFloor;
    case GroundAnnexes;
    case UpperAnnexes;
    case Fences;
    case Gardens;
    case CarParking;
    case Other;
    case TotalEstateCost;

    public function val(): string
    {

        return Str::snake($this->name);
    }
}
