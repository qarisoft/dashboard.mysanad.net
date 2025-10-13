<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanAccessCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        // if (auth()->check()) {
        if ($user->user_type == UserType::ADMIN) {
            return to_route('admin.dashboard.index');
        }
        if ($user->user_type == UserType::OTHER || $user->user_type == UserType::VIEWER) {
            return to_route('company.create');
        }
        if ($user->company()->doesntExist()) {

            $user->setTenant();

            return to_route('error.not-found');

        }

        return $next($request);
    }
}
