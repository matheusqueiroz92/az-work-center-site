import { describe, expect, it } from "vitest";

import {
  contact,
  contactNeedKinds,
  contactNeedOptions,
} from "@/content/contact";
import {
  contactFieldLimits,
  contactGenericFormError,
  contactHoneypotField,
  isHoneypotFilled,
  isUnrealisticFillTime,
  normalizePhoneInput,
  parseContactFormData,
  parseContactLead,
} from "@/lib/contact-schema";

const longContext =
  "Controlamos pedidos em planilha e o estoque em outro sistema, com conferência manual todo dia.";

function candidate(overrides: Record<string, string> = {}) {
  return {
    name: "João da Conceição",
    company: "Açaí Bahia",
    email: "  Contato@Empresa.com.br  ",
    phone: "(77) 98833-4370",
    need: "organizar-integrar-processos",
    message: longContext,
    companyWebsite: "",
    startedAt: String(Date.now() - 5_000),
    ...overrides,
  };
}

function formDataFrom(
  fields: Record<string, FormDataEntryValue | FormDataEntryValue[]>,
) {
  const formData = new FormData();

  for (const [name, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      for (const entry of value) {
        formData.append(name, entry);
      }
      continue;
    }

    formData.set(name, value);
  }

  return formData;
}

describe("contact need enum", () => {
  it("reusa somente os desafios já publicados", () => {
    expect(contactNeedOptions.map((option) => option.label)).toEqual(
      contact.challenges.items.map((item) => item.title),
    );
    expect(contactNeedKinds).toEqual(
      contactNeedOptions.map((option) => option.kind),
    );
  });
});

describe("normalizePhoneInput", () => {
  it("mantém vazio como ausente", () => {
    expect(normalizePhoneInput("")).toBeUndefined();
    expect(normalizePhoneInput("   ")).toBeUndefined();
  });

  it("remove formatação conservadora e preserva +", () => {
    expect(normalizePhoneInput("(77) 98833-4370")).toBe("77988334370");
    expect(normalizePhoneInput("+55 77 98833-4370")).toBe("+5577988334370");
  });
});

describe("parseContactFormData", () => {
  it("lê payload textual simples", () => {
    const parsed = parseContactFormData(
      formDataFrom({
        name: "Ana",
        company: "Empresa",
        email: "ana@empresa.com",
        phone: "",
        need: "desenvolver-sistema",
        message: longContext,
        [contactHoneypotField]: "",
        startedAt: "1700000000000",
      }),
    );

    expect(parsed.ok).toBe(true);
  });

  it("rejeita valor repetido, File e string enorme", () => {
    const file = new File(["conteudo"], "anexo.txt", { type: "text/plain" });
    const huge = "a".repeat(contactFieldLimits.raw + 1);

    expect(
      parseContactFormData(formDataFrom({ name: ["Ana", "Ana"] })).ok,
    ).toBe(false);
    expect(parseContactFormData(formDataFrom({ name: file })).ok).toBe(false);
    expect(parseContactFormData(formDataFrom({ name: huge })).ok).toBe(false);
  });

  it("trata campo ausente como string vazia", () => {
    const parsed = parseContactFormData(formDataFrom({}));

    expect(parsed).toEqual({
      ok: true,
      candidate: {
        name: "",
        company: "",
        email: "",
        phone: "",
        need: "",
        message: "",
        companyWebsite: "",
        startedAt: "",
      },
    });
  });
});

describe("parseContactLead", () => {
  it("aceita payload válido com unicode e normaliza e-mail", () => {
    const parsed = parseContactLead(candidate());

    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.lead.name).toBe("João da Conceição");
      expect(parsed.lead.company).toBe("Açaí Bahia");
      expect(parsed.lead.email).toBe("contato@empresa.com.br");
      expect(parsed.lead.phone).toBe("77988334370");
      expect(parsed.lead.need).toBe("organizar-integrar-processos");
    }
  });

  it("omite telefone quando o campo vem vazio", () => {
    const parsed = parseContactLead(candidate({ phone: "  " }));

    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.lead.phone).toBeUndefined();
      expect(Object.hasOwn(parsed.lead, "phone")).toBe(false);
    }
  });

  it("rejeita campos ausentes, limites e enum inválido", () => {
    expect(parseContactLead(candidate({ name: "" })).ok).toBe(false);
    expect(parseContactLead(candidate({ name: "A" })).ok).toBe(false);
    expect(
      parseContactLead(
        candidate({ name: "A".repeat(contactFieldLimits.name.max + 1) }),
      ).ok,
    ).toBe(false);
    expect(parseContactLead(candidate({ message: "curto demais" })).ok).toBe(
      false,
    );
    expect(parseContactLead(candidate({ need: "orçamento" })).ok).toBe(false);
    expect(parseContactLead(candidate({ email: "invalido" })).ok).toBe(false);
    expect(parseContactLead(candidate({ phone: "abc" })).ok).toBe(false);
  });
});

describe("anti-spam local", () => {
  it("detecta honeypot preenchido", () => {
    expect(isHoneypotFilled("https://spam.example")).toBe(true);
    expect(isHoneypotFilled("  ")).toBe(false);
  });

  it("detecta preenchimento irrealisticamente rápido e ignora token inválido", () => {
    const now = 1_700_000_000_000;

    expect(isUnrealisticFillTime(String(now - 200), now)).toBe(true);
    expect(isUnrealisticFillTime(String(now - 5_000), now)).toBe(false);
    expect(isUnrealisticFillTime("token", now)).toBe(false);
    expect(isUnrealisticFillTime("", now)).toBe(false);
  });
});

describe("mensagens genéricas", () => {
  it("não revela a regra de payload hostil", () => {
    expect(contactGenericFormError).not.toMatch(/honeypot|file|formdata/i);
  });
});
