import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteWordmark } from "@/components/layout/site-wordmark";
import { AccordionList } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { navigation } from "@/content/navigation";
import { showcaseFaqItems } from "@/content/showcase-faq";

const typeScale = [
  { token: "display-xl", className: "text-display-xl font-bold", sample: "Sistemas" },
  { token: "display-lg", className: "text-display-lg font-bold", sample: "Operar" },
  { token: "display-md", className: "text-display-md font-bold", sample: "Crescer" },
  { token: "h1", className: "text-h1 font-bold", sample: "Título principal" },
  { token: "h2", className: "text-h2 font-semibold", sample: "Título de seção" },
  { token: "h3", className: "text-h3 font-semibold", sample: "Título de bloco" },
  { token: "lead", className: "text-lead", sample: "Introdução de seção do design system." },
  { token: "body-lg", className: "text-body-lg", sample: "Texto destacado de demonstração." },
  { token: "body", className: "text-body", sample: "Corpo de leitura do design system." },
  { token: "small", className: "text-small", sample: "Texto de apoio da amostra." },
  { token: "label", className: "text-label font-semibold uppercase", sample: "Metadado" },
] as const;

const colorTokens = [
  "background",
  "foreground",
  "surface",
  "muted",
  "border",
  "primary",
  "success",
  "warning",
  "error",
  "error-foreground",
  "info",
] as const;

const colorClassName: Record<(typeof colorTokens)[number], string> = {
  background: "bg-background",
  foreground: "bg-foreground",
  surface: "bg-surface",
  muted: "bg-muted",
  border: "bg-border",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  "error-foreground": "bg-error-foreground",
  info: "bg-info",
};

const buttonVariants = [
  "primary",
  "secondary",
  "ghost",
  "text",
  "destructive",
] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

function IconPlus() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export default function DesignSystemPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <Section surface="light" spacing="compact" aria-labelledby="ds-titulo">
        <Container>
          <Eyebrow>Página interna · não indexar</Eyebrow>
          <h1 id="ds-titulo" className="text-display-md mt-4 font-bold">
            Fundação visual
          </h1>
          <p className="text-lead text-muted-foreground mt-6 max-w-text">
            Amostra das primitives estáticas do design system da AZ Work Center.
            Os textos abaixo são exemplos de interface, não descrevem clientes,
            resultados ou ofertas.
          </p>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-tipo">
        <Container>
          <SectionHeading
            id="ds-tipo"
            eyebrow="Escala"
            title="Tipografia"
            description="Amostra da escala fluida. Headings usam text-wrap balance; textos usam pretty."
          />
          <ol className="mt-12 space-y-8">
            {typeScale.map((item) => (
              <li
                key={item.token}
                className="border-border grid gap-3 border-t pt-6 md:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <span className="text-small text-muted-foreground">{item.token}</span>
                <p className={item.className}>{item.sample}</p>
              </li>
            ))}
          </ol>
          <p className="font-editorial text-lead mt-12 max-w-text">
            Newsreader entra só em ênfase editorial, como neste parágrafo de
            demonstração.
          </p>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-cores">
        <Container>
          <SectionHeading
            id="ds-cores"
            eyebrow="Semântica"
            title="Cores"
            description="Swatches usam tokens semânticos. Nenhum valor hexadecimal é definido nesta página."
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {colorTokens.map((token) => (
              <li key={token} className="flex flex-col gap-2">
                <span
                  className={`border-border min-h-16 border ${colorClassName[token]}`}
                />
                <span className="text-small text-muted-foreground">{token}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-superficie-clara">
        <Container>
          <SectionHeading
            id="ds-superficie-clara"
            eyebrow="data-surface=light"
            title="Superfície clara"
            description="Paper e tinta. Exemplo de heading, corpo e ações sobre fundo quente."
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button>Ação principal</Button>
            <Button variant="secondary">Ação de apoio</Button>
            <TextLink href="#ds-acoes">Link de texto interno</TextLink>
          </div>
        </Container>
      </Section>

      <Section surface="dark" spacing="compact" aria-labelledby="ds-superficie-escura">
        <Container>
          <SectionHeading
            id="ds-superficie-escura"
            eyebrow="data-surface=dark"
            title="Superfície escura"
            description="Ink e giz. Os mesmos componentes herdam tokens sem condicionais de cor."
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button>Ação principal</Button>
            <Button variant="secondary">Ação de apoio</Button>
            <TextLink href="#ds-acoes">Link de texto interno</TextLink>
          </div>
        </Container>
      </Section>

      <Section surface="brand" spacing="compact" aria-labelledby="ds-superficie-marca">
        <Container>
          <SectionHeading
            id="ds-superficie-marca"
            eyebrow="data-surface=brand"
            title="Superfície de marca"
            description="Vermelho como campo, não como decoração. Uso pontual, nunca como fundo dominante do site."
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button>Ação principal</Button>
            <Button variant="secondary">Ação de apoio</Button>
            <Button variant="destructive">Excluir exemplo</Button>
            <TextLink href="#ds-acoes">Link de texto interno</TextLink>
          </div>
        </Container>
      </Section>

      <Section surface="light" spacing="default" aria-labelledby="ds-acoes">
        <Container>
          <SectionHeading
            id="ds-acoes"
            eyebrow="Inventário"
            title="Botões e estados"
            description="Estados visíveis sem depender de hover. Destructive permanece raro."
          />

          <div className="mt-12 space-y-10">
            {buttonVariants.map((variant) => (
              <div key={variant} className="border-border border-t pt-6">
                <Eyebrow>variante {variant}</Eyebrow>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {variant} {size}
                    </Button>
                  ))}
                  <Button variant={variant} size="icon" aria-label={`Ícone ${variant}`}>
                    <IconPlus />
                  </Button>
                </div>
              </div>
            ))}

            <div className="border-border border-t pt-6">
              <Eyebrow>estados persistentes</Eyebrow>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button disabled>Desabilitado</Button>
                <Button loading>Enviar diagnóstico</Button>
                <Button variant="secondary" loading>
                  Processando
                </Button>
                <Button variant="ghost" disabled>
                  Ghost inativo
                </Button>
              </div>
            </div>

            <div className="border-border border-t pt-6">
              <Eyebrow>ButtonLink</Eyebrow>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <ButtonLink href="/">Ir para a Home</ButtonLink>
                <ButtonLink href="/" variant="secondary">
                  Ação de apoio em link
                </ButtonLink>
                <ButtonLink
                  href="https://azworkcenter.com.br"
                  variant="secondary"
                  openInNewTab
                >
                  Site atual em nova aba
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-links">
        <Container width="text">
          <SectionHeading
            id="ds-links"
            eyebrow="Encadeamento"
            title="TextLink e Eyebrow"
            description="Affordance por sublinhado, não só por cor. Nova aba só quando pedida."
          />
          <p className="text-body mt-8">
            Exemplo de parágrafo com{" "}
            <TextLink href="/">link interno para a Home</TextLink> e um{" "}
            <TextLink href="https://azworkcenter.com.br" openInNewTab>
              link externo com nova aba
            </TextLink>
            . O destino externo não abre nova aba por padrão.
          </p>
          <Eyebrow className="mt-8">eyebrow editorial de exemplo</Eyebrow>
        </Container>
      </Section>

      <Section surface="dark" spacing="compact" aria-labelledby="ds-layout">
        <Container>
          <SectionHeading
            id="ds-layout"
            eyebrow="Estrutura"
            title="Container e Section"
            description="Quatro larguras e três ritmos verticais. Gutters vêm do token, não de valores soltos."
          />
        </Container>
        <div className="mt-12 space-y-4">
          <Container width="default">
            <p className="border-border text-small border px-3 py-3">
              Container default · 1280 px
            </p>
          </Container>
          <Container width="editorial">
            <p className="border-border text-small border px-3 py-3">
              Container editorial · 760 px
            </p>
          </Container>
          <Container width="text">
            <p className="border-border text-small border px-3 py-3">
              Container text · 640–720 px
            </p>
          </Container>
          <Container width="full">
            <p className="border-border text-small border px-3 py-3">
              Container full · só gutters
            </p>
          </Container>
        </div>
        <Container className="mt-12">
          <SectionHeading
            as="h3"
            size="h2"
            align="center"
            maxWidth="editorial"
            className="mx-auto"
            eyebrow="alinhamento explícito"
            title="SectionHeading centralizado"
            description="A centralização é variante, não padrão. O nível semântico continua h3, mesmo com tamanho visual de h2."
          />
        </Container>
      </Section>

      <Section surface="dark" spacing="compact" aria-labelledby="ds-header">
        <Container>
          <SectionHeading
            id="ds-header"
            eyebrow="Navegação"
            title="Cabeçalho"
            description="Amostra isolada do shell público. Nesta página o header do showcase não é sticky para não cobrir o restante da inspeção."
          />
        </Container>
        <div className="mt-10">
          <SiteHeader className="relative top-auto z-0" />
        </div>
        <Container className="mt-10">
          <Eyebrow>navegação desktop isolada</Eyebrow>
          <div className="border-border mt-4 overflow-x-auto border p-4">
            <DesktopNav />
          </div>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-mobile-nav">
        <Container>
          <SectionHeading
            id="ds-mobile-nav"
            eyebrow="Menu"
            title="Navegação mobile"
            description="O disparador abre um Sheet lateral. Escape fecha, o foco retorna ao botão e o overlay impede interação com o conteúdo atrás."
          />
          <div
            data-surface="dark"
            className="bg-background text-foreground border-border mt-8 flex items-center justify-between gap-4 border p-4"
          >
            <SiteWordmark />
            <MobileNav items={navigation.primary} cta={navigation.cta} />
          </div>
          <div
            data-surface="dark"
            className="bg-background text-foreground border-border mt-8 max-w-sm border"
            aria-label="Amostra visual do menu aberto"
          >
            <p className="border-border text-body border-b px-5 py-4 font-semibold">
              Menu de navegação
            </p>
            <ul className="px-5 py-2">
              {navigation.primary.map((item) => (
                <li key={item.href} className="border-border border-b">
                  <span className="flex min-h-touch items-center py-4 text-body-lg font-semibold">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-small text-muted-foreground px-5 py-4">
              Amostra estática do estado aberto, sem prender o foco.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-breadcrumb">
        <Container>
          <SectionHeading
            id="ds-breadcrumb"
            eyebrow="Páginas internas"
            title="Breadcrumb"
            description="Não entra na Home. Dois e três níveis, com a página atual em aria-current."
          />
          <div className="mt-8 space-y-6">
            <Breadcrumb
              items={[{ label: "Início", href: "/" }]}
              current="Soluções"
            />
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Soluções", href: "/solucoes" },
              ]}
              current="Sistemas sob medida"
            />
          </div>
        </Container>
      </Section>

      <Section surface="dark" spacing="compact" aria-labelledby="ds-breadcrumb-dark">
        <Container>
          <SectionHeading
            id="ds-breadcrumb-dark"
            eyebrow="data-surface=dark"
            title="Breadcrumb em superfície escura"
            description="Os mesmos tokens semânticos acompanham a superfície."
          />
          <div className="mt-8">
            <Breadcrumb
              items={[{ label: "Início", href: "/" }]}
              current="Como trabalhamos"
            />
          </div>
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-accordion">
        <Container width="editorial">
          <SectionHeading
            id="ds-accordion"
            eyebrow="Perguntas de exemplo"
            title="Accordion"
            description="As perguntas abaixo identificam-se como amostra de interface. Não são o FAQ público da empresa."
          />
          <AccordionList
            items={showcaseFaqItems}
            className="mt-10"
            idPrefix="ds-faq"
          />
        </Container>
      </Section>

      <Section surface="dark" spacing="compact" aria-labelledby="ds-accordion-dark">
        <Container width="editorial">
          <SectionHeading
            id="ds-accordion-dark"
            eyebrow="data-surface=dark"
            title="Accordion em superfície escura"
            description="Linhas editoriais no lugar de cards. Amostra para contraste e foco."
          />
          <AccordionList
            items={showcaseFaqItems}
            className="mt-10"
            idPrefix="ds-faq-dark"
          />
        </Container>
      </Section>

      <Section surface="light" spacing="compact" aria-labelledby="ds-footer">
        <Container>
          <SectionHeading
            id="ds-footer"
            eyebrow="Rodapé"
            title="SiteFooter"
            description="Amostra isolada do rodapé público. Dados pendentes de telefone, e-mail e CNPJ não aparecem."
          />
        </Container>
        <div className="mt-10">
          <SiteFooter />
        </div>
      </Section>
    </main>
  );
}
