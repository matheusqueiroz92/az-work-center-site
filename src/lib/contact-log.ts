export const contactLogCodes = [
  "contact.delivery.failed",
  "contact.env.invalid",
] as const;

export type ContactLogCode = (typeof contactLogCodes)[number];

export const contactFailureCategories = [
  "timeout",
  "provider_error",
  "misconfigured",
  "rejected",
] as const;

export type ContactFailureCategory = (typeof contactFailureCategories)[number];

export const contactRuntimeEnvs = [
  "production",
  "preview",
  "development",
  "unknown",
] as const;

export type ContactRuntimeEnv = (typeof contactRuntimeEnvs)[number];

export type ContactOperationalLog = {
  code: ContactLogCode;
  vercelEnv: ContactRuntimeEnv;
  category: ContactFailureCategory;
  submissionId?: string;
};

export function resolveContactRuntimeEnv(
  value: string | undefined,
): ContactRuntimeEnv {
  if (
    value === "production" ||
    value === "preview" ||
    value === "development"
  ) {
    return value;
  }

  return "unknown";
}

export function logContactOperational(entry: ContactOperationalLog) {
  const payload: Record<string, string> = {
    code: entry.code,
    vercelEnv: entry.vercelEnv,
    category: entry.category,
  };

  if (entry.submissionId !== undefined) {
    payload.submissionId = entry.submissionId;
  }

  console.info(JSON.stringify(payload));
}
