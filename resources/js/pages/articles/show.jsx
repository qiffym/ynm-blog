import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head, Link } from '@inertiajs/react';
import { limitChars } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { RelatedArticles } from '@/pages/articles/partials/related-articles';
import { Author } from '@/pages/articles/partials/author';
import { TableOfContents } from '@/pages/articles/partials/table-of-contents';
import { Prose } from '@/components/prose.jsx';
import { useState } from 'react';
import { CommentBlock } from './comments/comment-block';

export default function Show(props) {
    const { article, comments, auth } = props;
    const [open, setOpen] = useState(false);
    const [attributes, setAttributes] = useState({
        body: '',
        url: '',
        method: 'post',
        submitText: 'Comment',
    });

    return (
        <>
            <Head title={article.title} />
            <Container>
                <div className="flex flex-col-reverse gap-y-16 lg:grid lg:grid-cols-3 lg:gap-x-16">
                    <div className="space-y-12 lg:sticky lg:top-10 lg:col-span-1">
                        <Author user={article.user} />
                        <TableOfContents articleId={article.id} />
                        <RelatedArticles />
                    </div>
                    <div className="space-y-6 lg:col-span-2">
                        <AspectRatio className="overflow-hidden rounded-lg border" ratio={1.91}>
                            <img
                                className="grid h-full w-full place-content-center object-cover object-center text-center font-mono text-xs"
                                src={article.thumbnail}
                                alt={limitChars(article.title)}
                                width={1200}
                                height={630}
                            />
                        </AspectRatio>

                        <h1 className="text-2xl font-semibold md:text-4xl">{article.title}</h1>

                        <div className="flex items-center text-sm text-muted-foreground">
                            <time>{article.published_at}</time>
                            <span className="mx-2">|</span>
                            <Link href={`/categories/${article.category.slug}`}>
                                <Badge className="outline">{article.category.name}</Badge>
                            </Link>
                        </div>

                        <p className="text-muted-foreground">{article.teaser}</p>

                        <Prose content={article.content} />

                        {article.tags.length > 0 ? (
                            <div className="flex items-center gap-x-2">
                                {article.tags.map((tag, i) => (
                                    <Link key={i} href={route('tags.show', [tag])}>
                                        <Badge variant="outline">{tag.name}</Badge>
                                    </Link>
                                ))}
                            </div>
                        ) : null}

                        <CommentBlock comments={comments} />
                    </div>
                </div>
            </Container>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
