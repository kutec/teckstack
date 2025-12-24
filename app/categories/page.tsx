// app/categories/page.tsx
import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import Link from 'next/link';
import { getAllCategories } from '@/lib/wp';

export default async function CategoriesIndexPage() {
    const categories = await getAllCategories().catch(() => []);

    return (
        <TwoColLayout sidebar={<PostSidebar />}>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                <p className="mt-2 text-sm text-gray-600">Browse articles by topic</p>
            </div>

            {/* Categories Grid */}
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            className="
                                group block rounded-lg border bg-white p-5
                                transition-all
                                hover:shadow-md hover:-translate-y-0.5
                            "
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                    {cat.name}
                                </h2>
                                <span className="text-xs text-gray-500">{cat.count}</span>
                            </div>

                            {cat.description && (
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{cat.description}</p>
                            )}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-6 border rounded text-gray-600">No categories found.</div>
            )}
        </TwoColLayout>
    );
}
