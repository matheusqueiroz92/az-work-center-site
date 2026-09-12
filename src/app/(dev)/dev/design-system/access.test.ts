import { describe, expect, it } from "vitest";

import { isDesignSystemRouteEnabled } from "./access";

describe("isDesignSystemRouteEnabled", () => {
  it("bloqueia a rota em produção da Vercel", () => {
    expect(isDesignSystemRouteEnabled("production")).toBe(false);
  });

  it("libera local e preview", () => {
    expect(isDesignSystemRouteEnabled(undefined)).toBe(true);
    expect(isDesignSystemRouteEnabled("preview")).toBe(true);
    expect(isDesignSystemRouteEnabled("development")).toBe(true);
  });
});
