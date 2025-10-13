<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Symfony\Component\HttpFoundation\Response;

// use function App\Http\Controllers\TryCaller;

class AuthController extends Controller
{
    public function returnData($request = null): Response
    {
        if (! $request) {
            $request = request();
        }

        $user = $request->user();
        $viewer = $user->viewer;
        request()->user()->tokens()->delete();

        $token = request()->user()->createToken('token')->plainTextToken;

        return response()->json([
            'status' => 1,
            'message' => $this->ok,
            'token' => $token,
            'companies' => $viewer?->companies()->get(['id', 'name', 'avatar_url'])->toArray(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
            ],
        ]);
    }

    public function user(): Response
    {
        return $this->returnData();
    }

    public function login(Request $request): Response
    {
        return $this->tryCaller(function () use ($request) {
            $email = filter_var($request->email, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            $request->merge([$email => $request->email]);

            if (! Auth::attempt($request->only($email, 'password'))) {
                return response([
                    'error' => __('invalid credentials'),
                ], Response::HTTP_UNAUTHORIZED);
            }

            return $this->returnData(request: $request);
        });

    }

    public function token(): Response
    {
        return $this->returnData();
        //        return $this->tryCaller(function () {
        //        });
    }

    //    public function register(Request $request): Response
    //    {
    //        return $this->tryCaller(function () use ($request) {
    //            $request->validate([
    //                'username' => 'required|string|max:255|unique:'.User::class,
    //                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
    //                'name' => 'required|string|max:255',
    //                'password' => ['required', 'confirmed', Rules\Password::defaults()],
    //            ]);
    //            DB::transaction(function () use ($request) {
    //
    //                $user = User::create([
    //                    'username' => $request->username,
    //                    'name' => $request->name,
    //                    'email' => $request->email,
    //                    'password' => Hash::make($request->password),
    //                    'type' => UserType::Viewer,
    //                ]);
    //
    //                event(new Registered($user));
    //            });
    //
    //            return response()->json([
    //                'message' => $this->ok,
    //                'status' => 1,
    //            ]);
    //        });
    //
    //    }

    public function delete(Request $request): Response
    {
        return $this->tryCaller(function () use ($request) {

            if (! Auth::guard('web')->validate([
                'email' => $request->user()->email,
                'password' => $request->input('password'),
            ])) {
                return \response()->json([
                    'message' => 'invalid credentials',
                    'status' => 0,
                ]);
            }

            $request->user()->delete();

            return \response()->json([
                'message' => $this->ok,
                'status' => 1,
            ]);
        });

    }
}
