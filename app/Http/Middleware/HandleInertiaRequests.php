<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? new AuthenticatedUserResource($request->user()) : null,
            ],
            'categories_g' => cache()->remember('categories', 3600, fn() => Category::query()
                ->select(['id', 'name', 'slug'])
                ->orderBy('name')
                ->whereHas('articles')
                ->take(10)
                ->get()),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash_message' => fn() => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ]
        ];
    }
}
