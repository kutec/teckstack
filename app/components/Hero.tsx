// app/components/Hero.tsx
import Link from 'next/link';
import HeroRight from './HeroRight';
import { getSiteOptions } from '@/lib/wp';

// utility to strip simple HTML tags from WP fields
function stripHtml(html?: string | null) {
    if (!html) return '';
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

type PostLite = {
    id?: number;
    title?: string;
    excerpt?: string;
    slug?: string;
    link?: string;
};

export default async function Hero() {
    let opts: any = null;
    let featuredPost: PostLite | null = null;
    let guidePost: PostLite | null = null;

    try {
        const data = await getSiteOptions(); // ✅ single source of truth
        opts = data?.options ?? null;

        if (data?.featured) {
            featuredPost = {
                id: data.featured.id,
                title: stripHtml(data.featured.title),
                excerpt: stripHtml(data.featured.excerpt),
                slug: data.featured.slug,
                // IMPORTANT: map WP → Next route
                link: data.featured.slug ? `/posts/${data.featured.slug}` : undefined,
            };
        }

        if (data?.guide) {
            guidePost = {
                id: data.guide.id,
                title: stripHtml(data.guide.title),
                excerpt: stripHtml(data.guide.excerpt),
                slug: data.guide.slug,
                // IMPORTANT: map WP → Next route
                link: data.guide.slug ? `/guides/${data.guide.slug}` : undefined,
            };
        }
    } catch (err) {
        console.error('Hero data load failed:', err);
    }

    const title =
        opts?.hero_title ||
        "Smarter <span class='text-blue-600'>Frontend Learning</span></br>for <em>Modern Developers</em>";

    const subtitle =
        opts?.hero_subtitle ||
        'Practical guides, React patterns, and debugging notes based on real experience — deep dives without the fluff.';

    const ctaLabel = opts?.hero_cta_label || 'Start Here';
    const ctaUrl = opts?.hero_cta_url || '/start-here';
    const newsletterText = opts?.newsletter_text || 'No spam. Unsubscribe anytime.';

    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 grid grid-cols-1 md:grid-cols-12 md:items-center gap-8">
                {/* LEFT */}
                <div className="md:col-span-7">
                    <h1
                        className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    <p className="mt-6 text-gray-700">{subtitle}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={ctaUrl}
                            className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-md shadow-sm"
                        >
                            {ctaLabel}
                        </Link>

                        <Link
                            href="/blog"
                            className="inline-flex items-center px-5 py-3 border rounded-md text-gray-700 bg-white/80 hover:bg-gray-100"
                        >
                            Read the Blog
                        </Link>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        <strong>Tip:</strong> Start with the “React fundamentals” guide.
                    </div>
                </div>

                {/* RIGHT */}
                <div className="md:col-span-5">
                    <HeroRight featured={featuredPost} guide={guidePost} newsletterText={newsletterText} />
                </div>
            </div>
        </section>
    );
}
