import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

/** Sitemaps need absolute URLs, so the list stays empty until SITE_URL is set. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.siteUrl) return [];
  return [{ url: siteConfig.siteUrl.href, changeFrequency: "weekly", priority: 1 }];
}
