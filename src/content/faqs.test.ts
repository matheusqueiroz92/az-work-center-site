import { describe, expect, it } from "vitest";

import { homeFaqs } from "@/content/faqs";

describe("homeFaqs", () => {
  it("mantém as sete perguntas aprovadas", () => {
    expect(homeFaqs).toHaveLength(7);
    expect(homeFaqs.map((item) => item.question)).toEqual([
      "Vocês atendem apenas Vitória da Conquista?",
      "Quanto custa desenvolver um sistema?",
      "Quanto tempo leva um projeto?",
      "Vocês dão suporte depois da entrega?",
      "Trabalham com projetos já iniciados?",
      "Como identifico o que pode ser automatizado?",
      "Vocês desenvolvem MVPs para novas ideias?",
    ]);
  });

  it("não publica preço, prazo ou substituição integral por IA", () => {
    const answers = homeFaqs.map((item) => item.answer).join(" ");

    expect(answers).not.toMatch(/R\$|\d+\s*reais\b/i);
    expect(answers).not.toMatch(/sempre em \d+ (dias|semanas|meses)/i);
    expect(answers).not.toMatch(/substitui(r)? (integralmente )?pessoas/i);
  });
});
