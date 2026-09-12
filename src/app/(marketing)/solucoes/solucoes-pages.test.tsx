/** @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import SolutionsIndexPage from "@/app/(marketing)/solucoes/page";
import SolutionPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(marketing)/solucoes/[slug]/page";
import { listSolutions } from "@/lib/solutions";
import { solutionSlugs } from "@/types/content";

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

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

describe("solutions routes", () => {
  it("prerenderiza somente os slugs aprovados", () => {
    expect(generateStaticParams()).toEqual(
      solutionSlugs.map((slug) => ({ slug })),
    );
  });

  it("gera metadata única por solução", async () => {
    const titles = new Set<string>();

    for (const slug of solutionSlugs) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug }),
      });

      expect(typeof metadata.title).toBe("string");
      expect(typeof metadata.description).toBe("string");
      titles.add(String(metadata.title));
    }

    expect(titles.size).toBe(solutionSlugs.length);
  });

  it("chama notFound para slug inválido", async () => {
    await expect(
      SolutionPage({ params: Promise.resolve({ slug: "nao-existe" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renderiza o índice com um H1 e links reais", () => {
    const { getAllByRole, getByRole, container } = render(
      <SolutionsIndexPage />,
    );

    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelector("main")?.id).toBe("conteudo");
    expect(getByRole("link", { name: "Início" }).getAttribute("href")).toBe(
      "/",
    );

    for (const solution of listSolutions()) {
      expect(
        getByRole("link", {
          name: `Ver solução de ${solution.title}`,
        }).getAttribute("href"),
      ).toBe(solution.href);
    }
  });

  it("renderiza cada solução com conteúdo específico e sem formulário", async () => {
    for (const solution of listSolutions()) {
      const page = await SolutionPage({
        params: Promise.resolve({ slug: solution.slug }),
      });
      const { getAllByRole, getByRole, container } = render(page);

      expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        getByRole("heading", { level: 1, name: solution.intro.headline }),
      ).toBeTruthy();
      expect(container.textContent).toContain(solution.symptoms[0]!.title);
      expect(container.textContent).toContain(solution.faqs[0]!.question);
      expect(container.querySelector("form")).toBeNull();
      expect(container.querySelector("input")).toBeNull();
      expect(
        getByRole("link", { name: "Solicitar diagnóstico" }).getAttribute(
          "href",
        ),
      ).toBe("/contato");

      cleanup();
    }
  });
});
