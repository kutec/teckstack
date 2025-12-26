'use client';

import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';

export default function PostsClient({
    initialPosts,
    total,
    featuredPostId,
}: {
    initialPosts: any[];
    total: number;
    featuredPostId?: number;
}) {
    return (
        <main className="bg-white">
            <section className="max-w-7xl mx-auto px-4 py-14">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        <strong
                            aria-hidden="true"
                            className="align-middle text-4xl text-shadow-blue-600 text-blue-50 text-shadow-lg px-3 rounded-4xl mr-4 shadow-lg bg-blue-600/10"
                        >
                            {total}
                        </strong>
                        <span className="align-middle">All Posts</span>
                    </h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {initialPosts.map((post) => (
                        <PostCard key={post.id} post={post} featuredPostId={featuredPostId} />
                    ))}
                </div>

                {/* Pagination only when NOT searching */}
                <Pagination currentPage={1} basePath="/posts" hasNext={initialPosts.length === 12} />
            </section>
        </main>
    );
}
