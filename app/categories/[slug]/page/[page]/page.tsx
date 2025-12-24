// app/categories/[slug]/page/[page]/page.tsx
import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/wp';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string; page: string }>;
};

export default async function CategoryPaginatedPage({ params }: Props) {
    const { slug, page } = await params;
    const pageNum = Number(page);

    if (!Number.isInteger(pageNum) || pageNum < 2) {
        notFound();
    }

    const category = await getCategoryBySlug(slug);
    if (!category) notFound();

    const { posts, total } = await getPostsByCategory({
        categoryId: category.id,
        page: pageNum,
        perPage: 12,
    }).catch(() => ({ posts: [], total: 0 }));

    if (!posts.length) notFound();

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>

                {category.description && <p className="mt-2 text-gray-600 max-w-2xl">{category.description}</p>}

                <p className="mt-1 text-sm text-gray-500">
                    {total} articles · Page {pageNum}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={pageNum} basePath={`/categories/${slug}`} hasNext={posts.length === 12} />
        </TwoColLayout>
    );
}
