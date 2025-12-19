// components/PostCardSkeleton.tsx
export default function PostCardSkeleton() {
    return (
        <article className="bg-white rounded-lg border overflow-hidden animate-pulse">
            <div className="h-44 bg-gray-200" />

            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />

                <div className="flex justify-between items-center pt-2">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-12" />
                </div>
            </div>
        </article>
    );
}
