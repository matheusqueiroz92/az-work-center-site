# Design system — AZ Work Center

## 1. Objetivo

Criar uma linguagem visual e funcional consistente para o site atual e futuras páginas comerciais, reduzindo decisões improvisadas durante a implementação por agentes.

## 2. Princípios

1. **Clareza antes do efeito.**
2. **Evidência antes da decoração.**
3. **Sistema antes da exceção.**
4. **Movimento com propósito.**
5. **Humano, mesmo quando técnico.**
6. **Acessível desde o componente.**

## 3. Modos de superfície

O site não terá toggle obrigatório de tema. Usará seções alternadas:

- `light`: Paper + Ink;
- `dark`: Ink/Carbon + Chalk;
- `brand`: AZ Red 600 + Chalk;
- `quiet`: tonalidade intermediária para transições.

Componentes devem aceitar contexto de superfície por tokens semânticos, não por condicionais de hex espalhadas.

## 4. Tokens

Os arquivos normativos são:

- `design-system/tokens.json` — fonte agnóstica;
- `design-system/tokens.css` — variáveis CSS.

### Nomenclatura

Usar tokens semânticos em componentes:

- `bg-background`;
- `text-foreground`;
- `bg-surface`;
- `text-muted-foreground`;
- `border-border`;
- `bg-primary`;
- `text-primary-foreground`;
- `bg-error`;
- `text-error-foreground`;
- `ring-focus`.

Tokens primitivos só devem aparecer na camada de configuração.

## 5. Grid e containers

### Breakpoints de teste

| Nome | Largura de referência |
|---|---:|
| mobile | 375 px |
| tablet | 768 px |
| laptop | 1024 px |
| desktop | 1440 px |
| wide | 1728 px |

Não criar layout especificamente para um único dispositivo. Os valores são pontos de verificação.

### Container

- largura máxima padrão: 1280 px;
- editorial/long-form: 760 px;
- texto comercial: 640–720 px;
- gutter: 20 px mobile, 32 px tablet, 48–64 px desktop;
- usar `clamp()` quando o crescimento fluido for apropriado.

### Colunas

- mobile: 4;
- tablet: 8;
- desktop: 12;
- gap: 16 px mobile, 24 px desktop.

### Ritmo vertical

- seção compacta: 64–80 px;
- seção padrão: 96–128 px;
- seção narrativa: 128–176 px;
- hero: min-height visual entre 80 e 95 svh, sem forçar 100vh em mobile.

## 6. Espaçamento

Escala base em múltiplos de 4:

| Token | Valor |
|---|---:|
| 0 | 0 |
| 1 | 4 px |
| 2 | 8 px |
| 3 | 12 px |
| 4 | 16 px |
| 5 | 20 px |
| 6 | 24 px |
| 8 | 32 px |
| 10 | 40 px |
| 12 | 48 px |
| 16 | 64 px |
| 20 | 80 px |
| 24 | 96 px |
| 32 | 128 px |
| 40 | 160 px |

Evitar valores arbitrários como 37 px ou 83 px, salvo cálculo fluido documentado.

## 7. Tipografia

### Escala fluida

| Token | Faixa | Uso |
|---|---|---|
| display-xl | `clamp(3.5rem, 8vw, 8.5rem)` | manifesto/página especial |
| display-lg | `clamp(3rem, 6.5vw, 6.75rem)` | hero Home |
| display-md | `clamp(2.5rem, 5vw, 5rem)` | hero interno |
| h1 | `clamp(2.25rem, 4vw, 4rem)` | título principal |
| h2 | `clamp(1.875rem, 3vw, 3.25rem)` | seção |
| h3 | `clamp(1.375rem, 2vw, 2rem)` | bloco |
| lead | `clamp(1.125rem, 1.6vw, 1.375rem)` | introdução |
| body-lg | 18 px | texto destacado |
| body | 16 px | corpo |
| small | 14 px | apoio |
| label | 12–13 px | metadado/eyebrow |

### Regras

- Headings: line-height 0.92–1.1, tracking negativo controlado.
- Corpo: line-height 1.55–1.7.
- Labels mono: caixa alta, tracking 0.08–0.14em.
- Comprimento de linha: 45–75 caracteres.
- Nunca reduzir corpo para caber em card; mudar layout.

## 8. Bordas, raios e sombras

### Raios

- `xs`: 4 px;
- `sm`: 8 px;
- `md`: 12 px;
- `lg`: 20 px;
- `pill`: 999 px.

Botões podem ser `pill` ou `sm`; cards usam `sm`/`md`. Evitar 24–32 px em todos os elementos.

### Bordas

- hairline: 1 px;
- emphasis: 2 px;
- usar contraste tonal, não transparência invisível.

### Sombras

- superfície clara: baixa opacidade e grande difusão;
- superfície escura: preferir borda e diferença tonal;
- efeito de elevação nunca substitui hierarquia espacial.

## 9. Componentes

### 9.1 Button

Variantes:

| Variante | Uso |
|---|---|
| primary | única ação principal do contexto |
| secondary | ação de apoio |
| ghost | navegação/ação terciária |
| text | link com ação clara |
| destructive | exclusão/ação irreversível, rara no site |

O destructive usa `bg-error` e `text-error-foreground` (`--az-chalk-0`). O contraste esperado entre `#D9363E` e branco é aproximadamente 4.62:1, suficiente para texto normal AA. A cor primitiva Error não muda sem decisão humana.

Tamanhos:

- `sm`: mínimo 44 × 44 px (`--touch-target`), recomendado só para ações secundárias;
- `md`: 48 px padrão;
- `lg`: 56 px hero;
- ícone: mínimo 44 × 44 px.

Estados: default, hover, focus-visible, active, disabled, loading.

Comportamento:

- hover: mudança tonal + deslocamento máximo de 1–2 px;
- active: compressão `scale(0.98)` apenas sem reduced motion;
- loading: manter largura, spinner nomeado e `aria-busy`;
- links de navegação usam `<a>`/`Link`; ações usam `<button>`.

### 9.2 Link

- Texto contextual, nunca “clique aqui”.
- Underline visível ou affordance por seta/linha.
- Estado visitado pode ser omitido em navegação, mas deve existir em artigos.
- Link externo sinalizado quando necessário, sem abrir nova aba por padrão.
- Nova aba só com `openInNewTab`. O `rel` final deve incluir `noopener` e `noreferrer`, sem duplicar tokens adicionais do consumidor.

### 9.3 Header

- altura: 72 px mobile, 80–88 px desktop;
- sticky;
- skip link antes da navegação;
- CTA não deve comprimir itens;
- menu mobile com foco gerenciado e Escape para fechar.

### 9.4 SectionHeading

Props conceituais:

- `eyebrow`;
- `title`;
- `description`;
- `align: start | center`;
- `tone: light | dark | brand`;
- `maxWidth`.

Preferir alinhamento inicial. Centralização apenas quando reforçar pausa/manifesto.

### 9.5 ServicePanel

Uso: apresentar resultado e capacidades de uma solução.

Desktop: lista de títulos à esquerda e painel visual sticky à direita.  
Mobile: accordion linear ou cards empilhados sem sticky.

Estados: default, hover/focus, selected. A seleção deve funcionar por teclado e não depender de hover.

### 9.6 CaseCard

Campos:

- nome;
- segmento;
- desafio curto;
- serviços;
- imagem;
- resultado aprovado;
- slug;
- `published`.

Variantes: featured, standard, compact.  
Não exibir card quando `published` for falso.

### 9.7 ProcessStep

- número monoespaçado;
- título;
- explicação;
- arte de conexão opcional;
- leitura completa sem animação.

### 9.8 Testimonial

Campos obrigatórios: citação aprovada, nome, função, organização e autorização. Foto opcional. Não reproduzir carrossel automático.

### 9.9 LogoCloud

Preferir grid estático. Se houver movimento contínuo:

- controles de pausa;
- pausa no hover/focus;
- conteúdo duplicado oculto de leitores de tela;
- versão estática em reduced motion;
- nomes/relacionamentos corretos: cliente, parceiro ou iniciativa.

### 9.10 Accordion/FAQ

- usar button dentro do heading;
- `aria-expanded` e `aria-controls`;
- animação curta sem depender de `height: auto` pesada;
- manter conteúdo no DOM quando isso beneficiar SEO, desde que semântico.

### 9.11 Input/Textarea/Select

- label persistente;
- texto de ajuda antes do erro;
- erro com mensagem específica;
- borda não é o único indicador de estado;
- `autocomplete` adequado;
- máscara de telefone não deve impedir colagem/teclado;
- altura mínima 48 px;
- mensagens anunciadas via `aria-describedby`/`role="alert"` quando necessário.

### 9.12 Toast

Usar apenas para feedback complementar. O sucesso do formulário deve permanecer visível na página; erros críticos não podem existir somente em toast.

### 9.13 Dialog/Sheet

- foco inicial coerente;
- focus trap;
- Escape fecha quando seguro;
- botão fechar com nome acessível;
- retorno do foco ao disparador;
- mobile menu é `Sheet`, não modal improvisado.

### 9.14 Breadcrumb

Usar em soluções, cases e conteúdo. Incluir schema quando aplicável. Não usar na Home.

### 9.15 CookieBanner

- aceitar, rejeitar e preferências com igual clareza;
- nenhuma categoria não essencial carregada antes do consentimento;
- persistência da escolha;
- política acessível;
- sem dark patterns.

## 10. Padrões de composição

### Hero assimétrico

Texto ocupa 7–8 colunas; arte 4–5 colunas com sobreposição controlada. No mobile, texto antes da arte.

### Editorial split

Eyebrow e título em uma coluna; corpo e ação deslocados em outra. Reflui para uma coluna no mobile.

### Sticky storytelling

Permitido apenas para explicar soluções ou método. Texto rola; arte permanece sticky. No mobile vira sequência simples.

### Case spotlight

Imagem ampla, metadados compactos, desafio e resultado. Evitar miniaturas pequenas com texto demais.

## 11. Iconografia e mídia

- Lucide como biblioteca-base.
- Ícone nunca substitui label quando a ação não for universal.
- Imagens com `alt` contextual; decorativas com alt vazio.
- Vídeos com legendas, poster, pause e fallback.
- Capturas de produto devem ocultar dados pessoais e possuir legenda.

## 12. Documentação de componentes

Cada componente em Storybook ou equivalente deve registrar:

- finalidade;
- variantes;
- props;
- estados;
- tokens usados;
- exemplo em superfícies light/dark;
- teclado e leitor de tela;
- reduced motion;
- do/don't.

## 13. Critérios contra aparência gerada por IA

- Um conceito visual repetido com intenção, não dez efeitos diferentes.
- Ritmo irregular planejado; evitar seções sempre título + três cards.
- Conteúdo específico da AZ em todos os blocos.
- Imagens reais e arte derivada dos produtos.
- Tipografia usada como narrativa, não somente como tamanho.
- Microcopy humana e local.
- Pequenos detalhes de autoria: numeração, legendas, coordenadas e notas de processo.
- Não exagerar em gradientes, glows, grids de pontos e blobs.

