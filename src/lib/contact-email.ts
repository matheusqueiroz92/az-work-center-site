import { contactNeedOptions, type ContactNeedKind } from "@/content/contact";
import type { ContactLead } from "@/lib/contact-schema";

export const contactInternalEmailSubject = "Pedido de diagnóstico pelo site";

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const htmlEscapePattern = /[&<>"']/g;

export function escapeHtml(value: string): string {
  return value.replace(
    htmlEscapePattern,
    (character) => htmlEscapes[character]!,
  );
}

export function needLabel(kind: ContactNeedKind): string {
  const option = contactNeedOptions.find((item) => item.kind === kind);
  return option?.label ?? kind;
}

function textValue(value: string): string {
  return value.replace(/\r\n/g, "\n");
}

function htmlValue(value: string): string {
  return escapeHtml(textValue(value)).replace(/\n/g, "<br />");
}

export function buildContactInternalEmail(lead: ContactLead): {
  subject: string;
  text: string;
  html: string;
} {
  const rows: Array<[string, string]> = [
    ["Nome", lead.name],
    ["Empresa", lead.company],
    ["E-mail", lead.email],
  ];

  if (lead.phone !== undefined) {
    rows.push(["Telefone", lead.phone]);
  }

  rows.push(["Tipo de necessidade", needLabel(lead.need)]);
  rows.push(["Contexto", lead.message]);

  const text = rows
    .map(([label, value]) => `${label}: ${textValue(value)}`)
    .join("\n\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${htmlValue(value)}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html lang="pt-BR"><body><p>Novo pedido de diagnóstico pelo site.</p><table>${htmlRows}</table></body></html>`;

  return {
    subject: contactInternalEmailSubject,
    text,
    html,
  };
}
