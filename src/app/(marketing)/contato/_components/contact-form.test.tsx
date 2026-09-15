/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import path from "node:path";

import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/app/(marketing)/contato/_components/contact-form";
import { contact, contactNeedOptions } from "@/content/contact";
import type { ContactActionState } from "@/lib/contact-action-state";

const { submitContactAction } = vi.hoisted(() => ({
  submitContactAction: vi.fn(),
}));

vi.mock("@/app/(marketing)/contato/actions", () => ({
  submitContactAction,
}));

afterEach(() => {
  cleanup();
  submitContactAction.mockReset();
  submitContactAction.mockResolvedValue({ status: "unavailable" });
});

const filledValues = {
  name: "Maria Santos",
  company: "Empresa Exemplo",
  email: "maria@empresa.com.br",
  phone: "77988887777",
  need: contactNeedOptions[0]!.kind,
  message:
    "Controlamos pedidos em planilha e o estoque em outro sistema, com conferência manual todo dia.",
};

const validationState = {
  status: "validation",
  fieldErrors: {
    name: ["Informe o nome com 2 a 80 caracteres."],
    email: ["Informe um e-mail válido."],
  },
  formError:
    "Não foi possível validar o envio. Verifique os campos e tente de novo.",
} satisfies ContactActionState;

function fieldValue(container: HTMLElement, field: string) {
  return (
    container.querySelector(`#contato-campo-${field}`) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  )?.value;
}

function expectPreservedValues(container: HTMLElement) {
  expect(fieldValue(container, "name")).toBe(filledValues.name);
  expect(fieldValue(container, "company")).toBe(filledValues.company);
  expect(fieldValue(container, "email")).toBe(filledValues.email);
  expect(fieldValue(container, "phone")).toBe(filledValues.phone);
  expect(fieldValue(container, "need")).toBe(filledValues.need);
  expect(fieldValue(container, "message")).toBe(filledValues.message);
}

function expectEmptyValues(container: HTMLElement) {
  expect(fieldValue(container, "name")).toBe("");
  expect(fieldValue(container, "company")).toBe("");
  expect(fieldValue(container, "email")).toBe("");
  expect(fieldValue(container, "phone")).toBe("");
  expect(fieldValue(container, "need")).toBe("");
  expect(fieldValue(container, "message")).toBe("");
}

async function fillValidForm(
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
) {
  await user.type(
    container.querySelector("#contato-campo-name")!,
    filledValues.name,
  );
  await user.type(
    container.querySelector("#contato-campo-company")!,
    filledValues.company,
  );
  await user.type(
    container.querySelector("#contato-campo-email")!,
    filledValues.email,
  );
  await user.type(
    container.querySelector("#contato-campo-phone")!,
    filledValues.phone,
  );
  await user.selectOptions(
    container.querySelector("#contato-campo-need")!,
    filledValues.need,
  );
  await user.type(
    container.querySelector("#contato-campo-message")!,
    filledValues.message,
  );
}

describe("ContactForm", () => {
  it("associa labels, autocomplete e dicas sem checkbox de marketing", () => {
    const { container, queryByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );
    const form = container.querySelector("form");

    expect(form?.getAttribute("aria-labelledby")).toBe("formulario-titulo");
    expect(form?.getAttribute("method")?.toLowerCase()).toBe("post");
    expect(form?.getAttribute("action") ?? "").not.toMatch(
      /[?&](name|email|phone|company|message)=/,
    );
    expect(
      container
        .querySelector("#contato-campo-name")
        ?.getAttribute("autocomplete"),
    ).toBe("name");
    expect(
      container
        .querySelector("#contato-campo-company")
        ?.getAttribute("autocomplete"),
    ).toBe("organization");
    expect(
      container
        .querySelector("#contato-campo-email")
        ?.getAttribute("autocomplete"),
    ).toBe("email");
    expect(
      container
        .querySelector("#contato-campo-phone")
        ?.getAttribute("autocomplete"),
    ).toBe("tel");
    expect(
      container.querySelector("#contato-campo-phone")?.hasAttribute("required"),
    ).toBe(false);
    expect(
      container
        .querySelector("#contato-campo-message")
        ?.getAttribute("aria-describedby"),
    ).toContain("contato-dica-message");
    expect(
      container
        .querySelector("#contato-campo-name")
        ?.getAttribute("aria-invalid"),
    ).toBeNull();
    expect(queryByRole("checkbox")).toBeNull();
    expect(container.querySelector('a[href="/privacidade"]')).toBeNull();
    expect(container.querySelector('a[href="/cookies"]')).toBeNull();
    expect(
      container
        .querySelector('input[name="companyWebsite"]')
        ?.getAttribute("tabindex"),
    ).toBe("-1");
  });

  it("não guarda campos em variável mutável de escopo de módulo", () => {
    const formSource = readFileSync(
      path.join(
        process.cwd(),
        "src/app/(marketing)/contato/_components/contact-form.tsx",
      ),
      "utf8",
    );

    expect(formSource).not.toMatch(/\blet\s+\w*(draft|memory|values|form)\b/i);
    expect(formSource).not.toMatch(/islandMemory|rememberIslandValues/);
    expect(formSource).not.toMatch(
      /localStorage|sessionStorage|document\.cookie/,
    );
  });

  it("marca aria-invalid, foca o resumo e preserva os valores depois da validação", async () => {
    const user = userEvent.setup();
    submitContactAction.mockResolvedValue(validationState);

    const { container, getByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    await user.click(getByRole("button", { name: contact.form.submitLabel }));

    await waitFor(() => {
      expect(
        container
          .querySelector("#contato-campo-name")
          ?.getAttribute("aria-invalid"),
      ).toBe("true");
    });

    expect(
      container
        .querySelector("#contato-campo-email")
        ?.getAttribute("aria-invalid"),
    ).toBe("true");
    expect(
      container
        .querySelector("#contato-campo-company")
        ?.getAttribute("aria-invalid"),
    ).toBeNull();
    expect(document.activeElement).toBe(
      container.querySelector("#contato-form-erros"),
    );
    expect(
      container
        .querySelector("#contato-campo-name")
        ?.getAttribute("aria-describedby"),
    ).toContain("contato-erro-name");
    expectPreservedValues(container);
    expect(JSON.stringify(validationState)).not.toMatch(
      /Maria Santos|maria@empresa|77988887777|Empresa Exemplo/,
    );

    await user.type(container.querySelector("#contato-campo-name")!, " Silva");
    expect(fieldValue(container, "name")).toBe(`${filledValues.name} Silva`);
  });

  it("preserva os valores em unavailable na mesma instância e descarta no remount", async () => {
    const user = userEvent.setup();
    const { container, getByRole, unmount } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    await user.click(getByRole("button", { name: contact.form.submitLabel }));

    await waitFor(() => {
      expect(
        getByRole("heading", { name: contact.form.unavailableTitle }),
      ).toBeTruthy();
    });
    expectPreservedValues(container);
    expect(document.activeElement).toBe(
      container.querySelector("#contato-form-status"),
    );

    unmount();
    const remounted = render(<ContactForm startedAt="1800000000000" />);
    expectEmptyValues(remounted.container);
  });

  it("preserva os valores em blocked na mesma instância", async () => {
    const user = userEvent.setup();
    submitContactAction.mockResolvedValue({ status: "blocked" });

    const { container, getByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    await user.click(getByRole("button", { name: contact.form.submitLabel }));

    await waitFor(() => {
      expect(
        getByRole("heading", { name: contact.form.blockedTitle }),
      ).toBeTruthy();
    });
    expectPreservedValues(container);
  });

  it("preserva os valores quando a Action mapeia exceção para unavailable", async () => {
    const user = userEvent.setup();
    submitContactAction.mockImplementation(async () => {
      try {
        throw new Error("falha interna");
      } catch {
        return { status: "unavailable" };
      }
    });

    const { container, getByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    await user.click(getByRole("button", { name: contact.form.submitLabel }));

    await waitFor(() => {
      expect(
        getByRole("heading", { name: contact.form.unavailableTitle }),
      ).toBeTruthy();
    });
    expectPreservedValues(container);
  });

  it("limpa o formulário somente depois de sucesso real", async () => {
    const user = userEvent.setup();
    submitContactAction.mockImplementation(async () => ({
      status: "success",
      submissionId: "fake_opaque",
    }));

    const { container, getByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    await user.click(getByRole("button", { name: contact.form.submitLabel }));

    await waitFor(() => {
      expect(
        getByRole("heading", { name: contact.form.successTitle }),
      ).toBeTruthy();
    });
    expectEmptyValues(container);
    expect(container.textContent).not.toContain("fake_opaque");
    expect(container.textContent).not.toContain(filledValues.email);
  });

  it("mantém rascunhos independentes entre duas instâncias", async () => {
    const user = userEvent.setup();
    const first = render(<ContactForm startedAt="1700000000000" />);
    const second = render(<ContactForm startedAt="1800000000000" />);

    await fillValidForm(user, first.container);

    expectPreservedValues(first.container);
    expectEmptyValues(second.container);
  });

  it("bloqueia reenvio durante pending sem desabilitar o foco do botão", async () => {
    const user = userEvent.setup();
    let resolveAction!: (value: ContactActionState) => void;
    submitContactAction.mockImplementation(
      () =>
        new Promise<ContactActionState>((resolve) => {
          resolveAction = resolve;
        }),
    );

    const { container, getByRole } = render(
      <ContactForm startedAt="1700000000000" />,
    );

    await fillValidForm(user, container);
    const form = container.querySelector("form")!;
    const submit = getByRole("button", { name: contact.form.submitLabel });

    fireEvent.submit(form);
    fireEvent.submit(form);
    fireEvent.click(submit);
    fireEvent.keyDown(submit, { key: "Enter" });
    fireEvent.keyDown(submit, { key: " " });

    await waitFor(() => {
      expect(
        getByRole("button", { name: contact.form.pendingLabel }),
      ).toBeTruthy();
    });

    const pendingButton = getByRole("button", {
      name: contact.form.pendingLabel,
    });
    expect(pendingButton.getAttribute("aria-busy")).toBe("true");
    expect(pendingButton.getAttribute("aria-disabled")).toBe("true");
    expect(pendingButton.hasAttribute("disabled")).toBe(false);
    pendingButton.focus();
    expect(document.activeElement).toBe(pendingButton);
    expect(submitContactAction).toHaveBeenCalledTimes(1);

    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    await user.click(pendingButton);
    expect(submitContactAction).toHaveBeenCalledTimes(1);

    resolveAction({ status: "unavailable" });

    await waitFor(() => {
      expect(
        getByRole("heading", { name: contact.form.unavailableTitle }),
      ).toBeTruthy();
    });
    expectPreservedValues(container);
    expect(document.activeElement).toBe(
      container.querySelector("#contato-form-status"),
    );
  });
});
