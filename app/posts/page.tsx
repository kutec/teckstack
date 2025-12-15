import Header from "@/components/Header";
import { getLatestPosts } from "@/lib/wp";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getLatestPosts(20);

    return (
        <>
            <Header />
            <section className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6">Posts</h1>

                <div className="grid gap-6">
                    {posts.map((g: any) => (
                        <Link
                            key={g.id}
                            href={`/posts/${g.slug}`}
                            className="block p-4 border rounded hover:shadow"
                        >
                            <h2
                                className="font-semibold"
                                dangerouslySetInnerHTML={{ __html: g.title.rendered }}
                            />

                            {g.excerpt?.rendered && (
                                <div
                                    className="text-sm text-gray-600 mt-2"
                                    dangerouslySetInnerHTML={{ __html: g.excerpt.rendered }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </section>

        </>
    );
}
