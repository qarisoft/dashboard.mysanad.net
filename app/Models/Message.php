<?php

namespace App\Models;

// use App\HasUser;
// use App\Observers\MsgObserver;
use App\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    use BelongsToCompany,HasFactory;

    protected $casts = [
        'was_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    protected $guarded = [];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_id');
    }

    public function isFrom(User $user): bool
    {
        return $this->from_id == $user->id;
    }

    public function isTo(User $user): bool
    {
        return $this->to_id == $user->id;
    }

    public function markAsRead(): void
    {
        $this->update([
            'was_read' => true,
            'read_at' => now(),
        ]);

    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, relatedPivotKey: 'to_id')->withPivot('was_read');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Message::class, 'thread_id');
    }

    #[Scope]
    protected function thread(Builder $q): Builder
    {
        return $q->whereNull('thread_id');
    }

    #[Scope]
    protected function ofCompany(Builder $query, int $company_id): Builder
    {
        return $query->whereHas('company', function ($q) use ($company_id) {
            $q->where('id', $company_id);
        });
    }

    #[Scope]
    protected function sentBy(Builder $query, $id): Builder
    {
        return $query->where('from_id', $id);
    }

    #[Scope]
    protected function toMe(Builder $query, $id): Builder
    {
        return $query
            ->where('to_id', $id);
    }

    #[Scope]
    protected function forMe(Builder $query, $id): Builder
    {
        return $query
            ->where('from_id', $id)
            ->orWhereHas('users', function ($q) use ($id) {
                $q->where('to_id', $id);
            })
            ->with(['users' => function ($q) use ($id) {
                $q->where('to_id', $id);
            }])
            ->orWhere('to_id', $id)
            ->orWhere('all', true);
    }

    //    public function user($id)
    //    {
    //        return $this->users()->wherePivot('user_id', $id)->first();
    // //        $id=auth()->user()->id();
    // //        return $this->belongsToMany(User::class,relatedPivotKey: 'to_id')
    // //            ->withPivotValue('to_id',1)->withPivot('was_read');
    //    }
    //    protected static function booted(): void
    //    {
    // //        static::creating(function ($msg) {
    // //            $msg->user_id = auth()->id();
    // //        });
    // //        static ::addGlobalScope(function ($query){
    // //            $query->whereHas('company', function ($q){
    // //                $q->where('id', auth()->user()->current_company);
    // //            })
    // //                ->where('user_id', auth()->id())
    // //                ->orWhereHas('users', function ($q){
    // //                    $q->where('user_id', auth()->id());
    // //                })
    // //                ->orWhere('all', true);
    // //        });
    //    }
}
