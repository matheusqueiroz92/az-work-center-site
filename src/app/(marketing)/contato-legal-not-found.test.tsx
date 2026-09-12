/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ContactPage from "@/app/(marketing)/contato/page";
import MarketingNotFound, {
  metadata as marketingNotFoundMetadata,
} from "@/app/(marketing)/not-found";
import RootNotFound, {
  metadata as rootNotFoundMetadata,
} from "@/app/not-found";
import { about } from "@/content/about";
import { contact, contactChannels } from "@/content/contact";
import { homeCta, homeHero } from "@/content/home";
import { howWeWork } from "@/content/how-we-work";
import { legalPages } from "@/content/legal";
import { navigation } from "@/content/navigation";
import { notFoundContent } from "@/content/not-found";
import { solutionsIndex } from "@/content/solutions-index";
import { listSolutions } from "@/lib/solutions";

afterEach(() => {
  cleanup();
});

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const implementationLeak =
  /nesta versão|enquanto o envio|não há formulário|o site não precisa fechar a venda|não são um campo de formulário/i;

const inventedPendingInfo =
  /cnpj|razão social|rua |avenida |cep\b|horário de atendimento|segunda a sexta|24 horas|resposta em \d+/i;

describe("contato, legal e 404", () => {
  it("centraliza os canais oficiais confirmados", () => {
    const [whatsapp, email] = contactChannels;

    expect(contactChannels).toHaveLength(2);
    expect(whatsapp).toMatchObject({
      type: "whatsapp",
      actionLabel: "Conversar pelo WhatsApp",
      displayValue: "(77) 98833-4370",
      href: "https://wa.me/5577988334370",
      openInNewTab: true,
    });
    expect(email).toMatchObject({
      type: "email",
      actionLabel: "Enviar e-mail",
      displayValue: "contato@azworkcenter.com.br",
      href: "mailto:contato@azworkcenter.com.br",
      openInNewTab: false,
    });
    expect(whatsapp.href).not.toMatch(/[?&]text=/);
  });

  it("oferece ações reais de contato sem formulário", () => {
    const { getAllByRole, getByRole, container } = render(<ContactPage />);
    const text = container.textContent ?? "";
    const whatsapp = getByRole("link", { name: /Conversar pelo WhatsApp/ });
    const email = getByRole("link", { name: "Enviar e-mail" });

    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(getByRole("heading", { level: 1 }).textContent).toBe(contact.title);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
    expect(container.querySelector("textarea")).toBeNull();
    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector("button")).toBeNull();

    expect(whatsapp.getAttribute("href")).toBe("https://wa.me/5577988334370");
    expect(whatsapp.getAttribute("target")).toBe("_blank");
    expect(whatsapp.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
    expect(text).toContain("(77) 98833-4370");

    expect(email.getAttribute("href")).toBe(
      "mailto:contato@azworkcenter.com.br",
    );
    expect(email.getAttribute("target")).toBeNull();
    expect(text).toContain("contato@azworkcenter.com.br");

    expect(text).toContain(contact.channels.title);
    expect(text).toContain(contact.expectation.title);
    expect(text).toContain(contact.prepare.title);
    expect(text).toContain(contact.challenges.title);
    expect(text).toContain(contact.diagnosis.title);
    expect(text).toContain("30 a 45 minutos");
    expect(text).not.toMatch(implementationLeak);
    expect(text).not.toMatch(inventedPendingInfo);
  });

  it("mantém os CTAs de diagnóstico apontando para /contato", () => {
    const diagnosisHrefs = [
      navigation.cta.href,
      homeHero.primaryCta.href,
      homeCta.action.href,
      about.cta.action.href,
      howWeWork.cta.action.href,
      solutionsIndex.cta.action.href,
      ...listSolutions().map((solution) => solution.cta.action.href),
    ];

    expect(diagnosisHrefs.length).toBeGreaterThan(6);
    expect(diagnosisHrefs.every((href) => href === "/contato")).toBe(true);
  });

  it("mantém as políticas inéditas fora da publicação", () => {
    expect(legalPages.privacy.published).toBe(false);
    expect(legalPages.cookies.published).toBe(false);
  });

  it("uniformiza metadata noindex das 404 do grupo e da raiz", () => {
    expect(rootNotFoundMetadata).toEqual(marketingNotFoundMetadata);
    expect(rootNotFoundMetadata).toEqual({
      title: notFoundContent.seo.title,
      description: notFoundContent.seo.description,
      robots: { index: false, follow: false },
    });
    expect(notFoundContent.seo.title).toBe("Página não encontrada");
    expect(notFoundContent.seo.description).toBe(
      "O endereço pode ter mudado ou não existir. Volte ao início ou conheça as soluções da AZ Work Center.",
    );
  });

  it("renderiza 404 raiz com shell, skip target e ações reais", () => {
    const { getAllByRole, getByRole, container } = render(<RootNotFound />);

    expect(getAllByRole("banner")).toHaveLength(1);
    expect(getByRole("contentinfo")).toBeTruthy();
    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelector("main")?.id).toBe("conteudo");
    expect(
      getByRole("link", {
        name: notFoundContent.actions[0]!.label,
      }).getAttribute("href"),
    ).toBe("/");
    expect(
      getByRole("link", {
        name: notFoundContent.actions[1]!.label,
      }).getAttribute("href"),
    ).toBe("/solucoes");
    expect(container.querySelector("form")).toBeNull();
  });

  it("renderiza 404 do grupo sem duplicar Header ou Footer", () => {
    const { getAllByRole, queryByRole, container } = render(
      <MarketingNotFound />,
    );

    expect(queryByRole("banner")).toBeNull();
    expect(queryByRole("contentinfo")).toBeNull();
    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelector("main")?.id).toBe("conteudo");
  });
});
