<?php

namespace App\Http\Middleware\Admin;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user->user_type != UserType::ADMIN) {
            //            dd($user);
            return \response('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }
        return $next($request);
    }
}
