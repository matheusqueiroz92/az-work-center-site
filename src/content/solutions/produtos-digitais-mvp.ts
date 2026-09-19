import type { SolutionPage } from "@/types/content";

export const produtosDigitaisMvp = {
  slug: "produtos-digitais-mvp",
  title: "Produtos digitais",
  shortTitle: "Produtos digitais",
  href: "/solucoes/produtos-digitais-mvp",
  preview: {
    outcome:
      "Transformamos ideias em produtos digitais validáveis, da descoberta à primeira versão funcional, com uma base técnica preparada para evoluir.",
    summary:
      "Da compreensão da ideia à base que pode crescer: descoberta, primeira versão e evolução, sem tratar o primeiro release como produto acabado.",
    capabilities: [
      "Descoberta e validação",
      "Primeira versão funcional",
      "Evolução contínua",
    ],
  },
  intro: {
    headline: "Do problema ao primeiro recorte que dá para aprender.",
    text: "Ajudamos na descoberta, no protótipo navegável, na arquitetura, no MVP, em produtos SaaS e na manutenção depois do primeiro release. O MVP é um recorte com critério — não o produto inteiro no primeiro ciclo nem uma garantia de validação comercial.",
  },
  symptoms: [
    {
      title: "Ideia ampla demais",
      description:
        "O produto tenta resolver vários problemas ao mesmo tempo e não tem um primeiro uso claro.",
    },
    {
      title: "Construir tudo antes de conversar",
      description:
        "O plano é entregar o aplicativo inteiro sem um recorte que alguém possa usar.",
    },
    {
      title: "Medo da “versão incompleta”",
      description:
        "O time evita lançar o que teria critério de aprendizado por achar que MVP é produto sem cuidado.",
    },
    {
      title: "Sistema que ainda não é produto",
      description:
        "Existe uma operação interna, mas falta o recorte, a arquitetura e o caminho de evolução para outras pessoas.",
    },
  ],
  outcomes: [
    {
      title: "Recorte testável",
      description:
        "Fica claro o que o primeiro release precisa provar — e o que fica de fora de propósito.",
    },
    {
      title: "Base técnica evolutiva",
      description:
        "A arquitetura aguenta o próximo ciclo sem jogar fora o que acabou de ser construído.",
    },
    {
      title: "Aprendizado com uso real",
      description:
        "O produto encontra usuários reais o quanto antes, sem fingir que o mercado já validou o negócio.",
    },
    {
      title: "Caminho depois do lançamento",
      description:
        "Manutenção e evolução entram como continuação, não como surpresa.",
    },
  ],
  capabilities: [
    {
      title: "Descoberta de produto",
      description:
        "Problema, público, restrições e o que o primeiro recorte precisa responder.",
    },
    {
      title: "Protótipo navegável",
      description:
        "Um caminho que se percorre para alinhar o produto antes de construir o que ainda não está claro.",
    },
    {
      title: "Arquitetura",
      description:
        "Decisões técnicas que sustentam o MVP e deixam espaço para evoluir.",
    },
    {
      title: "MVP",
      description:
        "A menor versão com critério: alguém usa, alguém observa, o próximo passo se apoia nisso.",
    },
    {
      title: "Desenvolvimento SaaS",
      description:
        "Produto com contas, papéis e operação contínua — quando o recorte já pede essa forma.",
    },
    {
      title: "Manutenção e evolução",
      description:
        "Correções, melhorias e novos recortes depois que o primeiro release existe.",
    },
  ],
  examples: [
    {
      title: "Ideia que vira um primeiro fluxo",
      description:
        "Em vez de um aplicativo completo, o recorte entrega um caminho que um usuário real consegue percorrer.",
    },
    {
      title: "Protótipo para alinhar o time",
      description:
        "Quem decide vê o produto em telas navegáveis antes de comprometer o ciclo de construção.",
    },
    {
      title: "SaaS a partir de um recorte",
      description:
        "O primeiro release serve um uso; cadastro, papéis e o restante entram quando o uso se confirma.",
    },
    {
      title: "Evolução depois do lançamento",
      description:
        "O que o uso mostrou vira o próximo ciclo — não uma lista infinita no primeiro contrato.",
    },
  ],
  process: {
    title: "Como trabalhamos neste contexto",
    text: "O primeiro compromisso é o recorte. Construímos o que permite aprender; o produto inteiro não é a unidade de entrega inicial.",
    steps: [
      {
        title: "Nomear o problema",
        description:
          "Quem sente, o que trava hoje e o que o primeiro uso precisa mostrar.",
      },
      {
        title: "Desenhar o recorte",
        description:
          "Dentro e fora do primeiro release, com critério visível para quem decide.",
      },
      {
        title: "Construir o caminho",
        description:
          "Protótipo ou MVP, conforme a clareza — sempre com validação de quem vai usar.",
      },
      {
        title: "Combinar a evolução",
        description:
          "O que acontece depois do lançamento: suporte, correção e próximo recorte.",
      },
    ],
  },
  relatedSlugs: [
    "sistemas-sob-medida",
    "web-growth",
    "automacao-inteligencia-artificial",
  ],
  faqs: [
    {
      question: "MVP é um produto inacabado?",
      answer:
        "Não. É um recorte com critério: o suficiente para alguém usar e o time aprender. Incompleto sem critério não é MVP — é só falta de definição.",
    },
    {
      question: "Vocês entregam o aplicativo inteiro no primeiro ciclo?",
      answer:
        "Não. O objetivo do primeiro ciclo é o recorte validável. O produto maior entra em evolução, quando o uso real mostrar o que importa.",
    },
    {
      question: "O MVP garante que a ideia vai funcionar no mercado?",
      answer:
        "Não. Ele organiza o aprendizado. Validação comercial depende de uso, contexto e decisões de vocês — não de uma promessa nossa.",
    },
    {
      question: "E depois do lançamento?",
      answer:
        "Podemos acompanhar manutenção e evolução. O formato depende do que foi construído e entra na proposta.",
    },
  ],
  cta: {
    title: "A ideia já tem um primeiro recorte?",
    text: "Conte o problema e o que vocês querem aprender primeiro. No diagnóstico, separamos o recorte do produto inteiro.",
    action: {
      label: "Solicitar diagnóstico",
      href: "/contato",
    },
  },
  seo: {
    title: "Produtos digitais e MVPs",
    description:
      "Descoberta, MVP e evolução de produtos digitais e SaaS, com recorte validável e base técnica para crescer.",
  },
  composition: "scope",
} as const satisfies SolutionPage;
