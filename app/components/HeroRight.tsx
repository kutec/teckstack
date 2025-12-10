// components/HeroRight.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Card = {
    id: string;
    label: string;
    title: string;
    href?: string;
};

const CARDS: Card[] = [
    { id: "featured", label: "Featured", title: "React Hooks Cheat Sheet", href: "/posts/react-hooks-cheat-sheet" },
    { id: "guide", label: "Guide", title: "Write Better Components", href: "/guides/write-better-components" },
];

export default function HeroRight() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    const [email, setEmail] = useState("");
    const [inputValid, setInputValid] = useState(false); // tracks email validity while typing
    const [status, setStatus] = useState<null | "idle" | "sending" | "ok" | "error">("idle");

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

    async function handleSubscribe(e: React.FormEvent) {
        e.preventDefault();

        // if input isn't valid at submission time, show error
        if (!inputValid) {
            setStatus("error");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("ok");
                setEmail("");
                setInputValid(false);
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    }

    // regex reused
    const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

    return (
        <div ref={containerRef} className="space-y-4">
            {/* Two minimal flat cards */}
            <div className="grid grid-cols-1 gap-4">
                {CARDS.map((c, idx) => (
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
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                const v = e.target.value;
                                setEmail(v);

                                const valid = isEmail(v);
                                setInputValid(valid);

                                if (status === "ok" || status === "error") setStatus("idle");
                            }}
                            placeholder="you@company.com"
                            className={`flex-1 px-3 py-2 rounded-md text-gray-900 bg-white border transition-all focus:outline-none placeholder:text-gray-400
                                ${status === "error"
                                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                                    : status === "ok"
                                        ? "border-green-600 focus:ring-2 focus:ring-green-300"
                                        : "border-gray-400 focus:ring-2 focus:ring-blue-300"
                                }
                            `}
                            aria-describedby="newsletter-help"
                        />


                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md text-white transition-all ${inputValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed"}`}
                            disabled={!inputValid || status === "sending"}
                        >
                            {status === "sending" ? "Sending…" : "Join"}
                        </button>
                    </div>

                    {/* Helper message: only error/ok are colored and appear after submit; default message is neutral */}
                    <p id="newsletter-help" className="text-xs mt-1">
                        {status === "ok" ? (
                            <span className="text-green-600">Thanks — check your inbox!</span>
                        ) : status === "error" ? (
                            <span className="text-red-500">Please enter a valid email.</span>
                        ) : (
                            <span className="text-gray-500">No spam. Unsubscribe anytime.</span>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}
