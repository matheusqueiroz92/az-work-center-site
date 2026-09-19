/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ProblemSection } from "@/components/home/problem-section";
import { homeProblems } from "@/content/home";

afterEach(() => {
  cleanup();
});

const problemSectionSource = readFileSync(
  join(process.cwd(), "src/components/home/problem-section.tsx"),
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

describe("ProblemSection", () => {
  it("preserva o id público e o conteúdo aprovado", () => {
    const { container, getByRole } = render(<ProblemSection />);
    const section = container.querySelector("#problemas");
    const summaries = section?.querySelectorAll("summary") ?? [];
    const items = [...(section?.querySelectorAll("details") ?? [])];

    expect(section).toBeTruthy();
    expect(summaries).toHaveLength(5);
    expect(items).toHaveLength(5);
    expect(items[0]?.hasAttribute("open")).toBe(true);
    expect(
      [...items].slice(1).every((item) => !item.hasAttribute("open")),
    ).toBe(true);
    expect(
      items.every((item) => item.getAttribute("name") === "problemas-home"),
    ).toBe(true);
    expect(
      getByRole("heading", { level: 2, name: homeProblems.title }),
    ).toBeTruthy();

    for (const [index, item] of homeProblems.items.entries()) {
      expect(summaries[index]?.textContent).toContain(
        String(index + 1).padStart(2, "0"),
      );
      expect(summaries[index]?.textContent).toContain(item.title);
      expect(getByRole("heading", { level: 3, name: item.title })).toBeTruthy();
      expect(section?.textContent).toContain(item.description);
    }
  });

  it("abre um item por vez e permite fechar o item atual", async () => {
    const user = userEvent.setup();
    const { container } = render(<ProblemSection />);
    const items = [
      ...container.querySelectorAll<HTMLDetailsElement>("details"),
    ];
    const summaries = [...container.querySelectorAll("summary")];

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

  it("permanece Server, sem imagens provisórias e sem ilha Client", () => {
    const { container } = render(<ProblemSection />);

    expect(problemSectionSource).not.toMatch(/['"]use client['"]/);
    expect(problemSectionSource).not.toMatch(
      /useState|useEffect|addEventListener\(/,
    );
    expect(problemSectionSource).toContain("<details");
    expect(problemSectionSource).toContain("<summary");
    expect(problemSectionSource).toContain("name={problemGroupName}");
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("[src]")).toBeNull();
    expect(container.querySelector("summary h3")).toBeNull();
    expect(container.querySelector("h3")).toBeNull();
    expect(container.textContent).not.toMatch(/provisório|placeholder|lorem/i);
  });
});
