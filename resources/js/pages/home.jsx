import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head, Link } from '@inertiajs/react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArticleCard } from './articles/partials/article-card';

export default function Home(props) {
    const { articles, popular_articles } = props;

    return (
        <div>
            <Head title="Home" />
            <Hero />
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

function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-background -mt-6 lg:-mt-16 mb-6 lg:mb-16 border-b">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-secondary">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
            <div
                className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                aria-hidden="true">
                <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-sky-500 to-gray-900 opacity-20"
                     style={{clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',}}/>
            </div>
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-0 sm:pb-24 lg:flex lg:px-8 lg:py-24">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                    <div>
                        <Link href={route('articles.index')} className="inline-flex space-x-6">
                                <span
                                    className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-400 ring-1 ring-inset ring-sky-500/20">
                                    What's new
                                </span>
                        </Link>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Point of
                        You</h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Read it when you relax is a knowledge base for all the questions you have about our
                        products.
                    </p>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
