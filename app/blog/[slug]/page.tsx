import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { BlogPostViewTracker } from "@/components/BlogPostViewTracker";
import { HarbizCTA } from "@/components/HarbizCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post no encontrado" };
  return {
    title: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <BlogPostViewTracker slug={slug} title={post.title} />
      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-block text-[var(--primary)] hover:underline mb-8"
          >
            ← Volver al blog
          </Link>
          {post.coverImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          {post.category && (
            <span className="inline-block px-3 py-1 bg-[var(--primary)] text-[var(--secondary)] text-sm font-display uppercase mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="block text-[var(--secondary)]/60 mb-8"
            >
              {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
          {post.body && (
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-[var(--primary)]">
              <PortableText value={post.body as import("@portabletext/react").PortableTextBlock[]} />
            </div>
          )}
          <div className="mt-16 p-8 rounded-2xl bg-[var(--secondary)] text-white text-center">
            <span className="font-display text-2xl block mb-4">
              ¿Listo para empezar?
            </span>
            <HarbizCTA
              location="blog_post"
              slug={slug}
              className="inline-block px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold uppercase hover:opacity-90 transition-opacity"
            >
              Reservar en Harbiz
            </HarbizCTA>
          </div>
        </div>
      </article>
    </>
  );
}
