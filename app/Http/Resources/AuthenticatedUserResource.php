<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'gravatar' => $this->gravatar(100),
            'initials' => $this->getInitials($this->name),
            'is_admin' => $this->when($this->hasRole('admin'), true),
        ];
    }

    protected function getInitials($name): string
    {
        $initials = preg_split('/\s+/', $name);
        $initials = array_map(fn($word) => strtoupper($word[0]), $initials);
        $initials = array_slice($initials, 0, 2);
        return implode('', $initials);
    }
}
