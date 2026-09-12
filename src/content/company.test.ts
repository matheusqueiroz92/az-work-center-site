import { describe, expect, it } from "vitest";

import { company } from "@/content/company";

describe("company", () => {
  it("expõe somente dados institucionais já aprovados", () => {
    expect(company).toEqual({
      name: "AZ Work Center",
      descriptor: "Tecnologia & Growth",
      tagline: "Tecnologia para operar melhor. Estratégia para crescer.",
      regionLabel: "Vitória da Conquista — Bahia",
    });
  });

  it("não inclui dados empresariais ainda não confirmados", () => {
    expect(company).not.toHaveProperty("email");
    expect(company).not.toHaveProperty("phone");
    expect(company).not.toHaveProperty("address");
    expect(company).not.toHaveProperty("cnpj");
  });
});
