import TableOfContents from './TableOfContents';

export default function PostSidebar() {
    return (
        <div className="space-y-6">
            {/* TOC */}
            <section className="border rounded-lg p-4 bg-white">
                <TableOfContents />
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
