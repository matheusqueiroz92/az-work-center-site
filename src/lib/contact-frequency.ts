import { hashContactOpaque } from "@/lib/contact-crypto";

export const contactFrequencyWindowMs = 10 * 60 * 1000;
export const contactFrequencyMaxAttempts = 8;
export const contactFrequencyMaxKeys = 256;

export type ContactFrequencyLimiter = {
  allow(key: string, now?: number): boolean;
  size(): number;
};

type FrequencyEntry = {
  count: number;
  resetAt: number;
};

export function createContactFrequencyLimiter(options?: {
  maxAttempts?: number;
  windowMs?: number;
  maxKeys?: number;
}): ContactFrequencyLimiter {
  const maxAttempts = options?.maxAttempts ?? contactFrequencyMaxAttempts;
  const windowMs = options?.windowMs ?? contactFrequencyWindowMs;
  const maxKeys = options?.maxKeys ?? contactFrequencyMaxKeys;
  const entries = new Map<string, FrequencyEntry>();

  function purgeExpired(now: number) {
    for (const [key, entry] of entries) {
      if (entry.resetAt <= now) {
        entries.delete(key);
      }
    }
  }

  function evictOldest() {
    let oldestKey: string | undefined;
    let oldestReset = Number.POSITIVE_INFINITY;

    for (const [key, entry] of entries) {
      if (entry.resetAt < oldestReset) {
        oldestReset = entry.resetAt;
        oldestKey = key;
      }
    }

    if (oldestKey !== undefined) {
      entries.delete(oldestKey);
    }
  }

  return {
    allow(key, now = Date.now()) {
      purgeExpired(now);

      const current = entries.get(key);

      if (current === undefined) {
        if (entries.size >= maxKeys) {
          evictOldest();
        }

        entries.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }

      if (current.count >= maxAttempts) {
        return false;
      }

      current.count += 1;
      return true;
    },
    size() {
      return entries.size;
    },
  };
}

export const contactFrequencyLimiter = createContactFrequencyLimiter();

const ipv4Pattern =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;
const ipv6Pattern = /^[0-9a-f:]{2,45}$/i;

export function readContactFrequencyKey(headerList: {
  get(name: string): string | null;
}): string | undefined {
  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded === null) {
    return undefined;
  }

  const candidate = forwarded.split(",")[0]?.trim();

  if (candidate === undefined || candidate === "" || candidate === "unknown") {
    return undefined;
  }

  if (!ipv4Pattern.test(candidate) && !ipv6Pattern.test(candidate)) {
    return undefined;
  }

  return hashContactOpaque(`contact-freq:${candidate}`);
}
