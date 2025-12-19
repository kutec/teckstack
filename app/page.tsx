// app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestPosts from "@/components/LatestPosts";
import { getLatestPosts, getSiteOptions } from "@/lib/wp";

export default async function HomePage() {
  let featuredPostId: number | null = null;
  let posts: any[] = [];

  try {
    // Fetch site options once
    const optionsData = await getSiteOptions();
    if (optionsData?.featured?.id) {
      featuredPostId = Number(optionsData.featured.id);
    }
  } catch (err) {
    console.error("Failed to load site options:", err);
  }

  try {
    // Fetch latest posts and exclude featured
    posts = await getLatestPosts(
      6,
      featuredPostId ? [featuredPostId] : []
    );
  } catch (err) {
    console.error("Failed to load latest posts:", err);
    posts = [];
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Soft visual separation */}
        <div className="h-6 bg-white" />

        {/* Latest Posts */}
        <LatestPosts
          posts={posts}
          title="Latest posts"
          viewAllHref="/posts"
        />

        {/* Featured categories (static for now) */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-xl font-semibold mb-4">
              Featured categories
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["React", "JavaScript", "CSS", "Career"].map((c) => (
                <a
                  key={c}
                  href={`/categories/${c.toLowerCase()}`}
                  className="block bg-gray-50 border rounded p-4 text-center hover:shadow-sm transition"
                >
                  <div className="font-semibold">{c}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Guides & tutorials
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
