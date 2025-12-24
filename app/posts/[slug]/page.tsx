import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import { getPostBySlug } from '@/lib/wp';
import PostBodyClient from '@/components/PostBodyClient';
import Image from 'next/image';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return (
            <main className="max-w-3xl mx-auto py-20 px-4">
                <h1 className="text-2xl font-semibold">Post not found</h1>
            </main>
        );
    }

    const title = post.title?.rendered ?? 'Untitled';
    const contentHtml = post.content?.rendered ?? '';

    const featuredMedia = post?._embedded?.['wp:featuredmedia']?.[0];
    const featuredImage = featuredMedia?.source_url;
    const featuredAlt = featuredMedia?.alt_text || title;

    const categories = post?._embedded?.['wp:term']?.flat()?.filter((t: any) => t.taxonomy === 'category') ?? [];

    const primaryCategory = categories[0];

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: title }} />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-10">
                {/* Author */}
                <Link
                    href="https://www.linkedin.com/in/your-profile"
                    target="_blank"
                    className="flex items-center gap-2 group"
                >
                    <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm transition-transform group-hover:scale-105">
                        K
                    </span>
                    <span className="font-medium text-gray-900 group-hover:underline">Kushal Jayswal</span>
                </Link>

                <span className="text-gray-400">•</span>

                {/* Date */}
                <time>{formatDate(post.date)}</time>

                {primaryCategory && (
                    <>
                        <span className="text-gray-400">•</span>

                        {/* Category */}
                        <Link
                            href={`/category/${primaryCategory.slug}`}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-100"
                        >
                            {/* Placeholder for future icon */}
                            <span className="text-xs">#</span>
                            {primaryCategory.name}
                        </Link>
                    </>
                )}
            </div>

            <div className="bg-white">
                <article className="max-w-full lg:max-w-3xl bg-white rounded-xl p-0 lg:p-7">
                    {/* Featured image */}
                    {featuredImage && (
                        <div className="mb-10">
                            <Image
                                src={featuredImage}
                                alt={featuredAlt}
                                className="w-full rounded-xl border"
                                width={1200}
                                height={600}
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <PostBodyClient html={contentHtml} />
                </article>
            </div>
        </TwoColLayout>
    );
}
