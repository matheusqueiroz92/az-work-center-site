import { describe, expect, it } from "vitest";

import {
  createContactFrequencyLimiter,
  readContactFrequencyKey,
} from "@/lib/contact-frequency";

describe("createContactFrequencyLimiter", () => {
  it("limita tentativas na janela e expira depois do TTL", () => {
    const limiter = createContactFrequencyLimiter({
      maxAttempts: 2,
      windowMs: 100,
      maxKeys: 8,
    });

    expect(limiter.allow("aaa", 1_000)).toBe(true);
    expect(limiter.allow("aaa", 1_010)).toBe(true);
    expect(limiter.allow("aaa", 1_020)).toBe(false);
    expect(limiter.allow("aaa", 1_200)).toBe(true);
  });

  it("não cresce sem limite e não guarda IP bruto", () => {
    const limiter = createContactFrequencyLimiter({
      maxAttempts: 1,
      windowMs: 60_000,
      maxKeys: 2,
    });

    expect(limiter.allow("hashed-a", 1_000)).toBe(true);
    expect(limiter.allow("hashed-b", 1_000)).toBe(true);
    expect(limiter.allow("hashed-c", 1_000)).toBe(true);
    expect(limiter.size()).toBeLessThanOrEqual(2);
    expect(JSON.stringify(limiter)).not.toMatch(/\d{1,3}(?:\.\d{1,3}){3}/);
  });
});

describe("readContactFrequencyKey", () => {
  it("hasheia o primeiro IP confiável e não usa bucket global", () => {
    const hashed = readContactFrequencyKey({
      get: (name) =>
        name === "x-forwarded-for" ? "203.0.113.10, 127.0.0.1" : null,
    });
    const missing = readContactFrequencyKey({
      get: () => null,
    });
    const unknown = readContactFrequencyKey({
      get: () => "unknown",
    });

    expect(hashed).toMatch(/^[a-f0-9]{64}$/);
    expect(hashed).not.toContain("203.0.113.10");
    expect(missing).toBeUndefined();
    expect(unknown).toBeUndefined();
  });
});
