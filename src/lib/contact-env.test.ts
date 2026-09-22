import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { parseContactDeliveryEnv } from "@/lib/contact-env";

const readySource = {
  CONTACT_PROVIDER: "resend",
  CONTACT_TO_EMAIL: "inbox@example.com",
  CONTACT_FROM_EMAIL: "AZ Work Center <site@example.com>",
  RESEND_API_KEY: "re_testkey_not_real",
};

function implementationSources() {
  return [
    "src/lib/contact-env.ts",
    "src/lib/contact-provider.ts",
    "src/lib/contact-resend.ts",
    "src/lib/contact-submit.ts",
    "src/app/(marketing)/contato/actions.ts",
  ].map((relative) => readFileSync(path.join(process.cwd(), relative), "utf8"));
}

describe("parseContactDeliveryEnv", () => {
  it("mantém disabled por omissão e valor explícito", () => {
    expect(parseContactDeliveryEnv({})).toEqual({
      status: "disabled",
      provider: "disabled",
    });
    expect(
      parseContactDeliveryEnv({
        CONTACT_PROVIDER: "disabled",
        CONTACT_TO_EMAIL: "inbox@example.com",
        CONTACT_FROM_EMAIL: "site@example.com",
        RESEND_API_KEY: "re_testkey_not_real",
      }),
    ).toEqual({
      status: "disabled",
      provider: "disabled",
    });
  });

  it("aceita configuração resend válida", () => {
    expect(parseContactDeliveryEnv(readySource)).toEqual({
      status: "ready",
      provider: "resend",
      toEmail: "inbox@example.com",
      fromEmail: "AZ Work Center <site@example.com>",
      apiKey: "re_testkey_not_real",
    });
  });

  it("falha de forma controlada para cada variável obrigatória ausente ou inválida", () => {
    const cases = [
      { CONTACT_PROVIDER: "mailgun" },
      { ...readySource, CONTACT_TO_EMAIL: undefined },
      { ...readySource, CONTACT_TO_EMAIL: "  " },
      { ...readySource, CONTACT_TO_EMAIL: "nao-e-email" },
      { ...readySource, CONTACT_FROM_EMAIL: undefined },
      { ...readySource, CONTACT_FROM_EMAIL: "Nome sem-email" },
      { ...readySource, RESEND_API_KEY: undefined },
      { ...readySource, RESEND_API_KEY: "short" },
      { ...readySource, RESEND_API_KEY: "re key with space" },
    ];

    for (const source of cases) {
      const parsed = parseContactDeliveryEnv(source);
      expect(parsed.status).toBe("unavailable");
      expect(JSON.stringify(parsed)).not.toMatch(
        /re_testkey|inbox@example|apiKey/,
      );
    }
  });

  it("não herda destinatário de Production no Preview", () => {
    const parsed = parseContactDeliveryEnv({
      CONTACT_PROVIDER: "resend",
      CONTACT_FROM_EMAIL: "AZ Work Center <site@example.com>",
      RESEND_API_KEY: "re_testkey_not_real",
      VERCEL_ENV: "preview",
    });

    expect(parsed.status).toBe("unavailable");
    expect(JSON.stringify(parsed)).not.toMatch(
      /contato@azworkcenter|matheusqueiroz@azworkcenter/,
    );
  });

  it("não hardcode destinatários ou remetente de produção", () => {
    for (const source of implementationSources()) {
      expect(source).not.toMatch(/contato@azworkcenter\.com\.br/);
      expect(source).not.toMatch(/matheusqueiroz@azworkcenter\.com\.br/);
      expect(source).not.toMatch(/site@azworkcenter\.com\.br/);
      expect(source).not.toMatch(/NEXT_PUBLIC_CONTACT|NEXT_PUBLIC_RESEND/);
    }
  });
});
