# Registro de decisões e pendências

## Decisões aceitas

| ID | Decisão | Motivo |
|---|---|---|
| D-001 | Manter AZ Work Center | preservar história, domínio e reconhecimento |
| D-002 | Usar Tecnologia & Growth como descritor | comunicar foco sem criar nova marca prematuramente |
| D-003 | Tecnologia ocupa 80–90% da comunicação | refletir prioridade real da operação |
| D-004 | AZ News não compete na Home | operação própria e proposta distinta |
| D-005 | Visual/pesquisas ficam sob demanda | receita ocasional sem dispersar posicionamento |
| D-006 | Público inicial regional | proximidade, rede e prova local |
| D-007 | Arquitetura preparada para Brasil | evitar reescrita futura de rotas/conteúdo |
| D-008 | Next.js/React/TypeScript/Tailwind/shadcn/Motion | stack escolhida pelo fundador |
| D-009 | Cases ficam para segunda fase | conteúdo ainda não levantado/aprovado |
| D-010 | Server Components por padrão | SEO, performance e menor JavaScript |
| D-011 | Design editorial tecnológico industrial | autoria, maturidade e diferenciação de template IA |
| D-012 | Alternar light/dark | ritmo e contraste, sem repetir site atual totalmente escuro |
| D-013 | Projetos fora da navegação até o Épico 9 | conteúdo de cases ainda não aprovado |
| D-014 | Soluções em `/solucoes/[slug]` com composição própria | metadata, params e visual distintos por oferta |
| D-015 | Privacidade e Cookies fora do Footer e sem rotas públicas até P-008 | texto jurídico ainda não aprovado |
| D-016 | `/contato` sem formulário no Épico 4, com WhatsApp e e-mail reais | canais confirmados por Matheus; envio pelo site fica no Épico 6 |
| D-017 | Hero 6/10, texto sempre visível, H1 como unidade, motion só no diagrama | progressive enhancement e autoria da planta operacional |
| D-018 | Header permanece sticky Server, sem hide-on-scroll | custo de a11y e Client supera o benefício no Épico 5 |
| D-019 | Zero Section Reveals genéricos | evitar fade-up de landing e conteúdo invisível |
| D-020 | Nenhuma ilha Motion nas páginas internas no Épico 5 | preservar CSS existente e o orçamento |
| D-021 | Orçamento prevalece; delta Fatia A ≤ ~20 KB gzip na Home | se superar, linha do Hero vira CSS e Motion sai do First Load |
| D-022 | Service Story só na Fatia B se houver quatro diagramas distintos | troca de título/cor não justifica ilha Client |
| D-023 | H1 permanece unidade semântica e visual | sem spans animados nem aria-label compensatório |
| D-024 | Service Story mantido na Fatia B, só assíncrono | quatro diagramas distintos; Motion fora do First Load; peso async justificado pelo piso da biblioteca |
| D-025 | Hero da Home usa mídia 3D renderizada + poster nativo; halo CSS em ilha mínima | correção visual aprovada; substitui o line-draw da Hero sem alterar o restante do Épico 5 |
| D-026 | Hero Full HD em vídeo condicionado; câmera estática; halo CSS único | substitui o WebP animado 1280×720; poster Server; WebM/MP4 só no desktop com movimento |
| D-027 | Mídia da Hero reenquadrada na origem 3D | mesma cena e animação; recorte da câmera/render; nomes públicos inalterados |
| D-028 | Hero sem trilhos/pulsos na origem 3D; bloco textual elevado | cena limpa no render; wrapper único com translate responsivo |
| D-029 | Art direction da Hero: poster 4:5 em retrato; vídeo só em paisagem | corta horizontal no celular e vazio em tablet retrato não se resolvem com um único object-position |

## Pendências bloqueadoras antes do desenvolvimento visual final

| ID | Pendência | Responsável sugerido | Impacto |
|---|---|---|---|
| P-001 | vetor oficial e variações do logo | Matheus/design | alto |
| P-002 | confirmar vermelho oficial | design | alto |
| P-003 | nome empresarial/razão social pública | Matheus/contábil | médio |
| P-004 | WhatsApp e e-mail confirmados; endereço oficial ainda pendente | Matheus | alto |
| P-005 | destino do formulário/CRM | Matheus/Lucas | alto |
| P-006 | prazo de resposta prometido | comercial | médio |
| P-007 | ferramenta de analytics | Matheus/Lucas | médio |
| P-008 | estratégia de cookies/LGPD | jurídico | alto |
| P-009 | assets fotográficos reais | equipe | alto |
| P-010 | acesso e inventário WordPress/DNS | Matheus | alto |

## Pendências não bloqueadoras do MVP estrutural

- conteúdo completo dos cases;
- depoimentos;
- métricas;
- blog/CMS;
- versão em inglês;
- página por segmento;
- pricing público;
- integração avançada de CRM;
- View Transitions;
- GSAP/WebGL.

## Registro — Épico 2, primitives estáticas

Implementação na branch `feat/design-system`, sem commit nesta passagem.

- Superfície `quiet` não foi criada: não há tokens correspondentes em `design-system/tokens.css`.
- `class-variance-authority` não foi instalada. Variantes tipadas com records cobrem Button e ButtonLink.
- Eyebrow usa Manrope (`font-sans`) com o token `text-label`. IBM Plex Mono continua fora do carregamento.
- Botão `sm` usa `--touch-target` (44 px) em todos os breakpoints. Continua recomendado só para ações secundárias.
- `[data-surface="light"]` foi adicionado para que seções claras aninhadas em escuras restabeleçam os tokens semânticos. Os valores da paleta provisória não mudaram.
- `--error-foreground` aponta para `--az-chalk-0`, para o destructive não herdar o foreground da superfície. Contraste esperado de `#D9363E` sobre branco: aproximadamente 4.62:1 (AA para texto normal). A primitiva Error não foi alterada.
- Links em nova aba passam por `mergeLinkRel`: `noopener` e `noreferrer` são obrigatórios e tokens extras do consumidor são preservados sem duplicação.

## Registro — Épico 3, shell e navegação

Implementação na branch `feat/site-shell`, sem commit nesta passagem.

- Header e DesktopNav permanecem Server Components. Só MobileNav/Sheet e Accordion são Client Components.
- A navegação é validada com Zod no servidor. O Header passa `items` e `cta` ao MobileNav por props serializáveis; o bundle do menu não importa Zod.
- `aria-current` da página atual no Header foi adiado para não criar um Client Component global.
- Wordmark textual “AZ Work Center” até P-001. Nenhum símbolo novo foi desenhado.
- Preferências de cookies não são apresentadas no Footer público enquanto P-008 não tiver um gerenciador funcional.
- O Footer usa grupos explícitos Atuação, Empresa e Legal, sem destinos duplicados. O Header continua com Soluções, Projetos, Como trabalhamos e Sobre.
- Accordion usa `forceMount` e IDs estáveis (`aria-controls` + `id` do painel) para manter pergunta, resposta e o elemento controlado no HTML inicial. Com JavaScript, o fechado some só visualmente (`data-[state=closed]:hidden`). Sem scripting, `@media (scripting: none)` reexibe o mesmo markup, sem segunda cópia.
- O CLI do shadcn não foi executado para não sobrescrever `globals.css` nem o Button existente. `components.json` foi criado manualmente; Dialog/Sheet e Accordion usam Radix com estilos da AZ.
- Rotas `/solucoes`, `/projetos`, `/como-trabalhamos`, `/sobre`, `/contato`, `/privacidade` e `/cookies` entram no contrato de navegação e ainda retornam 404 até o épico de páginas internas.
- AZ News, comunicação visual, telefone, e-mail, endereço e CNPJ continuam fora do Footer.
- `agentRules: false` em `next.config.ts` desativa a geração automática de regras do Next para preservar o `AGENTS.md` normativo do repositório.

## Registro — Épico 3, Home estrutural

Implementação na branch `feat/home-structure`, sem commit nesta passagem.

- A Home permanece Server Component. Nenhuma seção em `src/components/home` usa `"use client"`. A única ilha cliente da página é o `AccordionList` do FAQ.
- Motion, hide-on-scroll, accordion de soluções e sticky controlado por JavaScript ficaram de fora. Há no máximo um sticky CSS no mapa decorativo de Soluções, desligado em mobile e em `max-height: 40rem`.
- IBM Plex Mono continua fora do carregamento. Coordenadas e números do método usam Manrope/`text-label`.
- `SectionHeading` ganhou o tamanho `display-lg` com o token já existente. Nenhum token novo foi criado.
- Conteúdo estático usa `as const` + `satisfies`. Zod não valida literais da Home.
- `projects` permanece vazio. `getPublishedProjects()` fica reservado à segunda fase e não controla a Home.
- `EngagementSection` é renderizada incondicionalmente em `#capacidades` enquanto `FeaturedCases` não existir. `#projetos` não existe.
- A troca entre `EngagementSection` e `FeaturedCases` será atômica no Épico 9, sem estado intermediário que renderize `null`.
- Metadata da Home usa título absoluto `AZ Work Center | Tecnologia & Growth`. A description raiz deixou de mencionar site em desenvolvimento.
- Fotos dos fundadores, logos, depoimentos, CNPJ e prazo de resposta continuam pendentes (P-003, P-004, P-006, P-009). Nenhum placeholder visual foi publicado.

## Registro — Épico 4, planejamento e implementação estrutural

Implementação na branch `feat/internal-pages`. D-013 a D-016 foram aceitas por Matheus em 12 de setembro de 2026. WhatsApp `(77) 98833-4370` / `https://wa.me/5577988334370` e e-mail `contato@azworkcenter.com.br` / `mailto:contato@azworkcenter.com.br` foram confirmados. Endereço oficial, CNPJ, prazo de resposta e formulário/CRM continuam pendentes.

### D-013 — Remover “Projetos” da navegação até o Épico 9

- Data: 2026-09-12
- Status: aceita
- Contexto: `/projetos` não tem conteúdo aprovado (D-009). Header, menu mobile e Footer já exibiam o destino, que retornava 404.
- Decisão: remover o item da navegação; não criar página vazia; não redirecionar para a Home nem para `#capacidades`; reintroduzir no Épico 9 com cases reais.
- Alternativas rejeitadas: página “em breve”; teaser que duplica `/solucoes`; manter o link morto.
- Consequências: testes de nav/shell deixam de exigir `/projetos`. A URL digitada continua 404 até o Épico 7/9.
- Responsável: Matheus

### D-014 — Rotas de solução via `[slug]` com composição por oferta

- Data: 2026-09-12
- Status: aceita
- Contexto: `docs/06` listava quatro `page.tsx` individuais. O plano do Épico 4 recomenda uma rota tipada para metadata, `generateStaticParams` e `notFound`, com layout visual distinto por slug.
- Decisão: `src/app/(marketing)/solucoes/[slug]/page.tsx` + arquivos de composição privados + conteúdo estático por oferta.
- Alternativas: quatro páginas irmãs (docs/06).
- Consequências: slug inválido chama `notFound()`. As quatro páginas não podem compartilhar um único template visual.
- Responsável: Matheus

### D-015 — Privacidade e Cookies fora do Footer até P-008

- Data: 2026-09-12
- Status: aceita
- Contexto: o texto jurídico ainda não está aprovado. Publicar rascunho como política vigente ou manter o 404 no Footer seriam piores. Materializar as rotas com `notFound()` gerou HTML inicial incompleto (`__next_error__`, sem Header, Footer, main ou CSS).
- Decisão: Privacidade e Cookies ficam fora do Footer até P-008. Os módulos editoriais podem permanecer preparados em `src/content/legal.ts`. As rotas públicas não são materializadas enquanto o texto jurídico não estiver aprovado. `/privacidade` e `/cookies` retornam a 404 raiz completa. As rotas serão criadas ou reativadas no Épico 6 após P-008.
- Alternativas rejeitadas: página “em revisão” indexável; rotas com `published: false` → `notFound()`.
- Consequências: o grupo Legal do Footer permanece vazio. P-008 continua pendente.
- Responsável: Matheus / jurídico

### D-016 — `/contato` sem formulário no Épico 4, com canais reais

- Data: 2026-09-12
- Status: aceita com evolução
- Contexto: o formulário funcional, o destino/CRM e o consentimento continuam no Épico 6 (P-005, P-008). O prazo de resposta (P-006) permanece indefinido.
- Decisão: `/contato` permanece sem formulário, Server Action ou CRM. Passa a oferecer ações reais pelos canais confirmados por Matheus: WhatsApp e e-mail. Endereço, CNPJ, prazo e horário de atendimento não são publicados.
- Alternativas rejeitadas: página sem ação; botão inerte; canal provisório.
- Consequências: CTAs “Solicitar diagnóstico” apontam para uma página com conversa possível. O Épico 6 continua responsável pelo envio pelo site.
- Responsável: Matheus

## Registro — Épico 5, Fatia A (Motion e Hero)

Implementação na branch `feat/motion-polish`. D-017 a D-023 foram aceitas por Matheus em 12 de setembro de 2026. Service Story, linhas do processo/CTA, Section Reveal, hide-on-scroll e Motion em páginas internas ficam fora desta fatia.

### D-017 — Intensidade do Hero

- Data: 2026-09-12
- Status: aceita
- Contexto: `docs/05` pedia Hero 7/10 e H1 por linhas. O título aprovado é uma frase única; esconder texto no SSR viola progressive enhancement.
- Decisão: intensidade 6/10; conteúdo textual sempre visível; H1 como unidade, sem divisão artificial por linhas; coreografia concentrada no diagrama; sem animação por caracteres; sem Section Reveal no Hero.
- Alternativas: H1 por linhas no DOM; fade-up do bloco textual.
- Consequências: eyebrow, H1, lead, CTAs e prova permanecem Server e opacos no HTML inicial. Motion, se existir, fica no diagrama.
- Responsável: Matheus

### D-018 — Header

- Data: 2026-09-12
- Status: aceita
- Contexto: hide-on-scroll exigiria Client no chrome, foco, menu aberto, skip link e âncoras.
- Decisão: não implementar hide-on-scroll; manter o Header sticky atual; não transformar o Header em Client Component.
- Alternativas: ilha `HeaderChrome` com veto de foco/menu.
- Consequências: Fatia A e o restante do Épico 5 não tocam o comportamento de scroll do Header.
- Responsável: Matheus

### D-019 — Section Reveals

- Data: 2026-09-12
- Status: aceita
- Contexto: o catálogo máximo de fade-up por seção é o preset de landing page que a marca rejeita.
- Decisão: zero reveals genéricos em conteúdo; não aplicar fade-up em seções, listas, títulos ou parágrafos.
- Alternativas: reveal só em chrome decorativo.
- Consequências: nenhuma wrapper `SectionReveal` nesta fatia nem nas seguintes, salvo nova decisão humana.
- Responsável: Matheus

### D-020 — Páginas internas

- Data: 2026-09-12
- Status: aceita
- Contexto: repetir a coreografia da Home nas internas aumentaria o bundle sem função narrativa.
- Decisão: nenhuma ilha Motion nas páginas internas no Épico 5; preservar as transições CSS existentes.
- Alternativas: intro CSS de 160 ms; linha decorativa pontual.
- Consequências: `/solucoes`, `/sobre`, `/como-trabalhamos`, `/contato` e 404 não importam Motion.
- Responsável: Matheus

### D-021 — Performance

- Data: 2026-09-12
- Status: aceita
- Contexto: First Load da Home já inclui o runtime Next/React e o Accordion.
- Decisão: orçamento de performance prevalece; delta inicial máximo desejável da Fatia A: aproximadamente 20 KB gzip na Home. Se superar, substituir a linha do Hero por CSS e manter Motion fora do First Load da Home.
- Alternativas: aceitar delta maior em troca da linha Motion.
- Consequências: a Fatia A deve medir o artefato real e recuar para CSS se o teto for ultrapassado. Medição com `motion/react` + `LazyMotion`/`domAnimation` no First Load da Home: +25 971 B gzip (chunk `2vpj33li5jdgc.js`, 25 975 B). Teto ultrapassado; a linha do Hero passou a CSS com `--duration-deliberate` e `--ease-emphasized`. O pacote `motion@13.2.0` permanece instalado para a Fatia B assíncrona, fora do First Load.
- Responsável: Matheus

### D-022 — Service Story

- Data: 2026-09-12
- Status: aceita com condição
- Contexto: o painel atual é um único mapa estático.
- Decisão: só implementar na Fatia B se existirem quatro diagramas visuais realmente distintos; se for apenas troca de título ou cor, manter o mapa estático atual.
- Alternativas: painel Client só com crossfade de rótulo.
- Consequências: Fatia A não implementa Service Story.
- Responsável: Matheus

### D-023 — H1

- Data: 2026-09-12
- Status: aceita
- Contexto: quebrar o H1 em spans animados duplicaria o texto ou exigiria `aria-label`.
- Decisão: H1 permanece uma unidade semântica e visual; não quebrar o texto manualmente em spans animados; não adicionar aria-label para compensar duplicação visual.
- Alternativas: linhas manuais no DOM.
- Consequências: `SectionHeading` do Hero não é alterado para motion.
- Responsável: Matheus

### Registro de implementação — Fatia A

- `src/app/(marketing)/page.tsx`, `HeroSection` e `HeroDiagram` permanecem Server Components.
- Texto do Hero não é animado.
- A linha do Hero usa overlay CSS (`pathLength` + `stroke-dashoffset`) com tokens existentes. Sem `"use client"` na Fatia A. A linha-base usa `text-muted-foreground`; o overlay e o nó central permanecem `text-primary`.
- `motion@13.2.0` está no `package.json` e não é importado pelo First Load.
- Sem provider em `src/app/layout.tsx` nem no layout de marketing.
- Sem `optimizePackageImports` em `next.config.ts`.

### D-024 — Service Story da Fatia B

- Data: 2026-09-12
- Status: aceita
- Contexto: D-022 exigia quatro diagramas distintos; o orçamento da Fatia B pedia loader inicial ≤ ~5 KB gzip e painel + Motion ≤ ~30 KB gzip, com corte se o assíncrono estourasse sem justificativa.
- Decisão: manter o Service Story como melhoria progressiva no desktop. Cortar só o Motion do First Load já foi feito na Fatia A. Não desinstalar `motion@13.2.0`.
- Alternativas: remover o painel Motion e ficar só com o mapa Server + linhas CSS.
- Consequências: a lista das quatro ofertas, `ServicesSection`, `ServiceOffer` e o mapa estático permanecem Server. Dois observers com funções distintas: o loader observa o frame e importa o painel perto do viewport; o painel observa os quatro `[data-service-story-item]` em `#solucoes`. Reduced motion e mobile não disparam o import. A primeira medição com `import("motion/react")` + `motion/react-m` puxou o barrel completo (75 457 B gzip). O recuo oficial (`m` de `motion/react-m`, `domAnimation` via `export default`, `LazyMotion`/`MotionConfig` de `motion/react`) ficou em ~33 KB gzip assíncronos. O piso do runtime Motion nesta stack é ~26–29 KB (Fatia A: 25 971 B). O excedente de ~3 KB sobre o alvo de 30 KB é o painel, os quatro diagramas e o observer — não um segundo Motion. First Load da Home: 206 571 B gzip (+530 B vs. 206 041 B da Fatia A). Sem Motion nas internas.
- Responsável: Matheus

### Registro de implementação — Fatia B

- Quatro metáforas, mesmo `viewBox` `0 0 280 320`:
  - Sistemas: módulos laterais + coluna central + convergência; pulso no núcleo.
  - Automação: quatro estágios escalonados; caminho interrompido no terceiro (validar); pulso no validar.
  - Produtos/MVP: campo externo + recorte do primeiro release + módulos futuros só delineados; pulso no núcleo.
  - Web e Growth: três faixas; gap de medição no centro; saídas laterais; pulso no evento.
- Transição do painel: opacity + `y` 16 px; spring 220/28/1; `initial={false}`; sem scale, blur, glow, bounce, `AnimatePresence`, `useScroll`, layout ou drag.
- Sem JavaScript: mapa estático, quatro ofertas e linhas editoriais completas. Nenhuma `opacity: 0` em conteúdo essencial.
- Reduced motion: o loader não importa o painel; se a preferência mudar depois do load, o painel esconde o enhancement e o mapa volta a ficar visível.
- Mobile (`< lg`): frame `display: none`; lista linear; sem sticky narrativo e sem accordion.
- Processo: `<ol>` de quatro etapas intacto; linha CSS com base sempre visível e overlay `animation-timeline: view()` protegido por `@supports` e `prefers-reduced-motion: no-preference`.
- CTA final: costura curta (`w-48`) acima do grid, overlay `text-foreground` na superfície brand. Terceira linha da Home, depois do Hero e do Processo.
- Tokens novos em `motion-tokens.ts`: `panelSpring` e `panelShiftY`. Não vêm de `tokens.json`; a fonte é `docs/05`.

### Registro de fechamento — Fatia C / Épico 5

- Data: 2026-09-12
- Status: encerrado tecnicamente na branch `feat/motion-polish`, sem commit nesta passagem
- Catálogo efetivo à época do fechamento: Hero Line CSS; Service Story lazy no desktop; Process Line e CTA Line CSS/View Timeline; microinterações já existentes de Button, links, Accordion e Sheet. Sem Section Reveal, hide-on-scroll, Motion nas internas ou page transitions. A correção visual de 2026-09-13 (D-025) substituiu a Hero Line por mídia 3D; o catálogo vigente da Hero está em D-025.
- Corrida do loader: o módulo resolvido fica em memória do binding; `onPanelLoaded` só corre se desktop, frame visível e reduced motion inativo. Import único; sem retry.
- Progressive enhancement: `scripting: enabled` + `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference` nas linhas editoriais. Sem JS, overlay do Hero some; Processo/CTA ficam no estado final.
- Limitação da auditoria: o agent-browser não emula zoom nativo do Chromium; 150%/200% não foram medidos como page scale. CPU 4× também não está disponível na ferramenta.
- First Load da Home: 206 646 B gzip (+605 B vs. 206 041 B da Fatia A). `/contato`, `/sobre` e 404: 200 773 B. Chunks do painel só no desktop após aproximar `#solucoes`. A correção da corrida não aumentou o First Load de forma material (+32 B vs. a correção cirúrgica).

## Registro — Hero 3D (correção visual da Home)

- Data: 2026-09-13
- Status: implementado na branch `feat/motion-polish`, sem commit nesta passagem
- Escopo: somente a Hero da Home, os ativos da ilustração, testes ligados a ela e a documentação necessária. Service Story, Process Line, CTA Line, Header, Footer e páginas internas permanecem.

### D-025 — Mídia 3D da Hero

- Data: 2026-09-13
- Status: aceita pela solicitação explícita mais recente
- Contexto: o H1 `display-lg` e o diagrama de retângulos/linhas empurravam os CTAs para baixo da primeira dobra. A ilustração aprovada é uma cena 3D com centro vazio para o conteúdo HTML.
- Decisão: substituir o line-draw da Hero por WebP animado no desktop e poster estático em mobile/`prefers-reduced-motion`, via `<picture>` nativo. Reposição da luz vermelha com um único halo CSS que acompanha o ponteiro fino. Tipografia da Hero passa a `text-h1` fluido, com altura em `svh` descontando o Header.
- Alternativas: manter o diagrama; usar `next/image`; escolher o arquivo com `matchMedia`/Motion.
- Consequências: `HeroDiagram`, `HeroLineOverlay` e `hero-diagram-geometry.ts` saem. `HeroSection` e `HeroMedia` continuam Server. `HeroInteractiveGlow` é a única ilha da Hero, em `src/components/motion/`, sem Motion e sem state por frame. Ativos em `public/media/hero/`, sem `.blend` no bundle.
- Responsável: implementação nesta passagem.

### D-026 — Vídeo Full HD da Hero

- Data: 2026-09-14
- Status: aceita pela solicitação explícita mais recente
- Contexto: o WebP animado 1280×720 oscilava a câmera e reiniciava com desaparecimento abrupto da matriz organizada.
- Decisão: poster WebP 1920×1080 no HTML Server; vídeo Full HD (WebM VP9, MP4 H.264, 7,5 s / 24 fps) só montado no cliente com `min-width: 768px` e `prefers-reduced-motion: no-preference`. Câmera estática no arquivo. Ciclo com saída ordenada à direita. Halo CSS permanece a única resposta ao ponteiro; a mídia não recebe scale, rotação, translate ou parallax.
- Alternativas: manter o WebP animado; colocar `<source>` de vídeo no HTML inicial; animar a câmera no CSS.
- Consequências: `HeroMedia` continua Server. `HeroVideoEnhancement` é uma segunda ilha Client da Hero, sem Motion e sem state por frame. `HeroInteractiveGlow` permanece. Ativos antigos `az-hero-transformacao-animada-luz-suave.webp` e `az-hero-transformacao-poster-luz-suave.webp` saem. Sem `.blend` no bundle.
- Responsável: implementação nesta passagem.

### D-027 — Reenquadramento da mídia da Hero na origem 3D

- Data: 2026-09-14
- Status: aceita pela solicitação explícita mais recente
- Contexto: o recorte desktop da Hero 16:9 em um palco mais largo e baixo ainda mostrava faixa escura no topo e escondia parte dos trilhos, mesmo com `object-fit: cover` ancorado no rodapé.
- Decisão: substituir WebM, MP4 e poster pelos renders reenquadrados na cena 3D original (`*-reframed.*`). Os nomes públicos em `public/media/hero/` permanecem. Câmera estática, loop, empilhamento à direita, carregamento condicional e `object-position` atuais não mudam nesta etapa.
- Alternativas: ajustar só o CSS (`object-position`, scale, altura da Hero); recortar os arquivos no browser.
- Consequências: o enquadramento passa a vir do arquivo 3D, não de um recorte de CSS. Sem `.blend` no bundle. Sem duplicatas `*-reframed.*` em `public`. Copy, H1, CTAs e halo ficam para uma decisão posterior, se ainda forem necessários.
- Responsável: implementação nesta passagem.

### D-028 — Hero sem trilhos e com bloco textual elevado

- Data: 2026-09-14
- Status: aceita pela solicitação explícita mais recente
- Contexto: os trilhos e pulsos vermelhos no piso competiam com os CTAs; o bloco textual ainda encostava visualmente na logomarca.
- Decisão: substituir WebM, MP4 e poster pelos renders `*-clean.*` (mesma cena e loop, sem trilhos nem pulsos no piso). Elevar eyebrow, H1, lead e CTAs como um único wrapper `[data-hero-content]` com `translate` responsivo (`clamp(0.75rem, 0.5rem + 1.8vw, 2.5rem)`). Em viewports curtas (`max-height: 36rem`), compactar só os gaps do wrapper para manter os CTAs na primeira dobra.
- Alternativas: apagar trilhos via CSS/overlay; posicionar H1 e CTAs isoladamente; mudar a altura da Hero ou o `object-position`.
- Consequências: a remoção dos trilhos e pulsos vem do arquivo 3D, não de máscara CSS. Copy, tipografia, H1, botões, halo e carregamento condicional permanecem. Sem `.blend`, PNGs de diagnóstico ou duplicatas `*-clean.*` em `public`.
- Responsável: implementação nesta passagem.

### D-029 — Art direction da Hero em retrato

- Data: 2026-09-14
- Status: aceita pela solicitação explícita mais recente
- Contexto: o poster 16:9 em `cover` cortava a marca AZ no celular; em tablet retrato a Hero herdava `min-height: 100svh - header` e criava um vazio enorme. Um único `object-position` não resolve os dois problemas.
- Decisão: poster vertical 1080×1350 (4:5) selecionado por `<picture>` quando a largura é até 767 px ou a orientação é retrato. Vídeo Full HD só com `min-width: 768px`, `orientation: landscape` e movimento permitido. Em retrato a partir de 768 px, `min-height: min(calc(100svh - var(--header-height)), 55rem)`. Enquadramento do poster vertical: `center center`. Paisagem desktop: `center bottom` inalterado.
- Alternativas: `object-position` extremo no 16:9; vídeo vertical; `background-image`; altura resolvida só com `translate` do conteúdo.
- Consequências: sem JS, o `<picture>` escolhe o poster. Celular e tablet retrato não pedem WebM/MP4. Ativos desktop atuais não foram substituídos. Sem `.blend` nem vídeo vertical nesta etapa. Em telas estreitas a mídia é decorativa e pode ficar parcialmente atrás do conteúdo (logo, módulos, copy ou CTAs); essa sobreposição é compromisso aceito, não pendência bloqueante do Épico 5, e não deve reabrir reposicionamento de layout.
- Responsável: implementação nesta passagem.

### Registro de fechamento — Épico 5 (consolidação 2026-09-14)

- Data: 2026-09-14
- Status: consolidação técnica na branch `feat/motion-polish`, sem commit nesta passagem
- Cronologia vigente: D-017 a D-023 definem o recorte original (sem Section Reveal, sem hide-on-scroll, Motion fora do First Load, H1 íntegro). A Fatia A registrou a linha CSS da Hero; D-024 e as Fatias B/C entregaram Service Story assíncrono, Process Line e CTA Line. D-025 a D-029 substituem o mecanismo visual da Hero pelo estado final 3D. O registro da Fatia A que cita `HeroDiagram` e o da Fatia C que fala do overlay CSS da Hero são históricos.
- Estado final da Hero: poster Server no HTML; art direction 4:5 em celular/retrato; vídeo Full HD só em paisagem ≥768 px com movimento permitido; halo CSS mínimo sem Motion e sem state por frame; pause fora da viewport e em aba oculta; câmera e mídia sem transform CSS. D-025 falava em uma ilha; D-026 acrescentou `HeroVideoEnhancement`. D-026 pedia vídeo a partir de 768 px; D-029 restringe também a paisagem.
- Catálogo efetivo: Hero 3D; duas linhas editoriais AZ (Processo no trilho superior do `<ol>`, CTA acima do botão); Service Story como painel de leitura, não como terceira linha; microinterações CSS de Button/ButtonLink, TextLink, navegação, Accordion e Sheet. Sem Section Reveal, fade-up de listas, hide-on-scroll, page transition ou Motion nas internas.
- Compromisso mobile: em viewport estreita a mídia permanece decorativa e pode intersectar o bloco textual; não é regressão a corrigir nesta entrega.
- Variante `outline` em `button-styles.ts`: necessária ao CTA secundário aprovado da Hero (`ButtonLink variant="outline"`). Difere de `secondary` pela borda `border-foreground` em vez de `border-border`. Não é resíduo órfão.
- Arquivos em `public/media/logo/*.png`: dumps locais sem consumidor no código. Ficam fora do Épico 5; não foram incorporados nem apagados nesta passagem.
- Metodologia de bundle: o `next build` com Turbopack 16.3.5 desta consolidação não imprime a coluna First Load JS usada nas Fatias A–C (206 041 B / 206 571 B / 206 646 B). A medição vigente é a soma de `encodedBodySize` dos resources de script após navegação document da Home em produção local (`pnpm start`), excluindo WebP/WebM/MP4. Não misturar esse número com o First Load histórico do webpack. Teto amplo do Épico 5: 220 KB gzip.
- Limitação da auditoria: o agent-browser não emula zoom nativo (150%/200%) nem CPU 4×; esses cenários não foram medidos.

### Pendências humanas ainda abertas

- P-003: razão social e CNPJ públicos; onde exibir.
- P-004: endereço oficial ainda pendente (WhatsApp e e-mail confirmados).
- P-005: destino do formulário/CRM — o Épico 6 não está resolvido.
- P-006: prazo de resposta prometido.
- P-008: estratégia de cookies/LGPD.
- Credenciais selecionadas de Matheus para `/sobre`.
- Fotos reais até P-009.

## Decisões que agentes não podem tomar sozinhos

- renomear a empresa;
- alterar logo;
- trocar a paleta principal;
- publicar métricas;
- publicar case;
- adicionar serviço principal;
- usar imagem gerada como se fosse foto real;
- instalar CMS;
- instalar GSAP/Three.js/WebGL;
- escolher ferramenta que recebe dados pessoais;
- remover o WordPress/backup;
- alterar DNS de produção;
- habilitar analytics sem consentimento aplicável.

## Template de nova decisão

```md
### D-XXX — Título

- Data:
- Status: proposta | aceita | rejeitada | substituída
- Contexto:
- Decisão:
- Alternativas:
- Consequências:
- Responsável:
```

