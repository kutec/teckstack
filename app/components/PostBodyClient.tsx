"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";

// IMPORTANT: load a theme (pick ONE)
import "prism-themes/themes/prism-dracula.css";
// import "prism-themes/themes/prism-synthwave84.css";

type Props = {
    html: string;
};

export default function PostBodyClient({ html }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    /** Normalize WP code blocks for Prism */
    function normalizeCodeBlocks(root: HTMLElement) {
        const pres = root.querySelectorAll("pre");

        pres.forEach((pre) => {
            const code = pre.querySelector("code");
            if (!code) return;

            // Skip if already processed
            if (code.className.includes("language-")) return;

            // Heuristic language detection (safe defaults)
            const text = code.textContent || "";
            let lang = "javascript";

            if (text.includes("interface ") || text.includes(": string")) {
                lang = "typescript";
            } else if (text.includes("<") && text.includes(">")) {
                lang = "tsx";
            } else if (text.includes("{") && text.includes(";")) {
                lang = "javascript";
            }

            pre.classList.add(`language-${lang}`);
            pre.classList.add(`line-numbers`);
            code.classList.add(`language-${lang}`);
        });
    }

    /** Add copy buttons */
    function addCopyButtons(root: HTMLElement) {
        const pres = root.querySelectorAll("pre");

        pres.forEach((pre) => {
            if (pre.querySelector(".copy-btn")) return;

            pre.style.position = "relative";

            const button = document.createElement("button");
            button.className =
                "copy-btn absolute top-3 right-3 text-xs px-2 py-1 rounded bg-gray-800 text-white opacity-80 hover:opacity-100";
            button.textContent = "Copy";

            button.onclick = async () => {
                const code = pre.querySelector("code");
                if (!code) return;
                await navigator.clipboard.writeText(code.textContent || "");
                button.textContent = "Copied";
                setTimeout(() => (button.textContent = "Copy"), 1200);
            };

            pre.appendChild(button);
        });
    }

    useEffect(() => {
        if (!ref.current) return;

        normalizeCodeBlocks(ref.current);
        Prism.highlightAllUnder(ref.current);
        addCopyButtons(ref.current);
    }, [html]);

    return (
        <div
            ref={ref}
            className="
        post-content
        prose prose-lg max-w-none
        prose-headings:text-gray-900
        prose-p:text-gray-800
        prose-a:text-blue-600 hover:prose-a:underline
        prose-code:text-pink-600
        prose-pre:bg-transparent
      "
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
