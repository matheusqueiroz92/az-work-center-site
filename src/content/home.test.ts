import { describe, expect, it } from "vitest";

import {
  homeCta,
  homeEngagement,
  homeHero,
  homeMethod,
  homeProblems,
  homeSectionIds,
  homeTrust,
} from "@/content/home";

describe("home copy", () => {
  it("mantém a ordem e os IDs aprovados", () => {
    expect(homeSectionIds).toEqual([
      "conteudo",
      "problemas",
      "solucoes",
      "metodo",
      "capacidades",
      "equipe",
      "faq",
      "diagnostico",
    ]);
    expect(homeSectionIds).not.toContain("projetos");
  });

  it("preserva a headline, os CTAs e as contagens de conteúdo", () => {
    expect(homeHero.title).toBe(
      "Tecnologia que elimina gargalos e acelera empresas.",
    );
    expect(homeHero.primaryCta.href).toBe("/contato");
    expect(homeHero.secondaryCta.href).toBe("/solucoes");
    expect(homeProblems.items).toHaveLength(5);
    expect(homeMethod.steps).toHaveLength(4);
    expect(homeEngagement.modes).toHaveLength(4);
    expect(homeTrust.items).toHaveLength(6);
    expect(homeCta.action.href).toBe("/contato");
  });

  it("não usa linguagem de placeholder ou prova não aprovada", () => {
    const serialized = JSON.stringify({
      homeHero,
      homeProblems,
      homeMethod,
      homeEngagement,
      homeTrust,
      homeCta,
    });

    expect(serialized).not.toMatch(/em breve|provisório|placeholder|lorem/i);
    expect(serialized).not.toMatch(/líder|referência|premiada/i);
    expect(serialized).not.toMatch(/%|\+300|depoimento/i);
    expect(serialized).not.toMatch(
      /óticas queiroz|m\.agendy|dentyvo|rebouças/i,
    );
  });
});
