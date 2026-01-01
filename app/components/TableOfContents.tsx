'use client';

import { useEffect, useState } from 'react';

type TocItem = {
    id: string;
    text: string;
    level: number; // 2 or 3
};

const HEADER_OFFSET = 96; // adjust if header height changes

export default function TableOfContents({ contentSelector = '.post-single-page' }: { contentSelector?: string }) {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const root = document.querySelector(contentSelector);
        if (!root) return;

        const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'));

        const tocItems: TocItem[] = headings.map((heading, index) => {
            let id = heading.id;

            if (!id) {
                id =
                    heading.textContent
                        ?.toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]/g, '') || `heading-${index}`;
                heading.id = id;
            }

            heading.style.scrollMarginTop = `${HEADER_OFFSET + 12}px`;

            return {
                id,
                text: heading.textContent || '',
                level: Number(heading.tagName.replace('H', '')),
            };
        });

        setItems(tocItems);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);

                        // highlight heading in content
                        headings.forEach((h) => h.classList.remove('toc-active-heading'));
                        entry.target.classList.add('toc-active-heading');
                    }
                });
            },
            {
                rootMargin: `-${HEADER_OFFSET}px 0px -65% 0px`,
                threshold: 0.1,
            }
        );

        headings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, [contentSelector]);

    if (items.length === 0) return null;

    return (
        <nav aria-label="Table of contents">
            <div className="max-h-[60vh] overflow-auto pr-1">
                <ol className="space-y-2 text-sm list-decimal pl-4">
                    {items.map((item) =>
                        item.level === 2 ? (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`
                                        block transition-colors
                                        font-semibold
                                        ${activeId === item.id ? 'text-blue-600' : 'text-gray-800 hover:text-gray-900'}
                                    `}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ) : (
                            <li key={item.id} className="list-disc ml-6">
                                <a
                                    href={`#${item.id}`}
                                    className={`
                                        block transition-colors
                                        font-normal
                                        ${activeId === item.id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
                                    `}
                                >
                                    {item.text}
                                </a>
                            </li>
                        )
                    )}
                </ol>
            </div>

            {/* Smooth scrolling */}
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }

                .toc-active-heading {
                    position: relative;
                }

                .toc-active-heading::before {
                    content: '➡️';
                    position: absolute;
                    left: -3rem;
                    top: 0.02em;
                    height: 100%;
                }
            `}</style>
        </nav>
    );
}
