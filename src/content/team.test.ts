import { describe, expect, it } from "vitest";

import { founders, foundersNote } from "@/content/team";

describe("founders", () => {
  it("apresenta somente Matheus e Lucas", () => {
    expect(founders.map((member) => member.name)).toEqual([
      "Matheus Queiroz",
      "Lucas Queiroz",
    ]);
  });

  it("não inclui foto, Gildásio ou cargo societário", () => {
    const serialized = `${JSON.stringify(founders)} ${foundersNote}`;

    expect(serialized).not.toMatch(/gildásio|gildasio/i);
    expect(serialized).not.toMatch(/sócio|ceo|cto|cmo/i);

    for (const member of founders) {
      expect("photo" in member).toBe(false);
    }
  });
});
