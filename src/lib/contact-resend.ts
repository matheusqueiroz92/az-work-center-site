import { opaqueContactSubmissionId } from "@/lib/contact-crypto";
import { buildContactInternalEmail } from "@/lib/contact-email";
import {
  logContactOperational,
  resolveContactRuntimeEnv,
  type ContactRuntimeEnv,
} from "@/lib/contact-log";
import type { ContactLead } from "@/lib/contact-schema";
import type {
  ContactDeliveryResult,
  ContactProvider,
} from "@/lib/contact-submit";

export type ContactResendPayload = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

export type ContactResendSend = (
  payload: ContactResendPayload,
  options: { idempotencyKey: string },
) => Promise<{
  data?: { id: string } | null;
  error?: { name?: string; message?: string } | null;
}>;

export const contactDeliveryTimeoutMs = 10_000;

class ContactDeliveryTimeoutError extends Error {
  constructor() {
    super("contact.delivery.timeout");
    this.name = "ContactDeliveryTimeoutError";
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new ContactDeliveryTimeoutError());
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function createDefaultResendSend(
  apiKey: string,
): Promise<ContactResendSend> {
  const { Resend } = await import("resend");
  const client = new Resend(apiKey);

  return (payload, options) => client.emails.send(payload, options);
}

export function createResendContactProvider(options: {
  apiKey: string;
  toEmail: string;
  fromEmail: string;
  send?: ContactResendSend;
  timeoutMs?: number;
  vercelEnv?: ContactRuntimeEnv | string;
}): ContactProvider {
  const timeoutMs = options.timeoutMs ?? contactDeliveryTimeoutMs;
  const vercelEnv = resolveContactRuntimeEnv(options.vercelEnv);
  const inflight = new Map<string, Promise<ContactDeliveryResult>>();
  let sendPromise: Promise<ContactResendSend> | undefined;

  function sendEmail(): Promise<ContactResendSend> {
    if (options.send) {
      return Promise.resolve(options.send);
    }

    sendPromise ??= createDefaultResendSend(options.apiKey);
    return sendPromise;
  }

  async function deliverOnce(
    lead: ContactLead,
    idempotencyKey: string,
  ): Promise<ContactDeliveryResult> {
    const submissionId = opaqueContactSubmissionId(idempotencyKey);
    const email = buildContactInternalEmail(lead);

    try {
      const send = await sendEmail();
      const result = await withTimeout(
        send(
          {
            from: options.fromEmail,
            to: [options.toEmail],
            replyTo: lead.email,
            subject: email.subject,
            html: email.html,
            text: email.text,
          },
          { idempotencyKey },
        ),
        timeoutMs,
      );

      if (result.error) {
        logContactOperational({
          code: "contact.delivery.failed",
          vercelEnv,
          category: "provider_error",
          submissionId,
        });
        return { ok: false, reason: "rejected" };
      }

      return { ok: true, submissionId };
    } catch (error) {
      const category =
        error instanceof ContactDeliveryTimeoutError
          ? "timeout"
          : "provider_error";

      logContactOperational({
        code: "contact.delivery.failed",
        vercelEnv,
        category,
        submissionId,
      });

      return { ok: false, reason: "rejected" };
    }
  }

  return {
    async deliver(lead, deliveryOptions) {
      const existing = inflight.get(deliveryOptions.idempotencyKey);

      if (existing) {
        return existing;
      }

      const pending = deliverOnce(lead, deliveryOptions.idempotencyKey).finally(
        () => {
          inflight.delete(deliveryOptions.idempotencyKey);
        },
      );

      inflight.set(deliveryOptions.idempotencyKey, pending);
      return pending;
    },
  };
}
