import { solutionSlugs, type SolutionSlug } from "@/types/content";

export const serviceStoryViewBox = "0 0 280 320";

function Pane({
  x,
  y,
  w,
  h,
  level = "surface",
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  level?: "shell" | "surface" | "emphasis" | "inset" | "chrome";
}) {
  return <rect x={x} y={y} width={w} height={h} data-diagram-pane={level} />;
}

function Line({
  d,
  level = "guide",
}: {
  d: string;
  level?: "primary" | "guide" | "plot";
}) {
  return <path d={d} data-diagram-line={level} />;
}

function Bar({
  x,
  y,
  w,
  h = 5,
  accent = false,
  opacity = 0.2,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h?: number | string;
  accent?: boolean;
  opacity?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      className={accent ? "text-primary" : undefined}
      fill="currentColor"
      fillOpacity={accent ? 1 : opacity}
    />
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  muted = false,
  size = 8,
}: {
  x: number | string;
  y: number | string;
  children: string;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      fillOpacity={muted ? 0.62 : 0.92}
      fontSize={size}
      fontFamily="var(--font-sans), sans-serif"
    >
      {children}
    </text>
  );
}

function SistemasDiagram() {
  const modules = [
    { id: "estoque", x: 86, y: 48, title: "Estoque", bars: [58, 44, 50] },
    {
      id: "vendas",
      x: 176,
      y: 48,
      title: "Vendas",
      bars: [52, 36, 48],
      accent: 2,
    },
    {
      id: "financeiro",
      x: 86,
      y: 134,
      title: "Financeiro",
      bars: [48, 56, 38],
    },
    {
      id: "permissoes",
      x: 176,
      y: 134,
      title: "Permissões",
      bars: [44, 50, 32],
    },
  ] as const;

  return (
    <>
      <Pane x="12" y="12" w="256" h="296" level="shell" />
      <Pane x="12" y="12" w="256" h="26" level="chrome" />
      <rect
        x="22"
        y="21"
        width="8"
        height="8"
        fill="currentColor"
        fillOpacity="0.28"
      />
      <rect
        x="34"
        y="21"
        width="8"
        height="8"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <rect
        x="46"
        y="21"
        width="8"
        height="8"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <Label x="64" y="29">
        Operação
      </Label>
      <Bar x="196" y="20" w="60" h="10" accent />
      <Line d="M12 38 H268" level="primary" />
      <Pane x="12" y="38" w="62" h="270" level="inset" />
      <Line d="M74 38 V308" level="guide" />
      <Label x="22" y="56" muted>
        Navegação
      </Label>
      <Bar x="22" y="64" w="42" h="8" accent />
      <Bar x="22" y="78" w="36" h="8" />
      <Bar x="22" y="92" w="40" h="8" />
      <Label x="22" y="122" muted>
        Módulos
      </Label>
      <Bar x="22" y="130" w="38" h="8" />
      <Bar x="22" y="144" w="28" h="8" />
      <Bar x="22" y="158" w="34" h="8" />
      <Label x="22" y="188" muted>
        Integrações
      </Label>
      <Bar x="22" y="196" w="36" h="8" />
      <Bar x="22" y="210" w="24" h="8" />
      {modules.map((module) => (
        <g key={module.id} data-sync-mod={module.id}>
          <Pane x={module.x} y={module.y} w="80" h="76" />
          <Label x={module.x + 8} y={module.y + 16}>
            {module.title}
          </Label>
          {module.bars.map((width, index) => (
            <Bar
              key={`${module.id}-${width}`}
              x={module.x + 8}
              y={module.y + 26 + index * 14}
              w={width}
              h={6}
              accent={"accent" in module && module.accent === index}
            />
          ))}
        </g>
      ))}
      <Line d="M166 86 H176" />
      <Line d="M166 172 H176" />
      <Line d="M126 124 V134" />
      <Line d="M216 124 V134" />
      <Pane x="86" y="220" w="170" h="76" />
      <Label x="96" y="236">
        Atividade recente
      </Label>
      <Bar x="96" y="246" w="118" h="6" />
      <Bar x="96" y="258" w="96" h="6" />
      <Bar x="96" y="270" w="108" h="6" />
      <Bar x="220" y="246" w="24" h="6" accent />
      <Label x="96" y="288" muted>
        sincronizado
      </Label>
    </>
  );
}

function AutomacaoDiagram() {
  const stages = [
    { y: 56, title: "Entrada", note: "canais e sistemas" },
    { y: 108, title: "Classificação", note: "tipo e prioridade" },
    { y: 160, title: "Agente", note: "processamento assistido" },
    {
      y: 212,
      title: "Validação humana",
      note: "revisão e decisão",
      accent: true,
    },
    { y: 264, title: "Saída", note: "registro e ação" },
  ] as const;

  return (
    <>
      <Pane x="12" y="12" w="256" h="296" level="shell" />
      <Pane x="12" y="12" w="256" h="26" level="chrome" />
      <Label x="22" y="29">
        Orquestração
      </Label>
      <Label x="188" y="29" muted>
        fila ativa
      </Label>
      <Line d="M12 38 H268" level="primary" />
      <Pane x="20" y="48" w="52" h="248" level="inset" />
      <Label x="28" y="66" muted>
        Entradas
      </Label>
      <Bar x="28" y="76" w="36" h="8" />
      <Bar x="28" y="90" w="28" h="8" />
      <Bar x="28" y="104" w="32" h="8" />
      <Label x="28" y="132" muted>
        Canais
      </Label>
      <Bar x="28" y="142" w="34" h="8" />
      <Bar x="28" y="156" w="26" h="8" />
      <Line d="M72 86 H92" />
      <Line d="M72 146 H92" />
      <Pane x="88" y="48" w="12" h="248" level="surface" />
      {stages.map((stage, index) => (
        <g key={stage.title}>
          {index > 0 ? (
            <Line d={`M94 ${stage.y - 10} V${stage.y + 6}`} />
          ) : null}
          <circle
            cx="94"
            cy={stage.y + 16}
            r="4"
            data-diagram-mark={"accent" in stage ? "active" : ""}
          />
          <Pane
            x="112"
            y={stage.y}
            w="144"
            h="42"
            level={"accent" in stage ? "emphasis" : "surface"}
          />
          {"accent" in stage ? (
            <rect
              x="112"
              y={stage.y}
              width="6"
              height="42"
              className="text-primary"
              fill="currentColor"
            />
          ) : (
            <rect
              x="112"
              y={stage.y}
              width="6"
              height="42"
              fill="currentColor"
              fillOpacity="0.12"
            />
          )}
          <Label x="126" y={stage.y + 16}>
            {stage.title}
          </Label>
          <Label x="126" y={stage.y + 30} muted>
            {stage.note}
          </Label>
        </g>
      ))}
      <circle
        cx="94"
        cy="228"
        r="5"
        className="text-primary"
        fill="currentColor"
        data-pipeline-signal=""
      />
    </>
  );
}

function ProdutosDiagram() {
  const stages = [
    {
      x: 16,
      w: 56,
      h: 150,
      title: "Problema",
      note: "descoberta",
      bars: [36, 24, 30],
      extra: false,
    },
    {
      x: 80,
      w: 60,
      h: 174,
      title: "Hipótese",
      note: "protótipo",
      bars: [40, 28, 32, 22],
      extra: true,
    },
    {
      x: 148,
      w: 64,
      h: 200,
      title: "Versão funcional",
      note: "primeira versão",
      bars: [44, 36, 40, 28],
      extra: true,
      current: true,
    },
    {
      x: 220,
      w: 44,
      h: 220,
      title: "Evolução",
      note: "contínua",
      bars: [28, 22, 26, 18, 20],
      extra: true,
    },
  ] as const;

  return (
    <>
      <Pane x="12" y="12" w="256" h="296" level="shell" />
      <Pane x="12" y="12" w="256" h="26" level="chrome" />
      <Label x="22" y="29">
        Evolução do produto
      </Label>
      <Line d="M12 38 H268" level="primary" />
      <Line d="M28 58 H252" />
      <rect
        x="28"
        y="55"
        width="224"
        height="6"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <rect
        x="28"
        y="55"
        width="224"
        height="6"
        className="text-primary"
        fill="currentColor"
        data-roadmap-progress=""
      />
      {stages.map((stage) => (
        <g key={stage.title}>
          <circle
            cx={stage.x + stage.w / 2}
            cy="58"
            r="5"
            data-diagram-mark={"current" in stage ? "active" : ""}
          />
          <Pane
            x={stage.x}
            y={320 - 16 - stage.h}
            w={stage.w}
            h={stage.h}
            level={"current" in stage ? "emphasis" : "surface"}
          />
          {"current" in stage ? (
            <rect
              x={stage.x}
              y={320 - 16 - stage.h}
              width="4"
              height={stage.h}
              className="text-primary"
              fill="currentColor"
            />
          ) : null}
          <Label x={stage.x + 8} y={320 - 16 - stage.h + 18}>
            {stage.title}
          </Label>
          <Label x={stage.x + 8} y={320 - 16 - stage.h + 32} muted>
            {stage.note}
          </Label>
          {stage.bars.map((width, index) => (
            <Bar
              key={`${stage.title}-${width}`}
              x={stage.x + 8}
              y={320 - 16 - stage.h + 44 + index * 14}
              w={width}
              h={6}
              accent={"current" in stage && index === 0}
            />
          ))}
          {stage.extra ? (
            <Pane
              x={stage.x + 8}
              y={304 - 36}
              w={stage.w - 16}
              h={22}
              level="inset"
            />
          ) : null}
        </g>
      ))}
    </>
  );
}

function WebGrowthDiagram() {
  return (
    <>
      <Pane x="12" y="12" w="256" h="296" level="shell" />
      <Pane x="12" y="12" w="256" h="26" level="chrome" />
      <Label x="22" y="29">
        Presença comercial
      </Label>
      <Line d="M12 38 H268" level="primary" />
      <Pane x="18" y="48" w="76" h="36" level="inset" />
      <Pane x="102" y="48" w="76" h="36" level="inset" />
      <Pane x="186" y="48" w="76" h="36" level="inset" />
      <Label x="26" y="64">
        Canais
      </Label>
      <Label x="26" y="76" muted>
        presença
      </Label>
      <Label x="110" y="64">
        Visitantes
      </Label>
      <Label x="110" y="76" muted>
        entrada
      </Label>
      <Label x="194" y="64">
        Oportunidades
      </Label>
      <Label x="194" y="76" muted>
        conversão
      </Label>
      <Line d="M56 84 V98" />
      <Line d="M140 84 V98" />
      <Line d="M224 84 V98" />
      <Line d="M56 98 H224" />
      <Pane x="18" y="106" w="152" h="122" />
      <Label x="26" y="122">
        Conversão
      </Label>
      <Bar x="32" y="138" w="18" h="70" opacity={0.14} />
      <Bar x="58" y="150" w="18" h="58" opacity={0.18} />
      <g data-convert-bar="">
        <Bar x="84" y="132" w="18" h="76" accent />
      </g>
      <Bar x="110" y="158" w="18" h="50" opacity={0.16} />
      <Bar x="136" y="146" w="18" h="62" opacity={0.14} />
      <Line d="M28 212 H162" />
      <polygon
        points="196,118 248,118 232,168 212,168"
        data-diagram-pane="surface"
      />
      <Label x="208" y="138" muted>
        funil
      </Label>
      <Label x="206" y="154">
        vendas
      </Label>
      <Pane x="18" y="236" w="152" h="60" />
      <Label x="26" y="252">
        Análise
      </Label>
      <path
        d="M30 278 L58 268 L86 272 L114 256 L146 262"
        data-diagram-line="plot"
        data-chart-line=""
      />
      <Pane x="178" y="236" w="84" h="60" level="inset" />
      <circle cx="220" cy="266" r="18" fill="none" data-diagram-line="guide" />
      <path
        d="M220 248 V258"
        fill="none"
        stroke="currentColor"
        className="text-primary"
      />
      <path
        d="M216 254 L220 258 L224 254"
        fill="none"
        stroke="currentColor"
        className="text-primary"
      />
      <Label x="220" y="272" anchor="middle" muted>
        ciclo
      </Label>
    </>
  );
}

const diagrams = {
  "sistemas-sob-medida": SistemasDiagram,
  "automacao-inteligencia-artificial": AutomacaoDiagram,
  "produtos-digitais-mvp": ProdutosDiagram,
  "web-growth": WebGrowthDiagram,
} as const;

export function ServiceStoryDiagram({
  slug,
  active = false,
}: {
  slug: SolutionSlug;
  active?: boolean;
}) {
  const Diagram = diagrams[slug];

  return (
    <svg
      viewBox={serviceStoryViewBox}
      className="text-foreground h-auto w-full"
      aria-hidden="true"
      focusable="false"
      data-service-story-diagram={slug}
      data-service-diagram-active={active ? "" : undefined}
    >
      <Diagram />
    </svg>
  );
}

export function getServiceStoryGeometrySignature(slug: SolutionSlug) {
  const marks = {
    "sistemas-sob-medida": "ops-ui:chrome+sidebar+modules+sync+activity",
    "automacao-inteligencia-artificial":
      "orchestration:inputs>classificacao>agente>validacao-humana>registro",
    "produtos-digitais-mvp":
      "fidelity:problema>hipotese>primeira-versao>evolucao",
    "web-growth": "commerce:canais>visitantes>funil>analise+ciclo",
  } as const;

  return marks[slug];
}

export const serviceStoryGeometrySignatures = Object.fromEntries(
  solutionSlugs.map((slug) => [slug, getServiceStoryGeometrySignature(slug)]),
) as Record<SolutionSlug, string>;

export const serviceStoryDiagramLabels = {
  "sistemas-sob-medida": [
    "Operação",
    "Estoque",
    "Vendas",
    "Financeiro",
    "Permissões",
    "Atividade recente",
  ],
  "automacao-inteligencia-artificial": [
    "Orquestração",
    "Entrada",
    "Classificação",
    "Agente",
    "Validação humana",
    "Saída",
  ],
  "produtos-digitais-mvp": [
    "Problema",
    "Hipótese",
    "Versão funcional",
    "Evolução",
  ],
  "web-growth": [
    "Canais",
    "Visitantes",
    "Oportunidades",
    "Conversão",
    "Análise",
  ],
} as const;
