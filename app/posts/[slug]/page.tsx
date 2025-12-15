import Header from "@/components/Header";
import { getPostBySlug } from "@/lib/wp";
// Client renderer for post HTML + highlighting
import PostBodyClient from "@/components/PostBodyClient";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    console.log("::: Fetching post with slug:", slug);
    const post = await getPostBySlug(slug);

    if (!post) {
        return (
            <>
                <Header />
                <main className="max-w-3xl mx-auto py-20 px-4">
                    <h1 className="text-2xl font-semibold">Post not found</h1>
                </main>
            </>
        );
    }

    const title = post.title?.rendered ?? "Untitled";
    const contentHtml = post.content?.rendered ?? "";

    return (
        <>
            <Header />
            <main id="main" className="max-w-3xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-extrabold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
                {/* meta (date, reading time, author) */}
                <div className="text-sm text-gray-500 mb-8">
                    {/* Example: you can parse post.date */}
                    {new Date(post.date).toLocaleDateString()}
                </div>

                {/* Client-side component that highlights code */}
                <PostBodyClient html={contentHtml} />
            </main>
        </>
    );
}
