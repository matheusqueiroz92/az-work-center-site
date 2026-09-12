import { describe, expect, it } from "vitest";

import {
  listFooterItems,
  listNavigationItems,
  navigation,
} from "@/content/navigation";

const expectedHrefs = ["/solucoes", "/como-trabalhamos", "/sobre", "/contato"];

describe("navigation", () => {
  it("contém os destinos públicos atuais", () => {
    const hrefs = listNavigationItems().map((item) => item.href);

    for (const href of expectedHrefs) {
      expect(hrefs).toContain(href);
    }
  });

  it("não aponta para Projetos nem para políticas ainda não aprovadas", () => {
    const hrefs = listNavigationItems().map((item) => item.href);

    expect(hrefs).not.toContain("/projetos");
    expect(hrefs).not.toContain("/privacidade");
    expect(hrefs).not.toContain("/cookies");
  });

  it("não usa href vazio nem âncora genérica", () => {
    for (const item of listNavigationItems()) {
      expect(item.href).not.toBe("#");
      expect(item.href).not.toBe("");
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href.includes("#")).toBe(false);
      expect(item.label.trim()).not.toBe("");
    }
  });

  it("define o CTA principal para o diagnóstico", () => {
    expect(navigation.cta).toEqual({
      label: "Solicitar diagnóstico",
      href: "/contato",
    });
  });

  it("mantém a navegação do Header sem o destino de Projetos", () => {
    expect(navigation.primary.map((item) => item.href)).toEqual([
      "/solucoes",
      "/como-trabalhamos",
      "/sobre",
    ]);
  });

  it("não repete href nem label entre os grupos públicos do Footer", () => {
    const items = listFooterItems();
    const hrefs = items.map((item) => item.href);
    const labels = items.map((item) => item.label);

    expect(hrefs).toEqual([...new Set(hrefs)]);
    expect(labels).toEqual([...new Set(labels)]);
    expect(hrefs).toEqual([
      "/solucoes",
      "/como-trabalhamos",
      "/sobre",
      "/contato",
    ]);
    expect(navigation.footer.work.map((item) => item.label)).toEqual([
      "Soluções",
    ]);
    expect(navigation.footer.company.map((item) => item.label)).toEqual([
      "Como trabalhamos",
      "Sobre",
      "Contato",
    ]);
    expect(navigation.footer.legal).toEqual([]);
  });
});
