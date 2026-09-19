/** @vitest-environment jsdom */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/(marketing)/page";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { homeFaqs } from "@/content/faqs";
import {
  homeCta,
  homeEngagement,
  homeFaq,
  homeHero,
  homeMethod,
  homeProblems,
  homeServices,
  homeTrust,
} from "@/content/home";
import { servicePreviews } from "@/content/services";
import { company } from "@/content/company";

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

const homeSourceRoot = join(process.cwd(), "src/components/home");
const pageSource = readFileSync(
  join(process.cwd(), "src/app/(marketing)/page.tsx"),
  "utf8",
);

function readHomeSources() {
  return [
    pageSource,
    ...readdirSync(homeSourceRoot)
      .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
      .filter(
        (file) => !file.endsWith(".test.tsx") && !file.endsWith(".test.ts"),
      )
      .map((file) => readFileSync(join(homeSourceRoot, file), "utf8")),
  ];
}

function renderHome() {
  return render(
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
    </>,
  );
}

describe("HomePage", () => {
  it("expõe um único H1 com a headline aprovada", () => {
    const { getAllByRole, getByRole } = render(<HomePage />);

    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      getByRole("heading", { level: 1, name: homeHero.title }),
    ).toBeTruthy();
  });

  it("marca o main como destino do skip link", () => {
    const { container } = render(<HomePage />);
    const main = container.querySelector("main");

    expect(main).toBeTruthy();
    expect(main?.id).toBe("conteudo");
    expect(main?.getAttribute("tabIndex")).toBe("-1");
    expect(main?.hasAttribute("data-header-overlay")).toBe(true);
  });

  it("ativa o Header overlay na Home e preserva a Hero", () => {
    const { container, getByRole } = renderHome();
    const header = getByRole("banner");
    const main = container.querySelector("main");
    const globalsCss = readFileSync(
      join(process.cwd(), "src/styles/globals.css"),
      "utf8",
    );
    const heroSource = readFileSync(
      join(process.cwd(), "src/components/home/hero-section.tsx"),
      "utf8",
    );
    const layoutSource = readFileSync(
      join(process.cwd(), "src/app/(marketing)/layout.tsx"),
      "utf8",
    );

    expect(main?.hasAttribute("data-header-overlay")).toBe(true);
    expect(header.hasAttribute("data-site-header")).toBe(true);
    expect(header.className).toContain("sticky");
    expect(header.className).not.toContain("fixed");
    expect(globalsCss).toMatch(
      /body:has\(\[data-header-overlay\]\) \[data-site-header\]/,
    );
    expect(globalsCss).toMatch(
      /body:has\(\[data-header-overlay\]\) \[data-hero\]/,
    );
    expect(layoutSource).not.toMatch(/['"]use client['"]/);
    expect(heroSource).not.toContain("data-header-overlay");
    expect(heroSource).toContain('data-hero=""');
  });

  it("mantém os sete H2 na ordem real do DOM", () => {
    const { getAllByRole } = render(<HomePage />);

    expect(
      getAllByRole("heading", { level: 2 }).map(
        (heading) => heading.textContent,
      ),
    ).toEqual([
      homeProblems.title,
      homeServices.title,
      homeMethod.title,
      homeEngagement.title,
      homeTrust.title,
      homeFaq.title,
      homeCta.title,
    ]);
  });

  it("mantém os IDs públicos na ordem real do DOM", () => {
    const { container } = render(<HomePage />);
    const main = container.querySelector("main");
    const expectedIds = [
      "problemas",
      "solucoes",
      "metodo",
      "capacidades",
      "faq",
      "diagnostico",
    ] as const;

    expect(main).toBeTruthy();

    const foundIds = [...(main?.querySelectorAll("[id]") ?? [])]
      .map((node) => node.id)
      .filter((id): id is (typeof expectedIds)[number] =>
        (expectedIds as readonly string[]).includes(id),
      );

    expect(foundIds).toEqual([...expectedIds]);
    expect(container.querySelector("#projetos")).toBeNull();
    expect(container.querySelector("#capacidades")).toBeTruthy();
    expect(container.querySelector("#capacidades")?.textContent).toContain(
      homeEngagement.title,
    );
  });

  it("aponta os CTAs e as soluções para destinos reais", () => {
    const { getAllByRole, getByRole, container } = render(<HomePage />);

    const diagnosticLinks = getAllByRole("link", {
      name: homeHero.primaryCta.label,
    });

    expect(diagnosticLinks.length).toBeGreaterThanOrEqual(2);
    expect(
      diagnosticLinks.every(
        (link) => link.getAttribute("href") === homeCta.action.href,
      ),
    ).toBe(true);
    expect(
      getByRole("link", { name: homeHero.secondaryCta.label }).getAttribute(
        "href",
      ),
    ).toBe(homeHero.secondaryCta.href);

    for (const service of servicePreviews) {
      const solutionLink = getByRole("link", {
        name: `Ver solução de ${service.title}`,
      });

      expect(solutionLink.getAttribute("href")).toBe(service.href);
      expect(solutionLink.hasAttribute("data-service-cta")).toBe(true);
      expect(solutionLink.className).toContain("min-h-touch");
      expect(service.capabilities).toHaveLength(3);
    }

    expect(container.querySelector('a[href="#"]')).toBeNull();
    expect(container.querySelector("[data-service-index]")).toBeNull();
    expect(container.querySelector("#solucoes")?.textContent).not.toMatch(
      /\b0[1-4]\b/,
    );
    expect(container.querySelectorAll("[data-service-cta-arrow]")).toHaveLength(
      4,
    );

    for (const service of servicePreviews) {
      expect(
        container.querySelector(`[data-service-story-item="${service.slug}"]`),
      ).toBeTruthy();
    }

    expect(
      container.querySelector("[data-service-story-fallback]"),
    ).toBeTruthy();
    expect(
      container
        .querySelector(
          "[data-service-story-fallback] [data-service-story-diagram]",
        )
        ?.getAttribute("data-service-story-diagram"),
    ).toBe("sistemas-sob-medida");
    expect(container.querySelector("[data-service-story-frame]")).toBeTruthy();
    expect(container.textContent).toContain("Dados");
    expect(container.textContent).toContain("Módulos");
    expect(container.textContent).toContain("Usuários");
    expect(container.textContent).toContain("Integrações");
  });

  it("renderiza problemas, método, entrega e confiança sem vazio", () => {
    const { container, getByRole, getByText } = render(<HomePage />);

    const problemSection = container.querySelector("#problemas");

    expect(problemSection).toBeTruthy();
    expect(problemSection?.querySelectorAll("summary")).toHaveLength(5);
    expect(
      [...(problemSection?.querySelectorAll("details") ?? [])].every(
        (item) => item.getAttribute("name") === "problemas-home",
      ),
    ).toBe(true);
    expect(
      problemSection
        ?.querySelector("[data-problem-item]")
        ?.hasAttribute("open"),
    ).toBe(true);

    for (const item of homeProblems.items) {
      expect(getByRole("heading", { name: item.title })).toBeTruthy();
      expect(getByText(item.description)).toBeTruthy();
    }

    expect(container.querySelector("#metodo ol")).toBeTruthy();
    expect(container.querySelector("#metodo ol")?.children).toHaveLength(4);

    const methodSection = container.querySelector("#metodo");

    for (const step of homeMethod.steps) {
      expect(methodSection?.textContent).toContain(step.number);
      expect(getByRole("heading", { name: step.title })).toBeTruthy();
    }

    for (const mode of homeEngagement.modes) {
      expect(getByRole("heading", { name: mode.title })).toBeTruthy();
      expect(getByText(mode.description)).toBeTruthy();
    }

    for (const item of homeTrust.items) {
      expect(getByRole("heading", { name: item.title })).toBeTruthy();
    }

    expect(homeTrust.items).toHaveLength(6);
  });

  it("deixa a apresentação dos fundadores para a página Sobre", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("#equipe")).toBeNull();
    expect(container.querySelector("#fundadores")).toBeNull();
    expect(container.textContent).not.toContain("Matheus Queiroz");
    expect(container.textContent).not.toContain("Lucas Queiroz");
  });

  it("mantém as sete respostas do FAQ no HTML inicial", () => {
    const { container, getByRole } = render(<HomePage />);

    expect(homeFaqs).toHaveLength(7);

    for (const item of homeFaqs) {
      expect(getByRole("button", { name: item.question })).toBeTruthy();
      expect(container.textContent).toContain(item.answer);
    }

    expect(container.querySelectorAll("[data-accordion-content]")).toHaveLength(
      7,
    );
    expect(container.querySelector("#faq-home-panel-0")).toBeTruthy();
  });

  it("não publica cases, métricas, depoimentos ou placeholder", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/óticas queiroz|m\.agendy|dentyvo|rebouças/i);
    expect(text).not.toMatch(/em breve|portfólio em construção|provisório/i);
    expect(text).not.toMatch(/depoimento|líder|referência|premiada/i);
    expect(text).not.toMatch(/em desenvolvimento/i);
    expect(text).not.toMatch(/\+300|%\s*de/);
  });

  it("mantém o texto do Hero visível no HTML inicial", () => {
    const { container, getAllByRole, getByRole } = render(<HomePage />);
    const heading = getByRole("heading", { level: 1, name: homeHero.title });

    expect(heading.textContent).toBe(homeHero.title);
    expect(heading.querySelectorAll("span").length).toBe(0);
    expect(container.textContent).toContain(homeHero.eyebrow);
    expect(container.textContent).toContain(homeHero.text);
    const primaryCtas = getAllByRole("link", {
      name: homeHero.primaryCta.label,
    });

    expect(primaryCtas.length).toBeGreaterThanOrEqual(1);
    expect(primaryCtas[0]?.getAttribute("href")).toBe(homeHero.primaryCta.href);
    expect(
      getByRole("link", { name: homeHero.secondaryCta.label }).getAttribute(
        "href",
      ),
    ).toBe(homeHero.secondaryCta.href);
  });

  it("não esconde headings, parágrafos, links ou FAQ com opacity 0", () => {
    const { container } = render(<HomePage />);
    const essentials = container.querySelectorAll(
      "h1, h2, h3, p, a, [data-accordion-content]",
    );

    expect(essentials.length).toBeGreaterThan(10);

    for (const node of essentials) {
      expect(node.getAttribute("style") ?? "").not.toMatch(/opacity:\s*0/);
      expect(node.className).not.toMatch(/\bopacity-0\b/);
    }
  });

  it("marca a mídia da Hero como decorativa e preserva as linhas editoriais", () => {
    const { container } = render(<HomePage />);
    const image = container.querySelector("[data-hero] img");
    const svgs = container.querySelectorAll("svg");

    expect(container.querySelector("[data-hero] picture")).toBeTruthy();
    expect(image).toBeTruthy();
    expect(image?.closest("[aria-hidden='true']")).toBeTruthy();
    expect(image?.getAttribute("alt")).toBe("");
    expect(image?.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("[data-hero] video")).toBeNull();
    expect(container.querySelector("[data-hero-line-overlay]")).toBeNull();
    expect(container.querySelector("[data-hero-line-base]")).toBeNull();
    expect(svgs.length).toBeGreaterThanOrEqual(2);

    for (const svg of svgs) {
      expect(svg.getAttribute("aria-hidden")).toBe("true");
      expect(svg.getAttribute("focusable")).toBe("false");
    }

    expect(
      container.querySelector('[data-editorial-line="process"]'),
    ).toBeTruthy();
    expect(container.querySelector('[data-editorial-line="cta"]')).toBeTruthy();
    expect(
      container.querySelectorAll("[data-editorial-line-base]").length,
    ).toBe(2);
    expect(container.querySelector("[data-service-story-frame]")).toBeTruthy();
  });

  it("preserva Header e Footer ao redor da Home", () => {
    const { getAllByRole, getByRole, getByText } = renderHome();

    expect(getByRole("banner")).toBeTruthy();
    expect(getByRole("contentinfo")).toBeTruthy();
    expect(getByRole("navigation", { name: "Principal" })).toBeTruthy();
    const wordmarks = getAllByRole("link", { name: /AZ Work Center/ });

    expect(wordmarks.length).toBeGreaterThanOrEqual(2);
    expect(wordmarks.every((link) => link.getAttribute("href") === "/")).toBe(
      true,
    );
    expect(getByText(company.descriptor)).toBeTruthy();
  });

  it("não adiciona ilha cliente nem hex nos arquivos da Home", () => {
    const sources = readHomeSources();

    for (const source of sources) {
      expect(source).not.toMatch(/['"]use client['"]/);
      expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(source).not.toMatch(/useEffect|useState|addEventListener\(/);
    }

    expect(pageSource).not.toMatch(/getPublishedProjects/);
    expect(pageSource).not.toMatch(/['"]use client['"]/);

    const servicesSection = readFileSync(
      join(process.cwd(), "src/components/home/services-section.tsx"),
      "utf8",
    );
    const serviceOffer = readFileSync(
      join(process.cwd(), "src/components/home/service-offer.tsx"),
      "utf8",
    );

    expect(servicesSection).not.toMatch(/['"]use client['"]/);
    expect(serviceOffer).not.toMatch(/['"]use client['"]/);
    expect(serviceOffer).toMatch(/data-service-cta/);
    expect(serviceOffer).toMatch(/<details/);
    expect(serviceOffer).toMatch(/name=\{serviceGroupName\}/);
    expect(serviceOffer).not.toMatch(/TextLink/);
  });
});
