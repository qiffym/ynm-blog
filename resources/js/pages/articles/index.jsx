import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head } from '@inertiajs/react';
import { ArticleCard } from '@/pages/articles/partials/article-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { MetaTags } from '@/components/meta-tags.jsx';

export default function Index({ page_meta, ...props }) {
    const { data: articles, meta } = props.articles;
    return (
        <>
            <Head title={page_meta.title} />
            <MetaTags title={page_meta.title} description={page_meta.description} url={route('articles.index')} />
            <div className="-mt-6 mb-6 border-b bg-background py-6 sm:-mt-16 md:mb-16 md:py-16">
                <Container>
                    <h1 className="text-2xl font-semibold leading-none tracking-tight md:text-3xl">
                        {page_meta.title}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">{page_meta.description}</p>
                </Container>
            </div>
            <Container>
                {articles.length > 0 ? (
                    <div className="grid gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
                        {articles.map((article, index) => (
                            <ArticleCard key={index} article={article} />
                        ))}
                    </div>
                ) : (
                    <p>No articles found.</p>
                )}
            </Container>
            {meta.has_pages && (
                <Pagination className="mt-8 sm:mt-16">
                    <PaginationContent>
                        <PaginationItem>
                            {meta.links.map((link, index) => (
                                <PaginationLink key={index} href={link.url} isActive={link.active} size={'default'}>
                                    {link.label}
                                </PaginationLink>
                            ))}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
