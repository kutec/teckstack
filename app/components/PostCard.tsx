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

const FALLBACK_IMAGE = "/images/post-placeholder.jpg"; // add this image

export default function PostCard({ post }: { post: Post }) {
    const title = post?.title?.rendered ?? "Untitled";
    const slug = post?.slug;

    const excerpt = (
        post?.excerpt?.rendered ??
        post?.content?.rendered ??
        ""
    )
        .replace(/<[^>]+>/g, "")
        .slice(0, 140);

    const featuredMedia = post?._embedded?.["wp:featuredmedia"]?.[0] ?? null;
    const imageUrl = featuredMedia?.source_url || FALLBACK_IMAGE;
    const imageAlt = featuredMedia?.alt_text || title;

    return (
        <article
            className="
        group bg-white rounded-lg overflow-hidden
        shadow-sm transition-all duration-200
        md:hover:-translate-y-1 md:hover:shadow-lg
      "
        >
            {/* IMAGE */}
            <Link
                href={`/posts/${slug}`}
                aria-label={title}
                className="block relative h-44 overflow-hidden bg-gray-100"
            >
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="
            object-cover transition-transform duration-300
            md:group-hover:scale-[1.03]
          "
                    unoptimized={process.env.NODE_ENV !== "production"}
                />
            </Link>

            {/* CONTENT */}
            <div className="p-4">
                {/* Date */}
                <div className="text-xs text-gray-400 mb-1">
                    {new Date(post.date).toLocaleDateString()}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-snug">
                    <Link
                        href={`/posts/${slug}`}
                        className="
              text-gray-900 transition-colors
              md:group-hover:text-blue-600
            "
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {excerpt}…
                </p>

                {/* CTA */}
                <div className="mt-4">
                    <Link
                        href={`/posts/${slug}`}
                        className="
              inline-flex items-center text-sm font-medium
              text-blue-600 transition-all
              md:group-hover:gap-1
            "
                    >
                        Read
                        <span className="transition-transform md:group-hover:translate-x-0.5">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
