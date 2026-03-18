import { MetadataRoute } from "next";
import { trainerConfig } from "@/lib/getConfig";
import { getPosts } from "@/lib/sanity";

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL) ||
  trainerConfig.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts().catch(() => []);

  const staticPages: MetadataRoute.Sitemap = [
    // /demo excluido intencionalmente (noindex)
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/planes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/politica-privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const postPages: MetadataRoute.Sitemap = (posts || [])
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...postPages];
}
