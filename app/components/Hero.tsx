// components/Hero.tsx
import Link from "next/link";
import HeroRight from "@/components/HeroRight";

export default function Hero() {
    return (
        <section className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
                    {/* LEFT: strong hero text */}
                    <div className="md:col-span-7">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                            Smarter <span className="text-blue-600">Tech Learning</span>
                            <br />
                            for Modern Developers
                        </h1>

                        <p className="mt-6 text-gray-700 max-w-xl">
                            Practical guides, React patterns, and debugging notes based on real experience — deep dives without the fluff.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/start-here" className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-md font-medium shadow-sm">
                                Start Here
                            </Link>

                            <Link href="/blog" className="inline-flex items-center px-5 py-3 border rounded-md text-gray-700 bg-white/80 hover:bg-gray-100">
                                Read the Blog
                            </Link>
                        </div>

                        <div className="mt-6 text-sm text-gray-500">
                            <strong>Tip:</strong> Start with the “React fundamentals” guide for a quick ramp-up.
                        </div>
                    </div>

                    {/* RIGHT: cards + newsletter (client component handles animation & form) */}
                    <div className="md:col-span-5">
                        <HeroRight />
                    </div>
                </div>
            </div>
        </section>
    );
}
