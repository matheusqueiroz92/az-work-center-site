import { describe, expect, it } from "vitest";

import { servicePreviews } from "@/content/services";

describe("servicePreviews", () => {
  it("expõe quatro soluções com exatamente três capacidades", () => {
    expect(servicePreviews).toHaveLength(4);

    for (const service of servicePreviews) {
      expect(service.capabilities).toHaveLength(3);
      expect(service.href).toBe(`/solucoes/${service.slug}`);
    }
  });

  it("mantém os slugs e destinos aprovados", () => {
    expect(servicePreviews.map((service) => service.href)).toEqual([
      "/solucoes/sistemas-sob-medida",
      "/solucoes/automacao-inteligencia-artificial",
      "/solucoes/produtos-digitais-mvp",
      "/solucoes/web-growth",
    ]);
  });
});
