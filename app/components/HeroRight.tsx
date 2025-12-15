// components/HeroRight.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NewsletterForm from "@/components/NewsletterForm";

type Card = {
    id: string;
    label: string;
    title: string;
    href?: string;
};

type PostLite = {
    id?: number;
    title?: string;
    excerpt?: string;
    link?: string;
    slug?: string;
};

const STATIC_CARDS: Card[] = [
    {
        id: "featured",
        label: "Featured",
        title: "React Hooks Cheat Sheet",
        href: "/posts/react-hooks-cheat-sheet",
    },
    {
        id: "guide",
        label: "Guide",
        title: "Write Better Components",
        href: "/guides/write-better-components",
    },
];

export default function HeroRight({
    featured,
    guide,
    newsletterText,
}: {
    featured?: PostLite | null;
    guide?: PostLite | null;
    newsletterText?: string;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState<Record<string, boolean>>({});

    // Intersection reveal
    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const items = Array.from(
            root.querySelectorAll<HTMLElement>("[data-reveal]")
        );

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-reveal") || "";
                        setVisible((s) => ({ ...s, [id]: true }));
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        items.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const cardsToRender: Card[] = [
        featured?.title
            ? {
                id: "featured",
                label: "Featured",
                title: featured.title,
                href: featured.link,
            }
            : STATIC_CARDS[0],

        guide?.title
            ? {
                id: "guide",
                label: "Guide",
                title: guide.title,
                href: guide.link,
            }
            : STATIC_CARDS[1],
    ];

    return (
        <div ref={containerRef} className="space-y-4">
            {/* FEATURED + GUIDE */}
            <div className="grid grid-cols-1 gap-4">
                {cardsToRender.map((c, idx) => (
                    <Link
                        key={c.id}
                        data-reveal={`card-${c.id}`}
                        href={c.href || "#"}
                        className={`block rounded-lg border border-gray-100 bg-white p-5 shadow-sm transform transition-all
              ${visible[`card-${c.id}`]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }
              hover:shadow-lg hover:-translate-y-1 hover:border-blue-200`}
                        style={{ transitionDelay: `${idx * 80}ms` }}
                    >
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {c.label}
                        </p>
                        <p className="text-gray-900 font-medium leading-snug">
                            {c.title}
                        </p>
                    </Link>
                ))}
            </div>

            {/* NEWSLETTER */}
            <div
                data-reveal="newsletter"
                className={`rounded-lg border border-gray-100 bg-white p-5 shadow-sm transform transition-all
          ${visible["newsletter"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
          hover:shadow-lg hover:-translate-y-1 hover:border-blue-200`}
                style={{ transitionDelay: "180ms" }}
            >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Newsletter
                </p>
                <p className="text-gray-900 font-medium mb-3">
                    Join TeckStack Weekly
                </p>

                <NewsletterForm newsletterText={newsletterText} />
            </div>
        </div>
    );
}
