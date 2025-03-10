<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory(10)->hasArticles(12)->create();

        $articles = Article::all();
        $tagIds = Tag::pluck('id');

        $articles->each(fn($article) => $article->tags()->attach($tagIds->random(3)->toArray()));
    }
}
