import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("não trata a escala tipográfica semântica como cor", () => {
    const merged = cn("text-primary-foreground", "text-body");

    expect(merged).toContain("text-primary-foreground");
    expect(merged).toContain("text-body");
  });
});
