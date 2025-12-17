// components/Pagination.tsx
import Link from "next/link";

export default function Pagination({
    currentPage,
    basePath,
    hasNext = true,
}: {
    currentPage: number;
    basePath: string;
    hasNext?: boolean;
}) {
    const prevPage =
        currentPage > 1
            ? currentPage === 2
                ? basePath
                : `${basePath}/page/${currentPage - 1}`
            : null;

    const nextPage = hasNext
        ? `${basePath}/page/${currentPage + 1}`
        : null;

    return (
        <nav
            className="flex items-center justify-center gap-6 mt-12 text-sm"
            aria-label="Pagination"
        >
            {/* Previous */}
            {prevPage ? (
                <Link
                    href={prevPage}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    ← Previous
                </Link>
            ) : (
                <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    ← Previous
                </span>
            )}

            {/* Page indicator */}
            <span className="text-gray-600">
                Page <strong>{currentPage}</strong>
            </span>

            {/* Next */}
            {nextPage ? (
                <Link
                    href={nextPage}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Next →
                </Link>
            ) : (
                <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    Next →
                </span>
            )}
        </nav>
    );
}
