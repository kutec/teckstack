// components/LatestPosts.tsx
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function LatestPosts({
    posts,
    title = "Latest posts",
    viewAllHref,
}: {
    posts: any[];
    title?: string;
    viewAllHref?: string;
}) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>

                {viewAllHref ? (
                    <Link
                        href={viewAllHref}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View all →
                    </Link>
                ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts && posts.length > 0 ? (
                    posts.map((p: any) => <PostCard key={p.id} post={p} />)
                ) : (
                    <div className="col-span-full p-6 bg-white rounded shadow text-gray-600">
                        No posts yet — publish one from WordPress to get started.
                    </div>
                )}
            </div>
        </section>
    );
}
