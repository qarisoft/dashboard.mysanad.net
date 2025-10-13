<?php

namespace App\Http\Controllers\Company\Mail;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OutboxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private string $path = 'company/mail/outbox';

    public function index(): Response
    {
        $page = request()->query('page');
        $perPage = request()->query('perPage') ?? 50;
        $search = request()->query('search');
        $user = request()->user();

        $company_id = $user->current_company;

        $messages = Message::ofCompany($company_id)
            ->thread()
            ->sentBy($user->id)
            ->with(['replies.sender:id,name,email', 'receiver', 'users'])
            ->paginate();

        return Inertia::render($this->path.'/index', [
            'messages' => $messages,
        ]);

    }

    public function markAsRead(string $id)
    {
        $message = Message::find($id);

        if ($message->isTo(request()->user())) {
            $message->markAsRead();
            //            $message->was_read=true;
            //            $message->save();
        }
        //        return redirect()->back();

    }

    public function reply(Request $request, string $id)
    {
        $m = Message::find($id);
        if ($m) {
            $m->replies()->create([
                'from_id' => $request->user()->id,
                'body' => $request->reply,
                'company_id' => $request->user()->current_company,
                'subject' => 'reply',
            ]);
        }
        //        return redirect()->back();
    }

    /**
     * Show the utils for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the utils for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
