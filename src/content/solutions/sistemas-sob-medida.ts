import type { SolutionPage } from "@/types/content";

export const sistemasSobMedida = {
  slug: "sistemas-sob-medida",
  title: "Sistemas sob medida",
  shortTitle: "Sistemas",
  href: "/solucoes/sistemas-sob-medida",
  preview: {
    outcome:
      "Centralizamos sistemas, portais e integrações para substituir planilhas, WhatsApp e ferramentas soltas por uma operação com menos retrabalho e mais controle.",
    summary:
      "Sistemas, portais e integrações que organizam o que hoje está em planilha, WhatsApp e ferramentas soltas.",
    capabilities: [
      "Sistemas de gestão",
      "Integrações entre ferramentas",
      "Fluxos multiusuário",
    ],
  },
  intro: {
    headline:
      "Quando a operação não cabe mais em planilha, o sistema precisa caber no trabalho.",
    text: "Desenvolvemos sistemas de gestão, portais internos, dashboards e integrações para centralizar estoque, vendas, financeiro e fluxos com vários usuários — ou modernizar o que já existe sem recomeçar no escuro.",
  },
  symptoms: [
    {
      title: "Informação em vários lugares",
      description:
        "O mesmo dado vive em planilha, conversa e ferramenta, e ninguém sabe qual versão vale.",
    },
    {
      title: "Retrabalho entre áreas",
      description:
        "Vendas, estoque e financeiro redigitam o que a outra área já registrou.",
    },
    {
      title: "Número do dia sem confiança",
      description:
        "Indicadores chegam tarde, incompletos ou dependem de conferência manual.",
    },
    {
      title: "Sistema atual no limite",
      description:
        "O que existe trava o próximo passo: mais usuários, mais regras ou mais integração.",
    },
  ],
  outcomes: [
    {
      title: "Operação mais centralizada",
      description:
        "O trabalho passa a acontecer em um fluxo comum, em vez de cópias espalhadas.",
    },
    {
      title: "Menos retrabalho",
      description:
        "A informação entra uma vez e segue para quem precisa usá-la.",
    },
    {
      title: "Mais controle",
      description:
        "Papéis, permissões e registros ficam explícitos para quem opera e para quem decide.",
    },
    {
      title: "Base para o próximo passo",
      description:
        "Com o processo organizado, automação e presença digital deixam de se apoiar em improviso.",
    },
  ],
  capabilities: [
    {
      title: "Sistemas de gestão",
      description:
        "Controle de estoque, vendas e financeiro alinhado à rotina real da empresa.",
    },
    {
      title: "Portais internos",
      description:
        "Acesso de equipes, parceiros ou unidades a um fluxo comum, com permissões claras.",
    },
    {
      title: "Dashboards",
      description:
        "Painéis que mostram o que importa para operar o dia — sem planilha paralela.",
    },
    {
      title: "Integrações",
      description:
        "Conexão entre ferramentas que hoje exigem transferência manual.",
    },
    {
      title: "Fluxos multiusuário",
      description:
        "Etapas, responsáveis e validações para o trabalho não depender de uma pessoa só.",
    },
    {
      title: "Modernização",
      description:
        "Avaliação do que já existe para continuar, integrar ou reconstruir a parte que trava.",
    },
  ],
  examples: [
    {
      title: "Portal interno de pedidos",
      description:
        "Equipes registram e acompanham pedidos no mesmo lugar, sem reenviar planilha.",
    },
    {
      title: "Painel da operação diária",
      description:
        "Quem decide vê estoque, vendas e pendências sem montar relatório à mão.",
    },
    {
      title: "Estoque e vendas no mesmo fluxo",
      description: "A baixa e a venda deixam de viver em controles separados.",
    },
    {
      title: "Financeiro com menos conferência manual",
      description:
        "Lançamentos e status chegam de um fluxo único, ainda com revisão humana.",
    },
  ],
  process: {
    title: "Como trabalhamos neste contexto",
    text: "Começamos pelo processo atual, não pela tela. O primeiro ciclo recorta o que muda o controle; o restante entra quando o fluxo principal já opera.",
    steps: [
      {
        title: "Entender o processo",
        description:
          "Mapeamos quem usa, o que se redigita e onde a informação se perde.",
      },
      {
        title: "Recortar o primeiro ciclo",
        description:
          "Definimos o que entra agora e o que espera — sem tentar cobrir a operação inteira de uma vez.",
      },
      {
        title: "Construir com quem usa",
        description:
          "Validamos fluxos e permissões com as pessoas que operam o dia.",
      },
      {
        title: "Documentar a entrega",
        description:
          "O que foi entregue, como se opera e o que fica para evolução.",
      },
    ],
  },
  relatedSlugs: [
    "automacao-inteligencia-artificial",
    "web-growth",
    "produtos-digitais-mvp",
  ],
  faqs: [
    {
      question: "Vocês usam um sistema pronto ou constroem do zero?",
      answer:
        "Depende do problema. Às vezes o caminho é integrar ou modernizar o que já existe; às vezes é construir um fluxo próprio. O diagnóstico mostra qual recorte reduz retrabalho com menos risco.",
    },
    {
      question: "Dá para continuar o sistema que já usamos?",
      answer:
        "Sim, depois de avaliar código, arquitetura, documentação e objetivos. O resultado pode ser continuar, integrar, modernizar ou reconstruir só a parte que trava.",
    },
    {
      question: "Quem acessa o sistema?",
      answer:
        "Isso entra no escopo: perfis, permissões e o que cada pessoa pode ver ou alterar. Não há um modelo único de acesso.",
    },
    {
      question: "Quanto tempo leva?",
      answer:
        "Varia com escopo, integrações, validações e disponibilidade de quem opera. Depois de entender o contexto, estruturamos etapas — sem prometer prazo antes de conhecer o trabalho.",
    },
  ],
  cta: {
    title: "A operação já cobra um fluxo único?",
    text: "Conte como a informação circula hoje. No diagnóstico, organizamos o gargalo e o recorte mais adequado.",
    action: {
      label: "Solicitar diagnóstico",
      href: "/contato",
    },
  },
  seo: {
    title: "Sistemas sob medida",
    description:
      "Sistemas de gestão, portais, dashboards e integrações para centralizar a operação e reduzir retrabalho em Vitória da Conquista e região.",
  },
  composition: "ledger",
} as const satisfies SolutionPage;
