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

    for (const service of servicePreviews) {
      expect(
        getAllByRole("heading", { level: 3, name: service.title }),
      ).toHaveLength(1);
      expect(section?.textContent).toContain(service.outcome);
      expect(section?.textContent).toContain(service.summary);
      expect(
        getByRole("link", {
          name: `Ver solução de ${service.title}`,
        }).getAttribute("href"),
      ).toBe(service.href);
    }

    expect(container.querySelectorAll("[data-service-offer]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-service-body]")).toHaveLength(4);
    expect(container.querySelector("[data-service-index]")).toBeNull();
    expect(section?.textContent).not.toMatch(/\b0[1-4]\b/);
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
    expect(serviceOfferSource).not.toMatch(/padStart|data-service-index/);
    expect(container.querySelector("[data-service-story-frame]")).toBeTruthy();
    expect(
      container.querySelector("[data-service-story-fallback]"),
    ).toBeTruthy();
    expect(
      container.querySelectorAll("[data-service-story-item]"),
    ).toHaveLength(4);
  });
});
