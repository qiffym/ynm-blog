<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends Model
{
    public function articles(): MorphToMany
    {
        return $this->morphedByMany(Article::class, 'taggable');
    }

    public static function toSelectArray(): array
    {
        return self::query()->select('id', 'name')->get()->map(fn($item) => [
            'value' => $item->id,
            'label' => $item->name,
        ]);
    }
}
