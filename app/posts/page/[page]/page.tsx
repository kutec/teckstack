// app/posts/page/[page]/page.tsx
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getPostsPaginated, getSiteOptions } from "@/lib/wp";
import { notFound } from "next/navigation";

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

    const excludeIds: number[] = [];

    // Exclude featured post (same as homepage & /posts)
    try {
        const data = await getSiteOptions();
        if (data?.featured?.id) {
            excludeIds.push(Number(data.featured.id));
        }
    } catch (err) {
        console.error("Failed to load featured post for exclusion", err);
    }

    const posts = await getPostsPaginated({
        page: pageNum,
        perPage: 12,
        excludeIds,
    }).catch(() => []);

    // If no posts returned for this page → 404 (clean SEO)
    if (!posts || posts.length === 0) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">
                    All Posts — Page {pageNum}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post: any) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={pageNum}
                    basePath="/posts"
                    hasNext={posts.length === 12}
                />
            </main>
        </>
    );
}
