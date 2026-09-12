import type { Metadata } from "next";

import { company } from "@/content/company";
import { resolveSiteUrlFromEnv } from "@/lib/env";
import { getRobotsDirective, readIndexingEnv } from "@/lib/seo";

export function createRootMetadata(): Metadata {
  return {
    metadataBase: resolveSiteUrlFromEnv(),
    title: {
      default: company.name,
      template: `%s | ${company.name}`,
    },
    description: `${company.name}. ${company.descriptor}. Novo site em desenvolvimento.`,
    robots: getRobotsDirective(readIndexingEnv()),
  };
}
