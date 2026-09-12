/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MobileNav } from "@/components/layout/mobile-nav";
import { navigation } from "@/content/navigation";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

vi.mock("next/link", () => ({
  default: function MockLink({
    href,
    children,
    onClick,
    ...props
  }: ComponentProps<"a">) {
    return (
      <a
        href={href}
        {...props}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  },
}));

function renderMobileNav() {
  return render(<MobileNav items={navigation.primary} cta={navigation.cta} />);
}

describe("MobileNav", () => {
  it("abre e fecha o menu pelo disparador e pelo botão de fechar", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = renderMobileNav();
    const trigger = getByRole("button", { name: "Abrir menu" });

    expect(trigger.className).toContain("size-touch");
    expect(queryByRole("dialog")).toBeNull();

    await user.click(trigger);

    const dialog = getByRole("dialog", { name: "Menu de navegação" });
    expect(dialog).toBeTruthy();
    const closeButton = getByRole("button", { name: "Fechar menu" });
    expect(closeButton.className).toContain("size-touch");
    expect(
      getByRole("link", { name: "Solicitar diagnóstico" }).getAttribute("href"),
    ).toBe("/contato");

    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.click(closeButton);

    expect(queryByRole("dialog")).toBeNull();
  });

  it("fecha com Escape e devolve o foco ao disparador", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = renderMobileNav();
    const trigger = getByRole("button", { name: "Abrir menu" });

    await user.click(trigger);
    expect(getByRole("dialog")).toBeTruthy();

    await user.keyboard("{Escape}");

    expect(queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("fecha o Sheet ao clicar em um destino interno", async () => {
    const user = userEvent.setup();
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { getByRole, queryByRole } = renderMobileNav();

    await user.click(getByRole("button", { name: "Abrir menu" }));
    expect(getByRole("dialog", { name: "Menu de navegação" })).toBeTruthy();

    await user.click(getByRole("link", { name: "Soluções" }));

    expect(queryByRole("dialog")).toBeNull();
    expect(queryByRole("link", { name: "Soluções" })).toBeNull();
    expect(queryByRole("link", { name: "Solicitar diagnóstico" })).toBeNull();
    expect(consoleError).not.toHaveBeenCalled();
  });
});
