<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Resources\CategoryListResource::collection(
            $self = Category::query()
                ->select(['id', 'name', 'slug'])
                ->withCount('articles')
                ->latest('updated_at')
                ->paginate(10)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('categories/index', [
            'categories' => fn() => $categories
        ]);
    }

    public function create()
    {
        return inertia('categories/form', [
            'category' => new Category,
            'page_meta' => [
                'title' => 'Create Category',
                'description' => 'Create a new category for your articles.',
                'url' => route('categories.store'),
                'method' => 'POST',
            ],
        ]);
    }

    public function store(CategoryRequest $request)
    {
        Category::create([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
        ]);

        return to_route('categories.index');
    }

    public function show(Category $category)
    {
        $articles = Resources\ArticleBlockResource::collection($self = $category->articles()
            ->select(['id', 'category_id', 'user_id', 'title', 'slug', 'thumbnail', 'teaser', 'published_at'])
            ->with(['category:id,name,slug', 'user:id,name'])
            ->whereStatus(ArticleStatus::Published)
            ->latest('published_at')
            ->paginate(9))
            ->additional([
                'meta' => ['has_pages' => $self->hasPages()]
            ]);

        return inertia('articles/index', [
            'articles' => fn() => $articles,
            'page_meta' => [
                'title' => $category->name,
                'description' => "All articles in the {$category->name} category."
            ]
        ]);
    }

    public function edit(Category $category)
    {
        return inertia('categories/form', [
            'category' => $category,
            'page_meta' => [
                'title' => 'Edit Category',
                'description' => 'Edit the category details below.',
                'url' => route('categories.update', $category),
                'method' => 'PUT',
            ],
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $category->update([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
        ]);

        return to_route('categories.index');
    }

    public function destroy(Category $category)
    {
        if ($category->articles()->exists()) {
            return back();
        }

        $category->delete();

        return back();
    }
}
