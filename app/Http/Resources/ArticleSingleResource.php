<?php

namespace App\Http\Resources;

use GrahamCampbell\Markdown\Facades\Markdown;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleSingleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'thumbnail' => $this->thumbnail ? Storage::url($this->thumbnail) : null,
            'teaser' => $this->teaser,
            'content' => Markdown::convert($this->content)->getContent(),
            'published_at' => $this->published_at ? $this->published_at->format('d F Y') : null,
            'likes_count' => $this->likes_count,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'gravatar' => $this->user->gravatar(),
            ],
            'tags' => $this->tags->map(fn($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),
        ];
    }
}
