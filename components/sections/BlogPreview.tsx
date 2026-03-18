"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <motion.h2
            id="blog-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl"
          >
            Blog
          </motion.h2>
          <Link
            href="/blog"
            className="text-[var(--primary)] hover:underline font-display text-lg"
          >
            Ver todos los artículos →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {displayPosts.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug || post._id}`}
                className="block group"
              >
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
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <span className="font-display text-4xl text-white/30">
                        ?
                      </span>
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-[var(--primary)] text-[var(--secondary)] text-xs font-display uppercase">
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h3>
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm text-white/60"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
                {post.excerpt && (
                  <p className="mt-2 text-white/80 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
