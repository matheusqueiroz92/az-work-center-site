import { describe, expect, it } from "vitest";

import { parseEnv, parseSiteUrl, resolveSiteUrl } from "@/lib/env";

describe("parseSiteUrl", () => {
  it("aceita uma URL válida", () => {
    expect(parseSiteUrl("https://exemplo.com")?.toString()).toBe(
      "https://exemplo.com/",
    );
  });

  it("trata valor vazio como ausente", () => {
    expect(parseSiteUrl("")).toBeUndefined();
    expect(parseSiteUrl("   ")).toBeUndefined();
    expect(parseSiteUrl(undefined)).toBeUndefined();
  });

  it("rejeita valor que não é URL", () => {
    expect(() => parseSiteUrl("azworkcenter")).toThrow(
      "SITE_URL deve ser uma URL válida.",
    );
  });
});

describe("resolveSiteUrl", () => {
  it("usa localhost em desenvolvimento quando SITE_URL não foi informada", () => {
    expect(
      resolveSiteUrl({
        siteUrl: undefined,
        vercelEnv: undefined,
      }).toString(),
    ).toBe("http://localhost:3000/");
  });

  it("exige SITE_URL na produção da Vercel", () => {
    expect(() =>
      resolveSiteUrl({
        siteUrl: undefined,
        vercelEnv: "production",
      }),
    ).toThrow("SITE_URL é obrigatória na produção da Vercel.");
  });
});

describe("parseEnv", () => {
  it("faz parsing explícito de ALLOW_INDEXING sem coerção Boolean", () => {
    const parsed = parseEnv({
      ALLOW_INDEXING: "false",
    });

    expect(parsed.allowIndexingFlag).toBe("false");
    expect(Boolean(parsed.allowIndexingFlag)).toBe(true);
  });

  it("permite build local sem SITE_URL", () => {
    const parsed = parseEnv({});

    expect(parsed.siteUrl.toString()).toBe("http://localhost:3000/");
    expect(parsed.vercelEnv).toBeUndefined();
  });
});
