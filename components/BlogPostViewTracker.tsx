"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function BlogPostViewTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    trackEvent("blog_post_viewed", { slug, title });
  }, [slug, title]);
  return null;
}
