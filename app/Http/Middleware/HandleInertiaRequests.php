<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }
    private string $locals_key_en = 'locals-string-en';
    private string $locals_key_ar = 'locals-string-ar';

    public function getLocalsCached(): void
    {
        $string = file_get_contents(lang_path() . '/' . 'ar.json');
        Cache::put($this->locals_key_ar, json_decode($string));
        $string = file_get_contents(lang_path() . '/' . 'en.json');
        Cache::put($this->locals_key_en, json_decode($string));
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request,$d=true): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
//        $string = file_get_contents(lang_path().'/'.'ar.json');
//        $json_a = json_decode($string);
        $this->getLocalsCached();
        $json_a = Cache::get(app()->getLocale() == 'ar' ? $this->locals_key_ar : $this->locals_key_en);
        if (!$json_a && $d){
            $this->getLocalsCached();
            return  $this->share($request,false);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'success' => session()->get('success'),
            'failure' => session()->get('failure'),
            'locale' => app()->currentLocale(),
            'lang_json' => $json_a,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
