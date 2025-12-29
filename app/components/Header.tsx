'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import SkipLink from '@/components/SkipLink';
import GlobalSearch from '@/components/GlobalSearch';
import Image from 'next/image';

const NAV = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Blog' },
    { href: '/guides', label: 'Guides' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' }, // last item
];

export default function Header() {
    const pathname = usePathname() || '/';
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // close menu on route change
    useEffect(() => {
        const timer = setTimeout(() => setOpen(false), 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    // close on escape
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // shrink-on-scroll logic
    useEffect(() => {
        const THRESHOLD = 60;
        function onScroll() {
            setScrolled(window.scrollY > THRESHOLD);
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 bg-blue-600 text-white transition-all duration-200 ${scrolled ? 'py-1 shadow-md' : 'py-3'}`}
            aria-label="Site Header"
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded rounded-bl-2xl text-blue-600 font-bold">
                            <Image src="/teckstack-2025-logo.png" alt="TeckStack Logo" width={48} height={48} />
                        </span>
                        <span className="font-semibold text-lg">TeckStack</span>
                    </Link>

                    {/* keyboard-first SkipLink (renders only after Tab) */}
                    <SkipLink />
                </div>

                {/* desktop nav */}
                <div className="hidden md:flex gap-6 items-center">
                    <nav className="text-sm">
                        <ul className="flex gap-6 items-center">
                            {NAV.map((item) => {
                                const isActive =
                                    pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                                return (
                                    <li key={item.href} className="relative">
                                        {/* keep pill-style active background exactly as before */}
                                        <Link
                                            href={item.href}
                                            className={`px-2 py-1 rounded transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:text-white'}`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>

                                        {/* centered animated underline (stays under the label regardless of header height) */}
                                        <span
                                            className={`absolute left-1/2 transform -translate-x-1/2 -bottom-6.5 h-3 bg-white transition-all ${isActive ? 'w-8' : 'w-0'}`}
                                            aria-hidden
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <GlobalSearch />
                </div>

                {/* mobile hamburger */}
                <div className="md:hidden">
                    <button
                        ref={buttonRef}
                        onClick={() => setOpen((s) => !s)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        {open ? (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* mobile menu panel */}
            <div
                id="mobile-menu"
                className={`md:hidden bg-blue-600/95 border-t border-white/5 overflow-hidden transition-[max-height] duration-200 ${open ? 'max-h-96' : 'max-h-0'}`}
                aria-hidden={!open}
            >
                <div className="px-4 py-4 flex flex-col gap-1">
                    <GlobalSearch />
                    {NAV.map((item) => {
                        const isActive =
                            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-2 rounded ${isActive ? 'bg-white/20' : 'hover:bg-white/10'} transition-colors`}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => setOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
