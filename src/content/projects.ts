import type { CaseStudy } from "@/types/content";
import { isPublishableCaseStudy } from "@/types/content";

export const projects = [] as const satisfies readonly CaseStudy[];

export function getPublishedProjects(
  list: readonly CaseStudy[] = projects,
): CaseStudy[] {
  return list.filter(isPublishableCaseStudy);
}
