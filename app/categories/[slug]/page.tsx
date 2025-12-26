// app/categories/[slug]/page.tsx
import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/wp';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);
    if (!category) notFound();

    const { posts, total } = await getPostsByCategory({
        categoryId: category.id,
        page: 1,
        perPage: 12,
    }).catch(() => ({ posts: [], total: 0 }));

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 d-flex items-center">
                    <strong
                        aria-hidden="true"
                        className="align-middle text-4xl text-shadow-blue-600 text-blue-50 text-shadow-lg px-3 rounded-4xl mr-4 shadow-lg bg-blue-600/10"
                    >
                        {total}
                    </strong>
                    <span className="align-middle">{category.name}</span>
                </h1>
                {category.description && <p className="mt-2 text-gray-600 max-w-2xl">{category.description}</p>}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={1} basePath={`/categories/${slug}`} hasNext={posts.length === 12} />
        </TwoColLayout>
    );
}
