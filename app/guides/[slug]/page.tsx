import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import { getGuideBySlug } from '@/lib/wp';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PostBodyClient from '@/components/PostBodyClient';
import Link from 'next/link';
import { formatDate } from '@/utils/date';

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);

    if (!guide) notFound();

    const title = guide.title?.rendered ?? 'Untitled';
    const contentHtml = guide.content?.rendered ?? '';
    const featuredMedia = guide?._embedded?.['wp:featuredmedia']?.[0];

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Title */}
            <header className="post-header">
                <h1
                    className="text-4xl font-extrabold text-gray-900 mb-6"
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                {/* Meta row */}
                <div className="post-meta flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-10">
                    {/* Author */}
                    <Link
                        href="https://www.linkedin.com/in/kushal-jayswal/"
                        target="_blank"
                        className="flex items-center gap-2 group"
                    >
                        <span className="relative w-8 h-8 rounded-full from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm transition-transform group-hover:scale-105">
                            <Image
                                src="https://gravatar.com/userimage/11516795/78fa83d78e270e3ae94b29410d73ce67.jpeg?size=64"
                                alt="Kushal Jayswal"
                                fill
                                className="rounded-full object-cover"
                            />
                        </span>
                        <span className="font-medium text-gray-900 group-hover:underline">Kushal Jayswal</span>
                    </Link>

                    <span className="text-gray-400">•</span>

                    {/* Date */}
                    <time>{formatDate(guide.date)}</time>

                    {/* {primaryCategory && (
                    <>
                        <span className="text-gray-400">•</span>

                        <Link
                            href={`/categories/${primaryCategory.slug}`}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-100"
                        >
                            <span className="text-xs">#</span>
                            {primaryCategory.name}
                        </Link>
                    </>
                )} */}
                </div>
            </header>

            <article className="post-single-page max-w-full lg:max-w-3xl rounded-xl p-0 lg:p-7">
                {/* Featured image */}
                {featuredMedia?.source_url && (
                    <div className="mb-8">
                        <Image
                            src={featuredMedia.source_url}
                            alt={featuredMedia.alt_text || title}
                            width={800}
                            height={420}
                            className="rounded-lg border"
                        />
                    </div>
                )}

                {/* Content */}
                <PostBodyClient html={contentHtml} />
            </article>
        </TwoColLayout>
    );
}
