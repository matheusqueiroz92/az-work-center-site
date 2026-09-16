import { afterEach, describe, expect, it, vi } from "vitest";

import { submitContactAction } from "@/app/(marketing)/contato/actions";
import {
  contactAttemptField,
  contactHoneypotField,
  contactIdempotencyKey,
} from "@/lib/contact-fields";
import { createContactFrequencyLimiter } from "@/lib/contact-frequency";
import {
  createFakeContactProvider,
  disabledContactProvider,
  submitContactLead,
} from "@/lib/contact-submit";

const longContext =
  "Controlamos pedidos em planilha e o estoque em outro sistema, com conferência manual todo dia.";

const attemptId = "550e8400-e29b-41d4-a716-446655440000";
const otherAttemptId = "6ba7b810-9dad-41d1-80b4-00c04fd430c8";

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
  formData.set(contactAttemptField, attemptId);

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
  it("entrega ao fake somente dados já validados e emite próximo attemptId", async () => {
    const provider = createFakeContactProvider({ submissionId: "fake_opaque" });
    const result = await submitContactLead({
      formData: validFormData(),
      provider,
      createAttemptId: () => otherAttemptId,
    });

    expect(result).toEqual({
      status: "success",
      submissionId: "fake_opaque",
      nextAttemptId: otherAttemptId,
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
    expect(provider.idempotencyKeys).toEqual([
      contactIdempotencyKey(attemptId),
    ]);
    expect(serialized(result)).not.toMatch(
      /Maria Lead|maria.lead@exemplo|77988887777|Lead Corp/,
    );
    expect(Object.keys(result).sort()).toEqual([
      "nextAttemptId",
      "status",
      "submissionId",
    ]);
  });

  it("omite telefone opcional na entrega", async () => {
    const provider = createFakeContactProvider();
    const result = await submitContactLead({
      formData: validFormData({ phone: "" }),
      provider,
      createAttemptId: () => otherAttemptId,
    });

    expect(result.status).toBe("success");
    expect(provider.delivered[0]?.phone).toBeUndefined();
    expect(Object.hasOwn(provider.delivered[0]!, "phone")).toBe(false);
  });

  it("não chama o provider em validação, blocked, honeypot ou envio rápido", async () => {
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
    const huge = await submitContactLead({
      formData: validFormData({
        name: "a".repeat(8001),
      }),
      provider,
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
    expect(huge.status).toBe("validation");
    expect(Object.keys(blockedHoneypot)).toEqual(["status"]);
    expect(provider.delivered).toEqual([]);
    expect(provider.idempotencyKeys).toEqual([]);
  });

  it("bloqueia identificador ausente, enorme ou malformado sem chamar o provider", async () => {
    const provider = createFakeContactProvider();

    const missing = await submitContactLead({
      formData: validFormData({ [contactAttemptField]: "" }),
      provider,
    });
    const malformed = await submitContactLead({
      formData: validFormData({ [contactAttemptField]: "nao-e-uuid" }),
      provider,
    });
    const huge = await submitContactLead({
      formData: validFormData({
        [contactAttemptField]: "a".repeat(8001),
      }),
      provider,
    });

    expect(missing).toEqual({ status: "blocked" });
    expect(malformed).toEqual({ status: "blocked" });
    expect(huge.status).toBe("validation");
    expect(provider.delivered).toEqual([]);
  });

  it("não chama o provider quando a frequência da instância estoura", async () => {
    const provider = createFakeContactProvider();
    const limiter = createContactFrequencyLimiter({
      maxAttempts: 1,
      windowMs: 60_000,
      maxKeys: 8,
    });

    const first = await submitContactLead({
      formData: validFormData(),
      provider,
      frequencyKey: "hashed-client-a",
      frequencyLimiter: limiter,
      createAttemptId: () => otherAttemptId,
    });
    const second = await submitContactLead({
      formData: validFormData({ [contactAttemptField]: otherAttemptId }),
      provider,
      frequencyKey: "hashed-client-a",
      frequencyLimiter: limiter,
    });

    expect(first.status).toBe("success");
    expect(second).toEqual({ status: "blocked" });
    expect(Object.keys(second)).toEqual(["status"]);
    expect(provider.delivered).toHaveLength(1);
    expect(provider.idempotencyKeys).toEqual([
      contactIdempotencyKey(attemptId),
    ]);
  });

  it("conserva o mesmo attemptId em validation, blocked, unavailable e exceção", async () => {
    const provider = createFakeContactProvider({
      failWith: new Error("provider down"),
    });
    const createAttemptId = vi.fn(() => otherAttemptId);

    const invalid = await submitContactLead({
      formData: validFormData({ email: "invalido" }),
      provider,
      createAttemptId,
    });
    const blocked = await submitContactLead({
      formData: validFormData({
        [contactHoneypotField]: "https://spam.example",
      }),
      provider,
      createAttemptId,
    });
    const unavailable = await submitContactLead({
      formData: validFormData(),
      provider: disabledContactProvider,
      createAttemptId,
    });
    const exploded = await submitContactLead({
      formData: validFormData(),
      provider,
      createAttemptId,
    });

    expect(invalid.status).toBe("validation");
    expect(blocked.status).toBe("blocked");
    expect(unavailable.status).toBe("unavailable");
    expect(exploded.status).toBe("unavailable");
    expect(createAttemptId).not.toHaveBeenCalled();
    expect(serialized(invalid)).not.toContain("nextAttemptId");
    expect(serialized(blocked)).not.toContain("nextAttemptId");
    expect(serialized(unavailable)).not.toContain("nextAttemptId");
    expect(serialized(exploded)).not.toContain("nextAttemptId");
  });

  it("emite nextAttemptId opaco sem PII e sem reutilizar A após sucesso", async () => {
    const provider = createFakeContactProvider({ submissionId: "c_opaque" });
    const result = await submitContactLead({
      formData: validFormData(),
      provider,
      createAttemptId: () => otherAttemptId,
    });

    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.nextAttemptId).toBe(otherAttemptId);
      expect(result.nextAttemptId).not.toBe(attemptId);
      expect(result.submissionId).not.toBe(result.nextAttemptId);
      expect(serialized(result)).not.toMatch(
        /Maria Lead|maria.lead@exemplo|77988887777|Lead Corp/,
      );
    }
  });

  it("permite dois leads legítimos sequenciais com A e depois B", async () => {
    const provider = createFakeContactProvider();
    const thirdAttemptId = "7c9e6679-7425-40de-944b-e07fc1f90ae7";

    const first = await submitContactLead({
      formData: validFormData(),
      provider,
      createAttemptId: () => otherAttemptId,
    });
    const second = await submitContactLead({
      formData: validFormData({
        [contactAttemptField]: otherAttemptId,
        email: "outra.lead@exemplo.com.br",
        name: "Outra Lead",
      }),
      provider,
      createAttemptId: () => thirdAttemptId,
    });

    expect(first.status).toBe("success");
    expect(second.status).toBe("success");
    if (first.status === "success" && second.status === "success") {
      expect(first.nextAttemptId).toBe(otherAttemptId);
      expect(second.nextAttemptId).toBe(thirdAttemptId);
      expect(first.nextAttemptId).not.toBe(attemptId);
      expect(second.nextAttemptId).not.toBe(otherAttemptId);
    }
    expect(provider.delivered).toHaveLength(2);
    expect(provider.idempotencyKeys).toEqual([
      contactIdempotencyKey(attemptId),
      contactIdempotencyKey(otherAttemptId),
    ]);
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

  it("usa a mesma chave de idempotência em envios concorrentes e entrega uma vez", async () => {
    const provider = createFakeContactProvider({ delayMs: 40 });
    const formData = validFormData();

    const [first, second] = await Promise.all([
      submitContactLead({
        formData,
        provider,
        createAttemptId: () => otherAttemptId,
      }),
      submitContactLead({
        formData,
        provider,
        createAttemptId: () => otherAttemptId,
      }),
    ]);

    expect(first).toEqual(second);
    expect(first.status).toBe("success");
    if (first.status === "success") {
      expect(first.nextAttemptId).toBe(otherAttemptId);
    }
    expect(provider.delivered).toHaveLength(1);
    expect(provider.idempotencyKeys).toEqual([
      contactIdempotencyKey(attemptId),
    ]);
  });

  it("permite identificadores diferentes em paralelo", async () => {
    const provider = createFakeContactProvider({ delayMs: 20 });
    const thirdAttemptId = "7c9e6679-7425-40de-944b-e07fc1f90ae7";

    const [first, second] = await Promise.all([
      submitContactLead({
        formData: validFormData(),
        provider,
        createAttemptId: () => otherAttemptId,
      }),
      submitContactLead({
        formData: validFormData({ [contactAttemptField]: otherAttemptId }),
        provider,
        createAttemptId: () => thirdAttemptId,
      }),
    ]);

    expect(first.status).toBe("success");
    expect(second.status).toBe("success");
    expect(provider.delivered).toHaveLength(2);
    expect(provider.idempotencyKeys.toSorted()).toEqual(
      [
        contactIdempotencyKey(attemptId),
        contactIdempotencyKey(otherAttemptId),
      ].toSorted(),
    );
  });
});

describe("submitContactAction", () => {
  it("usa o provider resolvido do ambiente local desabilitado", async () => {
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
