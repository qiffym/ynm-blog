<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleListResource;
use App\Models;
use Coderflex\Laravisit\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class InternalArticleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: ['auth']),
            new Middleware(
                middleware: ['role:admin'],
                only: ['destroy', 'approve']
            ),
        ];
    }

    public function index(Request $request)
    {
        $totalVisits = Visit::query()->where('visitable_type', Models\Article::class)->count();
        $articles = ArticleListResource::collection(
            $self = Models\Article::query()->select(['id', 'user_id', 'category_id', 'title', 'slug', 'published_at', 'created_at', 'status'])
                ->with(['user:id,name', 'category:id,name,slug', 'tags:id,name,slug'])
                ->withTotalVisitCount()
                ->when(!$request->user()->hasRole('admin'), fn($query) => $query->whereBelongsTo($request->user()))
                ->latest()
                ->paginate(10)
        )->additional([
            'meta' => [
                'has_pages' => $self->hasPages(),
                'total_visits' => $totalVisits,
                'unpublished_count' => Models\Article::query()
                    ->whereNot('status', ArticleStatus::Published)
                    ->when(!$request->user()->hasRole('admin'), fn($query) => $query->whereBelongsTo($request->user()))
                    ->count(),
            ],
        ]);

        return inertia('articles/list', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return inertia('articles/form', [
            'page_data' => fn() => [
                'categories' => fn() => Models\Category::toSelectArray(),
                'tags' => fn() => Models\Tag::toSelectArray(),
                'article' => fn() => new Models\Article,
                'statuses' => fn() => ArticleStatus::toSelectArray(),
            ],
            'page_meta' => fn() => [
                'title' => 'Create Article',
                'description' => 'Create a new article by filling out the form below.',
                'url' => route('internal-articles.store'),
                'method' => 'POST',
            ],
        ]);
    }

    public function store(ArticleRequest $request)
    {
        $validatedData = $request->validated();
        unset($validatedData['tags']);

        $article = $request->user()->articles()->create([
            ...$validatedData,
            'status' => $request->user()->hasRole('admin') ? $request->status : ArticleStatus::Pending,
            'thumbnail' => $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnails', 'public') : '',
            'published_at' => $request->enum('status', ArticleStatus::class) === ArticleStatus::Published ? now() : null,
        ]);

        $article->tags()->sync($request->tags);

        return redirect()->route('internal-articles.index');
    }
}
