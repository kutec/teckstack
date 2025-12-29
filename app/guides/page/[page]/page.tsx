import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getGuides } from '@/lib/wp';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ page: string }>;
};

export default async function GuidesPaginatedPage({ params }: Props) {
    const { page } = await params;
    const pageNum = Number(page);

    if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

    const guides = await getGuides(12).catch(() => []);

    if (!guides.length) notFound();

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">
                    <strong
                        aria-hidden="true"
                        className="align-middle text-4xl text-blue-600 px-3 mr-4 rounded-xl bg-blue-600/10 border border-blue-600/20"
                    >
                        {guides.length}
                    </strong>
                    <span className="align-middle">
                        Guides ·{' '}
                        <small>
                            <em>Page {pageNum}</em>
                        </small>
                    </span>
                </h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide: any) => (
                    <PostCard key={guide.id} post={guide} />
                ))}
            </div>

            <Pagination currentPage={pageNum} basePath="/guides" hasNext={guides.length === 12} />
        </TwoColLayout>
    );
}
