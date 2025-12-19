// components/LatestPosts.tsx
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import Link from "next/link";

export default function LatestPosts({
    posts,
    title = "Latest posts",
    viewAllHref = "/posts",
}: {
    posts: any[];
    title?: string;
    viewAllHref?: string;
}) {
    const isLoading = !posts || posts.length === 0;

    return (
        <section
            className="bg-gray-50 py-14 border-t border-gray-200/60"
            aria-busy={isLoading}
        >
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h2>

                    <Link
                        href={viewAllHref}
                        className="text-sm font-medium text-blue-600/90 hover:text-blue-700 hover:underline transition"
                    >
                        View all →
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <PostCardSkeleton key={i} />
                            ))}
                        </>
                    ) : (
                        posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
