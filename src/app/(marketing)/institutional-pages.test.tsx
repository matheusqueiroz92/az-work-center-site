/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HowWeWorkPage from "@/app/(marketing)/como-trabalhamos/page";
import AboutPage from "@/app/(marketing)/sobre/page";
import { about } from "@/content/about";
import { howWeWork } from "@/content/how-we-work";

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

describe("institutional pages", () => {
  it("explica o método sem inventar SLA, preço ou prazo", () => {
    const { getAllByRole, container } = render(<HowWeWorkPage />);
    const text = container.textContent ?? "";

    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelector("main")?.id).toBe("conteudo");
    expect(text).toContain(howWeWork.diagnosis.text);
    expect(text).toContain(howWeWork.discovery.title);
    expect(text).not.toMatch(/tabela de preço|em breve/i);
    expect(text).not.toMatch(/\d+\s*dias úteis/i);
  });

  it("conta a história familiar sem foto, currículo ou credencial inventada", () => {
    const { getAllByRole, getByText, container, queryByText } = render(
      <AboutPage />,
    );
    const text = container.textContent ?? "";

    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(getByText(about.sections[0]!.title)).toBeTruthy();
    expect(text).toContain("abril de 2020");
    expect(text).toContain("Gildásio");
    expect(text).toContain("AZ News");
    expect(text).toContain("não atua na operação tecnológica");
    expect(text).toContain(
      "O AZ News é uma vertente de comunicação e mídia ligada à trajetória da AZ Work Center, conduzida por Gildásio e com operação própria.",
    );
    expect(text).toContain(
      "não integra o portfólio de soluções tecnológicas apresentado neste site",
    );
    expect(text).not.toMatch(/não é cliente da AZ Work Center/i);
    expect(queryByText(/bacharel|certificado|linkedin/i)).toBeNull();
    expect(container.querySelector("img")).toBeNull();
    expect(text).not.toMatch(/currículo|especialista número/i);
  });
});
