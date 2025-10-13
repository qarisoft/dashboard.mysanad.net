<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

// use Inertia\Response;
// use Inertia\Inertia;

class HomeController extends Controller
{
    private $path = 'company/dashboard';

    public function index(Request $request)
    {
        // Broadcast::on('posts')
        //     ->as('PostCreated')
        //     ->with(['name'=>'salah'])
        //     ->send();

        //        syncLangFiles(['auth', 'validation', 'pagination']);
        $company_id = $request->user()->company->id;
        $query = DB::table('tasks')
            ->select(DB::raw('count(*) as task_count,task_status_id,task_statuses.name,task_statuses.color,task_statuses.code'))
            ->join('task_statuses', 'tasks.task_status_id', '=', 'task_statuses.id')
            ->where('tasks.company_id', $company_id)
            ->groupBy('tasks.task_status_id')
            ->get();

        $query2 = DB::table('tasks')
            ->select(DB::raw('count(*) as task_count ,created_date as date'))
            ->groupBy('date')
            ->get();

        return Inertia::render($this->path.'/index', [
            'stats' => $query,
            'by_dates' => $query2,
        ]);
    }
}
