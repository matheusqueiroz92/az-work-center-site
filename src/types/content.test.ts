import { describe, expect, it } from "vitest";

import { isPublishableCaseStudy } from "@/types/content";

describe("isPublishableCaseStudy", () => {
  it("só publica quando approved e published são verdadeiros", () => {
    expect(
      isPublishableCaseStudy({
        approved: true,
        published: true,
      }),
    ).toBe(true);
  });

  it("bloqueia projeto aprovado mas não publicado", () => {
    expect(
      isPublishableCaseStudy({
        approved: true,
        published: false,
      }),
    ).toBe(false);
  });

  it("bloqueia projeto publicado sem aprovação", () => {
    expect(
      isPublishableCaseStudy({
        approved: false,
        published: true,
      }),
    ).toBe(false);
  });
});
