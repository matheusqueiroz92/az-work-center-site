/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AccordionList } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { showcaseFaqItems } from "@/content/showcase-faq";

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

describe("Breadcrumb", () => {
  it("usa nav, lista e aria-current na página atual", () => {
    const { getByRole, container } = render(
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Soluções", href: "/solucoes" },
        ]}
        current="Sistemas sob medida"
      />,
    );

    const nav = getByRole("navigation", { name: "Navegação estrutural" });
    const current = container.querySelector('[aria-current="page"]');

    expect(nav.querySelector("ol")).toBeTruthy();
    expect(getByRole("link", { name: "Início" }).getAttribute("href")).toBe(
      "/",
    );
    expect(getByRole("link", { name: "Soluções" }).getAttribute("href")).toBe(
      "/solucoes",
    );
    expect(current?.textContent).toBe("Sistemas sob medida");
    expect(
      [...nav.querySelectorAll('[aria-hidden="true"]')].every(
        (separator) => separator.textContent === "/",
      ),
    ).toBe(true);
  });
});

describe("AccordionList", () => {
  it("mantém a resposta no DOM fechada e atualiza ARIA ao abrir", async () => {
    const user = userEvent.setup();
    const firstItem = showcaseFaqItems[0];

    if (!firstItem) {
      throw new Error("Amostra do Accordion precisa de ao menos um item.");
    }

    const { getByRole, container } = render(
      <AccordionList items={showcaseFaqItems} idPrefix="faq-teste" />,
    );
    const trigger = getByRole("button", {
      name: firstItem.question,
    });
    const content = container.querySelector("[data-accordion-content]");

    expect(trigger.closest("h3")).toBeTruthy();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(container.textContent).toContain(firstItem.answer);
    expect(content).toBeTruthy();
    expect(content?.getAttribute("data-state")).toBe("closed");
    expect(content?.className).toContain("data-[state=closed]:hidden");
    expect(content?.id).toBe("faq-teste-panel-0");
    expect(trigger.getAttribute("aria-controls")).toBe(content?.id);
    expect(document.getElementById(content?.id ?? "")).toBe(content);

    trigger.focus();
    await user.keyboard("{Enter}");

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const controls = trigger.getAttribute("aria-controls");
    expect(controls).toBe(content?.id);
    expect(document.getElementById(controls ?? "")).toBe(content);
    expect(getByRole("region", { name: firstItem.question })).toBeTruthy();
    expect(content?.getAttribute("data-state")).toBe("open");

    await user.keyboard("{Enter}");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(container.textContent).toContain(firstItem.answer);
    expect(content?.isConnected).toBe(true);
    expect(content?.getAttribute("data-state")).toBe("closed");
    expect(trigger.getAttribute("aria-controls")).toBe(content?.id);
    expect(document.getElementById(content?.id ?? "")).toBe(content);
  });

  it("preserva classes e tokens essenciais", () => {
    const { container } = render(
      <AccordionList items={showcaseFaqItems} className="mt-8" />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.className).toContain("border-t");
    expect(root.className).toContain("mt-8");
  });
});
