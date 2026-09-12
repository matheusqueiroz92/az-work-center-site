import type { SolutionPage, SolutionSlug } from "@/types/content";

import { automacaoInteligenciaArtificial } from "@/content/solutions/automacao-inteligencia-artificial";
import { produtosDigitaisMvp } from "@/content/solutions/produtos-digitais-mvp";
import { sistemasSobMedida } from "@/content/solutions/sistemas-sob-medida";
import { webGrowth } from "@/content/solutions/web-growth";

export const solutionPages = {
  "sistemas-sob-medida": sistemasSobMedida,
  "automacao-inteligencia-artificial": automacaoInteligenciaArtificial,
  "produtos-digitais-mvp": produtosDigitaisMvp,
  "web-growth": webGrowth,
} as const satisfies Record<SolutionSlug, SolutionPage>;
