import { router } from '@inertiajs/react';
import { cn, flashMessage } from '@/lib/utils.js';
import { Button, buttonVariants } from '@/components/ui/button.jsx';
import { IconHeartFill } from '@irsyadadl/paranoid';
import { toast } from 'sonner';

export function Like({ article }) {
    function likeArticle() {
        router.post(
            route('articles.like', article),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (params) => {
                    const flash = flashMessage(params);
                    if (flash) {
                        toast[flash.type](flash.message);
                    }

                }
            }
        )
    }
    return (
        <Button
            onClick={likeArticle}
            className={cn(
                buttonVariants({ size: 'sm', variant: 'secondary' }),
                'h-8 [&_svg]:mr-2 [&_svg]:size-4 [&_svg]:text-rose-500',
            )}
        >
            <IconHeartFill />
            <span className="hidden sm:inline">Like</span>
            <span className="ml-0 font-mono text-xs sm:ml-2 sm:mt-0.5">{article.likes_count}</span>
        </Button>
    );
}
