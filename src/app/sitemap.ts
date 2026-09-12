import type { MetadataRoute } from "next";

import { resolveSiteUrlFromEnv } from "@/lib/env";
import { allowIndexing, readIndexingEnv } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing(readIndexingEnv())) {
    return [];
  }

  return [
    {
      url: new URL("/", resolveSiteUrlFromEnv()).toString(),
    },
  ];
}
