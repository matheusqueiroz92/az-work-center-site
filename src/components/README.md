# Primitives de interface

Documentação operacional das primitives estáticas. A fonte normativa de tokens, raios, escala e restrições continua em [`docs/04-design-system.md`](../../docs/04-design-system.md) e [`docs/03-manual-da-marca.md`](../../docs/03-manual-da-marca.md).

Todos os componentes deste diretório são universais: sem `"use client"`, sem estado de navegador e sem Motion. Hover, foco e active vêm de CSS.

## Convenções gerais

- Use tokens semânticos (`bg-background`, `text-foreground`, `bg-primary`). Não use hex nem tokens primitivos (`az-red-600`) em TSX.
- Superfícies mudam por `data-surface` no `Section`. Não faça `if (dark) className="bg-[#111]"`.
- `className` é extra, não substituto da linguagem visual.
- `sm` do botão tem altura mínima de 44 px (`min-h-touch`) em todos os breakpoints e só deve aparecer em ações secundárias. Preferir `md` ou `lg` em CTAs.

## Container

**Finalidade:** limitar largura e aplicar gutters fluidos.

**Variantes:** `default` (1280 px), `editorial` (760 px), `text` (640–720 px), `full` (só gutters).

**Tokens:** `max-w-container`, `max-w-content`, `max-w-text`, `px-gutter`.

**Semântica:** `div` de composição. O marco de seção fica no `Section`.

**Superfícies:** transparente; herda a superfície do pai.

**Acessibilidade:** não cria heading nem landmark.

**Uso:**

```tsx
<Container width="text">
  <p>Texto comercial</p>
</Container>
```

**Proibido:** repetir `px-[20px]` / `max-w-[1280px]` nos consumidores.

## Section

**Finalidade:** bloco semântico com superfície e ritmo vertical.

**Variantes de superfície:** `light`, `dark`, `brand`. `quiet` não existe enquanto não houver tokens.

**Espaçamentos:** `compact`, `default`, `narrative`.

**Semântica:** `section` por padrão. `as` aceita `header`, `footer`, `aside`, `main` ou `div`.

**Tokens:** `bg-background`, `text-foreground`, `py-section-*`.

**Superfícies:** `data-surface` troca as variáveis semânticas, inclusive quando uma seção clara fica dentro de uma escura.

**Acessibilidade:** combine com `aria-labelledby` apontando para o heading da seção.

**Uso:**

```tsx
<Section surface="dark" spacing="narrative" aria-labelledby="metodo">
  <Container>
    <SectionHeading id="metodo" title="Como trabalhamos" />
  </Container>
</Section>
```

**Proibido:** hex por superfície; `quiet` improvisado; pular heading só para mudar o tamanho.

## SectionHeading

**Finalidade:** bloco de introdução de seção.

**Variantes:** `align` (`start` padrão, `center` explícito), `maxWidth`, `as` (nível semântico), `size` (tamanho visual).

**Estados:** descrição opcional; eyebrow opcional.

**Tokens:** `text-h*`, `text-display-md`, `text-lead`, `text-muted-foreground`, `max-w-*`.

**Semântica:** `as` controla `h1`–`h4`. O tamanho visual não troca o heading.

**Superfícies:** herda foreground/muted da seção.

**Acessibilidade:** um `h1` por página; não use `as="h1"` em seções internas.

**Uso:**

```tsx
<SectionHeading
  as="h2"
  size="h2"
  eyebrow="Método"
  title="Diagnóstico antes da construção"
  description="Texto de apoio da seção."
/>
```

**Proibido:** centralizar por padrão; escolher `as` só para obter um tamanho.

## Eyebrow

**Finalidade:** rótulo editorial curto acima de um título.

**Variantes:** apenas `className`.

**Tokens:** `text-label`, `text-muted-foreground`, caixa alta e tracking do token de label.

**Semântica:** `p`. Não substitui heading.

**Superfícies:** muted-foreground acompanha a superfície.

**Acessibilidade:** não é landmark; mantenha o texto curto.

**Uso:**

```tsx
<Eyebrow>Design system interno</Eyebrow>
```

**Proibido:** IBM Plex Mono (ainda não carregada); ícones de sparkles; parágrafos longos em caixa alta.

## Button

**Finalidade:** ação que dispara um evento, envio ou comando. Renderiza `<button>`.

**Variantes:** `primary`, `secondary`, `ghost`, `text`, `destructive`.

**Tamanhos:** `sm`, `md`, `lg`, `icon`.

**Estados:** default, hover, focus-visible, active, disabled, loading.

**Tokens:** `bg-primary`, `text-primary-foreground`, `bg-primary-hover`, `border-border`, `bg-muted`, `bg-error`, `text-error-foreground`, `duration-fast`, `ease-standard`, `min-h-touch`, `size-touch`.

**Semântica:** `type="button"` por padrão. Use `type="submit"` só em formulário.

**Superfícies:** primary/secondary/ghost/text acompanham os tokens da superfície. `destructive` usa `text-error-foreground` (branco) para manter contraste sobre `bg-error` em light, dark e brand. Não é CTA de marca.

**Acessibilidade:** loading define `disabled`, `aria-busy` e o texto “Carregando”; a largura do rótulo é preservada. Todos os tamanhos, inclusive `sm`, têm alvo mínimo de 44 × 44 px. Active com `scale(0.98)` só em `motion-safe`.

**Uso:**

```tsx
<Button>Enviar</Button>
<Button loading>Enviar</Button>
<Button variant="destructive">Excluir rascunho</Button>
```

**Proibido:** simular link com `button`; `use client` só para hover; `asChild`; usar `destructive` como destaque da Home.

## ButtonLink

**Finalidade:** navegação com a mesma linguagem visual do `Button`. Renderiza link.

**Variantes e tamanhos:** iguais aos do `Button`.

**Estados:** default, hover, focus-visible, active. Sem `disabled` nativo.

**Tokens:** os mesmos de `button-styles`.

**Semântica:** `next/link` para destinos internos (`/rota`). `<a>` para externos.

**Superfícies:** iguais às do `Button`.

**Acessibilidade:** é um link, não um botão. Destino indisponível não usa `disabled`. Omita o link ou mostre texto estático com a justificativa. Nova aba só com `openInNewTab`; o aviso “abre em nova aba” é anunciado ao leitor de tela. `target` não faz parte da API pública.

**Uso:**

```tsx
<ButtonLink href="/contato">Pedir diagnóstico</ButtonLink>
<ButtonLink href="https://azworkcenter.com.br" openInNewTab>
  Site atual
</ButtonLink>
```

**Proibido:** `href="#"` sem destino; `disabled` em âncora; `<button>` com `window.location`; `target="_blank"` direto.

## TextLink

**Finalidade:** link contextual no fluxo do texto.

**Variantes:** interno, externo, `openInNewTab`.

**Estados:** default, hover (sublinhado mais grosso e offset menor), focus-visible.

**Tokens:** `text-foreground`, `decoration-primary`, `duration-fast`.

**Semântica:** `next/link` interno; `<a>` externo. Nova aba só com `openInNewTab`, acompanhada de “abre em nova aba” para leitor de tela. `rel` extra do consumidor é mesclado com `noopener` e `noreferrer`, sem duplicação.

**Superfícies:** o texto permanece foreground; o vermelho marca o sublinhado.

**Acessibilidade:** não abrir nova aba por padrão; não usar só mudança de cor no hover; texto contextual, nunca “clique aqui”.

**Uso:**

```tsx
<TextLink href="/sobre">Sobre a AZ</TextLink>
<TextLink href="https://azworkcenter.com.br" openInNewTab>
  Site atual
</TextLink>
```

**Proibido:** nova aba implícita; underline só no hover; hex de link.

## Showcase interno

Rota `/dev/design-system`. `noindex, nofollow`. Em `VERCEL_ENV=production` responde `notFound()`. Não entra na navegação pública.
