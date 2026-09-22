import { z } from "zod";

const emailSchema = z.email();

export const contactDeliveryProviders = ["disabled", "resend"] as const;

export type ContactDeliveryProvider = (typeof contactDeliveryProviders)[number];

export type ContactEnvSource = {
  CONTACT_PROVIDER?: string | undefined;
  CONTACT_TO_EMAIL?: string | undefined;
  CONTACT_FROM_EMAIL?: string | undefined;
  RESEND_API_KEY?: string | undefined;
  VERCEL_ENV?: string | undefined;
};

export type ContactDeliveryEnv =
  | { status: "disabled"; provider: "disabled" }
  | {
      status: "ready";
      provider: "resend";
      toEmail: string;
      fromEmail: string;
      apiKey: string;
    }
  | { status: "unavailable"; provider: "resend" | "invalid" };

function trimOrUndefined(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function parseToEmail(value: string | undefined): string | undefined {
  const trimmed = trimOrUndefined(value);

  if (trimmed === undefined || trimmed.includes("\n")) {
    return undefined;
  }

  const parsed = emailSchema.safeParse(trimmed.toLowerCase());
  return parsed.success ? parsed.data : undefined;
}

function parseFromEmail(value: string | undefined): string | undefined {
  const trimmed = trimOrUndefined(value);

  if (trimmed === undefined || trimmed.includes("\n") || trimmed.length > 200) {
    return undefined;
  }

  const named = trimmed.match(/^(.+?)\s<([^<>]+)>$/);

  if (named) {
    const displayName = named[1]!.trim();
    const email = parseToEmail(named[2]);

    if (displayName === "" || email === undefined) {
      return undefined;
    }

    return `${displayName} <${email}>`;
  }

  return parseToEmail(trimmed);
}

function parseApiKey(value: string | undefined): string | undefined {
  const trimmed = trimOrUndefined(value);

  if (trimmed === undefined) {
    return undefined;
  }

  if (trimmed.length < 8 || trimmed.length > 256 || /\s/.test(trimmed)) {
    return undefined;
  }

  return trimmed;
}

export function parseContactDeliveryEnv(
  source: ContactEnvSource,
): ContactDeliveryEnv {
  const provider = trimOrUndefined(source.CONTACT_PROVIDER) ?? "disabled";

  if (provider === "disabled") {
    return { status: "disabled", provider: "disabled" };
  }

  if (provider !== "resend") {
    return { status: "unavailable", provider: "invalid" };
  }

  const toEmail = parseToEmail(source.CONTACT_TO_EMAIL);
  const fromEmail = parseFromEmail(source.CONTACT_FROM_EMAIL);
  const apiKey = parseApiKey(source.RESEND_API_KEY);

  if (
    toEmail === undefined ||
    fromEmail === undefined ||
    apiKey === undefined
  ) {
    return { status: "unavailable", provider: "resend" };
  }

  return {
    status: "ready",
    provider: "resend",
    toEmail,
    fromEmail,
    apiKey,
  };
}

export function readContactEnvSource(
  source: ContactEnvSource = {
    CONTACT_PROVIDER: process.env.CONTACT_PROVIDER,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
): ContactEnvSource {
  return source;
}
