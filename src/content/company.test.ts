import { describe, expect, it } from "vitest";

import { company } from "@/content/company";

describe("company", () => {
  it("expõe somente o nome e o descritor já aprovados", () => {
    expect(company).toEqual({
      name: "AZ Work Center",
      descriptor: "Tecnologia & Growth",
    });
  });

  it("não inclui dados empresariais ainda não confirmados", () => {
    expect(company).not.toHaveProperty("email");
    expect(company).not.toHaveProperty("phone");
    expect(company).not.toHaveProperty("address");
    expect(company).not.toHaveProperty("cnpj");
  });
});
