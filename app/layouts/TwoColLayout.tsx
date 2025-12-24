// components/TwoColLayout.tsx
import React from "react";

export default function TwoColLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
}) {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
                    {/* Main content */}
                    <article className="min-w-0">
                        {children}
                    </article>

                    {/* Sidebar */}
                    {sidebar ? (
                        <aside className="lg:sticky lg:top-24 space-y-6">
                            <div className="sticky top-24 space-y-6">
                                {sidebar}
                            </div>
                        </aside>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
