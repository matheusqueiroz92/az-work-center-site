/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  cleanup();
});

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";

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

describe("Button", () => {
  it('usa type="button" por padrão', () => {
    const { getByRole } = render(<Button>Enviar</Button>);
    const button = getByRole("button", { name: "Enviar" });

    expect(button.getAttribute("type")).toBe("button");
  });

  it("marca aria-busy e impede nova ativação no loading", () => {
    const { getByRole } = render(<Button loading>Enviar</Button>);
    const button = getByRole("button", { name: /carregando/i });

    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button).toHaveProperty("disabled", true);
    expect(button.textContent).toContain("Carregando");
  });

  it("respeita o estado disabled", () => {
    const { getByRole } = render(<Button disabled>Enviar</Button>);

    expect(getByRole("button", { name: "Enviar" })).toHaveProperty(
      "disabled",
      true,
    );
  });

  it("aceita className sem perder o estilo essencial", () => {
    const { getByRole } = render(<Button className="mt-8">Enviar</Button>);
    const className = getByRole("button", { name: "Enviar" }).className;

    expect(className).toContain("bg-primary");
    expect(className).toContain("mt-8");
  });

  it("usa o alvo mínimo de toque no tamanho sm", () => {
    const { getByRole } = render(<Button size="sm">Apoio</Button>);

    expect(getByRole("button", { name: "Apoio" }).className).toContain(
      "min-h-touch",
    );
    expect(getByRole("button", { name: "Apoio" }).className).not.toContain(
      "min-h-10",
    );
  });

  it("mantém o texto do destructive independente da superfície", () => {
    const { getByRole } = render(
      <Button variant="destructive">Excluir</Button>,
    );
    const className = getByRole("button", { name: "Excluir" }).className;

    expect(className).toContain("bg-error");
    expect(className).toContain("text-error-foreground");
    expect(className).not.toContain("text-primary-foreground");
  });
});

describe("ButtonLink", () => {
  it("mantém semântica de link", () => {
    const { container, getByRole } = render(
      <ButtonLink href="/contato">Pedir diagnóstico</ButtonLink>,
    );
    const link = getByRole("link", { name: "Pedir diagnóstico" });

    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/contato");
    expect(container.querySelector("button")).toBeNull();
  });

  it("aceita className sem perder o estilo essencial", () => {
    const { getByRole } = render(
      <ButtonLink href="/" className="mt-8">
        Home
      </ButtonLink>,
    );
    const className = getByRole("link", { name: "Home" }).className;

    expect(className).toContain("bg-primary");
    expect(className).toContain("mt-8");
  });

  it("não abre nova aba por padrão", () => {
    const { getByRole } = render(
      <ButtonLink href="/contato">Contato</ButtonLink>,
    );
    const link = getByRole("link", { name: "Contato" });

    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
    expect(link.textContent).not.toContain("abre em nova aba");
  });

  it("abre nova aba só quando openInNewTab é explícito", () => {
    const { getByRole } = render(
      <ButtonLink href="https://azworkcenter.com.br" openInNewTab>
        Site atual
      </ButtonLink>,
    );
    const link = getByRole("link", { name: /site atual/i });

    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.textContent).toContain("abre em nova aba");
  });

  it("mescla rel adicional na nova aba sem duplicar tokens", () => {
    const { getByRole } = render(
      <ButtonLink
        href="https://azworkcenter.com.br"
        openInNewTab
        rel="nofollow noreferrer"
      >
        Site atual
      </ButtonLink>,
    );
    const tokens = getByRole("link", { name: /site atual/i })
      .getAttribute("rel")
      ?.split(" ");

    expect(tokens).toEqual(
      expect.arrayContaining(["nofollow", "noopener", "noreferrer"]),
    );
    expect(tokens).toEqual([...new Set(tokens)]);
  });
});

describe("TextLink", () => {
  it("usa o destino informado", () => {
    const { getByRole } = render(<TextLink href="/sobre">Sobre</TextLink>);

    expect(getByRole("link", { name: "Sobre" }).getAttribute("href")).toBe(
      "/sobre",
    );
  });

  it("sinaliza nova aba quando solicitada sem rel extra", () => {
    const { getByRole } = render(
      <TextLink href="https://azworkcenter.com.br" openInNewTab>
        Site atual
      </TextLink>,
    );
    const link = getByRole("link", { name: /site atual/i });

    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.textContent).toContain("abre em nova aba");
  });

  it("preserva rel adicional na nova aba sem duplicar tokens", () => {
    const { getByRole } = render(
      <TextLink href="https://azworkcenter.com.br" openInNewTab rel="nofollow">
        Site atual
      </TextLink>,
    );
    const tokens = getByRole("link", { name: /site atual/i })
      .getAttribute("rel")
      ?.split(" ");

    expect(tokens).toEqual(
      expect.arrayContaining(["nofollow", "noopener", "noreferrer"]),
    );
    expect(tokens).toEqual([...new Set(tokens)]);
  });
});

describe("Section", () => {
  it("aplica data-surface corretamente", () => {
    const { container, rerender } = render(
      <Section surface="dark">Conteúdo</Section>,
    );

    expect(
      (container.firstElementChild as HTMLElement).getAttribute("data-surface"),
    ).toBe("dark");

    rerender(<Section surface="brand">Conteúdo</Section>);

    expect(
      (container.firstElementChild as HTMLElement).getAttribute("data-surface"),
    ).toBe("brand");
  });

  it("aceita className sem perder o estilo essencial", () => {
    const { container } = render(<Section className="mt-8">Conteúdo</Section>);
    const className = (container.firstElementChild as HTMLElement).className;

    expect(className).toContain("bg-background");
    expect(className).toContain("mt-8");
  });
});

describe("SectionHeading", () => {
  it("respeita o nível semântico configurado", () => {
    const { container } = render(
      <SectionHeading as="h3" size="h2" title="Método de exemplo" />,
    );

    expect(container.querySelector("h3")?.textContent).toBe(
      "Método de exemplo",
    );
    expect(container.querySelector("h2")).toBeNull();
  });

  it("aceita o tamanho display-lg do hero", () => {
    const { container } = render(
      <SectionHeading as="h1" size="display-lg" title="Headline de exemplo" />,
    );
    const heading = container.querySelector("h1");

    expect(heading?.className).toContain("text-display-lg");
    expect(heading?.textContent).toBe("Headline de exemplo");
  });
});
