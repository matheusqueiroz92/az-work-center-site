# Motion system

## 1. Princípio

Movimento deve explicar que a AZ organiza complexidade: elementos dispersos entram, conectam-se e encontram uma posição estável.

Não usar animação como ruído decorativo nem esconder conteúdo essencial até o JavaScript carregar.

## 2. Intensidade

- Global: 6/10.
- Hero: 7/10, um momento coreografado.
- Seções informativas: 3–5/10.
- Formulários e navegação: 2–3/10.
- Mobile: reduzir quantidade e distância em aproximadamente 30–50%.
- Reduced motion: 0–1/10, usando principalmente opacity instantânea/curta.

## 3. Tokens

### Duração

| Token | Valor | Uso |
|---|---:|---|
| instant | 80 ms | feedback visual mínimo |
| fast | 160 ms | hover, focus, tooltip |
| base | 240 ms | botões, accordion, menu |
| slow | 420 ms | entrada de seção |
| deliberate | 650 ms | hero/arte principal |
| narrative | 900 ms | transição editorial pontual |

### Easing

| Token | Curva | Uso |
|---|---|---|
| standard | `[0.22, 1, 0.36, 1]` | entradas e deslocamentos |
| emphasized | `[0.16, 1, 0.3, 1]` | hero e painéis |
| exit | `[0.4, 0, 1, 1]` | saídas mais rápidas |
| linear | `[0, 0, 1, 1]` | progresso ligado ao scroll |

Springs:

- UI: stiffness 320, damping 30, mass 0.8;
- painel: stiffness 220, damping 28, mass 1;
- evitar bounce perceptível em conteúdo B2B.

## 4. Regras globais

- Sem provider Motion nos layouts. `MotionConfig reducedMotion="user"` fica só no painel do Service Story.
- Carregar recursos avançados com `LazyMotion` quando houver benefício real.
- Um observer compartilhado ou recursos internos da Motion; não criar listener de scroll por componente.
- Animar `transform` e `opacity`.
- Nunca animar layout de grandes áreas com `width`, `height`, `top` ou `left` em loop.
- `will-change` apenas durante a animação.
- O DOM inicial precisa conter conteúdo legível e indexável.
- Animações de entrada devem ocorrer uma vez, salvo componentes explicitamente interativos.

## 5. Catálogo

Estado vigente do Épico 5 na Home:

- Hero 3D (poster Server + vídeo condicionado + halo CSS);
- duas linhas editoriais AZ: Processo e CTA;
- Service Story como painel de leitura no desktop, não como terceira linha AZ;
- microinterações CSS já existentes de Button/ButtonLink, TextLink, navegação, Accordion e Sheet.

Não entram nesta entrega: Section Reveal (5.2), Case Preview (5.5), Metric Transition (5.6) e Page Transition (5.10).

### 5.1 Hero Assembly

Entregue no Épico 5 e corrigido depois: mídia 3D Full HD no fundo da Hero, câmera estática. O texto aprovado permanece HTML centralizado. Sem stagger de H1, sem fade de seções e sem Motion no First Load. Sem scale, rotação, translate ou parallax da mídia.

O poster entra no HTML inicial via `<picture>`:

- celular (`max-width: 767px`) ou retrato: WebP 4:5 (`/media/hero/az-hero-transformacao-mobile-poster.webp`, 1080×1350), `object-position: center center`;
- paisagem a partir de 768 px: poster desktop 16:9 (`/media/hero/az-hero-transformacao-loop-poster.webp`).

O vídeo é melhoria progressiva (`HeroVideoEnhancement`) e só monta com as três condições ao mesmo tempo:

- `min-width: 768px`;
- `orientation: landscape`;
- `prefers-reduced-motion: no-preference`.

Nesse caso monta `<video>` com WebM VP9 e MP4 H.264 (`/media/hero/az-hero-transformacao-loop-fullhd.*`), 1920×1080, 7,5 s, 24 fps, loop com saída ordenada à direita, `object-position: center bottom`. Mobile, retrato, reduced motion, sem JavaScript ou falha de carga permanecem no poster correspondente. O vídeo só fica visível depois de `loadeddata`/`canplay`; pause fora do viewport ou com a aba oculta. Em retrato a partir de 768 px a Hero usa `min-height: min(calc(100svh - var(--header-height)), 55rem)`. Em telas estreitas a mídia é decorativa e pode ficar parcialmente atrás do conteúdo; esse recorte é compromisso aceito, não pendência do Épico 5.

A iluminação vermelha continua como um único halo CSS (`HeroInteractiveGlow`). O acompanhamento do ponteiro só existe com `(hover: hover) and (pointer: fine)` e movimento permitido. Sem JavaScript, em touch ou com reduced motion, o halo fica estático no centro. O halo é a única interação de ponteiro da Hero.

### 5.2 Section Reveal

Não implementado (D-019). O catálogo original previa opacity/Y de 420 ms; a Home não usa fade-up nem stagger de listas.

### 5.3 AZ Line Draw

SVG com `pathLength 0 → 1`. Uso em:

- método;
- transição para CTA final.

Máximo de duas linhas AZ na Home: Processo e CTA. A Hero deixou de usar line-draw; a mídia 3D ocupa esse momento. O Service Story é um painel de leitura, não uma terceira linha AZ. Deve ser decorativa e `aria-hidden`.

### 5.4 Service Story

Desktop:

- títulos/descrições rolam normalmente e permanecem no HTML Server;
- o diagrama estático de Sistemas permanece no painel sticky como fallback Server;
- a melhoria Motion só carrega perto do viewport, fora do First Load;
- mudança de serviço faz crossfade e deslocamento de 12–20 px, spring 220/28/1;
- quatro ilustrações de produto ocupam o painel: sistemas (shell com sidebar, módulos e usuários), automação (pipeline entrada → validação humana → saída), produtos (roadmap descoberta → MVP → evolução) e web/growth (canais, conversões, gráfico e ciclo); não há barra de progresso.
- a lista marca o item ativo com filete vermelho no título, usando o observer compartilhado da ilha já existente; reduced motion mantém o marcador sem transições decorativas e sem importar Motion. Sem índices 01–04.

Mobile:

- disclosure nativo exclusivo (`details[name="solucoes-home"]`); o primeiro item começa aberto, abrir outro fecha o anterior e o atual pode ser fechado;
- sem pinning e sem Motion; o conteúdo permanece no HTML Server;
- nenhuma rolagem horizontal forçada;
- o chunk do painel não carrega enquanto o frame estiver `display: none`.

### 5.5 Case Preview

- imagem responde ao hover com scale máximo 1.02;
- máscara/clip revela informação complementar;
- cursor permanece padrão ou pointer; não substituir por cursor customizado obrigatório;
- teclado recebe o mesmo estado visual via focus-visible.

### 5.6 Metric Transition

Somente para métricas aprovadas. Número pode contar uma vez, mas o valor final deve existir no HTML/aria-label. Não animar números falsos ou placeholders.

### 5.7 Header Behavior

Header sticky Server, sem hide-on-scroll (D-018). Chrome externo transparente, sem borda inferior nem sombra. A moldura interna usa tinta escura sutil, `backdrop-filter` moderado e borda de baixa opacidade (D-049). Na Home, o Header fica `fixed` sobre a Hero via `data-header-overlay` (D-050); nas páginas internas permanece sticky no fluxo. Em `prefers-reduced-motion`, o blur some e o fundo fica mais opaco. Âncoras continuam compensadas com `scroll-padding-top`.

### 5.8 Accordion

240–320 ms. Ícone gira 90/180 graus. Conteúdo usa clip/grid rows ou biblioteca acessível. Reduced motion: instantâneo.

A `ProblemSection` da Home usa disclosure nativo exclusivo (`details[name="problemas-home"]`): o primeiro item começa aberto, abrir outro fecha o anterior e o usuário pode deixar todos fechados. Animação CSS-only, 240 ms em `opacity`/`transform`, sem ilha Client nem JavaScript de accordion.

A `ServicesSection` reusa o mesmo padrão só abaixo de 1024 px (`details[name="solucoes-home"]`). No desktop a lista permanece linear, o corpo fica visível por CSS e o painel sticky/Motion não muda. O FAQ continua no Accordion acessível existente.

### 5.9 Button

- hover: deslocamento de seta 3–4 px;
- active: scale 0.98;
- foco: ring sem animação longa;
- loading: spinner discreto;
- sem brilho percorrendo o botão em loop.

### 5.10 Page Transition

Não implementado no Épico 5: não há `template.tsx`, View Transitions nem `AnimatePresence` de rota. Continua opcional após o MVP. Preferir transição curta por opacity/clip, preservando foco e posição esperada. A View Transition API pode ser avaliada progressivamente, mas não deve comprometer navegação, anúncio de leitores de tela ou compatibilidade.

## 6. Efeitos proibidos

- scroll-jacking;
- smooth scroll que substitui comportamento nativo em todo o documento;
- texto seguindo cursor;
- cursor customizado necessário para compreender ação;
- parallax em texto;
- rotação infinita de elementos centrais;
- marquee automático sem controle;
- glitch, scanlines ou neon cyberpunk;
- loading intro que bloqueia a página;
- animação de todas as palavras/caracteres;
- partículas seguindo o mouse;
- 3D em runtime (Three/WebGL) no hero; a mídia aprovada é vídeo renderizado com câmera estática, não uma cena interativa.

## 7. Reduced motion

Regras obrigatórias:

- `MotionConfig reducedMotion="user"` somente no painel do Service Story;
- o loader não baixa Motion quando `prefers-reduced-motion: reduce`;
- substituir transformações grandes por opacity;
- desativar parallax e autoplay;
- mostrar estado final de linhas, diagramas e counters;
- manter feedback funcional de formulário;
- permitir navegação sem atraso artificial.

## 8. Performance budget de motion

- Nenhuma animação deve causar long task acima de 50 ms em uso normal.
- Evitar mais de 12 elementos animando simultaneamente.
- Não manter loops offscreen.
- Pausar animação quando `document.hidden`.
- Testar em dispositivo Android intermediário ou em CPU throttling quando a ferramenta de auditoria oferecer esses controles. O agent-browser desta consolidação não emula zoom nativo do Chromium nem CPU 4×; esses cenários não devem ser declarados como medidos.
- Efeitos avançados abaixo da dobra devem ser carregados dinamicamente.

## 9. Ferramenta: Motion ou GSAP?

### Padrão

Motion é a ferramenta oficial do projeto.

### GSAP permitido somente se

- houver sequência de timeline/pinning que Motion/CSS não resolva com clareza;
- a dependência e licença forem revisadas;
- a seção estiver isolada;
- houver cleanup, reduced motion e orçamento de performance;
- a decisão for registrada.

Não instalar as duas bibliotecas apenas por conveniência.

## 10. Critério de aceite

Uma animação só é aprovada se:

- sua função pode ser descrita em uma frase;
- conteúdo continua acessível sem ela;
- teclado e leitor de tela não perdem contexto;
- reduced motion foi testado;
- não piora Core Web Vitals;
- mantém 60 fps no cenário-alvo ou degrada graciosamente;
- parece parte da identidade AZ, não um preset copiado.

