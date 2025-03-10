<?php

namespace App\Traits;

use Illuminate\Support\Collection;

trait HasLabelValue
{
    public static function toSelectArray(): Collection
    {
        return self::query()->select('id', 'name')->get()->map(fn ($item) => [
            'value' => (string) $item->id,
            'label' => $item->name,
        ]);
    }
}
