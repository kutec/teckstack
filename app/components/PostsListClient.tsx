"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import SearchPanel from "@/components/SearchPanel";

export default function PostsClient({
    initialPosts,
    total,
    featuredPostId,
}: {
    initialPosts: any[];
    total: number;
    featuredPostId?: number;
}) {
    const [query, setQuery] = useState("");

    const filteredPosts = useMemo(() => {
        if (query.length < 3) return initialPosts;

        const q = query.toLowerCase();

        return initialPosts.filter((post) => {
            const title = post.title?.rendered?.toLowerCase() ?? "";
            const content = post.content?.rendered?.toLowerCase() ?? "";

            const terms =
                post._embedded?.["wp:term"]?.flat() ?? [];

            const taxMatch = terms.some(
                (t: any) =>
                    t.name?.toLowerCase().includes(q) ||
                    t.slug?.toLowerCase().includes(q)
            );

            return (
                title.includes(q) ||
                content.includes(q) ||
                taxMatch
            );
        });
    }, [query, initialPosts]);

    const searchActive = query.length >= 3;

    return (
        <main className="bg-white">
            <section className="max-w-7xl mx-auto px-4 py-14">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            All Posts
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            {searchActive
                                ? `${filteredPosts.length} results found`
                                : `${total} articles published`}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="w-72">
                        <SearchPanel
                            value={query}
                            onChange={setQuery}
                            placeholder="Search posts…"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(searchActive ? filteredPosts : initialPosts).map(
                        (post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                featuredPostId={featuredPostId}
                            />
                        )
                    )}
                </div>

                {/* Pagination only when NOT searching */}
                {!searchActive && (
                    <Pagination
                        currentPage={1}
                        basePath="/posts"
                        hasNext={initialPosts.length === 12}
                    />
                )}
            </section>
        </main>
    );
}
