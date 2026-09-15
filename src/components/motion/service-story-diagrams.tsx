import type { ReactNode } from "react";

import { solutionSlugs, type SolutionSlug } from "@/types/content";

export const serviceStoryViewBox = "0 0 280 320";

function Hairlines({ children }: { children: ReactNode }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      {children}
    </g>
  );
}

function Pulse({ x, y }: { x: number | string; y: number | string }) {
  return (
    <g className="text-primary" fill="currentColor">
      <rect x={x} y={y} width="16" height="16" />
    </g>
  );
}

function SistemasDiagram() {
  return (
    <>
      <Hairlines>
        <rect x="16" y="28" width="36" height="20" />
        <rect x="20" y="68" width="32" height="18" />
        <rect x="14" y="108" width="38" height="20" />
        <rect x="22" y="152" width="30" height="16" />
        <rect x="16" y="192" width="36" height="20" />
        <rect x="112" y="44" width="44" height="216" />
        <rect x="188" y="68" width="72" height="36" />
        <rect x="188" y="136" width="72" height="36" />
        <rect x="188" y="204" width="72" height="36" />
        <path d="M52 38 H112" />
        <path d="M52 77 H112" />
        <path d="M52 118 H112" />
        <path d="M52 160 H112" />
        <path d="M52 202 H112" />
        <path d="M156 86 H188" />
        <path d="M156 154 H188" />
        <path d="M156 222 H188" />
      </Hairlines>
      <Pulse x="126" y="140" />
    </>
  );
}

function AutomacaoDiagram() {
  return (
    <>
      <Hairlines>
        <rect x="32" y="32" width="80" height="44" />
        <rect x="168" y="80" width="80" height="44" />
        <rect x="32" y="160" width="80" height="44" />
        <rect x="168" y="232" width="80" height="44" />
        <path d="M112 54 H168 V102" />
        <path d="M168 124 V182 H112" />
        <path d="M72 204 V232 H168" />
      </Hairlines>
      <Pulse x="64" y="174" />
    </>
  );
}

function ProdutosDiagram() {
  return (
    <>
      <Hairlines>
        <rect x="20" y="20" width="240" height="280" />
        <rect x="36" y="36" width="52" height="32" />
        <rect x="192" y="36" width="52" height="32" />
        <rect x="36" y="252" width="52" height="32" />
        <rect x="192" y="252" width="52" height="32" />
        <rect x="84" y="96" width="112" height="128" />
        <path d="M62 68 V96 H84" />
        <path d="M218 68 V96 H196" />
        <path d="M62 252 V224 H84" />
        <path d="M218 252 V224 H196" />
      </Hairlines>
      <Pulse x="132" y="148" />
    </>
  );
}

function WebGrowthDiagram() {
  return (
    <>
      <Hairlines>
        <rect x="24" y="40" width="232" height="52" />
        <rect x="24" y="134" width="232" height="52" />
        <rect x="24" y="228" width="232" height="52" />
        <rect x="36" y="52" width="28" height="28" />
        <rect x="36" y="146" width="28" height="28" />
        <rect x="36" y="240" width="28" height="28" />
        <path d="M64 66 H216" />
        <path d="M64 160 H124" />
        <path d="M164 160 H216" />
        <path d="M64 254 H216" />
        <path d="M216 66 H248" />
        <path d="M216 160 H248" />
        <path d="M216 254 H248" />
      </Hairlines>
      <Pulse x="132" y="152" />
    </>
  );
}

const diagrams = {
  "sistemas-sob-medida": SistemasDiagram,
  "automacao-inteligencia-artificial": AutomacaoDiagram,
  "produtos-digitais-mvp": ProdutosDiagram,
  "web-growth": WebGrowthDiagram,
} as const;

export function ServiceStoryDiagram({ slug }: { slug: SolutionSlug }) {
  const Diagram = diagrams[slug];

  return (
    <svg
      viewBox={serviceStoryViewBox}
      className="text-foreground h-auto w-full"
      aria-hidden="true"
      focusable="false"
      data-service-story-diagram={slug}
    >
      <Diagram />
    </svg>
  );
}

export function getServiceStoryGeometrySignature(slug: SolutionSlug) {
  const marks = {
    "sistemas-sob-medida":
      "hub:5-left-modules+center-column+3-right-modules+converging-paths",
    "automacao-inteligencia-artificial":
      "flow:4-staggered-stages+broken-path-at-third",
    "produtos-digitais-mvp":
      "scope:outer-field+inner-release+4-outlined-future",
    "web-growth": "channels:3-bands+center-gap+side-exits",
  } as const;

  return marks[slug];
}

export const serviceStoryGeometrySignatures = Object.fromEntries(
  solutionSlugs.map((slug) => [slug, getServiceStoryGeometrySignature(slug)]),
) as Record<SolutionSlug, string>;
