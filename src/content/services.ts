import type { ServicePreview } from "@/types/content";

export const servicePreviews = [
  {
    slug: "sistemas-sob-medida",
    href: "/solucoes/sistemas-sob-medida",
    title: "Sistemas sob medida",
    outcome: "Operação centralizada, menos retrabalho e mais controle.",
    summary:
      "Sistemas, portais e integrações que organizam o que hoje está em planilha, WhatsApp e ferramentas soltas.",
    capabilities: ["Sistemas de gestão", "Integrações", "Fluxos multiusuário"],
  },
  {
    slug: "automacao-inteligencia-artificial",
    href: "/solucoes/automacao-inteligencia-artificial",
    title: "Automação e IA aplicada",
    outcome:
      "Reduzir tarefas repetitivas e acelerar atendimento, análise e decisão.",
    summary:
      "Automações e inteligência artificial com validação humana — para liberar tempo, não para substituir a equipe.",
    capabilities: [
      "Automação de atendimento",
      "Integração entre ferramentas",
      "Geração assistida com validação humana",
    ],
  },
  {
    slug: "produtos-digitais-mvp",
    href: "/solucoes/produtos-digitais-mvp",
    title: "Produtos digitais e MVPs",
    outcome:
      "Validar e lançar uma ideia digital com base técnica para evoluir.",
    summary:
      "Da compreensão da ideia à base que pode crescer: descoberta, MVP e evolução, sem tratar o primeiro release como produto acabado.",
    capabilities: ["Descoberta de produto", "MVP", "Manutenção e evolução"],
  },
  {
    slug: "web-growth",
    href: "/solucoes/web-growth",
    title: "Web e Growth",
    outcome: "Criar uma presença capaz de captar, medir e converter demanda.",
    summary:
      "Site, e-commerce e medição trabalhados juntos. Tráfego entra quando existe estrutura para converter e acompanhar.",
    capabilities: [
      "Sites e landing pages",
      "Analytics e eventos",
      "Otimização de conversão",
    ],
  },
] as const satisfies readonly ServicePreview[];
