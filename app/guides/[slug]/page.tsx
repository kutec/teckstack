import Header from "@/components/Header";
import { getGuideBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <Header />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: guide.title.rendered }}
        />

        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: guide.content.rendered }}
        />
      </article>

    </>
  );
}
