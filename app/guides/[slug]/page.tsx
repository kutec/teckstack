import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import { getGuideBySlug } from '@/lib/wp';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6" dangerouslySetInnerHTML={{ __html: title }} />

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
            <article
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </TwoColLayout>
    );
}
