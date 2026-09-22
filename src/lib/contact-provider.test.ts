import { afterEach, describe, expect, it, vi } from "vitest";

import { getContactProvider } from "@/lib/contact-provider";
import { createResendContactProvider } from "@/lib/contact-resend";
import { disabledContactProvider } from "@/lib/contact-submit";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getContactProvider", () => {
  it("seleciona disabled quando o provider não está ativo", () => {
    expect(getContactProvider({})).toBe(disabledContactProvider);
    expect(
      getContactProvider({
        CONTACT_PROVIDER: "disabled",
        CONTACT_TO_EMAIL: "inbox@example.com",
        CONTACT_FROM_EMAIL: "site@example.com",
        RESEND_API_KEY: "re_testkey_not_real",
      }),
    ).toBe(disabledContactProvider);
  });

  it("seleciona Resend somente com configuração válida", () => {
    const provider = getContactProvider({
      CONTACT_PROVIDER: "resend",
      CONTACT_TO_EMAIL: "inbox@example.com",
      CONTACT_FROM_EMAIL: "AZ Work Center <site@example.com>",
      RESEND_API_KEY: "re_testkey_not_real",
      VERCEL_ENV: "preview",
    });

    expect(provider).not.toBe(disabledContactProvider);
    expect(provider.deliver).toBeTypeOf("function");
  });

  it("trata Preview sem destinatário como unavailable sem herdar Production", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const provider = getContactProvider({
      CONTACT_PROVIDER: "resend",
      CONTACT_FROM_EMAIL: "AZ Work Center <site@example.com>",
      RESEND_API_KEY: "re_testkey_not_real",
      VERCEL_ENV: "preview",
    });

    expect(provider).toBe(disabledContactProvider);
    expect(JSON.stringify(info.mock.calls)).toMatch(/contact.env.invalid/);
    expect(JSON.stringify(info.mock.calls)).not.toMatch(
      /contato@azworkcenter|inbox@example|re_testkey/,
    );
  });
});

describe("createResendContactProvider factory", () => {
  it("não instancia o SDK no import do módulo de seleção", async () => {
    const resend = await import("resend");
    expect(typeof resend.Resend).toBe("function");
    expect(getContactProvider).toBeTypeOf("function");
    expect(createResendContactProvider).toBeTypeOf("function");
  });
});
