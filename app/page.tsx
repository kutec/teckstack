// app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import { getLatestPosts } from "@/lib/wp";

export default async function HomePage() {
  const posts = await getLatestPosts(6).catch((err) => {
    console.error("Failed to load latest posts:", err);
    return [];
  });

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Latest posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts && posts.length > 0 ? (
              posts.map((p: any) => <PostCard key={p.id} post={p} />)
            ) : (
              // fallback when no posts
              <>
                <div className="p-6 bg-white rounded shadow">No posts yet — publish one from WP!</div>
              </>
            )}
          </div>
        </section>

        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-xl font-semibold mb-4">Featured categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["React", "JavaScript", "CSS", "Career"].map((c) => (
                <a key={c} className="block bg-white border rounded p-4 text-center hover:shadow" href={`/categories/${c.toLowerCase()}`}>
                  <div className="font-semibold">{c}</div>
                  <div className="text-sm text-gray-500 mt-1">Guides & tutorials</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
