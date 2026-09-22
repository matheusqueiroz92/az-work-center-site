import { afterEach, describe, expect, it, vi } from "vitest";

import { contactIdempotencyKey } from "@/lib/contact-fields";
import { createResendContactProvider } from "@/lib/contact-resend";
import type { ContactLead } from "@/lib/contact-schema";

const attemptId = "550e8400-e29b-41d4-a716-446655440000";
const otherAttemptId = "6ba7b810-9dad-41d1-80b4-00c04fd430c8";

const lead: ContactLead = {
  name: "Maria Lead",
  company: "Lead Corp",
  email: "maria.lead@example.com",
  phone: "77988887777",
  need: "criar-validar-produto",
  message:
    "Controlamos pedidos em planilha e o estoque em outro sistema, com conferência manual todo dia.",
};

const config = {
  apiKey: "re_testkey_not_real",
  toEmail: "inbox@example.com",
  fromEmail: "AZ Work Center <site@example.com>",
  vercelEnv: "preview" as const,
};

afterEach(() => {
  vi.restoreAllMocks();
});

function serializedLogs(spy: { mock: { calls: unknown[][] } }) {
  return JSON.stringify(spy.mock.calls);
}

describe("createResendContactProvider", () => {
  it("envia from, to e replyTo a partir da configuração injetada", async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ data: { id: "re_raw_id" }, error: null });
    const provider = createResendContactProvider({ ...config, send });
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    const result = await provider.deliver(lead, {
      idempotencyKey: contactIdempotencyKey(attemptId),
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.submissionId.startsWith("c_")).toBe(true);
      expect(result.submissionId).not.toBe("re_raw_id");
    }
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toMatchObject({
      from: config.fromEmail,
      to: [config.toEmail],
      replyTo: lead.email,
    });
    expect(send.mock.calls[0]?.[1]).toEqual({
      idempotencyKey: contactIdempotencyKey(attemptId),
    });
    expect(JSON.stringify(result)).not.toMatch(
      /maria.lead@example|re_raw_id|re_testkey/,
    );
    expect(info).not.toHaveBeenCalled();
  });

  it("mapeia erro, exceção e timeout para unavailable lógico sem PII nos logs", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const rejected = createResendContactProvider({
      ...config,
      send: vi.fn().mockResolvedValue({
        data: null,
        error: {
          name: "application_error",
          message: `recusado para ${lead.email}`,
        },
      }),
    });
    const exploded = createResendContactProvider({
      ...config,
      send: vi.fn().mockRejectedValue(new Error(`stack para ${lead.email}`)),
    });
    const hung = createResendContactProvider({
      ...config,
      timeoutMs: 20,
      send: vi.fn().mockImplementation(
        () =>
          new Promise(() => {
            /* never resolves */
          }),
      ),
    });

    const rejectedResult = await rejected.deliver(lead, {
      idempotencyKey: contactIdempotencyKey(attemptId),
    });
    const explodedResult = await exploded.deliver(lead, {
      idempotencyKey: contactIdempotencyKey(otherAttemptId),
    });
    const timeoutResult = await hung.deliver(lead, {
      idempotencyKey: contactIdempotencyKey(
        "11111111-1111-4111-8111-111111111111",
      ),
    });

    expect(rejectedResult).toEqual({ ok: false, reason: "rejected" });
    expect(explodedResult).toEqual({ ok: false, reason: "rejected" });
    expect(timeoutResult).toEqual({ ok: false, reason: "rejected" });
    expect(serializedLogs(info)).not.toMatch(
      /maria.lead@example|inbox@example|re_testkey|recusado|stack/,
    );
    expect(serializedLogs(info)).toMatch(/provider_error/);
    expect(serializedLogs(info)).toMatch(/timeout/);
  });

  it("coalesces envios concorrentes com a mesma chave", async () => {
    let releases = 0;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const send = vi.fn().mockImplementation(async () => {
      releases += 1;
      await gate;
      return { data: { id: "re_raw_id" }, error: null };
    });
    const provider = createResendContactProvider({ ...config, send });
    const key = contactIdempotencyKey(attemptId);

    const pending = Promise.all([
      provider.deliver(lead, { idempotencyKey: key }),
      provider.deliver(lead, { idempotencyKey: key }),
    ]);

    await vi.waitFor(() => {
      expect(send).toHaveBeenCalledTimes(1);
    });
    release();
    const [first, second] = await pending;

    expect(first).toEqual(second);
    expect(first.ok).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
    expect(releases).toBe(1);
  });
});
