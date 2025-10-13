<?php

namespace App\Http\Controllers\Api;

// use App\Enums\TasksStatusEnum;

use App\Enums\TaskStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Task;
// use App\Models\TaskUpload;
use App\Models\TaskUpload;
use Carbon\Carbon;
// use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// use http\Env\Response;

class ApiTaskController extends Controller
{
    // public function response

    public function index(Request $request): JsonResponse
    {
        $id = request()->user()->viewer?->id;
        if ($id == null) {
            return $this->jsResponse(0, 'invalid_credentials', []);
        }

        return $this->jsResponse(
            1,
            '',
            Task::query()
                ->with('districtA')
                ->published()
                ->available()
                ->free()
                ->visibleFor($id)
                ->paginate($request->query('per_page') ?? 20)
                ->through(fn ($t) => $this->taskResponse($t)),
        );
    }

    //    public function close(Request $request, Task $task): JsonResponse
    //    {
    //        if (! $request->user()->viewer->canTouchTask($task)) {
    //            return $this->response(0, 'fail');
    //        }
    //        if ($task->uploads()->count() <= 0) {
    //            return $this->response(0, 'you must upload the data', []);
    //
    //        }
    //        $task->close();
    //
    //        return $this->response(stats: 1, msg: 'ok');
    //    }
    //
    private function taskResponse(Task $task, ?array $pricing = null): array
    {
        return [
            'id' => $task->id,
            'code' => $task->code,
            'company_name' => $task->company?->name,
            'finished_at' => $task->must_do_at,
            'finished_at_h' => Carbon::parse($task->must_do_at)->diffForHumans(),
            'location' => $task->location,
            'customer' => $task->customer->user->name,
            'status' => $task->status,

            'company_feedback' => $task->company_feedback,
            'city' => $task->city?->name,
            'district' => $task->districtA?->name,
            'estate_type' => $task->estate_type,

            'attach' => $task->attach,
            'address' => $task->address ?? $task->districtA?->name.' '.$task->city?->name,
            'published_at' => $task->published_at,
            'published_at_h' => Carbon::parse($task->published_at)->diffForHumans(),
        ];
    }

    //
    public function createUpload(Request $request, Task $task): JsonResponse
    {
        // $this->va
        if (! $request->user()->viewer->canTouchTask($task)) {
            return $this->jsResponse(0, 'fail', []);
        }

        return $this->tryCaller(
            function () use ($task) {
                $u = DB::transaction(function () use ($task): TaskUpload {
                    $u = $task->uploads()->create([
                        'pricing' => request('pricing'),
                    ]);

                    return $u;
                });

                return $this->jsResponse(1, '', [
                    'id' => $u->id,
                    'upload' => $u,
                ]);
            }
        );
    }

    //
    public function upload(Request $request, TaskUpload $upload): JsonResponse
    {
        $v = $request->user()->viewer;
        //        $r = $v->canNotUpload($upload);

        if ($v->canNotUpload($upload)) {
            return $this->jsResponse(
                0,
                'you can not upload to this task',
                []
            );
        }

        $data = '';
        // request()->validate([
        //     'img' => 'required',
        //     'img.*' => 'required|mimes:jpg,png,jpeg',
        // ]);

        try {
            $file = $request->file('img');
            $upload->addMedia($file)->toMediaCollection();
            // $data = $r;
        } catch (\Exception $e) {
            $data = json_encode($e);
        }

        return $this->jsResponse(1, 'good', $data);
    }

    public function accept(Request $request, Task $task): JsonResponse
    {
        $viewer = $request->user()->viewer;

        if ($viewer == null || $task == null) {
            return $this->jsResponse(0, 'you can\'t do this operation', []);
        }
        if ($task->viewer()->exists()) {
            if ($task->viewer->id != $viewer->id) {
                return $this->jsResponse(0, 'this task is already taken !', []);
            }
        }
        $task->acceptBy($viewer);

        $p = $task->pricingEvaluations();

        return $this->jsResponse(1, 'ok', [
            'task' => $this->taskResponse($task),
            'pricing' => $p,
        ]);
    }

    private function mapper(Task $task)
    {
        return $this->taskResponse($task);
    }

    public function cancelTask(Request $request, Task $task)
    {
        try {
            // code...
            if ($task->viewer != null && $task->viewer->id == $request->user()->viewer->id && ! $task->is_closed) {

                $task->viewer()->dissociate();
                // $task->users()->detach($request->user()->employee->id);
                $task->task_status_id = TaskStatusEnum::PUBLISHED->model()->id;
                $task->is_available = true;
                $task->save();

                return $this->jsResponse(1, 'task canceled', []);
            }
        } catch (\Throwable $th) {
            return $this->jsResponse(0, 'operation failed', []);
        }

        return $this->jsResponse(0, 'operation failed', []);
    }
}
