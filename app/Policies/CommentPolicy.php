<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return null;
    }

    public function update(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id;
    }

    public function delete(User $user, Comment $comment): bool
    {
        return $this->update($user, $comment);
    }

    public function reply(User $user, Comment $comment): bool
    {
        return $comment->parent_id === null;
    }

    public function report(User $user, Comment $comment): bool
    {
        return $user->id !== $comment->user_id;
    }
}
