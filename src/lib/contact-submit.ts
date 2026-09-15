import type { ContactActionState } from "@/lib/contact-action-state";
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
  { ok: true; submissionId: string } | { ok: false; reason: "disabled" };

export type ContactProvider = {
  deliver(lead: ContactLead): Promise<ContactDeliveryResult>;
};

export const disabledContactProvider: ContactProvider = {
  async deliver() {
    return { ok: false, reason: "disabled" };
  },
};

export function createFakeContactProvider(options?: {
  submissionId?: string;
  failWith?: Error;
}): ContactProvider & { delivered: ContactLead[] } {
  const delivered: ContactLead[] = [];

  return {
    delivered,
    async deliver(lead: ContactLead) {
      if (options?.failWith) {
        throw options.failWith;
      }

      delivered.push(lead);

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
}): Promise<ContactActionState> {
  const parsed = parseContactFormData(input.formData);

  if (!parsed.ok) {
    return {
      status: "validation",
      fieldErrors: {},
      formError: parsed.formError,
    };
  }

  if (
    isHoneypotFilled(parsed.candidate.companyWebsite) ||
    isUnrealisticFillTime(parsed.candidate.startedAt, input.now)
  ) {
    return { status: "blocked" };
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

  try {
    const delivery = await input.provider.deliver(leadResult.lead);

    if (!delivery.ok) {
      return { status: "unavailable" };
    }

    return {
      status: "success",
      submissionId: delivery.submissionId,
    };
  } catch {
    return { status: "unavailable" };
  }
}
