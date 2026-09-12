import type { MetadataRoute } from "next";

import { resolveSiteUrlFromEnv } from "@/lib/env";
import { allowIndexing, readIndexingEnv } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing(readIndexingEnv())) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", resolveSiteUrlFromEnv()).toString(),
  };
}
