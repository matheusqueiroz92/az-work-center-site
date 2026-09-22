import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  durationDeliberateMs,
  durationDeliberateSeconds,
  easeEmphasized,
  panelShiftY,
  panelSpring,
} from "@/lib/motion-tokens";

const tokens = JSON.parse(
  readFileSync(join(process.cwd(), "design-system/tokens.json"), "utf8"),
) as {
  motion: {
    duration: { deliberate: { $value: string } };
    easing: { emphasized: { $value: number[] } };
  };
};

describe("motion-tokens", () => {
  it("espelha a duração deliberate de tokens.json em ms e segundos", () => {
    expect(tokens.motion.duration.deliberate.$value).toBe("650ms");
    expect(durationDeliberateMs).toBe(650);
    expect(durationDeliberateSeconds).toBe(0.65);
    expect(durationDeliberateSeconds).toBe(durationDeliberateMs / 1000);
  });

  it("espelha o easing emphasized de tokens.json", () => {
    expect(tokens.motion.easing.emphasized.$value).toEqual([0.16, 1, 0.3, 1]);
    expect(easeEmphasized).toEqual(tokens.motion.easing.emphasized.$value);
  });

  it("usa o spring de painel documentado em docs/05", () => {
    expect(panelSpring).toEqual({
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
    expect(panelShiftY).toBeGreaterThanOrEqual(12);
    expect(panelShiftY).toBeLessThanOrEqual(20);
  });
});
