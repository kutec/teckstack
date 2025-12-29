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
                        <h1 className="text-3xl font-bold text-gray-900">
                            <strong
                                aria-hidden="true"
                                className="align-middle text-4xl text-blue-600 text-shadow-lg px-3 rounded-xl mr-4 bg-blue-600/10 border border-blue-600/20"
                            >
                                {total}
                            </strong>
                            <span className="align-middle">
                                All Posts ·{' '}
                                <small>
                                    <em>Page {pageNum}</em>
                                </small>
                            </span>
                        </h1>
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
