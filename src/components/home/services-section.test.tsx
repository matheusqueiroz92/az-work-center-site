/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ServicesSection } from "@/components/home/services-section";
import { serviceGroupName } from "@/components/home/service-offer";
import { homeServices } from "@/content/home";
import { servicePreviews } from "@/content/services";

afterEach(() => {
  cleanup();
});

const servicesSectionSource = readFileSync(
  join(process.cwd(), "src/components/home/services-section.tsx"),
  "utf8",
);
const serviceOfferSource = readFileSync(
  join(process.cwd(), "src/components/home/service-offer.tsx"),
  "utf8",
);
const globalsCss = readFileSync(
  join(process.cwd(), "src/styles/globals.css"),
  "utf8",
);
const heroSource = readFileSync(
  join(process.cwd(), "src/components/home/hero-section.tsx"),
  "utf8",
);
const headerSource = readFileSync(
  join(process.cwd(), "src/components/layout/site-header.tsx"),
  "utf8",
);
const problemSource = readFileSync(
  join(process.cwd(), "src/components/home/problem-section.tsx"),
  "utf8",
);
const processSource = readFileSync(
  join(process.cwd(), "src/components/home/process-section.tsx"),
  "utf8",
);

function exclusiveDetailsSupported() {
  const first = document.createElement("details");
  const second = document.createElement("details");
  const group = "probe-exclusive-details";

  first.setAttribute("name", group);
  second.setAttribute("name", group);
  first.append(document.createElement("summary"));
  second.append(document.createElement("summary"));
  document.body.append(first, second);
  first.open = true;
  second.open = true;
  const supported = isExclusiveAccordionPair(first, second);
  first.remove();
  second.remove();
  return supported;
}

function isExclusiveAccordionPair(
  first: HTMLDetailsElement,
  second: HTMLDetailsElement,
) {
  return first.open === false && second.open === true;
}

describe("ServicesSection", () => {
  it("usa disclosure nativo exclusivo sem duplicar o conteúdo", () => {
    const { container, getByRole, getAllByRole } = render(<ServicesSection />);
    const section = container.querySelector("#solucoes");
    const items = [...(section?.querySelectorAll("details") ?? [])];
    const summaries = section?.querySelectorAll("summary") ?? [];

    expect(section).toBeTruthy();
    expect(serviceGroupName).toBe("solucoes-home");
    expect(items).toHaveLength(4);
    expect(summaries).toHaveLength(4);
    expect(items[0]?.hasAttribute("open")).toBe(true);
    expect(
      [...items].slice(1).every((item) => !item.hasAttribute("open")),
    ).toBe(true);
    expect(
      items.every((item) => item.getAttribute("name") === serviceGroupName),
    ).toBe(true);
    expect(
      getByRole("heading", { level: 2, name: homeServices.title }),
    ).toBeTruthy();
    expect(section?.textContent).toContain(homeServices.description);

    for (const service of servicePreviews) {
      expect(
        getAllByRole("heading", { level: 3, name: service.title }),
      ).toHaveLength(1);
      expect(section?.textContent).toContain(service.outcome);
      expect(section?.textContent).not.toContain(service.summary);
      expect(section?.textContent).toContain(homeServices.frontsLabel);
      expect(
        getByRole("link", {
          name: `${homeServices.ctaLabel} de ${service.title}`,
        }).getAttribute("href"),
      ).toBe(service.href);
      expect(
        getByRole("link", {
          name: `${homeServices.ctaLabel} de ${service.title}`,
        }).textContent,
      ).toContain(homeServices.ctaLabel);
    }

    expect(container.querySelectorAll("[data-service-offer]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-service-body]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-service-copy]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-service-fronts]")).toHaveLength(4);
    expect(container.querySelector("[data-service-index]")).toBeNull();
    expect(section?.textContent).not.toMatch(/\b0[1-4]\b/);
    expect(section?.textContent).not.toMatch(/MVPs/);
    expect(section?.textContent).not.toMatch(/Growth/);
    expect(section?.textContent).toContain("Produtos digitais");
    expect(section?.textContent).toContain("Web e vendas digitais");
    expect(section?.textContent).not.toContain(
      "Operação centralizada, menos retrabalho e mais controle.",
    );
    expect(section?.textContent).not.toContain(
      "Reduzir tarefas repetitivas e acelerar atendimento, análise e decisão.",
    );
    expect(container.querySelector("summary h3")).toBeNull();
    expect(container.querySelector("article h3")).toBeNull();
  });

  it("abre um item por vez e permite fechar o item atual", async () => {
    const user = userEvent.setup();
    const { container } = render(<ServicesSection />);
    const items = [
      ...container.querySelectorAll<HTMLDetailsElement>("#solucoes details"),
    ];
    const summaries = [...container.querySelectorAll("#solucoes summary")];

    expect(items[0]?.open).toBe(true);
    expect(summaries[1]).toBeTruthy();

    await user.click(summaries[1]!);

    if (exclusiveDetailsSupported()) {
      expect(items[0]?.open).toBe(false);
      expect(items[1]?.open).toBe(true);
      expect(items.slice(2).every((item) => !item.open)).toBe(true);
    } else {
      expect(items[1]?.open).toBe(true);
    }

    await user.click(summaries[1]!);
    expect(items[1]?.open).toBe(false);
  });

  it("permanece Server e preserva o painel sticky sem nova ilha Client", () => {
    const { container } = render(<ServicesSection />);

    expect(servicesSectionSource).not.toMatch(/['"]use client['"]/);
    expect(serviceOfferSource).not.toMatch(/['"]use client['"]/);
    expect(serviceOfferSource).not.toMatch(
      /useState|useEffect|addEventListener\(/,
    );
    expect(serviceOfferSource).toContain("<details");
    expect(serviceOfferSource).toContain("<summary");
    expect(serviceOfferSource).toContain("name={serviceGroupName}");
    expect(serviceOfferSource).toContain("data-service-story-item");
    expect(serviceOfferSource).toContain("data-service-copy");
    expect(serviceOfferSource).toContain("data-service-fronts");
    expect(serviceOfferSource).not.toMatch(/padStart|data-service-index/);
    expect(serviceOfferSource).not.toMatch(/border-l/);
    expect(serviceOfferSource).not.toMatch(/service\.summary/);
    expect(globalsCss).not.toMatch(
      /\[data-service-capabilities\][\s\S]{0,80}border-l/,
    );
    expect(globalsCss).toMatch(/\[data-service-capability\]::before/);
    expect(globalsCss).toMatch(/\[data-service-summary\]::before/);
    expect(globalsCss).toMatch(/\[data-service-copy\]::before/);
    expect(globalsCss).toMatch(
      /\[data-service-cta\]:focus-visible \{[\s\S]*outline: 3px/,
    );
    expect(container.querySelector("[data-service-story-frame]")).toBeTruthy();
    expect(
      container.querySelector("[data-service-story-fallback]"),
    ).toBeTruthy();
    expect(
      container.querySelectorAll("[data-service-story-item]"),
    ).toHaveLength(4);
    expect(
      container.querySelectorAll(
        "[data-service-story-fallback] a, [data-service-story-fallback] button, [data-service-story-fallback] [tabindex]",
      ).length,
    ).toBe(0);
  });

  it("não altera Hero, Header, ProblemSection ou ProcessSection", () => {
    expect(heroSource).not.toContain("homeServices");
    expect(headerSource).not.toContain("homeServices");
    expect(problemSource).not.toContain("homeServices");
    expect(processSource).not.toContain("homeServices");
    expect(heroSource).not.toContain("Frentes de entrega");
    expect(headerSource).not.toContain("Conhecer solução");
    expect(problemSource).not.toContain("data-service-");
    expect(processSource).not.toContain("data-service-");
  });
});
