import { describe, expect, it } from "vitest";

import {
  buildContactInternalEmail,
  contactInternalEmailSubject,
  escapeHtml,
} from "@/lib/contact-email";
import type { ContactLead } from "@/lib/contact-schema";

const lead: ContactLead = {
  name: 'Ana <script>alert("x")</script>',
  company: "Açaí & Cia",
  email: "ana@example.com",
  phone: "77988887777",
  need: "criar-validar-produto",
  message: "Precisamos integrar pedidos\ne estoque <b>hoje</b>.",
};

describe("buildContactInternalEmail", () => {
  it("produz texto e HTML equivalentes com os campos aprovados", () => {
    const email = buildContactInternalEmail(lead);

    expect(email.subject).toBe(contactInternalEmailSubject);
    expect(email.subject).not.toContain(lead.message);
    expect(email.text).toContain('Nome: Ana <script>alert("x")</script>');
    expect(email.text).toContain("Empresa: Açaí & Cia");
    expect(email.text).toContain("E-mail: ana@example.com");
    expect(email.text).toContain("Telefone: 77988887777");
    expect(email.text).toContain(
      "Tipo de necessidade: Criar ou validar um produto digital",
    );
    expect(email.text).toContain(
      "Contexto: Precisamos integrar pedidos\ne estoque <b>hoje</b>.",
    );
    expect(email.html).toContain('<th align="left" valign="top">Nome</th>');
    expect(email.html).toContain(escapeHtml(lead.name));
    expect(email.html).toContain("Açaí &amp; Cia");
    expect(email.html).toContain("ana@example.com");
    expect(email.html).toContain("77988887777");
    expect(email.html).toContain("Criar ou validar um produto digital");
    expect(email.html).toContain(
      "Precisamos integrar pedidos<br />e estoque &lt;b&gt;hoje&lt;/b&gt;.",
    );
  });

  it("escapa tags e não insere HTML do usuário", () => {
    const email = buildContactInternalEmail(lead);

    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<b>hoje</b>");
    expect(email.html).toContain("&lt;script&gt;");
  });

  it("omite telefone quando ausente", () => {
    const withoutPhone: ContactLead = {
      name: lead.name,
      company: lead.company,
      email: lead.email,
      need: lead.need,
      message: lead.message,
    };
    const email = buildContactInternalEmail(withoutPhone);

    expect(email.text).not.toContain("Telefone:");
    expect(email.html).not.toContain("Telefone");
  });
});
