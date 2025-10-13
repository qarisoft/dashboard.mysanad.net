<?php

namespace App\Services;

use App\Enums\EstatePricingEnums;
// use App\Enums\TasksStatusEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Company;
use App\Models\TaskStatus;

class SetupCompany
{
    public function __construct(public Company $company) {}

    public function setup(): void
    {
        //        $this->_setupStatus();
        $this->_createEstatePricings();
    }

    private function _createEstatePricings(): void
    {
        foreach (EstatePricingEnums::cases() as $key) {
            $this->company->priceEvaluation()->create([
                'key' => $key->val(),
                'name' => __($key->val()),
            ]);
        }
    }

    private function _setupStatus(): void
    {
        foreach (TaskStatusEnum::cases() as $key => $value) {
            $this->_createStatus($value);
        }
    }

    private function _createStatus(TaskStatusEnum $value): void
    {
        TaskStatus::factory()->create([
            'code' => $value->name,
            'color' => $value->value,
            'name' => __($value->name),
            'company_id' => $this->company->id,
        ]);
    }
}
