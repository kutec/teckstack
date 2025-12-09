import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Featured Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "React JS", icon: "/react.png" },
            { title: "JavaScript", icon: "/javascript.png" },
            { title: "CSS3", icon: "/css.png" },
            { title: "HTML5", icon: "/html.png" },
          ].map((cat) => (
            <div
              key={cat.title}
              className="bg-white p-6 rounded shadow text-center"
            >
              <Image
                src={cat.icon}
                alt={cat.title}
                className="h-20 mx-auto mb-4"
                width={200}
                height={200}
              />
              <p className="font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
