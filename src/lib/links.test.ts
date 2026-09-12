import { describe, expect, it } from "vitest";

import { isInternalHref, mergeLinkRel } from "@/lib/links";

describe("isInternalHref", () => {
  it("reconhece caminhos internos do site", () => {
    expect(isInternalHref("/")).toBe(true);
    expect(isInternalHref("/contato")).toBe(true);
  });

  it("rejeita protocolos, protocol-relative e âncoras", () => {
    expect(isInternalHref("https://azworkcenter.com.br")).toBe(false);
    expect(isInternalHref("//cdn.exemplo.com")).toBe(false);
    expect(isInternalHref("#conteudo")).toBe(false);
    expect(isInternalHref("mailto:time@exemplo.com")).toBe(false);
  });
});

describe("mergeLinkRel", () => {
  it("não define rel quando não há nova aba nem valor extra", () => {
    expect(mergeLinkRel(false)).toBeUndefined();
  });

  it("inclui noopener e noreferrer na nova aba", () => {
    expect(mergeLinkRel(true)).toBe("noopener noreferrer");
  });

  it("preserva rel adicional sem duplicar tokens de segurança", () => {
    const merged = mergeLinkRel(true, "nofollow noreferrer");
    const tokens = merged?.split(" ") ?? [];

    expect(tokens).toContain("nofollow");
    expect(tokens).toContain("noopener");
    expect(tokens).toContain("noreferrer");
    expect(tokens).toEqual([...new Set(tokens)]);
  });
});
