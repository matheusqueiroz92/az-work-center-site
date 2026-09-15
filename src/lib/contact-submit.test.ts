import { afterEach, describe, expect, it, vi } from "vitest";

import { submitContactAction } from "@/app/(marketing)/contato/actions";
import { contactHoneypotField } from "@/lib/contact-schema";
import {
  createFakeContactProvider,
  disabledContactProvider,
  submitContactLead,
} from "@/lib/contact-submit";

const longContext =
  "Controlamos pedidos em planilha e o estoque em outro sistema, com conferência manual todo dia.";

const pii = {
  name: "Maria Lead",
  company: "Lead Corp",
  email: "maria.lead@exemplo.com.br",
  phone: "77988887777",
  message: longContext,
};

function validFormData(overrides: Record<string, FormDataEntryValue> = {}) {
  const formData = new FormData();
  formData.set("name", pii.name);
  formData.set("company", pii.company);
  formData.set("email", pii.email);
  formData.set("phone", pii.phone);
  formData.set("need", "criar-validar-produto");
  formData.set("message", pii.message);
  formData.set(contactHoneypotField, "");
  formData.set("startedAt", String(Date.now() - 5_000));

  for (const [name, value] of Object.entries(overrides)) {
    formData.set(name, value);
  }

  return formData;
}

function serialized(value: unknown) {
  return JSON.stringify(value);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("submitContactLead", () => {
  it("entrega ao fake somente dados já validados", async () => {
    const provider = createFakeContactProvider({ submissionId: "fake_opaque" });
    const result = await submitContactLead({
      formData: validFormData(),
      provider,
    });

    expect(result).toEqual({
      status: "success",
      submissionId: "fake_opaque",
    });
    expect(provider.delivered).toEqual([
      {
        name: pii.name,
        company: pii.company,
        email: pii.email,
        phone: pii.phone,
        need: "criar-validar-produto",
        message: pii.message,
      },
    ]);
    expect(serialized(result)).not.toMatch(
      /Maria Lead|maria.lead@exemplo|77988887777|Lead Corp/,
    );
    expect(Object.keys(result).sort()).toEqual(["status", "submissionId"]);
  });

  it("não chama o provider em validação ou blocked", async () => {
    const provider = createFakeContactProvider();

    const invalid = await submitContactLead({
      formData: validFormData({ email: "invalido" }),
      provider,
    });
    const blockedHoneypot = await submitContactLead({
      formData: validFormData({
        [contactHoneypotField]: "https://spam.example",
      }),
      provider,
    });
    const blockedFast = await submitContactLead({
      formData: validFormData({ startedAt: String(Date.now()) }),
      provider,
      now: Date.now(),
    });

    expect(invalid.status).toBe("validation");
    if (invalid.status === "validation") {
      expect(Object.keys(invalid).sort()).toEqual([
        "fieldErrors",
        "formError",
        "status",
      ]);
      expect(serialized(invalid)).not.toMatch(
        /Maria Lead|maria.lead@exemplo|77988887777|Lead Corp|invalido/,
      );
    }
    expect(blockedHoneypot).toEqual({ status: "blocked" });
    expect(blockedFast).toEqual({ status: "blocked" });
    expect(Object.keys(blockedHoneypot)).toEqual(["status"]);
    expect(provider.delivered).toEqual([]);
  });

  it("retorna unavailable quando o provider está desabilitado", async () => {
    const result = await submitContactLead({
      formData: validFormData(),
      provider: disabledContactProvider,
    });

    expect(result).toEqual({ status: "unavailable" });
    expect(serialized(result)).not.toContain(pii.email);
  });

  it("transforma exceção do provider em unavailable sem PII", async () => {
    const provider = createFakeContactProvider({
      failWith: new Error(`falha para ${pii.email}`),
    });
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = await submitContactLead({
      formData: validFormData(),
      provider,
    });

    expect(result).toEqual({ status: "unavailable" });
    expect(serialized(result)).not.toContain(pii.email);
    expect(log).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("submitContactAction", () => {
  it("usa o provider desabilitado na aplicação", async () => {
    const result = await submitContactAction(
      { status: "idle" },
      validFormData(),
    );

    expect(result).toEqual({ status: "unavailable" });
    expect(serialized(result)).not.toMatch(
      /Maria Lead|maria.lead@exemplo|77988887777|contato@azworkcenter/,
    );
  });

  it("transforma falha inesperada do domínio em unavailable sem PII", async () => {
    const lead = await import("@/lib/contact-submit");
    const spy = vi
      .spyOn(lead, "submitContactLead")
      .mockRejectedValue(new Error(`falha para ${pii.email}`));

    const result = await submitContactAction(
      { status: "idle" },
      validFormData(),
    );

    expect(result).toEqual({ status: "unavailable" });
    expect(serialized(result)).not.toContain(pii.email);
    spy.mockRestore();
  });
});
