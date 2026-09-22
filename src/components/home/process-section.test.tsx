/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProcessSection } from "@/components/home/process-section";
import {
  processNarrativeHeight,
  processNarrativeSrc,
  processNarrativeWidth,
} from "@/components/home/process-narrative";
import { homeMethod } from "@/content/home";

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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    ...props
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

const processSource = readFileSync(
  join(process.cwd(), "src/components/home/process-section.tsx"),
  "utf8",
);
const narrativeSource = readFileSync(
  join(process.cwd(), "src/components/home/process-narrative.tsx"),
  "utf8",
);
const lineSource = readFileSync(
  join(process.cwd(), "src/components/motion/process-line.tsx"),
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
const servicesSource = readFileSync(
  join(process.cwd(), "src/components/home/services-section.tsx"),
  "utf8",
);

describe("ProcessSection", () => {
  it("mantém a copy, a ordem e o resultado das quatro estações", () => {
    const { container, getByRole } = render(<ProcessSection />);
    const section = container.querySelector("#metodo");
    const list = section?.querySelector("ol");
    const items = [...(list?.querySelectorAll("li") ?? [])];

    expect(section?.getAttribute("aria-labelledby")).toBe("metodo-titulo");
    expect(
      getByRole("heading", { level: 2, name: homeMethod.title }),
    ).toBeTruthy();
    expect(section?.textContent).toContain(homeMethod.description);
    expect(section?.textContent).not.toMatch(/não é uma receita/i);
    expect(list).toBeTruthy();
    expect(section?.querySelectorAll("ol")).toHaveLength(1);
    expect(items).toHaveLength(4);

    homeMethod.steps.forEach((step, index) => {
      expect(items[index]?.textContent).toContain(step.number);
      expect(items[index]?.textContent).toContain(step.title);
      expect(items[index]?.textContent).toContain(step.description);
      expect(items[index]?.textContent).toContain(step.result);
      expect(getByRole("heading", { level: 3, name: step.title })).toBeTruthy();
    });

    const results = [...container.querySelectorAll("[data-process-result]")];
    expect(results).toHaveLength(4);
    expect(container.querySelector("[data-process-result-label]")).toBeNull();
    expect(container.textContent).not.toMatch(/RESULTADO/);

    results.forEach((result, index) => {
      expect(result.querySelector(".sr-only")?.textContent).toBe(
        `${homeMethod.resultLabel}: `,
      );
      expect(result.textContent).toContain(homeMethod.steps[index]?.result);
      expect(result.querySelector("[data-process-result-mark]")).toBeTruthy();
    });
  });

  it("usa a arte oficial como narrativa desktop e recortes mobile", () => {
    const { container, getByRole } = render(<ProcessSection />);
    const cta = getByRole("link", { name: homeMethod.cta.label });
    const narrative = container.querySelector("[data-process-narrative]");
    const desktopImage = narrative?.querySelector("img");
    const crops = [...container.querySelectorAll("[data-process-crop]")];
    const hiddenCopy = container.querySelectorAll(
      "[data-process-copy][hidden], [data-process-result][hidden]",
    );

    expect(cta.getAttribute("href")).toBe(homeMethod.cta.href);
    expect(cta.getAttribute("data-process-cta")).toBe("");
    expect(container.querySelectorAll("[data-process-narrative]")).toHaveLength(
      1,
    );
    expect(narrative?.getAttribute("aria-hidden")).toBe("true");
    expect(narrative?.querySelector("svg")).toBeNull();
    expect(desktopImage?.getAttribute("src")).toBe(processNarrativeSrc);
    expect(desktopImage?.getAttribute("width")).toBe(
      String(processNarrativeWidth),
    );
    expect(desktopImage?.getAttribute("height")).toBe(
      String(processNarrativeHeight),
    );
    expect(desktopImage?.getAttribute("alt")).toBe("");
    expect(desktopImage?.getAttribute("aria-hidden")).toBe("true");
    expect(crops).toHaveLength(4);
    expect(crops.map((crop) => crop.getAttribute("data-process-crop"))).toEqual(
      ["1", "2", "3", "4"],
    );
    expect(
      crops.every((crop) => crop.getAttribute("aria-hidden") === "true"),
    ).toBe(true);
    expect(crops.every((crop) => crop.getAttribute("tabindex") === null)).toBe(
      true,
    );
    expect(
      crops.every(
        (crop) =>
          crop.querySelector("img")?.getAttribute("src") ===
          processNarrativeSrc,
      ),
    ).toBe(true);
    expect(container.querySelectorAll("[data-process-scene]")).toHaveLength(0);
    expect(
      container.querySelectorAll(
        "[data-process-narrative] a, [data-process-narrative] button, [data-process-mark] a, [data-process-mark] button",
      ),
    ).toHaveLength(0);
    expect(container.querySelectorAll("#metodo [tabindex]")).toHaveLength(0);
    expect(container.querySelector("button")).toBeNull();
    expect(hiddenCopy).toHaveLength(0);
    expect(
      container.querySelector("[data-process-copy]")?.className,
    ).not.toMatch(/opacity-0|invisible|sr-only/);
    expect(globalsCss).toMatch(
      /\[data-process-narrative\] \{[\s\S]*display: none/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 1024px\) \{[\s\S]*\[data-process-mark\] \{[\s\S]*display: none/,
    );
  });

  it("permanece Server, com timeline própria e sem duplicar o texto", () => {
    const { container } = render(<ProcessSection />);

    expect(processSource).not.toMatch(/['"]use client['"]/);
    expect(narrativeSource).not.toMatch(/['"]use client['"]/);
    expect(lineSource).not.toMatch(/['"]use client['"]/);
    expect(processSource).not.toMatch(/from ["']motion/);
    expect(narrativeSource).not.toMatch(/from ["']motion/);
    expect(processSource).not.toMatch(/from ["']framer-motion["']/);
    expect(processSource).not.toMatch(/tabIndex|tabindex/);
    expect(processSource).not.toMatch(/rotateY|backface|flip|perspective/);
    expect(processSource).not.toMatch(/carousel|overflow-x-auto/);
    expect(container.querySelectorAll("[data-process-rail]")).toHaveLength(1);
    expect(container.querySelectorAll("[data-process-step]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-process-progress]")).toHaveLength(
      1,
    );
    const fill = container.querySelector("[data-process-progress-fill]");
    const base = container.querySelector("[data-process-progress-base]");
    expect(base?.querySelector("[data-process-progress-rail]")).toBeTruthy();
    expect(fill?.querySelector("[data-process-progress-rail]")).toBeTruthy();
    expect(fill?.querySelectorAll("[data-process-node]")).toHaveLength(4);
    expect(base?.querySelectorAll("[data-process-node]")).toHaveLength(4);
    expect(fill?.querySelector('[data-process-node="1"]')).toBeTruthy();
    expect(fill?.querySelector('[data-process-node="2"]')).toBeTruthy();
    expect(fill?.querySelector('[data-process-node="3"]')).toBeTruthy();
    expect(fill?.querySelector('[data-process-node="4"]')).toBeTruthy();
    expect(globalsCss).toMatch(/view-timeline-name:\s*--process-progress/);
    expect(globalsCss).toMatch(
      /\[data-process-progress-fill\][\s\S]*contain 42% exit 52%/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-progress-fill\][\s\S]*clip-path: inset\(0 0 0 0\)/,
    );
    expect(globalsCss).toMatch(/animation-name: process-progress-reveal/);
    expect(globalsCss).toMatch(
      /@keyframes process-number-1 \{[\s\S]*12\.5%[\s\S]*14%/,
    );
    expect(globalsCss).toMatch(
      /@keyframes process-number-2 \{[\s\S]*37\.5%[\s\S]*39%/,
    );
    expect(globalsCss).toMatch(
      /@keyframes process-number-3 \{[\s\S]*62\.5%[\s\S]*64%/,
    );
    expect(globalsCss).toMatch(
      /@keyframes process-number-4 \{[\s\S]*87\.5%[\s\S]*89%/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-title\][\s\S]*contain 42% exit 52%/,
    );
    expect(globalsCss).toMatch(/\[data-process-node="1"\][\s\S]*left: 12\.5%/);
    expect(globalsCss).toMatch(/\[data-process-node="2"\][\s\S]*left: 37\.5%/);
    expect(globalsCss).toMatch(/\[data-process-node="3"\][\s\S]*left: 62\.5%/);
    expect(globalsCss).toMatch(/\[data-process-node="4"\][\s\S]*left: 87\.5%/);
    expect(globalsCss).toMatch(/#metodo \{[\s\S]*section-space-compact/);
    expect(globalsCss).toMatch(
      /\[data-process-rail\] \{[\s\S]*flex-direction: column/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 1024px\) \{[\s\S]*grid-template-columns: repeat\(4/,
    );
    expect(globalsCss).not.toMatch(/animation-name: process-node-activate/);
    expect(globalsCss).not.toMatch(/animation-name: process-mark-arrive/);
    expect(globalsCss).toMatch(
      /prefers-reduced-motion: no-preference[\s\S]*--process-progress/,
    );
    expect(globalsCss).toMatch(
      /@media \(scripting: none\) \{[\s\S]*\[data-process-narrative\]/,
    );
    expect(globalsCss).toMatch(/\[data-process-cta\]:focus-visible/);
    expect(globalsCss).toMatch(
      /prefers-reduced-motion: reduce[\s\S]*\[data-process-crop="1"\] img/,
    );
  });

  it("revela o trilho mobile com uma única máscara vertical", () => {
    const { container } = render(<ProcessSection />);
    const mobileSet = container.querySelector("[data-process-mobile-set]");
    const mobileTrack = container.querySelector("[data-process-mobile-track]");
    const mobileBase = container.querySelector("[data-process-mobile-base]");
    const mobileFill = container.querySelector("[data-process-mobile-fill]");

    expect(mobileSet).toBeTruthy();
    expect(mobileTrack?.contains(mobileBase)).toBe(true);
    expect(mobileTrack?.contains(mobileFill)).toBe(true);
    expect(
      mobileBase?.querySelector("[data-process-mobile-rail]"),
    ).toBeTruthy();
    expect(
      mobileFill?.querySelector("[data-process-mobile-rail]"),
    ).toBeTruthy();
    expect(
      mobileBase?.querySelectorAll("[data-process-mobile-node]"),
    ).toHaveLength(4);
    expect(
      mobileFill?.querySelectorAll("[data-process-mobile-node]"),
    ).toHaveLength(4);
    expect(
      mobileFill?.querySelector('[data-process-mobile-node="1"]'),
    ).toBeTruthy();
    expect(
      mobileFill?.querySelector('[data-process-mobile-node="2"]'),
    ).toBeTruthy();
    expect(
      mobileFill?.querySelector('[data-process-mobile-node="3"]'),
    ).toBeTruthy();
    expect(
      mobileFill?.querySelector('[data-process-mobile-node="4"]'),
    ).toBeTruthy();

    expect(globalsCss).toMatch(
      /\[data-process-mobile-set\] \{[\s\S]*view-timeline-name:\s*--process-progress-mobile/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-mobile-set\] \{[\s\S]*view-timeline-axis:\s*block/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-mobile-fill\] \{[\s\S]*clip-path: inset\(0 0 0 0\)/,
    );
    expect(globalsCss).toMatch(/@keyframes process-mobile-reveal/);
    expect(globalsCss).toMatch(
      /@keyframes process-mobile-reveal \{[\s\S]*inset\(0 0 100% 0\)[\s\S]*inset\(0 0 0 0\)/,
    );
    expect(globalsCss).toMatch(
      /@media \(max-width: 1023px\) \{[\s\S]*\[data-process-mobile-fill\][\s\S]*animation-name: process-mobile-reveal[\s\S]*animation-timeline: --process-progress-mobile[\s\S]*animation-range: entry 45% cover 66%/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 1024px\) \{[\s\S]*\[data-process-mobile-track\] \{[\s\S]*display: none/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 1024px\) \{[\s\S]*contain 42% exit 52%/,
    );
    expect(globalsCss).not.toMatch(/animation-name: process-mobile-node/);
    expect(globalsCss).not.toMatch(
      /\[data-process-mobile-node(?:="\d")?\][\s\S]{0,120}animation-name/,
    );
    expect(globalsCss).toMatch(
      /prefers-reduced-motion: reduce[\s\S]*\[data-process-mobile-fill\] \{[\s\S]*clip-path: inset\(0 0 0 0\)[\s\S]*animation: none/,
    );
    expect(globalsCss).toMatch(
      /@media \(scripting: none\) \{[\s\S]*\[data-process-mobile-fill\]/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-crop="1"\] img \{[\s\S]*translate3d\(0, -50%, 0\)/,
    );
    expect(globalsCss).toMatch(
      /\[data-process-crop="4"\] img \{[\s\S]*translate3d\(-75%, -50%, 0\)/,
    );
    expect(processSource).not.toMatch(/addEventListener/);
    expect(lineSource).not.toMatch(/addEventListener/);
    expect(processSource).not.toMatch(/['"]use client['"]/);
    expect(lineSource).not.toMatch(/from ["']motion/);
  });

  it("não altera Hero, Header, ProblemSection ou ServicesSection", () => {
    expect(heroSource).not.toContain("homeMethod");
    expect(headerSource).not.toContain("homeMethod");
    expect(problemSource).not.toContain("homeMethod");
    expect(servicesSource).not.toContain("homeMethod");
    expect(heroSource).not.toContain("data-process-");
    expect(headerSource).not.toContain("data-process-");
    expect(problemSource).not.toContain("data-process-");
    expect(servicesSource).not.toContain("data-process-");
  });
});
