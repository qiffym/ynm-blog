import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { IconHeart, IconMessage } from '@irsyadadl/paranoid';
import { useState } from 'react';
import { CommentForm } from './comment-form';
import { CommentOptions } from './comment-options';

export function CommentBlock({ comments }) {
    const { auth, article } = usePage().props;
    const [open, setOpen] = useState(false);
    const [attributes, SetAttributes] = useState({
        body: '',
        url: '',
        method: '',
        item: {},
        submitText: 'Reply',
    });

    const reply = (comment) => {
        setOpen(true);
        SetAttributes({
            ...attributes,
            body: null,
            url: route('comments.reply', [comment]),
            item: comment,
            submitText: 'Reply',
        });
    };

    return (
        <div className="space-y-6">
            {comments.map((comment, i) => (
                <div key={i} className="flex">
                    <Avatar className="mr-3 size-8">
                        <AvatarImage src={comment.user.gravatar} />
                    </Avatar>

                    <div className="relative w-full">
                        {auth.user && <CommentOptions comment={comment} article={article} />}

                        <h4 className="text-sm font-semibold">{comment.user.name}</h4>
                        <div className="prose prose-gray text-muted-foreground dark:prose-invert">{comment.body}</div>

                        <div className="flex items-center gap-x-2 [&_button]:size-7 [&_button]:rounded-full [&_svg]:size-4">
                            {comment.can_be_replied && (
                                <Button size="icon" variant="ghost" onClick={() => reply(comment)}>
                                    <IconMessage />
                                </Button>
                            )}
                            <Button size="icon" variant="ghost">
                                <IconHeart />
                            </Button>
                        </div>

                        {comment.children.length > 0 && (
                            <div className="mt-6">
                                <CommentBlock article={article} auth={auth} comments={comment.children} />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {auth.user && <CommentForm auth={auth} open={open} setOpen={setOpen} attributes={attributes} />}
        </div>
    );
}
