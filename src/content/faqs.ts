import type { FAQItem } from "@/types/content";

export const homeFaqs = [
  {
    question: "Vocês atendem apenas Vitória da Conquista?",
    answer:
      "Não. Nosso foco inicial é Vitória da Conquista e região, onde conhecemos de perto a realidade das empresas. Também avaliamos projetos de outras localidades quando o trabalho pode ser conduzido à distância com clareza e proximidade.",
  },
  {
    question: "Quanto custa desenvolver um sistema?",
    answer:
      "Depende do problema, do escopo, das integrações, do número de usuários e do que já existe. No diagnóstico inicial, organizamos essas variáveis; quando ainda não há clareza suficiente, recomendamos uma etapa de descoberta antes de estimar a construção.",
  },
  {
    question: "Quanto tempo leva um projeto?",
    answer:
      "Varia conforme escopo, integrações, validações e disponibilidade das pessoas envolvidas. Depois de entender o contexto, estruturamos etapas e marcos compatíveis com o projeto — sem prometer um prazo antes de conhecer o trabalho.",
  },
  {
    question: "Vocês dão suporte depois da entrega?",
    answer:
      "Sim. Podemos acompanhar suporte, analytics, melhorias e evolução após a entrega. O formato depende do que foi construído e da necessidade da operação, e é definido na proposta.",
  },
  {
    question: "Trabalham com projetos já iniciados?",
    answer:
      "Sim, após uma avaliação do que já existe. Analisamos código, arquitetura, documentação e objetivos para decidir se o melhor caminho é continuar, modernizar, integrar ou reconstruir parte da solução.",
  },
  {
    question: "Como identifico o que pode ser automatizado?",
    answer:
      "Começamos pelas tarefas repetitivas, pelo retrabalho, pela transferência manual de dados e pelos pontos em que as ferramentas não se conectam. O diagnóstico ajuda a priorizar o que realmente pode economizar tempo ou melhorar o controle, sempre com validação humana quando houver IA.",
  },
  {
    question: "Vocês desenvolvem MVPs para novas ideias?",
    answer:
      "Sim. Ajudamos a transformar a ideia em um recorte validável, da descoberta à primeira versão e à evolução. O objetivo do MVP é aprender com usuários reais sem tentar construir o produto inteiro no primeiro ciclo.",
  },
] as const satisfies readonly FAQItem[];
