import { solutionPages } from "@/content/solutions/catalog";
import {
  solutionSlugs,
  type ServicePreview,
  type SolutionPage,
  type SolutionSlug,
} from "@/types/content";

export function isSolutionSlug(value: string): value is SolutionSlug {
  return (solutionSlugs as readonly string[]).includes(value);
}

export function getSolutionBySlug(slug: string): SolutionPage | undefined {
  if (!isSolutionSlug(slug)) {
    return undefined;
  }

  return solutionPages[slug];
}

export function listSolutions(): readonly SolutionPage[] {
  return solutionSlugs.map((slug) => solutionPages[slug]);
}

export function toServicePreview(solution: SolutionPage): ServicePreview {
  return {
    slug: solution.slug,
    href: solution.href,
    title: solution.title,
    outcome: solution.preview.outcome,
    summary: solution.preview.summary,
    capabilities: solution.preview.capabilities,
  };
}

export function listRelatedSolutions(
  slugs: readonly SolutionSlug[],
): readonly SolutionPage[] {
  return slugs.flatMap((slug) => {
    const solution = getSolutionBySlug(slug);
    return solution ? [solution] : [];
  });
}
