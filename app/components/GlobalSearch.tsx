'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Item = {
    id: number;
    slug: string;
    title?: { rendered: string };
    name?: string;
};

const WP_BASE = process.env.NEXT_PUBLIC_WP_API_BASE || 'http://teckstack.local';

const WP_REST = `${WP_BASE.replace(/\/$/, '')}/wp-json/wp/v2`;

export default function GlobalSearch() {
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState<Item[]>([]);
    const [guides, setGuides] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Item[]>([]);
    const [tags, setTags] = useState<Item[]>([]);

    /* ---------------- close on route change ---------------- */
    useEffect(() => {
        setOpen(false);
        setQuery('');
    }, [pathname]);

    /* ---------------- outside click ---------------- */
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    /* ---------------- esc key ---------------- */
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    /* ---------------- debounced search ---------------- */
    useEffect(() => {
        if (query.trim().length < 3) {
            setPosts([]);
            setGuides([]);
            setCategories([]);
            setTags([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const q = encodeURIComponent(query);

                const [p, g, c, t] = await Promise.all([
                    fetch(`${WP_REST}/posts?search=${q}&_embed`).then((r) => r.json()),
                    fetch(`${WP_REST}/guides?search=${q}&_embed`).then((r) => r.json()),
                    fetch(`${WP_REST}/categories?search=${q}`).then((r) => r.json()),
                    fetch(`${WP_REST}/tags?search=${q}`).then((r) => r.json()),
                ]);

                setPosts(p || []);
                setGuides(g || []);
                setCategories(c || []);
                setTags(t || []);
            } catch (e) {
                console.error('Global search failed', e);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [query]);

    const hasResults = posts.length || guides.length || categories.length || tags.length;

    return (
        <div ref={wrapperRef} className="relative">
            {/* INPUT */}
            <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder="React, JavaScript, CSS..."
                onFocus={() => setOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
                className="
          w-full lg:w-64 md:w-48
          px-3 py-1.5 rounded-md
          bg-white text-gray-900
          placeholder-gray-400
          text-sm
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
            />

            {/* RESULTS PANEL */}
            {open && query.length >= 3 && (
                <div
                    className="
            absolute right-0 mt-2 w-105
            max-h-[70vh] overflow-auto
            rounded-lg border bg-white shadow-xl
            p-4 z-50
          "
                >
                    {loading && <div className="text-sm text-gray-500">Searching…</div>}

                    {!loading && !hasResults && <div className="text-sm text-gray-500">No results found</div>}

                    {/* POSTS */}
                    {posts.length > 0 && (
                        <Section title="Posts">
                            {posts.map((p) => (
                                <ResultLink
                                    key={p.id}
                                    href={`/posts/${p.slug}`}
                                    label={p.title?.rendered || 'Untitled'}
                                />
                            ))}
                        </Section>
                    )}

                    {/* GUIDES */}
                    {guides.length > 0 && (
                        <Section title="Guides">
                            {guides.map((g) => (
                                <ResultLink
                                    key={g.id}
                                    href={`/guides/${g.slug}`}
                                    label={g.title?.rendered || 'Untitled'}
                                />
                            ))}
                        </Section>
                    )}

                    {/* CATEGORIES */}
                    {categories.length > 0 && (
                        <Section title="Categories">
                            {categories.map((c) => (
                                <ResultLink key={c.id} href={`/categories/${c.slug}`} label={c.name || ''} />
                            ))}
                        </Section>
                    )}

                    {/* TAGS */}
                    {tags.length > 0 && (
                        <Section title="Tags">
                            {tags.map((t) => (
                                <ResultLink key={t.id} href={`/tag/${t.slug}`} label={`#${t.name}`} />
                            ))}
                        </Section>
                    )}
                </div>
            )}
        </div>
    );
}

/* ---------------- helpers ---------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-4 last:mb-0">
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase">{title}</h4>
            <ul className="space-y-1">{children}</ul>
        </div>
    );
}

function ResultLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link
                href={href}
                target="_blank"
                className="block text-sm text-blue-600 hover:underline"
                dangerouslySetInnerHTML={{ __html: label }}
            />
        </li>
    );
}
