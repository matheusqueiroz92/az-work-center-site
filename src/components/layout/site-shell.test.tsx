/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DesktopNav } from "@/components/layout/desktop-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/content/company";
import { listFooterItems } from "@/content/navigation";

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

describe("SiteHeader", () => {
  it("usa semântica de header e navegação principal", () => {
    const { getByRole } = render(<SiteHeader />);

    expect(getByRole("banner")).toBeTruthy();
    expect(getByRole("navigation", { name: "Principal" })).toBeTruthy();
  });

  it("expõe o wordmark acessível para a Home", () => {
    const { getByRole } = render(<SiteHeader />);
    const wordmark = getByRole("link", { name: company.name });

    expect(wordmark.getAttribute("href")).toBe("/");
    expect(wordmark.textContent).toBe(company.name);
  });

  it("aponta o CTA para o diagnóstico", () => {
    const { getByRole } = render(<SiteHeader />);
    const cta = getByRole("link", { name: "Solicitar diagnóstico" });

    expect(cta.getAttribute("href")).toBe("/contato");
  });

  it("preserva classes essenciais do chrome", () => {
    const { getByRole } = render(<SiteHeader className="mt-8" />);
    const className = getByRole("banner").className;

    expect(className).toContain("sticky");
    expect(className).toContain("border-b");
    expect(className).toContain("mt-8");
    expect(className).not.toContain("shadow");
  });
});

describe("DesktopNav", () => {
  it("lista os destinos principais sem âncora vazia", () => {
    const { getByRole, container } = render(<DesktopNav />);
    const nav = getByRole("navigation", { name: "Principal" });
    const hrefs = [...nav.querySelectorAll("a")].map((link) =>
      link.getAttribute("href"),
    );

    expect(hrefs).toEqual([
      "/solucoes",
      "/projetos",
      "/como-trabalhamos",
      "/sobre",
      "/contato",
    ]);
    expect(container.querySelector('a[href="#"]')).toBeNull();
  });
});

describe("SiteFooter", () => {
  it("mostra somente informações aprovadas", () => {
    const { getByRole, getByText } = render(<SiteFooter />);

    expect(getByRole("contentinfo")).toBeTruthy();
    expect(getByText(company.descriptor)).toBeTruthy();
    expect(getByText(company.tagline)).toBeTruthy();
    expect(getByText(company.regionLabel)).toBeTruthy();
    expect(
      getByText(new RegExp(`© ${new Date().getFullYear()} ${company.name}`)),
    ).toBeTruthy();
  });

  it("não exibe dados empresariais pendentes", () => {
    const { container, queryByRole } = render(<SiteFooter />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/cnpj/i);
    expect(text).not.toMatch(/whatsapp/i);
    expect(text).not.toMatch(/instagram|linkedin|facebook/i);
    expect(text).not.toMatch(/@/);
    expect(text).not.toMatch(/\(\d{2}\)\s*\d/);
    expect(
      queryByRole("link", { name: /e-mail|telefone|endereço/i }),
    ).toBeNull();
  });

  it("reutiliza os destinos legais", () => {
    const { getByRole } = render(<SiteFooter />);

    expect(
      getByRole("link", { name: "Privacidade" }).getAttribute("href"),
    ).toBe("/privacidade");
    expect(getByRole("link", { name: "Cookies" }).getAttribute("href")).toBe(
      "/cookies",
    );
  });

  it("não repete destinos nem labels de navegação", () => {
    const { getByRole } = render(<SiteFooter />);
    const footer = getByRole("contentinfo");
    const hrefs = [...footer.querySelectorAll("a")]
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => href !== null && href !== "/");
    const labels = [...footer.querySelectorAll("a")]
      .map((link) => link.textContent?.trim())
      .filter(
        (label): label is string => Boolean(label) && label !== company.name,
      );

    expect(hrefs).toEqual([...new Set(hrefs)]);
    expect(labels).toEqual([...new Set(labels)]);
    expect(hrefs).toEqual(listFooterItems().map((item) => item.href));
  });

  it("não apresenta preferências de cookies", () => {
    const { queryByRole, queryByText } = render(<SiteFooter />);

    expect(queryByText("Preferências de cookies")).toBeNull();
    expect(
      queryByRole("button", { name: /preferências de cookies/i }),
    ).toBeNull();
  });
});
