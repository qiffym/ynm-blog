import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head } from '@inertiajs/react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArticleCard } from './articles/partials/article-card';

export default function Home(props) {
    const { articles, popular_articles } = props;

    return (
        <div>
            <Head title="Home" />
            <Container>
                <div className="space-y-16 sm:space-y-24">
                    <section id="popular">
                        <CardHeader className="mb-6 p-0">
                            <CardTitle>Popular Articles</CardTitle>
                            <CardDescription>A collection of the most popular articles from our blog.</CardDescription>
                        </CardHeader>
                        {popular_articles.length > 0 ? (
                            <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
                                {popular_articles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <p>No articles found.</p>
                        )}
                        {/* <div className="mt-12 text-right">
                            <Link className="text-sky-500 hover:underline" href={route('articles.index', ['week'])}>
                                See more popular articles
                            </Link>
                        </div> */}
                    </section>

                    <section id="latest">
                        <CardHeader className="mb-6 p-0">
                            <CardTitle>Latest Articles</CardTitle>
                            <CardDescription>A collection of the latest articles from our blog.</CardDescription>
                        </CardHeader>
                        {articles.length > 0 ? (
                            <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
                                {articles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </section>
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
