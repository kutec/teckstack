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

const STATIC_CARDS: Card[] = [
    { id: "featured", label: "Featured", title: "React Hooks Cheat Sheet", href: "/posts/react-hooks-cheat-sheet" },
    { id: "guide", label: "Guide", title: "Write Better Components", href: "/guides/write-better-components" },
];

export default function HeroRight({ featured, newsletterText }: { featured?: { title: string; link: string }; newsletterText?: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    const [status, setStatus] = useState<null | "idle" | "sending" | "ok" | "error" | "already">("idle");

    useEffect(() => {
        // IntersectionObserver to reveal card items one by one
        const root = containerRef.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-reveal") || "";
                        setVisible((s) => ({ ...s, [id]: true }));
                        obs.unobserve(entry.target); // reveal once
                    }
                });
            },
            { root: null, threshold: 0.15 }
        );
        items.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // auto-dismiss only successful subscription message after 3s
    useEffect(() => {
        let t: ReturnType<typeof setTimeout> | null = null;
        if (status === "ok") {
            t = setTimeout(() => {
                setStatus("idle");
            }, 3000);
        }
        return () => {
            if (t) clearTimeout(t);
        };
    }, [status]);

    // decide which cards to render: if featured prop given, render it as first card
    const cardsToRender: Card[] = (() => {
        if (featured && featured.title) {
            // featured prop from WP is expected to have { id, title, link } shape (as used earlier)
            return [
                { id: "featured", label: "Featured", title: featured.title || "Featured post", href: featured.link || "#" },
                // keep the second static card as Guide
                { id: "guide", label: "Guide", title: "Write Better Components", href: "/guides/write-better-components" },
            ];
        }
        return STATIC_CARDS;
    })();

    return (
        <div ref={containerRef} className="space-y-4">
            {/* Cards (featured or static) */}
            <div className="grid grid-cols-1 gap-4">
                {cardsToRender.map((c, idx) => (
                    <Link
                        key={c.id}
                        data-reveal={`card-${c.id}`}
                        href={c.href || "#"}
                        className={`block rounded-lg border border-gray-100 bg-white p-5 shadow-sm transform transition-all ${visible[`card-${c.id}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            } hover:shadow-lg hover:-translate-y-1 hover:border-blue-200`}
                        style={{ transitionDelay: `${idx * 80}ms` }}
                        aria-label={`${c.label} — ${c.title}`}
                    >
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{c.label}</p>
                        <p className="text-gray-900 font-medium leading-snug">{c.title}</p>
                    </Link>
                ))}
            </div>

            {/* Newsletter card */}
            <div
                data-reveal="newsletter"
                className={`rounded-lg border border-gray-100 bg-white p-5 shadow-sm transform transition-all ${visible["newsletter"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 `}
                style={{ transitionDelay: `180ms` }}
            >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Newsletter</p>
                <p className="text-gray-900 font-medium mb-3">Join TeckStack Weekly</p>

                {/* Newsletter form */}
                <NewsletterForm newsletterText={newsletterText} />
            </div>
        </div>
    );
}
