import { solutionSlugs, type SolutionSlug } from "@/types/content";

export const serviceStoryViewBox = "0 0 280 320";

function Pane({
  x,
  y,
  w,
  h,
  opacity = 0.06,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  opacity?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="currentColor"
      fillOpacity={opacity}
      stroke="currentColor"
      strokeWidth="1"
    />
  );
}

function Line({ d, muted = false }: { d: string; muted?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={muted ? "text-muted-foreground" : undefined}
    />
  );
}

function Bar({
  x,
  y,
  w,
  h = 5,
  accent = false,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h?: number | string;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      className={accent ? "text-primary" : undefined}
      fill="currentColor"
      fillOpacity={accent ? 1 : 0.22}
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
      fontSize={size}
      fontFamily="var(--font-sans), sans-serif"
      className={muted ? "text-muted-foreground" : undefined}
    >
      {children}
    </text>
  );
}

function Accent({ x, y }: { x: number | string; y: number | string }) {
  return (
    <g className="text-primary" fill="currentColor">
      <rect x={x} y={y} width="5" height="5" />
    </g>
  );
}

function SistemasDiagram() {
  return (
    <>
      <Pane x="16" y="20" w="248" h="280" opacity={0.04} />
      <rect
        x="16"
        y="20"
        width="248"
        height="22"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <Label x="26" y="35" muted size={7}>
        Painel operacional
      </Label>
      <Line d="M74 42 V300" muted />
      <Line d="M16 42 H264" muted />
      <Label x="26" y="60" muted size={7}>
        Dados
      </Label>
      <Bar x="26" y="68" w="36" />
      <Bar x="26" y="78" w="28" />
      <Bar x="26" y="88" w="32" />
      <Label x="26" y="116" muted size={7}>
        Módulos
      </Label>
      <Bar x="26" y="124" w="36" accent />
      <Bar x="26" y="134" w="24" />
      <Bar x="26" y="144" w="30" />
      <Label x="26" y="172" muted size={7}>
        Integrações
      </Label>
      <Bar x="26" y="180" w="34" />
      <Bar x="26" y="190" w="22" />
      <Pane x="86" y="52" w="78" h="86" />
      <Label x="94" y="68">
        Estoque
      </Label>
      <Bar x="94" y="78" w="52" />
      <Bar x="94" y="90" w="40" />
      <Bar x="94" y="102" w="46" />
      <Pane x="174" y="52" w="78" h="86" />
      <Label x="182" y="68">
        Vendas
      </Label>
      <Bar x="182" y="78" w="52" />
      <Bar x="182" y="90" w="36" />
      <Bar x="182" y="102" w="48" accent />
      <Pane x="86" y="148" w="78" h="86" />
      <Label x="94" y="164">
        Financeiro
      </Label>
      <Bar x="94" y="174" w="48" />
      <Bar x="94" y="186" w="54" />
      <Bar x="94" y="198" w="38" />
      <Pane x="174" y="148" w="78" h="86" />
      <Label x="182" y="164">
        Permissões
      </Label>
      <Bar x="182" y="174" w="44" />
      <Bar x="182" y="186" w="50" />
      <Bar x="182" y="198" w="32" />
      <Line d="M74 128 H86" muted />
      <Line d="M164 95 H174" muted />
      <Line d="M164 191 H174" muted />
      <rect
        x="16"
        y="248"
        width="248"
        height="52"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <Line d="M16 248 H264" muted />
      <Label x="26" y="266" muted size={7}>
        Usuários
      </Label>
      <circle cx="34" cy="282" r="6" fill="currentColor" fillOpacity="0.2" />
      <circle cx="52" cy="282" r="6" fill="currentColor" fillOpacity="0.2" />
      <circle cx="70" cy="282" r="6" fill="currentColor" fillOpacity="0.2" />
      <Label x="88" y="286" muted size={7}>
        gestão · operação
      </Label>
      <Accent x="236" y="108" />
    </>
  );
}

function AutomacaoDiagram() {
  const nodes = [
    { y: 24, title: "Entrada", note: "fila e contexto", bars: [58, 46, 50] },
    {
      y: 82,
      title: "Classificação",
      note: "tipo e prioridade",
      bars: [42, 54, 36],
    },
    { y: 140, title: "Agente", note: "execução assistida", bars: [50, 38, 44] },
    {
      y: 198,
      title: "Validação humana",
      note: "decisão",
      bars: [48, 32, 40],
    },
    { y: 256, title: "Saída", note: "registro e ação", bars: [56, 44, 28] },
  ] as const;

  return (
    <>
      {nodes.map((node, index) => (
        <g key={node.title}>
          {index > 0 ? (
            <Line d={`M140 ${node.y - 16} V${node.y}`} muted />
          ) : null}
          <Pane x="36" y={node.y} w="208" h="50" />
          <rect
            x="36"
            y={node.y}
            width="8"
            height="50"
            className={
              node.title === "Validação humana" ? "text-primary" : undefined
            }
            fill="currentColor"
            fillOpacity={node.title === "Validação humana" ? 1 : 0.16}
          />
          <Label x="56" y={node.y + 16}>
            {node.title}
          </Label>
          <Label x="56" y={node.y + 28} muted size={7}>
            {node.note}
          </Label>
          {node.bars.map((width, barIndex) => (
            <Bar
              key={`${node.title}-${width}`}
              x={56 + barIndex * 18}
              y={node.y + 36}
              w={width > 40 ? 14 : 10}
              h={4}
              accent={node.title === "Agente" && barIndex === 0}
            />
          ))}
        </g>
      ))}
      <Accent x="226" y="216" />
    </>
  );
}

function ProdutosDiagram() {
  return (
    <>
      <Line d="M36 86 H244" />
      <circle cx="52" cy="86" r="4" fill="currentColor" />
      <circle cx="112" cy="86" r="4" fill="currentColor" />
      <circle
        cx="172"
        cy="86"
        r="4"
        className="text-primary"
        fill="currentColor"
      />
      <circle
        cx="232"
        cy="86"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeDasharray="2 2"
      />
      <Pane x="16" y="108" w="58" h="76" />
      <Label x="22" y="124">
        Descoberta
      </Label>
      <Bar x="22" y="136" w="40" />
      <Bar x="22" y="146" w="28" />
      <Bar x="22" y="156" w="36" />
      <Label x="22" y="174" muted size={6}>
        recorte
      </Label>
      <Pane x="80" y="108" w="58" h="88" />
      <rect
        x="86"
        y="118"
        width="46"
        height="36"
        fill="none"
        stroke="currentColor"
      />
      <Bar x="92" y="128" w="24" />
      <Bar x="92" y="138" w="18" />
      <Label x="86" y="168">
        Protótipo
      </Label>
      <Label x="86" y="184" muted size={6}>
        hipótese
      </Label>
      <Pane x="144" y="108" w="58" h="96" opacity={0.08} />
      <rect
        x="150"
        y="118"
        width="46"
        height="42"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
      />
      <Bar x="156" y="128" w="20" accent />
      <Bar x="156" y="138" w="28" />
      <Bar x="156" y="148" w="16" />
      <Label x="150" y="174">
        MVP
      </Label>
      <Label x="150" y="190" muted size={6}>
        construção
      </Label>
      <Pane x="208" y="108" w="56" h="80" />
      <Label x="214" y="124">
        Evolução
      </Label>
      <Line d="M224 142 A12 12 0 1 1 236 154" />
      <path
        d="M234 150 L238 154 L232 156"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <Label x="214" y="176" muted size={6}>
        ampliar
      </Label>
      <Label x="36" y="38" muted size={7}>
        Roadmap
      </Label>
      <Label x="44" y="72" muted size={7}>
        problema
      </Label>
      <Label x="100" y="72" muted size={7}>
        teste
      </Label>
      <Label x="160" y="72" muted size={7}>
        release
      </Label>
      <Label x="216" y="72" muted size={7}>
        ciclo
      </Label>
      <Accent x="168" y="82" />
    </>
  );
}

function WebGrowthDiagram() {
  return (
    <>
      <Label x="20" y="28" muted size={7}>
        Canais
      </Label>
      <Pane x="16" y="36" w="76" h="28" />
      <Pane x="100" y="36" w="76" h="28" />
      <Pane x="184" y="36" w="80" h="28" />
      <Label x="24" y="54" size={7}>
        Presença digital
      </Label>
      <Label x="108" y="54" size={7}>
        Aquisição
      </Label>
      <Label x="192" y="54" size={7}>
        Conversão
      </Label>
      <Line d="M54 64 V84" muted />
      <Line d="M138 64 V84" muted />
      <Line d="M224 64 V84" muted />
      <Line d="M54 84 H224" muted />
      <Pane x="16" y="92" w="160" h="132" />
      <Label x="24" y="110" muted size={7}>
        Conversões
      </Label>
      <Bar x="32" y="124" w="18" h="72" />
      <Bar x="58" y="140" w="18" h="56" />
      <Bar x="84" y="118" w="18" h="78" accent />
      <Bar x="110" y="148" w="18" h="48" />
      <Bar x="136" y="132" w="18" h="64" />
      <Line d="M28 200 H164" muted />
      <Pane x="188" y="92" w="76" h="132" />
      <Label x="196" y="110" muted size={7}>
        Análise
      </Label>
      <Line d="M200 128 L212 148 L226 136 L240 158 L252 142" />
      <Line d="M196 168 H256" muted />
      <Bar x="200" y="176" w="52" />
      <Bar x="200" y="188" w="36" />
      <Bar x="200" y="200" w="44" />
      <circle cx="140" cy="268" r="28" fill="none" stroke="currentColor" />
      <path
        d="M140 240 V252"
        fill="none"
        stroke="currentColor"
        className="text-primary"
      />
      <path
        d="M136 248 L140 252 L144 248"
        fill="none"
        stroke="currentColor"
        className="text-primary"
      />
      <Label x="140" y="272" anchor="middle" size={7}>
        ciclo
      </Label>
      <Label x="20" y="248" muted size={7}>
        otimização
      </Label>
      <Label x="20" y="268" muted size={7}>
        medir e ajustar
      </Label>
      <Accent x="90" y="118" />
    </>
  );
}

const diagrams = {
  "sistemas-sob-medida": SistemasDiagram,
  "automacao-inteligencia-artificial": AutomacaoDiagram,
  "produtos-digitais-mvp": ProdutosDiagram,
  "web-growth": WebGrowthDiagram,
} as const;

export function ServiceStoryDiagram({ slug }: { slug: SolutionSlug }) {
  const Diagram = diagrams[slug];

  return (
    <svg
      viewBox={serviceStoryViewBox}
      className="text-foreground h-auto w-full"
      aria-hidden="true"
      focusable="false"
      data-service-story-diagram={slug}
    >
      <Diagram />
    </svg>
  );
}

export function getServiceStoryGeometrySignature(slug: SolutionSlug) {
  const marks = {
    "sistemas-sob-medida": "ui-shell:sidebar+modules+users+integrations",
    "automacao-inteligencia-artificial":
      "workflow:entrada>classificacao>agente>validacao-humana>saida",
    "produtos-digitais-mvp":
      "roadmap:descoberta>prototipo>mvp-construcao>evolucao",
    "web-growth": "dashboard:canais+funil+grafico+ciclo",
  } as const;

  return marks[slug];
}

export const serviceStoryGeometrySignatures = Object.fromEntries(
  solutionSlugs.map((slug) => [slug, getServiceStoryGeometrySignature(slug)]),
) as Record<SolutionSlug, string>;

export const serviceStoryDiagramLabels = {
  "sistemas-sob-medida": ["Dados", "Usuários", "Módulos", "Integrações"],
  "automacao-inteligencia-artificial": [
    "Entrada",
    "Classificação",
    "Agente",
    "Validação humana",
    "Saída",
  ],
  "produtos-digitais-mvp": ["Descoberta", "Protótipo", "MVP", "Evolução"],
  "web-growth": ["Presença digital", "Aquisição", "Conversão", "Análise"],
} as const;
