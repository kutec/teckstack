import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-blue-600 text-white">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <div className="font-bold text-xl">TeckStack</div>

                <nav className="hidden md:flex gap-6 text-sm">
                    <Link href="/" className="hover:text-gray-200">Home</Link>
                    <Link href="/start-here" className="hover:text-gray-200">Start Here</Link>
                    <Link href="/blog" className="hover:text-gray-200">Blog</Link>
                    <Link href="/categories" className="hover:text-gray-200">Categories</Link>
                    <Link href="/guides" className="hover:text-gray-200">Guides</Link>
                    <Link href="/resources" className="hover:text-gray-200">Resources</Link>
                </nav>
            </div>
        </header>
    );
}
