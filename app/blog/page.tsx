export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/sanity";
import { trainerConfig } from "@/lib/getConfig";

export const metadata: Metadata = {
  title: "Blog",
  description: `Artículos y tips de entrenamiento por ${trainerConfig.name}.`,
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--secondary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4">Blog</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tips, rutinas y contenido para tu entrenamiento
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--secondary)]/70">Próximamente habrá contenido aquí.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id}>
                  <Link href={`/blog/${post.slug || post._id}`} className="block group">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--secondary)]/10 flex items-center justify-center">
                          <span className="font-display text-4xl text-[var(--secondary)]/30">?</span>
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-[var(--primary)] text-[var(--secondary)] text-xs font-display uppercase">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-2xl mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {post.title}
                    </h2>
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-[var(--secondary)]/60"
                      >
                        {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    {post.excerpt && (
                      <p className="mt-2 text-[var(--secondary)]/80 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
