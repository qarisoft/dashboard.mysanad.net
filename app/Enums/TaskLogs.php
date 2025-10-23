<?php

namespace App\Enums;

enum TaskLogs: string
{
    case published = 'Task published';
    case depublished = 'Task depublished';
    case created = 'Task created';
    case updated = 'Task updated';
    case  deleted = 'Task deleted';
    case accepted = 'Task accepted';
    case rejected = 'Task rejected';
    case uploaded = 'Task uploaded';

}
