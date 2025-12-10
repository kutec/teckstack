"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
// import languages you need, e.g. typescript, jsx, bash
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
// optionally import a Prism theme css - we rely on our own styling above,
// but you can also use `prismjs/themes/prism-tomorrow.css` etc.

type Props = {
    html: string;
};

export default function PostBodyClient({ html }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    // Adds a simple copy button to each pre > code
    function addCopyButtons(root: HTMLElement) {
        const pres = Array.from(root.querySelectorAll("pre"));
        pres.forEach((pre) => {
            // avoid adding twice
            if (pre.querySelector(".copy-btn")) return;

            pre.classList.add("post-content-pre");
            const button = document.createElement("button");
            button.className = "copy-btn";
            button.type = "button";
            button.innerText = "Copy";
            button.addEventListener("click", async () => {
                const code = pre.querySelector("code");
                if (!code) return;
                const text = code.textContent || "";
                try {
                    await navigator.clipboard.writeText(text);
                    const old = button.innerText;
                    button.innerText = "Copied";
                    setTimeout(() => (button.innerText = old), 1500);
                } catch (e) {
                    button.innerText = "Err";
                    console.error("Copy failed", e);
                }
            });
            pre.appendChild(button);
        });
    }

    useEffect(() => {
        // Highlight all code blocks inside this container
        if (ref.current) {
            Prism.highlightAllUnder(ref.current);
            addCopyButtons(ref.current);
        }
    }, [html]);

    return (
        <div
            ref={ref}
            className="post-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
