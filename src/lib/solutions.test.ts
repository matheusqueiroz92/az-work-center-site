import { describe, expect, it } from "vitest";

import {
  getSolutionBySlug,
  isSolutionSlug,
  listRelatedSolutions,
  listSolutions,
} from "@/lib/solutions";

describe("solutions helpers", () => {
  it("reconhece somente slugs aprovados", () => {
    expect(isSolutionSlug("web-growth")).toBe(true);
    expect(isSolutionSlug("nao-existe")).toBe(false);
    expect(getSolutionBySlug("nao-existe")).toBeUndefined();
    expect(getSolutionBySlug("web-growth")?.title).toBe(
      "Web e vendas digitais",
    );
    expect(getSolutionBySlug("produtos-digitais-mvp")?.title).toBe(
      "Produtos digitais",
    );
    expect(getSolutionBySlug("web-growth")?.href).toBe("/solucoes/web-growth");
    expect(getSolutionBySlug("produtos-digitais-mvp")?.href).toBe(
      "/solucoes/produtos-digitais-mvp",
    );
  });

  it("lista relações sem o slug atual", () => {
    const current = listSolutions()[0]!;
    const related = listRelatedSolutions(current.relatedSlugs);

    expect(related.map((item) => item.slug)).toEqual([...current.relatedSlugs]);
    expect(related.some((item) => item.slug === current.slug)).toBe(false);
  });
});
