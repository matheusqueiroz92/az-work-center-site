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

export const contactNeedOptions = [
  {
    kind: "organizar-integrar-processos",
    label: "Organizar ou integrar processos",
  },
  {
    kind: "desenvolver-sistema",
    label: "Desenvolver um sistema",
  },
  {
    kind: "automatizar-tarefas-ia",
    label: "Automatizar tarefas com IA",
  },
  {
    kind: "criar-validar-produto",
    label: "Criar ou validar um produto digital",
  },
  {
    kind: "melhorar-presenca-digital",
    label: "Melhorar site, e-commerce ou aquisição",
  },
  {
    kind: "ainda-nao-sei",
    label: "Ainda não sei definir",
  },
] as const;

export const contactNeedKinds = [
  contactNeedOptions[0].kind,
  contactNeedOptions[1].kind,
  contactNeedOptions[2].kind,
  contactNeedOptions[3].kind,
  contactNeedOptions[4].kind,
  contactNeedOptions[5].kind,
] as const;

export type ContactNeedKind = (typeof contactNeedKinds)[number];

export const contact = {
  eyebrow: "Contato",
  title: "Vamos organizar o próximo passo.",
  text: "Envie o contexto por este formulário, pelo WhatsApp ou por e-mail. Antes da conversa, algumas informações ajudam a tornar o diagnóstico mais objetivo.",
  form: {
    title: "Envie o contexto",
    text: "Descreva a operação e o gargalo. WhatsApp e e-mail continuam disponíveis se preferir outro canal.",
    notice:
      "WhatsApp e e-mail continuam disponíveis se preferir outro canal ou se o envio pelo formulário não concluir.",
    dataUse:
      "Os dados deste pedido servem apenas para responder ao diagnóstico. Não há cadastro de newsletter.",
    submitLabel: "Enviar mensagem",
    pendingLabel: "Enviando…",
    errorSummaryTitle: "Revise os campos indicados.",
    unavailableTitle: "O formulário ainda não enviou.",
    unavailableText:
      "Fale pelo WhatsApp ou por e-mail para continuar o diagnóstico.",
    blockedTitle: "Não foi possível concluir o envio.",
    blockedText:
      "Fale pelo WhatsApp ou por e-mail para continuar o diagnóstico.",
    successTitle: "Contexto registrado.",
    successText: "A equipe segue pelo canal combinado.",
    fields: {
      name: {
        label: "Nome",
        placeholder: "Maria Santos",
      },
      company: {
        label: "Empresa",
        placeholder: "Nome da empresa",
      },
      email: {
        label: "E-mail",
        placeholder: "nome@empresa.com.br",
      },
      phone: {
        label: "Telefone ou WhatsApp",
        hint: "Opcional.",
        placeholder: "(77) 98833-4370",
      },
      need: {
        label: "Tipo de necessidade",
        placeholder: "Selecione o tipo de necessidade",
      },
      message: {
        label: "Contexto",
        hint: "Em poucas frases: o que hoje é manual, ferramentas em uso e o que pressiona o prazo.",
        placeholder:
          "Controlamos pedidos em planilha e o estoque em outro sistema.",
      },
    },
  },
  channels: {
    title: "WhatsApp e e-mail continuam disponíveis.",
    text: "Se o formulário não enviar, ou se preferir outro canal, fale por aqui. Não é necessário chegar com a solução definida.",
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
        title: contactNeedOptions[0].label,
        description:
          "A operação cresceu e a informação não acompanha no mesmo fluxo.",
      },
      {
        title: contactNeedOptions[1].label,
        description:
          "Há um controle que já não cabe em planilha ou no sistema atual.",
      },
      {
        title: contactNeedOptions[2].label,
        description:
          "Há rotina repetitiva — e pontos em que gente ainda precisa validar.",
      },
      {
        title: contactNeedOptions[3].label,
        description:
          "A ideia precisa de um recorte, não do produto inteiro no primeiro ciclo.",
      },
      {
        title: contactNeedOptions[4].label,
        description:
          "A presença existe, mas ainda não conduz, mede ou sustenta demanda.",
      },
      {
        title: contactNeedOptions[5].label,
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
      "Fale com a AZ Work Center pelo formulário, WhatsApp ou e-mail e prepare o diagnóstico inicial.",
  },
} as const;
