// components/SkipLink.tsx
"use client";

import { useEffect, useState } from "react";

/**
 * Render a skip link that remains hidden for mouse users but becomes available
 * to keyboard users once they press Tab. IMPORTANT: we do not auto-focus the link,
 * to avoid browser focus edge-cases after reload.
 *
 * Usage: place <SkipLink /> near the top of the header (after logo).
 */

export default function SkipLink() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Tab") {
                setShow(true);
                // keep the listener so subsequent Tab presses still reveal link when necessary
                // but we can remove the listener after it already showed if you want:
                // window.removeEventListener("keydown", onKeyDown);
            }
        }
        window.addEventListener("keydown", onKeyDown, { passive: true });

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    if (!show) return null;

    // Render link but DO NOT auto-focus it.
    return (
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:inline-block ml-2 px-3 py-2 rounded bg-white text-blue-600"
            id="skip-link"
        >
            Skip to content
        </a>
    );
}
