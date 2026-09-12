import { describe, expect, it } from "vitest";

import {
  allowIndexing,
  getRobotsDirective,
  parseAllowIndexing,
} from "@/lib/seo";

describe("parseAllowIndexing", () => {
  it("aceita somente o valor textual true", () => {
    expect(parseAllowIndexing("true")).toBe(true);
  });

  it("não trata false, 1, TRUE ou vazio como verdadeiro", () => {
    expect(parseAllowIndexing("false")).toBe(false);
    expect(parseAllowIndexing("1")).toBe(false);
    expect(parseAllowIndexing("TRUE")).toBe(false);
    expect(parseAllowIndexing("")).toBe(false);
    expect(parseAllowIndexing(undefined)).toBe(false);
  });
});

describe("allowIndexing", () => {
  it("só libera indexação em produção da Vercel com ALLOW_INDEXING=true", () => {
    expect(
      allowIndexing({
        vercelEnv: "production",
        allowIndexing: "true",
      }),
    ).toBe(true);
  });

  it("bloqueia desenvolvimento local mesmo com NODE_ENV implícito de build", () => {
    expect(
      allowIndexing({
        vercelEnv: undefined,
        allowIndexing: "true",
      }),
    ).toBe(false);
  });

  it("bloqueia preview da Vercel mesmo com a flag ligada", () => {
    expect(
      allowIndexing({
        vercelEnv: "preview",
        allowIndexing: "true",
      }),
    ).toBe(false);
  });

  it("bloqueia produção quando a flag não é exatamente true", () => {
    expect(
      allowIndexing({
        vercelEnv: "production",
        allowIndexing: "false",
      }),
    ).toBe(false);
    expect(
      allowIndexing({
        vercelEnv: "production",
        allowIndexing: undefined,
      }),
    ).toBe(false);
  });
});

describe("getRobotsDirective", () => {
  it("usa noindex e nofollow fora da condição de liberação", () => {
    expect(
      getRobotsDirective({
        vercelEnv: "preview",
        allowIndexing: "true",
      }),
    ).toEqual({ index: false, follow: false });
  });

  it("permite index e follow somente quando as duas condições são verdadeiras", () => {
    expect(
      getRobotsDirective({
        vercelEnv: "production",
        allowIndexing: "true",
      }),
    ).toEqual({ index: true, follow: true });
  });
});
