// components/PostCard.tsx
import Image from "next/image";
import Link from "next/link";

interface Post {
    title?: { rendered: string };
    slug: string;
    excerpt?: { rendered: string };
    content?: { rendered: string };
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            alt_text?: string;
        }>;
    };
    date: string;
}

export default function PostCard({ post }: { post: Post }) {
    const title = post?.title?.rendered ?? "Untitled";
    const slug = post?.slug;
    const excerpt = (post?.excerpt?.rendered ?? post?.content?.rendered ?? "").replace(/<[^>]+>/g, "").slice(0, 120);

    const featuredMedia = post?._embedded?.["wp:featuredmedia"]?.[0] ?? null;
    const imageUrl = featuredMedia?.source_url ?? null;
    const imageAlt = featuredMedia?.alt_text ?? title;

    return (
        <article className="bg-white shadow-sm rounded-lg overflow-hidden">
            {imageUrl ? (
                <div className="h-44 bg-gray-100 overflow-hidden relative">
                    <Link href={`/posts/${slug}`}
                        aria-label={title} className="block w-full h-full relative">
                        <Image
                            src={imageUrl}
                            alt={imageAlt || title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: "cover" }}
                            unoptimized={process.env.NODE_ENV !== "production"} // skip optimization in dev
                        />


                    </Link>
                </div>
            ) : null}

            <div className="p-4">
                <h3 className="text-lg font-semibold">
                    <Link href={`/posts/${slug}`} dangerouslySetInnerHTML={{ __html: title }} />
                </h3>

                <p className="mt-2 text-sm text-gray-600">{excerpt}…</p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <div>{new Date(post.date).toLocaleDateString()}</div>
                    <div>
                        <Link href={`/posts/${slug}`} className="text-blue-600">Read →
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
