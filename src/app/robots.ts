import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.siteUrl && { sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).href }),
  };
}
