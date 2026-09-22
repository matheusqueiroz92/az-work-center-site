import { z } from "zod";

import type { ContactEnvSource } from "@/lib/contact-env";

export type EnvSource = {
  SITE_URL?: string | undefined;
  ALLOW_INDEXING?: string | undefined;
  VERCEL_ENV?: string | undefined;
} & ContactEnvSource;

export {
  parseContactDeliveryEnv,
  readContactEnvSource,
  type ContactDeliveryEnv,
  type ContactDeliveryProvider,
  type ContactEnvSource,
} from "@/lib/contact-env";

function emptyToUndefined(value: unknown) {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
}

const optionalText = z.preprocess(emptyToUndefined, z.string().optional());

const envSchema = z.object({
  SITE_URL: optionalText,
  ALLOW_INDEXING: optionalText,
  VERCEL_ENV: z.preprocess(
    emptyToUndefined,
    z.enum(["production", "preview", "development"]).optional(),
  ),
});

const siteUrlSchema = z.string().url();

export type ParsedEnv = {
  siteUrl: URL;
  allowIndexingFlag: string | undefined;
  vercelEnv: "production" | "preview" | "development" | undefined;
};

export function parseSiteUrl(value: string | undefined): URL | undefined {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  const parsed = siteUrlSchema.safeParse(value);

  if (!parsed.success) {
    throw new Error("SITE_URL deve ser uma URL válida.");
  }

  return new URL(parsed.data);
}

export function resolveSiteUrl(input: {
  siteUrl?: string | undefined;
  vercelEnv?: string | undefined;
}): URL {
  const parsed = parseSiteUrl(input.siteUrl);

  if (parsed) {
    return parsed;
  }

  if (input.vercelEnv === "production") {
    throw new Error("SITE_URL é obrigatória na produção da Vercel.");
  }

  return new URL("http://localhost:3000");
}

function readProcessEnv(): EnvSource {
  return {
    SITE_URL: process.env.SITE_URL,
    ALLOW_INDEXING: process.env.ALLOW_INDEXING,
    VERCEL_ENV: process.env.VERCEL_ENV,
    CONTACT_PROVIDER: process.env.CONTACT_PROVIDER,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  };
}

export function parseEnv(source: EnvSource = readProcessEnv()): ParsedEnv {
  const parsed = envSchema.parse({
    SITE_URL: source.SITE_URL,
    ALLOW_INDEXING: source.ALLOW_INDEXING,
    VERCEL_ENV: source.VERCEL_ENV,
  });

  return {
    siteUrl: resolveSiteUrl({
      siteUrl: parsed.SITE_URL,
      vercelEnv: parsed.VERCEL_ENV,
    }),
    allowIndexingFlag: parsed.ALLOW_INDEXING,
    vercelEnv: parsed.VERCEL_ENV,
  };
}

export function resolveSiteUrlFromEnv(
  source: EnvSource = readProcessEnv(),
): URL {
  return parseEnv(source).siteUrl;
}
