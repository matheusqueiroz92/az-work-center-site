import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { parseEnv } from "@/lib/env";

import { isDesignSystemRouteEnabled } from "./access";

export const metadata: Metadata = {
  title: "Design system interno",
  description:
    "Página interna de demonstração das primitives visuais da AZ Work Center. Não é conteúdo público.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  if (!isDesignSystemRouteEnabled(parseEnv().vercelEnv)) {
    notFound();
  }

  return children;
}
