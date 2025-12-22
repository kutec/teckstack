import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getPostsPaginatedWithMeta, getSiteOptions } from "@/lib/wp";

export default async function PostsPage() {
    let featuredPostId: number | null = null;
    const { posts, total } = await getPostsPaginatedWithMeta({
        page: 1,
        perPage: 12,
        excludeIds: [],
    }).catch(() => ({
        posts: [],
        total: 0,
        totalPages: 0,
    }));

    try {
        // Fetch site options once
        const optionsData = await getSiteOptions();
        if (optionsData?.featured?.id) {
            featuredPostId = Number(optionsData.featured.id);
        }
    } catch (err) {
        console.error("Failed to load site options:", err);
    }

    return (
        <>
            <Header />

            <main className="bg-white">
                <section className="max-w-6xl mx-auto px-4 py-14">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">
                            All Posts
                        </h1>

                        {/* Total count */}
                        <p className="mt-2 text-sm text-gray-600">
                            {total > 0
                                ? `${total} articles published`
                                : "Latest articles, tutorials, and technical notes."}
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.length > 0 ? (
                            posts.map((post: any) => (
                                <PostCard key={post.id} post={post} featuredPostId={featuredPostId} />
                            ))
                        ) : (
                            <div className="col-span-full p-6 bg-white border rounded text-gray-600">
                                No posts yet — publish one from WordPress.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={1}
                        basePath="/posts"
                        hasNext={posts.length === 12}
                    />
                </section>
            </main>
        </>
    );
}
