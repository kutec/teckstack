// app/posts/[slug]/page.tsx
import Header from "@/components/Header";
import TwoColumnLayout from "@/components/TwoColumnLayout";
import PostSidebar from "@/components/PostSidebar";
import { getPostBySlug } from "@/lib/wp";
import PostBodyClient from "@/components/PostBodyClient";
import Image from "next/image";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
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

    const featuredMedia =
        post?._embedded?.["wp:featuredmedia"]?.[0] ?? null;

    const featuredImage = featuredMedia?.source_url;
    const featuredAlt = featuredMedia?.alt_text || title;

    return (
        <>
            <Header />

            <TwoColumnLayout sidebar={<PostSidebar />}>
                {/* Title */}
                <h1
                    className="text-4xl font-extrabold text-gray-900 mb-4"
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                {/* Meta */}
                <div className="text-sm text-gray-500 mb-10">
                    {new Date(post.date).toLocaleDateString()}
                </div>

                {/* Content */}
                <div className="bg-white">
                    <article className="max-w-full lg:max-w-3xl bg-white rounded-xl p-0 lg:p-7">
                        {featuredImage && (
                            <div className="mb-8">
                                <Image
                                    src={featuredImage}
                                    alt={featuredAlt}
                                    className="w-full rounded-lg border"
                                    width={600}
                                    height={300}
                                />
                            </div>
                        )}
                        <PostBodyClient html={contentHtml} />
                    </article>
                </div>
            </TwoColumnLayout>
        </>
    );
}
