import { z } from "zod";

import { contactNeedKinds, type ContactNeedKind } from "@/content/contact";
import {
  contactAttemptField,
  contactFieldErrorMessages,
  contactFieldLimits,
  contactFields,
  contactGenericFormError,
  contactHoneypotField,
  contactMinElapsedMs,
  contactStartedAtField,
  type ContactField,
} from "@/lib/contact-fields";

export {
  contactAttemptField,
  contactFieldErrorMessages,
  contactFieldLimits,
  contactFields,
  contactGenericFormError,
  contactHoneypotField,
  contactMinElapsedMs,
  contactStartedAtField,
  type ContactField,
};

const phonePattern = /^\+?[0-9]{10,15}$/;

export type ContactLead = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  need: ContactNeedKind;
  message: string;
};

export type ContactFormCandidate = {
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  companyWebsite: string;
  startedAt: string;
  attemptId: string;
};

export type ContactFormParseResult =
  | { ok: true; candidate: ContactFormCandidate }
  | { ok: false; formError: string };

function readSingleText(formData: FormData, name: string): string | null {
  const values = formData.getAll(name);

  if (values.length === 0) {
    return "";
  }

  if (values.length > 1) {
    return null;
  }

  const value = values[0];

  if (typeof value !== "string") {
    return null;
  }

  if (value.length > contactFieldLimits.raw) {
    return null;
  }

  return value;
}

export function parseContactFormData(
  formData: FormData,
): ContactFormParseResult {
  const name = readSingleText(formData, "name");
  const company = readSingleText(formData, "company");
  const email = readSingleText(formData, "email");
  const phone = readSingleText(formData, "phone");
  const need = readSingleText(formData, "need");
  const message = readSingleText(formData, "message");
  const companyWebsite = readSingleText(formData, contactHoneypotField);
  const startedAt = readSingleText(formData, contactStartedAtField);
  const attemptId = readSingleText(formData, contactAttemptField);

  if (
    name === null ||
    company === null ||
    email === null ||
    phone === null ||
    need === null ||
    message === null ||
    companyWebsite === null ||
    startedAt === null ||
    attemptId === null
  ) {
    return { ok: false, formError: contactGenericFormError };
  }

  return {
    ok: true,
    candidate: {
      name,
      company,
      email,
      phone,
      need,
      message,
      companyWebsite,
      startedAt,
      attemptId,
    },
  };
}

export function normalizePhoneInput(value: string): string | undefined {
  const trimmed = value.trim();

  if (trimmed === "") {
    return undefined;
  }

  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 0) {
    return trimmed.replace(/\s+/g, "");
  }

  return hasPlus ? `+${digits}` : digits;
}

export function isHoneypotFilled(value: string): boolean {
  return value.trim() !== "";
}

export function isUnrealisticFillTime(
  startedAt: string,
  now = Date.now(),
  minElapsedMs = contactMinElapsedMs,
): boolean {
  if (!/^[0-9]{10,16}$/.test(startedAt.trim())) {
    return false;
  }

  const startedAtMs = Number(startedAt);

  if (!Number.isFinite(startedAtMs)) {
    return false;
  }

  return now - startedAtMs < minElapsedMs;
}

const contactLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(contactFieldLimits.name.min, contactFieldErrorMessages.name)
    .max(contactFieldLimits.name.max, contactFieldErrorMessages.name),
  company: z
    .string()
    .trim()
    .min(contactFieldLimits.company.min, contactFieldErrorMessages.company)
    .max(contactFieldLimits.company.max, contactFieldErrorMessages.company),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(contactFieldLimits.email.min, contactFieldErrorMessages.email)
    .max(contactFieldLimits.email.max, contactFieldErrorMessages.email)
    .pipe(z.email({ error: contactFieldErrorMessages.email })),
  phone: z
    .string()
    .trim()
    .transform((value) => normalizePhoneInput(value))
    .refine(
      (value) => value === undefined || phonePattern.test(value),
      contactFieldErrorMessages.phone,
    ),
  need: z.enum(contactNeedKinds, {
    error: contactFieldErrorMessages.need,
  }),
  message: z
    .string()
    .trim()
    .min(contactFieldLimits.message.min, contactFieldErrorMessages.message)
    .max(contactFieldLimits.message.max, contactFieldErrorMessages.message),
});

export function fieldErrorsFromZod(
  error: z.ZodError,
): Partial<Record<ContactField, string[]>> {
  const fieldErrors: Partial<Record<ContactField, string[]>> = {};
  const allowed = new Set<string>(contactFields);

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key !== "string" || !allowed.has(key)) {
      continue;
    }

    const field = key as ContactField;
    const messages = fieldErrors[field] ?? [];
    messages.push(issue.message);
    fieldErrors[field] = messages;
  }

  return fieldErrors;
}

export function parseContactLead(candidate: ContactFormCandidate):
  | { ok: true; lead: ContactLead }
  | {
      ok: false;
      fieldErrors: Partial<Record<ContactField, string[]>>;
    } {
  const parsed = contactLeadSchema.safeParse({
    name: candidate.name,
    company: candidate.company,
    email: candidate.email,
    phone: candidate.phone,
    need: candidate.need,
    message: candidate.message,
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
  }

  const lead: ContactLead = {
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    need: parsed.data.need,
    message: parsed.data.message,
  };

  if (parsed.data.phone !== undefined) {
    lead.phone = parsed.data.phone;
  }

  return { ok: true, lead };
}
