<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class CommentController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth'
        ];
    }

    public function store(Request $request, Article $article)
    {
        $request->validate([
            'body' => ['required', 'string', 'min:3']
        ]);

        $request->user()->comments()->create([
            'body' => $request->body,
            'article_id' => $article->id
        ]);

        return back();
    }

    public function reply(Request $request, Comment $comment)
    {
        $request->validate([
            'body' => ['required', 'string', 'min:2']
        ]);

        abort_if($comment->parent_id, 403, "You can not reply to a reply.");

        $comment->children()->create([
            'body' => $request->body,
            'author_id' => $request->user()->id,
            'article_id' => $comment->article_id
        ]);

        return back();
    }

    public function update(Request $request, Article $article, Comment $comment)
    {
        $validatedData = $request->validate([
            'body' => ['required', 'string', 'min:3']
        ]);

        $comment->update($validatedData);

        return back();
    }

    public function destroy(Article $article, Comment $comment)
    {
        $comment->delete();
        return back();
    }

    public function report(Comment $comment)
    {
        if (!session()->has('reported_spams')) {
            session(['reported_spams' => []]);
        }

        $commentId = $comment->id;
        $reporterId = session()->getId();

        if (!session()->has("reported_spams.$commentId")) {
            session()->put("reported_spams.$commentId", []);
        }

        if (!in_array($reporterId, session("reported_spams.$commentId"))) {
            $comment->increment('spam_reports');
            session()->push("reported_spams.$commentId", $reporterId);

            if ($comment->spam_reports > 10) {
                $comment->delete();
            }
        }
        return back();
    }
}
