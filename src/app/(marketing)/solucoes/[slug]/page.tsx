import { notFound } from "next/navigation";

import { AutomacaoSections } from "@/app/(marketing)/solucoes/_compositions/automacao-sections";
import { ProdutosSections } from "@/app/(marketing)/solucoes/_compositions/produtos-sections";
import { SistemasSections } from "@/app/(marketing)/solucoes/_compositions/sistemas-sections";
import { WebGrowthSections } from "@/app/(marketing)/solucoes/_compositions/web-growth-sections";
import { createPageMetadata } from "@/lib/metadata";
import { getSolutionBySlug } from "@/lib/solutions";
import { solutionSlugs, type SolutionSlug } from "@/types/content";

const compositions = {
  "sistemas-sob-medida": SistemasSections,
  "automacao-inteligencia-artificial": AutomacaoSections,
  "produtos-digitais-mvp": ProdutosSections,
  "web-growth": WebGrowthSections,
} as const;

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return createPageMetadata(
      "Página não encontrada",
      "Esta solução não está disponível.",
    );
  }

  return createPageMetadata(solution.seo.title, solution.seo.description);
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const Composition = compositions[solution.slug as SolutionSlug];

  return (
    <main id="conteudo" tabIndex={-1}>
      <Composition solution={solution} />
    </main>
  );
}
