'use client';

import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';

export default function PostsListClient({
    initialPosts,
    total,
    featuredPostId,
    basePath,
    title,
}: {
    initialPosts: any[];
    total: number;
    featuredPostId?: number;
    basePath: 'posts' | 'guides';
    title: string;
}) {
    return (
        <main className="bg-white">
            <section className="max-w-7xl mx-auto px-4 py-14">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        <strong
                            aria-hidden="true"
                            className="align-middle text-4xl text-blue-600 px-3 rounded-xl mr-4 bg-blue-600/10 border border-blue-600/20"
                        >
                            {total}
                        </strong>
                        <span className="align-middle">{title}</span>
                    </h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {initialPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            featuredPostId={featuredPostId}
                            basePath={basePath} // ✅ FIX
                        />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} basePath={basePath} hasNext={initialPosts.length === 12} />
            </section>
        </main>
    );
}
