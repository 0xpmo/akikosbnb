import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Served at /sitemap.xml. Without it, Google has to discover every page by
 * crawling links; with it, all eight URLs are submitted up front and can be
 * tracked individually in Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/hale-aloha", priority: 0.9, changeFrequency: "monthly" },
    { path: "/puuhonua-house", priority: 0.9, changeFrequency: "monthly" },
    { path: "/mango-tree", priority: 0.9, changeFrequency: "monthly" },
    { path: "/banana-patch", priority: 0.9, changeFrequency: "monthly" },
    { path: "/facilities", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
