import { solutionSlugs, type SolutionSlug } from "@/types/content";

export const serviceStoryItemSelector = "[data-service-story-item]";

const readingBandMargin = "-32% 0px -48% 0px";

export function isSolutionStorySlug(
  value: string | null,
): value is SolutionSlug {
  return value !== null && (solutionSlugs as readonly string[]).includes(value);
}

export function collectServiceStoryItems(root: ParentNode): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(serviceStoryItemSelector)];
}

export function resolveActiveServiceSlug(items: readonly HTMLElement[]) {
  if (items.length === 0) {
    return null;
  }

  const readingLine = window.innerHeight * 0.4;
  let closest: { slug: SolutionSlug; distance: number } | null = null;

  for (const item of items) {
    const slug = item.getAttribute("data-service-story-item");
    if (!isSolutionStorySlug(slug)) {
      continue;
    }

    const rect = item.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const distance = Math.abs(midpoint - readingLine);

    if (!closest || distance < closest.distance) {
      closest = { slug, distance };
    }
  }

  return closest?.slug ?? null;
}

export function observeServiceStoryItems(
  items: readonly HTMLElement[],
  onActiveChange: (slug: SolutionSlug) => void,
) {
  const ratios = new Map<SolutionSlug, number>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const slug = entry.target.getAttribute("data-service-story-item");
        if (!isSolutionStorySlug(slug)) {
          continue;
        }

        ratios.set(slug, entry.isIntersecting ? entry.intersectionRatio : 0);
      }

      const ranked = [...ratios.entries()]
        .filter(([, ratio]) => ratio > 0)
        .toSorted((left, right) => right[1] - left[1]);

      if (ranked[0]) {
        onActiveChange(ranked[0][0]);
        return;
      }

      const fallback = resolveActiveServiceSlug(items);
      if (fallback) {
        onActiveChange(fallback);
      }
    },
    {
      root: null,
      rootMargin: readingBandMargin,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  );

  for (const item of items) {
    observer.observe(item);
  }

  return () => observer.disconnect();
}
