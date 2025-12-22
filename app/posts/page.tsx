// app/posts/page.tsx
import Header from "@/components/Header";
import PostsListClient from "@/components/PostsListClient";
import { getPostsPaginatedWithMeta, getSiteOptions } from "@/lib/wp";

export default async function PostsPage() {
    const { posts, total } = await getPostsPaginatedWithMeta({
        page: 1,
        perPage: 12,
        excludeIds: [],
    });

    const options = await getSiteOptions().catch(() => null);
    const featuredPostId = options?.featured?.id
        ? Number(options.featured.id)
        : undefined;

    return (
        <>
            <Header />
            <PostsListClient
                initialPosts={posts}
                total={total}
                featuredPostId={featuredPostId}
            />
        </>
    );
}
