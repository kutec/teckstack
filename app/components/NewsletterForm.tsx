// components/NewsletterForm.tsx
"use client";

import React, { useEffect, useState } from "react";

type NewsletterFormProps = {
    /** Optional text shown when idle */
    newsletterText?: string;
    /** Optional explicit subscribe endpoint (defaults to NEXT_PUBLIC_WP_API_BASE + /wp-json/teckstack/v1/subscribe) */
    subscribeEndpoint?: string | null;
    /** Callback executed after a successful subscription */
    onSuccess?: (data?: unknown) => void;
    /** Callback executed when already subscribed */
    onAlready?: (data?: unknown) => void;
    /** Callback executed on error */
    onError?: (err?: unknown) => void;
};

export default function NewsletterForm({
    newsletterText,
    subscribeEndpoint = null,
    onSuccess,
    onAlready,
    onError,
}: NewsletterFormProps) {
    const [email, setEmail] = useState("");
    const [inputValid, setInputValid] = useState(false);
    const [status, setStatus] = useState<null | "idle" | "sending" | "ok" | "error" | "already">("idle");

    // Default endpoint from env var if not passed
    const WP_SUBSCRIBE_ENDPOINT = subscribeEndpoint ?? (process.env.NEXT_PUBLIC_WP_API_BASE ? `${process.env.NEXT_PUBLIC_WP_API_BASE.replace(/\/$/, "")}/wp-json/teckstack/v1/subscribe` : null);

    useEffect(() => {
        // auto-dismiss success only (3s)
        let t: ReturnType<typeof setTimeout> | null = null;
        if (status === "ok") {
            t = setTimeout(() => setStatus("idle"), 3000);
        }
        return () => {
            if (t) clearTimeout(t);
        };
    }, [status]);

    const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!inputValid) {
            setStatus("error");
            return;
        }

        if (!WP_SUBSCRIBE_ENDPOINT) {
            // endpoint not configured — fail gracefully
            setStatus("error");
            onError?.({ message: "subscribe_endpoint_missing" });
            console.error("NewsletterForm: subscribe endpoint not configured. Set NEXT_PUBLIC_WP_API_BASE or pass subscribeEndpoint prop.");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch(WP_SUBSCRIBE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // try parse json safely
            let data;
            try {
                data = await res.json();
            } catch (err) {
                data = null;
                console.error("NewsletterForm: failed to parse JSON response:", err);
            }

            if (data?.already_subscribed) {
                setStatus("already");
                onAlready?.(data);
            } else if (data?.ok) {
                setStatus("ok");
                setEmail("");
                setInputValid(false);
                onSuccess?.(data);
            } else {
                setStatus("error");
                onError?.(data);
            }
        } catch (err) {
            setStatus("error");
            onError?.(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                    Email
                </label>

                <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        const v = e.target.value;
                        setEmail(v);
                        const valid = isEmail(v);
                        setInputValid(valid);
                        // clear state messages while editing
                        if (status === "ok" || status === "already" || status === "error") {
                            setStatus("idle");
                        }
                    }}
                    placeholder="you@company.com"
                    className={`flex-1 px-3 py-2 rounded-md text-gray-900 bg-white border transition-all focus:outline-none placeholder:text-gray-400
                        ${status === "error" ? "border-red-500 focus:ring-2 focus:ring-red-300" : status === "ok" ? "border-green-600 focus:ring-2 focus:ring-green-300" : "border-gray-400 focus:ring-2 focus:ring-blue-300"}`}
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

            {/* helper / status message: animated + accessible */}
            <div className="relative">
                <p
                    id="newsletter-help"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className={`text-xs mt-1 pointer-events-none transform transition-all duration-300 ease-out
                        ${status === "ok" || status === "already" || status === "error" || status === "idle" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
                >
                    {status === "ok" ? (
                        <span className="text-green-600 inline-flex items-center">
                            {/* check icon */}
                            <svg className="inline-block w-4 h-4 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Thanks — check your inbox!</span>
                        </span>
                    ) : status === "already" ? (
                        <span className="text-blue-600 inline-flex items-center">
                            {/* info icon */}
                            <svg className="inline-block w-4 h-4 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M12 8h.01M11 12h1v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>You&apos;re <strong>already a subscriber</strong> 😀</span>
                        </span>
                    ) : status === "error" ? (
                        <span className="text-red-500 inline-flex items-center">
                            {/* x icon */}
                            <svg className="inline-block w-4 h-4 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Please enter a valid email.</span>
                        </span>
                    ) : (
                        <span className="text-gray-500">{newsletterText || "No spam. Unsubscribe anytime."}</span>
                    )}
                </p>
            </div>
        </form>
    );
}
