export default function Hero() {
    return (
        <section className="bg-gray-100 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
                Smarter <span className="text-blue-600">Tech Learning</span> for Modern Developers
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
                Frontend, ReactJS, JavaScript & DSA — simplified with clarity.
            </p>

            <div className="flex justify-center gap-4 mt-8">
                <a href="/start-here" className="px-6 py-3 bg-blue-600 text-white rounded">
                    Start Here
                </a>
                <a href="/newsletter" className="px-6 py-3 border rounded">
                    Join TeckStack Weekly
                </a>
            </div>
        </section>
    );
}
