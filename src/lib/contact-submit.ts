import type { ContactActionState } from "@/lib/contact-action-state";
import {
  contactIdempotencyKey,
  createContactAttemptId,
  isContactAttemptId,
} from "@/lib/contact-fields";
import {
  contactFrequencyLimiter,
  type ContactFrequencyLimiter,
} from "@/lib/contact-frequency";
import {
  contactGenericFormError,
  isHoneypotFilled,
  isUnrealisticFillTime,
  parseContactFormData,
  parseContactLead,
  type ContactLead,
} from "@/lib/contact-schema";

export type { ContactActionState } from "@/lib/contact-action-state";
export { idleContactActionState } from "@/lib/contact-action-state";

export type ContactDeliveryResult =
  | { ok: true; submissionId: string }
  | { ok: false; reason: "disabled" | "rejected" };

export type ContactProvider = {
  deliver(
    lead: ContactLead,
    options: { idempotencyKey: string },
  ): Promise<ContactDeliveryResult>;
};

export const disabledContactProvider: ContactProvider = {
  async deliver() {
    return { ok: false, reason: "disabled" };
  },
};

const inflightDeliveries = new Map<string, Promise<ContactActionState>>();

export function createFakeContactProvider(options?: {
  submissionId?: string;
  failWith?: Error;
  delayMs?: number;
}): ContactProvider & {
  delivered: ContactLead[];
  idempotencyKeys: string[];
} {
  const delivered: ContactLead[] = [];
  const idempotencyKeys: string[] = [];

  return {
    delivered,
    idempotencyKeys,
    async deliver(lead, deliveryOptions) {
      if (options?.delayMs) {
        await new Promise((resolve) => {
          setTimeout(resolve, options.delayMs);
        });
      }

      if (options?.failWith) {
        throw options.failWith;
      }

      delivered.push(lead);
      idempotencyKeys.push(deliveryOptions.idempotencyKey);

      return {
        ok: true,
        submissionId: options?.submissionId ?? `fake_${delivered.length}`,
      };
    },
  };
}

export async function submitContactLead(input: {
  formData: FormData;
  provider: ContactProvider;
  now?: number;
  frequencyKey?: string;
  frequencyLimiter?: ContactFrequencyLimiter;
  createAttemptId?: () => string;
}): Promise<ContactActionState> {
  const parsed = parseContactFormData(input.formData);

  if (!parsed.ok) {
    return {
      status: "validation",
      fieldErrors: {},
      formError: parsed.formError,
    };
  }

  const leadResult = parseContactLead(parsed.candidate);

  if (!leadResult.ok) {
    return {
      status: "validation",
      fieldErrors: leadResult.fieldErrors,
      formError:
        Object.keys(leadResult.fieldErrors).length > 1
          ? contactGenericFormError
          : undefined,
    };
  }

  if (
    isHoneypotFilled(parsed.candidate.companyWebsite) ||
    isUnrealisticFillTime(parsed.candidate.startedAt, input.now)
  ) {
    return { status: "blocked" };
  }

  if (!isContactAttemptId(parsed.candidate.attemptId)) {
    return { status: "blocked" };
  }

  if (input.frequencyKey !== undefined) {
    const limiter = input.frequencyLimiter ?? contactFrequencyLimiter;

    if (!limiter.allow(input.frequencyKey, input.now)) {
      return { status: "blocked" };
    }
  }

  const idempotencyKey = contactIdempotencyKey(parsed.candidate.attemptId);
  const existing = inflightDeliveries.get(idempotencyKey);

  if (existing) {
    return existing;
  }

  const pending = deliverLead({
    lead: leadResult.lead,
    provider: input.provider,
    idempotencyKey,
    createAttemptId: input.createAttemptId ?? createContactAttemptId,
  }).finally(() => {
    inflightDeliveries.delete(idempotencyKey);
  });

  inflightDeliveries.set(idempotencyKey, pending);
  return pending;
}

async function deliverLead(input: {
  lead: ContactLead;
  provider: ContactProvider;
  idempotencyKey: string;
  createAttemptId: () => string;
}): Promise<ContactActionState> {
  try {
    const delivery = await input.provider.deliver(input.lead, {
      idempotencyKey: input.idempotencyKey,
    });

    if (!delivery.ok) {
      return { status: "unavailable" };
    }

    return {
      status: "success",
      submissionId: delivery.submissionId,
      nextAttemptId: input.createAttemptId(),
    };
  } catch {
    return { status: "unavailable" };
  }
}
