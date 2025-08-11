import { Head } from '@inertiajs/react';

export function MetaTags({
    image = 'https://yourdomain.com/path-to-your-og.jpg',
    title = 'Your Website Title',
    description = 'Your website description',
    url = 'https://yourdomain.com',
}) {
    return (
        <Head>
            {/* Primary Meta */}
            <meta head-key="title" title="title" content={title} />
            <meta head-key="description" title="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:url" property="og:url" content={url} />
            <meta head-key="og:title" property="og:title" content={title} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:image" property="og:image" content={image} />

            {/* X */}
            <meta head-key="x:card" property="x:card" content="summary_large_image" />
            <meta head-key="x:url" property="x:url" content={url} />
            <meta head-key="x:title" property="x:title" content={title} />
            <meta head-key="x:description" property="x:description" content={description} />
            <meta head-key="x:image" property="x:image" content={image} />
        </Head>
    );
}
