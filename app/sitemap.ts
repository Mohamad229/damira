import type { MetadataRoute } from "next";

import { getPublishedProductSlugs } from "@/lib/actions/public-products";
import { defaultLocale, locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/seo";

const PUBLIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/products",
  "/quality",
  "/partnerships",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl().toString().replace(/\/$/, "");
  const products = await getPublishedProductSlugs();

  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addUrl = (entry: MetadataRoute.Sitemap[number]) => {
    if (seen.has(entry.url)) {
      return;
    }

    seen.add(entry.url);
    urls.push(entry);
  };

  for (const locale of locales) {
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

    for (const path of PUBLIC_ROUTES) {
      addUrl({
        url: `${baseUrl}${localePrefix}${path || "/"}`,
        lastModified: now,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.85,
      });
    }

    for (const product of products) {
      addUrl({
        url: `${baseUrl}${localePrefix}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }
  }

  return urls;
}
