<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class Controller
{
    public string $ok = 'ok';

    public function paginate(Builder $model): LengthAwarePaginator
    {
        $page = request()->query('page');
        $perPage = request()->query('perPage', 10);
        $search = request()->query('search');
        $filters = request()->query('fltrs');
        if ($search) {

            $model->search($search);
        }

        if ($filters) {
            $model->whereAll([$filters], true);
        }

        return $model->paginate($perPage, page: $page);

    }

    public function scopeCompany(Builder $model): Builder
    {
        $company_id = request()->user()->company->id;

        return $model->whereHas('company', function ($query) use ($company_id) {
            $query->where('id', $company_id);
        });
    }

    public function scopeCompanies(Builder $model): Builder
    {
        $company_id = request()->user()->company->id;

        return $model->whereHas('companies', function ($query) use ($company_id) {
            $query->where('id', $company_id);
        });
    }

    public function success(string $msg): void
    {
        request()->session()->flash('success', __($msg).'!');
    }

    public function failure(string $msg): void
    {
        request()->session()->flash('failure', __($msg).'!');
    }

    public function tryCaller(callable $action)
    {
        try {
            return call_user_func($action);
        } catch (Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'something went wrong',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function jsResponse(int $stats, string $msg, $data = null): JsonResponse
    {
        return response()->json([
            'status' => $stats,
            'message' => __($msg),
            'data' => $data,
        ]);
    }
}
