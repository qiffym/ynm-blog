import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';
import { IconHeartFill } from '@irsyadadl/paranoid';

export function Like({ article }) {
    return (
        <Link
            method="POST"
            as="button"
            preserveScroll
            href={route('articles.like', [article])}
            className={cn(
                buttonVariants({ size: 'sm', variant: 'secondary' }),
                'h-8 [&_svg]:mr-2 [&_svg]:size-4 [&_svg]:text-rose-500',
            )}
        >
            <IconHeartFill />
            <span className="hidden sm:inline">Like</span>
            <span className="ml-0 font-mono text-xs sm:ml-2 sm:mt-0.5">{article.likes_count}</span>
        </Link>
    );
}
