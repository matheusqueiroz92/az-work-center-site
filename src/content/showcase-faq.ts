import type { FAQItem } from "@/types/content";

export const showcaseFaqItems = [
  {
    question: "Pergunta de exemplo: o painel abre por teclado?",
    answer:
      "Este texto é só uma amostra do Accordion. Não é pergunta oficial da AZ Work Center nem descreve um serviço.",
  },
  {
    question: "Pergunta de exemplo: o conteúdo permanece no documento?",
    answer:
      "Amostra de resposta para inspecionar expansão, foco e movimento reduzido. Substituir pelo FAQ aprovado na Home.",
  },
] as const satisfies readonly FAQItem[];
