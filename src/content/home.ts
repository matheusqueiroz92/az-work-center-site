export const homeSectionIds = [
  "conteudo",
  "problemas",
  "solucoes",
  "metodo",
  "capacidades",
  "faq",
  "diagnostico",
] as const;

export const homeHero = {
  eyebrow: "Tecnologia aplicada a negócios • Vitória da Conquista, BA",
  title: "Tecnologia que elimina gargalos e acelera empresas.",
  text: "Desenvolvemos sistemas sob medida, automações com inteligência artificial e estruturas digitais para empresas que querem operar melhor e crescer com mais controle.",
  primaryCta: {
    label: "Solicitar diagnóstico",
    href: "/contato",
  },
  secondaryCta: {
    label: "Conhecer soluções",
    href: "/solucoes",
  },
} as const;

export const homeProblems = {
  eyebrow: "O problema",
  title: "Quando a empresa cresce, os improvisos começam a custar caro.",
  description:
    "Se a operação digital não acompanhou o crescimento da empresa, esses improvisos costumam aparecer juntos.",
  items: [
    {
      title: "Informações espalhadas",
      description:
        "Dados importantes ficam divididos entre planilhas, mensagens e ferramentas.",
    },
    {
      title: "Tarefas repetitivas",
      description:
        "A equipe perde tempo refazendo rotinas que poderiam ser organizadas ou automatizadas.",
    },
    {
      title: "Sistemas que não conversam",
      description:
        "A mesma informação precisa ser transferida manualmente de um lugar para outro.",
    },
    {
      title: "Decisões sem dados confiáveis",
      description:
        "Indicadores chegam tarde, incompletos ou dependem de conferência manual.",
    },
    {
      title: "Presença digital que não converte",
      description:
        "Site, aquisição e medição funcionam como frentes separadas.",
    },
  ],
} as const;

export const homeServices = {
  eyebrow: "Atuação",
  title:
    "Construímos a estrutura digital que o próximo estágio do seu negócio exige.",
} as const;

export const homeMethod = {
  eyebrow: "Como trabalhamos",
  title: "Da complexidade à solução, em quatro movimentos.",
  description:
    "Não é uma receita fechada nem um prazo prometido. É a forma como organizamos o trabalho de acordo com cada contexto.",
  steps: [
    {
      number: "01",
      title: "Entender",
      description: "Contexto, processo e objetivo.",
    },
    {
      number: "02",
      title: "Definir",
      description: "Prioridade, escopo e indicadores.",
    },
    {
      number: "03",
      title: "Construir",
      description: "Ciclos curtos, validação e qualidade.",
    },
    {
      number: "04",
      title: "Evoluir",
      description: "Dados, suporte e melhoria contínua.",
    },
  ],
} as const;

export const homeEngagement = {
  eyebrow: "Formas de entrega",
  title: "Do primeiro contato à evolução da operação.",
  description:
    "Antes de escolher uma ferramenta, alinhamos o contexto. O formato seguinte depende da clareza do problema — não de um pacote único.",
  modes: [
    {
      title: "Diagnóstico",
      description:
        "Conversa inicial de 30 a 45 minutos para entender contexto, gargalo, urgência, impacto, decisores e restrições.",
    },
    {
      title: "Descoberta",
      description:
        "Imersão paga quando o problema é complexo ou ainda não há escopo suficiente.",
    },
    {
      title: "Construção",
      description:
        "Projeto por escopo e marcos, ou time dedicado, conforme previsibilidade e maturidade.",
    },
    {
      title: "Evolução",
      description:
        "Acompanhamento de suporte, analytics, melhorias e crescimento.",
    },
  ],
} as const;

export const homeTrust = {
  eyebrow: "Confiança",
  title: "Clareza do diagnóstico à evolução.",
  items: [
    {
      title: "Atendimento direto",
      description:
        "A conversa e a condução do trabalho ficam com os fundadores, não com uma fila genérica de atendimento.",
    },
    {
      title: "Diagnóstico antes da tecnologia",
      description:
        "A ferramenta entra depois do contexto, do gargalo e das restrições.",
    },
    {
      title: "Processo transparente",
      description:
        "Escopo, prioridades e limites são explicados, e o cliente participa das decisões.",
    },
    {
      title: "Visão integrada",
      description:
        "Software, automação, experiência digital e Growth são pensados em conjunto quando o problema exige.",
    },
    {
      title: "Atuação regional, estrutura expansível",
      description:
        "Começamos em Vitória da Conquista e região, com linguagem e arquitetura preparadas para outros contextos.",
    },
    {
      title: "Construção, suporte e evolução",
      description:
        "A entrega abre caminho para acompanhar dados, melhorias e crescimento.",
    },
  ],
} as const;

export const homeFaq = {
  eyebrow: "Perguntas frequentes",
  title: "Perguntas que costumam aparecer antes do diagnóstico.",
} as const;

export const homeCta = {
  title: "Qual processo está limitando o crescimento da sua empresa hoje?",
  text: "Conte o contexto. Em uma conversa inicial, ajudamos a organizar o problema e avaliar o próximo passo mais adequado.",
  action: {
    label: "Solicitar diagnóstico",
    href: "/contato",
  },
} as const;
