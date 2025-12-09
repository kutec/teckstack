// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        {/* Clean, readable headings */}
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                            Smarter <span className="text-blue-600">Tech Learning</span> <br />
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

                    {/* Right column: simple cards, lightly styled */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Featured</div>
                                <div className="mt-2 font-semibold">React Hooks Cheat Sheet</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Guide</div>
                                <div className="mt-2 font-semibold">Write Better Components</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center col-span-2">
                            <div className="text-center">
                                <div className="text-xs text-gray-500">Newsletter</div>
                                <div className="mt-2 font-semibold">Join TeckStack Weekly</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
