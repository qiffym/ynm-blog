<?php

namespace App\Http\Requests;

use App\Enums\ArticleStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'teaser' => ['required', 'string', 'min:3', 'max:255'],
            'content' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'numeric', 'exists:categories,id'],
            'tags' => ['required', 'array'],
            'tags.*' => ['exists:tags,id'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'status' => ['nullable', new Enum(ArticleStatus::class)],
        ];
    }
}
