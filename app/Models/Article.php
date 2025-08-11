<?php

namespace App\Models;

use App\Enums\ArticleStatus;
use App\Observers\ArticleObserver;
use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

#[ObservedBy([ArticleObserver::class])]
class Article extends Model implements CanVisit
{
    use HasFactory;
    use HasVisits;

    public function scopeTrending($query)
    {
        return $query->withCount('comments')->orderBy('comments_count', 'desc');
    }

    public function scopeMostLikes($query)
    {
        return $query->whereHas('likes')->withCount('likes')->orderBy('likes_count', 'desc');
    }

    public function scopeFilter($query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'REGEXP', $search);
            });
        })->when($filters['status'] ?? null, function ($query, $item) {
            match ($item) {
                'draft' => $query->where('status', ArticleStatus::Draft),
                'published' => $query->where('status', ArticleStatus::Published),
                'pending' => $query->where('status', ArticleStatus::Pending),
                'archived' => $query->where('status', ArticleStatus::Archived),
                default => $query,
            };
        })->when($filters['category'] ?? null, fn($query, $item) => $query->whereRelation('category', 'slug', $item))
            ->when($filters['user'] ?? null, fn($query, $item) => $query->where('user_id', $item));
    }

    protected function casts(): array
    {
        return [
            'status' => ArticleStatus::class,
            'published_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
