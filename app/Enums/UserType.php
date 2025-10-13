<?php

namespace App\Enums;

enum UserType
{
    case COMPANY_OWNER;
    case EMPLOYEE;
    case VIEWER;
    case ADMIN;
    case CUSTOMER;
    case OTHER;

}
