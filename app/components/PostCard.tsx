import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/date';

interface Term {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
}

interface Post {
    id?: number;
    title?: { rendered: string };
    slug: string;
    excerpt?: { rendered: string };
    content?: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text?: string;
        }>;
        'wp:term'?: Term[][];
    };
    date: string;
}

const FALLBACK_IMAGE = '/images/post-placeholder.jpg';

/** Estimate reading time (≈200 wpm) */
function getReadingTime(html?: string) {
    if (!html) return null;
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default function PostCard({
    post,
    featuredPostId,
    basePath = 'posts',
}: {
    post: Post;
    featuredPostId?: number;
    basePath?: 'posts' | 'guides';
}) {
    const title = post?.title?.rendered ?? 'Untitled';
    const slug = post?.slug;
    const href = `/${basePath}/${slug}`;

    const excerpt = (post?.excerpt?.rendered ?? post?.content?.rendered ?? '').replace(/<[^>]+>/g, '').slice(0, 140);

    const featuredMedia = post?._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url || FALLBACK_IMAGE;
    const imageAlt = featuredMedia?.alt_text || title;

    const readingTime = getReadingTime(post?.content?.rendered);

    // Primary category (first one only)
    const categories = post?._embedded?.['wp:term']?.flat()?.filter((t) => t.taxonomy === 'category') ?? [];

    const primaryCategory = categories[0];

    const isFeatured = featuredPostId && post?.id && post.id === featuredPostId;

    // const date = new Date(post.date);

    return (
        <article
            className="relative 
        group bg-white rounded-lg overflow-hidden
        shadow-sm transition-all duration-200
        md:hover:-translate-y-1 md:hover:shadow-lg
      "
        >
            {/* IMAGE */}
            <Link href={href} aria-label={title} className="relative block h-44 overflow-hidden bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="
            object-cover transition-transform duration-300
            md:group-hover:scale-[1.04]
          "
                    unoptimized={process.env.NODE_ENV !== 'production'}
                />

                {isFeatured && (
                    <span
                        className="absolute right-3 top-3 text-lg shadow-black shadow-2xl"
                        aria-label="Featured Post"
                        title="Featured Post"
                    >
                        ⭐
                    </span>
                )}
            </Link>

            {primaryCategory ? (
                <Link
                    href={`/categories/${primaryCategory.slug}`}
                    className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded"
                >
                    {primaryCategory.name}
                </Link>
            ) : null}

            {/* CONTENT */}
            <div className="p-4">
                {/* Meta row */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    {/* Date */}
                    <time>{formatDate(post.date)}</time>
                    {readingTime ? <span>· {readingTime} min read</span> : null}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-snug">
                    <Link
                        href={`/posts/${slug}`}
                        className="text-gray-900 transition-colors md:group-hover:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}…</p>

                {/* CTA */}
                <div className="mt-4">
                    <Link
                        href={`/posts/${slug}`}
                        className="
              inline-flex items-center gap-0.5
              text-sm font-medium text-blue-600
              transition-all
              md:group-hover:gap-1
            "
                    >
                        Read
                        <span className="transition-transform md:group-hover:translate-x-0.5">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
