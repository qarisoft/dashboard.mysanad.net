<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factory_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'user_type' => UserType::class,
            'created_at' => 'datetime:Y-m-d H:i:s'
        ];
    }

    public function isAdmin(): bool
    {
        return $this->user_type == UserType::ADMIN;
    }

    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Message::class);
    }

    public function hasCompany(): bool
    {
        return $this->company()->exists();
    }

    public function isCompanyOwner(): bool
    {
        return $this->ownCompany()->exists();
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'current_company');
    }

    public function ownCompany(): HasOne
    {
        return $this->hasOne(Company::class, 'user_id');
    }

    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class);
    }

    public function viewer(): HasOne
    {
        return $this->hasOne(Viewer::class);
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function changeType(UserType $type): void
    {
        $this->user_type = $type;
        $this->save();
    }

    public function setCurrentCompany(int $company_id): void
    {
        $this->current_company = $company_id;
        $this->save();
    }
}
