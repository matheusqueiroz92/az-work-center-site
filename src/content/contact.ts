export const contactChannelTypes = ["whatsapp", "email"] as const;

export type ContactChannelType = (typeof contactChannelTypes)[number];

export type ContactChannel = {
  type: ContactChannelType;
  actionLabel: string;
  displayValue: string;
  href: string;
  openInNewTab: boolean;
};

export const contactChannels = [
  {
    type: "whatsapp",
    actionLabel: "Conversar pelo WhatsApp",
    displayValue: "(77) 98833-4370",
    href: "https://wa.me/5577988334370",
    openInNewTab: true,
  },
  {
    type: "email",
    actionLabel: "Enviar e-mail",
    displayValue: "contato@azworkcenter.com.br",
    href: "mailto:contato@azworkcenter.com.br",
    openInNewTab: false,
  },
] as const satisfies readonly ContactChannel[];

export const contact = {
  eyebrow: "Contato",
  title: "Vamos organizar o próximo passo.",
  text: "Conte o contexto pelo WhatsApp ou por e-mail. Antes da conversa, algumas informações ajudam a tornar o diagnóstico mais objetivo.",
  channels: {
    title: "Escolha como prefere conversar.",
    text: "Envie uma visão inicial do problema. Não é necessário chegar com a solução definida.",
    items: contactChannels,
  },
  expectation: {
    title: "O que esperar do diagnóstico",
    text: "A conversa inicial ajuda a entender contexto, gargalo, urgência, impacto, decisores e restrições. Ela não representa proposta pronta, preço imediato ou garantia de prazo.",
  },
  prepare: {
    title: "O que vale preparar",
    items: [
      {
        title: "O que hoje é manual",
        description:
          "Planilha, mensagem, retrabalho ou conferência que se repete.",
      },
      {
        title: "Ferramentas em uso",
        description:
          "Onde a informação entra e por onde ela precisa passar depois.",
      },
      {
        title: "Quem decide",
        description:
          "Quem participa da conversa e quem autoriza o próximo passo.",
      },
      {
        title: "Urgência e restrição",
        description:
          "O que pressiona o prazo e o que já está fora de discussão.",
      },
    ],
  },
  challenges: {
    title: "Tipos de desafio",
    description: "Estes tipos ajudam a nomear o problema antes da conversa.",
    items: [
      {
        title: "Organizar ou integrar processos",
        description:
          "A operação cresceu e a informação não acompanha no mesmo fluxo.",
      },
      {
        title: "Desenvolver um sistema",
        description:
          "Há um controle que já não cabe em planilha ou no sistema atual.",
      },
      {
        title: "Automatizar tarefas com IA",
        description:
          "Há rotina repetitiva — e pontos em que gente ainda precisa validar.",
      },
      {
        title: "Criar ou validar um produto digital",
        description:
          "A ideia precisa de um recorte, não do produto inteiro no primeiro ciclo.",
      },
      {
        title: "Melhorar site, e-commerce ou aquisição",
        description:
          "A presença existe, mas ainda não conduz, mede ou sustenta demanda.",
      },
      {
        title: "Ainda não sei definir",
        description:
          "O diagnóstico também serve para nomear o problema antes de escolher a oferta.",
      },
    ],
  },
  diagnosis: {
    title: "O que é o diagnóstico",
    text: "Uma conversa inicial de 30 a 45 minutos para entender contexto, gargalo, urgência, impacto, decisores e restrições.",
  },
  seo: {
    title: "Contato",
    description:
      "Fale com a AZ Work Center pelo WhatsApp ou por e-mail e prepare o diagnóstico inicial.",
  },
} as const;
