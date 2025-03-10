<?php

namespace App\Enums;

use Illuminate\Support\Collection;

enum ArticleStatus: string
{
    case Draft = 'draft';
    case Pending = 'pending';
    case Published = 'published';
    case Archived = 'archived';

    public static function toSelectArray(): Collection
    {
        return collect(self::cases())->map(fn ($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values();
    }
}
