<?php

namespace App\Enums;

enum TaskStatusEnum: string
{
    case DRAFT = '#b3abab'; // 1
    case  DEPUBLISHED = '#b3aba2';
    case PUBLISHED = '#ffff00'; // 2
    case ACCEPTED_BY_VIEWER = '#f2f2f2';  // 3
    case UPLOADED = '#d8e4bc'; // 4
    case RE_PUBLISHED = '#ffff01'; // 5
    case RE_UPLOADED = '#d8e4bv'; // 6
    case CLOSED = '#92d050';  // 7
    case CANCELED = '##3b3d4200'; // 8

    public function model()
    {
        return \App\Models\TaskStatus::firstOrCreate([
            'code' => $this->name,
        ]);
    }
//    suk_number, order_number, location
//    fields => suk, licens, other documents
//    notes, estate type,
//    task activity log =>  time and by_user, create, update, task_status
//    roles and permissions
//    viewers linked by city, region, district, or zones=>ploygon

}



