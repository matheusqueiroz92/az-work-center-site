import { describe, expect, it } from "vitest";

import { servicePreviews } from "@/content/services";
import { listSolutions, toServicePreview } from "@/lib/solutions";
import { solutionSlugs } from "@/types/content";

const forbidden =
  /óticas queiroz|m\.agendy|dentyvo|rebouças|em breve|%\s*de|\+300|líder|melhor empresa/i;

describe("solution pages", () => {
  it("expõe as quatro ofertas com composição e FAQ próprias", () => {
    const solutions = listSolutions();

    expect(solutions.map((solution) => solution.slug)).toEqual([
      ...solutionSlugs,
    ]);

    for (const solution of solutions) {
      expect(solution.intro.headline.length).toBeGreaterThan(20);
      expect(solution.symptoms.length).toBeGreaterThanOrEqual(3);
      expect(solution.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(solution.capabilities.length).toBeGreaterThanOrEqual(4);
      expect(solution.examples.length).toBeGreaterThanOrEqual(3);
      expect(solution.faqs.length).toBeGreaterThanOrEqual(3);
      expect(solution.relatedSlugs).not.toContain(solution.slug);
      expect(solution.preview.capabilities).toHaveLength(3);
    }

    const headlines = new Set(
      solutions.map((solution) => solution.intro.headline),
    );
    expect(headlines.size).toBe(solutions.length);
  });

  it("mantém os previews da Home alinhados às páginas", () => {
    expect(servicePreviews).toEqual(listSolutions().map(toServicePreview));
    expect(servicePreviews.map((service) => service.href)).toEqual([
      "/solucoes/sistemas-sob-medida",
      "/solucoes/automacao-inteligencia-artificial",
      "/solucoes/produtos-digitais-mvp",
      "/solucoes/web-growth",
    ]);
  });

  it("não publica cases, métricas nem dados empresariais fictícios", () => {
    for (const solution of listSolutions()) {
      const text = JSON.stringify(solution);
      expect(text).not.toMatch(forbidden);
      expect(text).not.toMatch(/cnpj|\(\d{2}\)\s*\d/i);
      expect(text).not.toMatch(/@azworkcenter|mailto:/i);
      expect(solution.seo.title).not.toBe(solution.seo.description);
    }
  });
});
