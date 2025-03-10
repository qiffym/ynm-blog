<?php

namespace App\Observers;

use App\Models\Article;

class ArticleObserver
{
    public function creating(Article $article): void
    {
        $article->user_id = auth()->id();
        $article->slug = str($article->title)->slug();
    }

    public function deleting(Article $article): void
    {
        $article->comments()->delete();
    }
}
