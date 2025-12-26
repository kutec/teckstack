import { getGuides } from '@/lib/wp';
import Link from 'next/link';

export default async function GuidesPage() {
    const guides = await getGuides(20);

    return (
        <>
            <section className="max-w-8xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6">Guides</h1>

                <div className="grid gap-6">
                    {guides.map((g: any) => (
                        <Link key={g.id} href={`/guides/${g.slug}`} className="block p-4 border rounded hover:shadow">
                            <h2 className="font-semibold" dangerouslySetInnerHTML={{ __html: g.title.rendered }} />

                            {g.excerpt?.rendered && (
                                <div
                                    className="text-sm text-gray-600 mt-2"
                                    dangerouslySetInnerHTML={{ __html: g.excerpt.rendered }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
