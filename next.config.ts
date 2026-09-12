import type { NextConfig } from "next";

import { allowIndexing, readIndexingEnv } from "./src/lib/seo";

const indexingAllowed = allowIndexing(readIndexingEnv());

const nextConfig: NextConfig = {
  async headers() {
    if (indexingAllowed) {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
