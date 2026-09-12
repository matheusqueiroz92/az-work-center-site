import type { Metadata } from "next";

import { company } from "@/content/company";
import { resolveSiteUrlFromEnv } from "@/lib/env";
import { getRobotsDirective, readIndexingEnv } from "@/lib/seo";

export const siteDescription =
  "Sistemas sob medida, automações com IA e estruturas digitais para empresas de Vitória da Conquista e região.";

export const homeTitle = `${company.name} | ${company.descriptor}`;

export function createRootMetadata(): Metadata {
  return {
    metadataBase: resolveSiteUrlFromEnv(),
    title: {
      default: company.name,
      template: `%s | ${company.name}`,
    },
    description: siteDescription,
    robots: getRobotsDirective(readIndexingEnv()),
  };
}

export function createHomeMetadata(): Metadata {
  return {
    title: {
      absolute: homeTitle,
    },
    description: siteDescription,
  };
}

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return { title, description };
}

export function createUnpublishedMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}
