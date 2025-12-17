// app/posts/page.tsx
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getPostsPaginated, getSiteOptions } from "@/lib/wp";

export default async function PostsPage() {
    const excludeIds: number[] = [];

    // Exclude featured post (same logic as homepage)
    // try {
    //     const data = await getSiteOptions();
    //     if (data?.featured?.id) {
    //         excludeIds.push(Number(data.featured.id));
    //     }
    // } catch (err) {
    //     console.error("Failed to load featured post for exclusion", err);
    // }

    // Page 1, 12 posts
    const posts = await getPostsPaginated({
        page: 1,
        perPage: 12,
        excludeIds,
    }).catch(() => []);

    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">All Posts</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="col-span-full p-6 bg-white rounded shadow text-gray-600">
                            No posts yet — publish one from WordPress.
                        </div>
                    )}
                </div>

                {/* Pagination (Page 1) */}
                <Pagination
                    currentPage={1}
                    basePath="/posts"
                    hasNext={posts.length === 12}
                />
            </main>
        </>
    );
}
