import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getPostsPaginatedWithMeta } from '@/lib/wp';
import { notFound } from 'next/navigation';

type Props = {
    params: { page: string };
};

export default async function PostsPaginatedPage({ params }: Props) {
    const { page } = await params;
    const pageNum = Number(page);

    // Guard: invalid page numbers
    if (!Number.isInteger(pageNum) || pageNum < 2) {
        notFound();
    }

    const { posts, total } = await getPostsPaginatedWithMeta({
        page: pageNum,
        perPage: 12,
        excludeIds: [],
    }).catch(() => ({
        posts: [],
        total: 0,
        totalPages: 0,
    }));

    if (!posts || posts.length === 0) {
        notFound();
    }

    return (
        <>
            <main className="bg-white">
                <section className="max-w-7xl mx-auto px-4 py-14">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>

                        <p className="mt-2 text-sm text-gray-600">
                            {total > 0 ? `${total} articles published · Page ${pageNum}` : `Page ${pageNum}`}
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination currentPage={pageNum} basePath="/posts" hasNext={posts.length === 12} />
                </section>
            </main>
        </>
    );
}
