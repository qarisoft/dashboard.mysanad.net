<?php

namespace App\Models;

use App\Enums\EstatePricingEnums;
use App\Enums\TaskStatusEnum;
use App\Enums\TaskStatusEnum as Status;
use App\Models\Geo\City;
use App\Models\Geo\District;
use App\Traits\BelongsToCompany;
use App\Traits\HasLocation;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Task extends Model implements HasMedia
{
    use BelongsToCompany, HasFactory, HasLocation, interactsWithMedia;

    protected $with = ['districtA', 'estate'];

    protected $casts = [
        'must_do_at' => 'datetime:Y-m-d H:i',
        'is_published' => 'boolean',
        'attach' => 'array',
        'is_available' => 'boolean',
    ];

    protected $guarded = [];

//    protected static function booted(): void
//    {
//        static::creating(function ($task) {
//            $task->location_id = Location::factory()->create()->id;
//        });
//    }


    public function registerMediaConversions(?Media $media = null): void
    {
//        $this->location()->update()
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function estate(): BelongsTo
    {
        return $this->belongsTo(EstateType::class, 'estate_type_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function districtA(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function uploads(): HasMany
    {
        return $this->hasMany(TaskUpload::class);
    }


    public function priceEvaluation(): HasMany
    {
        return $this->hasMany(EstatePricing::class);
    }

    public function publish(): void
    {
        $this->is_published = true;
        $this->published_at = now();
        $this->task_status_id = TaskStatusEnum::PUBLISHED->model()->id;
        $this->save();
        // $this->_updateStatus(
        //     TaskStatus::query()
        //         ->equalTo(TaskStatusEnum::PUBLISHED)
        //         ->first()
        // );
    }

    public function acceptBy(Viewer $viewer): void
    {
        $this->viewer()->associate($viewer);
        $this->_updateStatus(
            TaskStatus::query()
                ->equalTo(TaskStatusEnum::ACCEPTED_BY_VIEWER)
                ->first()
        );
        $this->update(['is_available' => false]);
    }

    public function viewer(): BelongsTo
    {
        return $this->belongsTo(Viewer::class);
    }

    private function _updateStatus(?TaskStatus $status): void
    {
        if ($status) {
            $this->status()->associate($status);
        }
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(TaskStatus::class, 'task_status_id');
    }

    public function pricingEvaluations(): array
    {
        return EstatePricing::query()
            ->ofCompany($this->company_id)
            ->pluck('key')
            ->map(fn($i, $n) => [
                'task_id' => $this->id,
                'id' => $this->id . '-' . $n,
                'name' => __($i),
                'key' => $i,
            ])
            ->toArray();
    }

    public function close()
    {
        $this->task_status_id = TaskStatus::query()->where('code', Status::UPLOADED)->get()->first()->id;
        $this->save();
    }

    // public function users(): BelongsToMany
    // {
    //     return $this->belongsToMany(Employee::class,'task_viewers');

    // }

    public function allowedViewers(): BelongsToMany
    {
        return $this->belongsToMany(Viewer::class);
    }


    #[Scope]
    public function online(Builder $query): Builder
    {

        return $query->whereNull('viewer_id');
    }

    #[Scope]
    public function search(Builder $query, $like): Builder
    {
        return $query->whereLike('code', "%{$like}%")
            ->orWhereHas('customer', function (Builder $q) use ($like) {
                $q->whereLike('username', "%{$like}%")
                    ->orWhereLike('email', "%{$like}%")
                    ->orWhereLike('first_name', "%{$like}%")
                    ->orWhereLike('first_name', "%{$like}%");
            });
    }

    #[Scope]
    public function published($query)
    {
        return $query->where('is_published', true);
    }

    #[Scope]
    public function available($query)
    {
        return $query->where('is_available', true);
    }

    #[Scope]
    public function free($query)
    {
        return $query->whereNull('viewer_id');
    }

    #[Scope]
    public function visibleFor($query, $id)
    {
        return $query->whereHas('allowedViewers', fn(Builder $q) => $q->where('viewer_id', $id));
    }
}
