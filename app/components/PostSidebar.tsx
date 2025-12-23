// components/PostSidebar.tsx
export default function PostSidebar() {
    return (
        <div className="space-y-6">
            {/* TOC placeholder */}
            <section className="border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    On this page
                </h3>
                <p className="text-sm text-gray-500">
                    Table of contents coming soon.
                </p>
            </section>

            {/* Sponsor / Ad */}
            <section className="border rounded-lg p-4 text-sm text-gray-600">
                <div className="font-medium mb-2">Sponsor</div>
                <div className="bg-gray-100 rounded h-40 flex items-center justify-center text-gray-400">
                    Ad / Promo
                </div>
            </section>
        </div>
    );
}
