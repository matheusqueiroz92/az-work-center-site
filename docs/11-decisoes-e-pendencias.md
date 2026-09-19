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
| D-030 | Entrega de leads por e-mail transacional via Resend e Server Action | adapter no código; domínio Verified e Preview operacional; Production e Firewall ainda pendentes; sem CRM/banco no MVP |
| D-031 | Destinatário de produção `contato@azworkcenter.com.br`; preview/teste `matheusqueiroz@azworkcenter.com.br` | separar leads reais de homologação |
| D-032 | Remetente planejado `site@azworkcenter.com.br`, sujeito a DNS; Matheus tem acesso ao DNS de `azworkcenter.com.br` | envio autenticado; alteração de DNS continua restrita a humanos |
| D-033 | Campos: nome, empresa, e-mail, tipo de necessidade e contexto obrigatórios; telefone/WhatsApp opcional | qualificar o diagnóstico sem dados excessivos |
| D-034 | WhatsApp permanece canal secundário/fallback | formulário não substitui o canal já confirmado |
| D-035 | Nenhuma promessa numérica de prazo de resposta | P-006 sem SLA público inventado |
| D-036 | Sem banco/CRM no MVP; leads não convertidos retidos até seis meses na caixa comercial, salvo necessidade contratual/jurídica | retenção mínima e reversível |
| D-037 | Sem newsletter ou consentimento de marketing nesta fase | não coletar base comercial sem oferta |
| D-038 | Vercel como hospedagem inicial do site institucional | destino já sugerido na arquitetura técnica |
| D-039 | Vercel Web Analytics planejado para fase posterior, sem ativá-lo agora | P-007 escolhido, não implementado |
| D-040 | Sem banner de cookies enquanto não houver rastreadores não essenciais, sujeito a validação jurídica | P-008 permanece condicional |
| D-041 | Razão social, CNPJ e endereço cadastral registrados; não publicar automaticamente no Header, Footer ou Contato | dados recebidos; exibição na etapa legal e conforme atendimento presencial |
| D-042 | Canal `privacidade@azworkcenter.com.br` recomendado, pendente de criação; política poderá basear-se na LGPD e na ANPD, sem parecer jurídico | revisão profissional recomendada antes do lançamento |
| D-043 | Plano pós-lançamento aprovado como direção estratégica de planejamento | não autoriza implementação nem altera o cronograma do site |
| D-044 | `estrutura.azworkcenter.com.br` é ferramenta interna da AZ com subsistemas especializados e handoffs | não é SaaS administrativo multiempresa |
| D-045 | Oferta futura ao cliente = método/serviço da AZ; visão restrita de resultados eventual | cliente não controla a esteira interna |
| D-046 | OpenClaw e Hermes Agent são apenas candidatos a avaliação | não são dependências nem arquitetura escolhida |
| D-047 | Apresentação dos fundadores fica em `/sobre`, não na Home | Home concentra proposta e conversão; Sobre reúne história e pessoas sem duplicar conteúdo |
| D-048 | ProblemSection nativa e microinterações CSS do Header | accordion sem ilha Client; Header sticky com feedback hover/focus, sem glassmorphism |
| D-049 | Header flutuante translúcido e accordion exclusivo nativo | uma moldura sticky; `details[name]` sem JavaScript |
| D-050 | Header overlay só na Home; páginas internas permanecem sticky | Hero a partir do topo; internos sem conteúdo escondido |

## Pendências bloqueadoras antes do desenvolvimento visual final

| ID | Pendência | Responsável sugerido | Impacto |
|---|---|---|---|
| P-001 | seleção das variantes canônicas do logo e validação dos vetores | Matheus/design | alto |
| P-003 | razão social e CNPJ recebidos; onde (e se) exibir publicamente ainda não decidido | Matheus/contábil | médio |
| P-004 | WhatsApp e e-mail confirmados; endereço cadastral recebido, sem publicação automática | Matheus | alto |
| P-005 | domínio Verified no Resend; DNS exigidos adicionados; vars só em Preview; teste Preview OK; Production, Firewall e CRM pendentes | Matheus/Lucas | alto |
| P-006 | sem promessa numérica de prazo; texto público não cita SLA | comercial | médio |
| P-007 | Vercel Web Analytics planejado; não ativar nesta fase | Matheus/Lucas | médio |
| P-008 | sem banner enquanto não houver rastreadores não essenciais; validação jurídica pendente | jurídico | alto |
| P-009 | assets fotográficos reais | equipe | alto |
| P-010 | Matheus tem acesso ao DNS de `azworkcenter.com.br`; inventário WordPress e alteração de DNS de produção seguem restritos | Matheus | alto |

P-002 foi resolvida por Matheus: o vermelho digital é `#EF233C`, confirmado nos quatro PNGs horizontais exportados.

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
- Arquivos em `public/media/logo/*.png`: originais oficiais preservados fora do Git. A prévia de integração usa somente duas cópias curadas em `public/media/brand/`; seleção para outras superfícies e validação vetorial continuam em P-001. Ver `docs/03-manual-da-marca.md`.
- Metodologia de bundle: o `next build` com Turbopack 16.3.5 desta consolidação não imprime a coluna First Load JS usada nas Fatias A–C (206 041 B / 206 571 B / 206 646 B). A medição vigente é a soma de `encodedBodySize` dos resources de script após navegação document da Home em produção local (`pnpm start`), excluindo WebP/WebM/MP4. Não misturar esse número com o First Load histórico do webpack. Teto amplo do Épico 5: 220 KB gzip.
- Limitação da auditoria: o agent-browser não emula zoom nativo (150%/200%) nem CPU 4×; esses cenários não foram medidos.

### Pendências humanas ainda abertas

- P-001: treze rasters oficiais recebidos em `public/media/logo/`. O Header com a versão horizontal sem slogan foi aprovado por Matheus em 2026-09-17; o Footer com slogan permanece provisório por decisão dele, sem mudança adicional nesta passagem. Ainda faltam validação responsiva completa, seleção para superfícies claras/uso compacto e validação dos vetores. Os originais continuam untracked; ver `docs/03-manual-da-marca.md`.
- P-003: razão social e CNPJ recebidos (D-041). Exibição pública no Header, Footer ou Contato continua pendente.
- P-004: WhatsApp e e-mail confirmados; endereço cadastral recebido (D-041). Não publicar automaticamente; uso na etapa legal e conforme atendimento presencial.
- P-005: destino transacional e destinatários decididos (D-030, D-031). Adapter Resend no código. Verificado: domínio `azworkcenter.com.br` **Verified** no Resend; três registros DNS exigidos adicionados; team Vercel do projeto no **Pro**; quatro variáveis de contato configuradas **somente em Preview**; envio de teste em Preview com sucesso e recebimento em `matheusqueiroz@azworkcenter.com.br`. Ainda pendentes: variáveis e teste de **Production**, rate limit no Vercel Firewall, rotação da chave, CRM. Sem registrar chave, valores DNS completos ou dados de lead. Inspeção por mensagem de `replyTo`/SPF/DKIM não está registrada como feita. Ver `docs/14-checklist-configuracao-resend.md`.
- P-006: decidido não prometer prazo numérico (D-035). Não há SLA público a redigir nesta fase.
- P-007: Vercel Web Analytics escolhido (D-039). Não ativar agora; sem eventos, tags ou consent store.
- P-008: sem banner de cookies enquanto não houver rastreadores não essenciais (D-040). Validação jurídica e textos definitivos de privacidade/cookies continuam pendentes. `privacidade@azworkcenter.com.br` ainda precisa ser criado/confirmado (D-042).
- Credenciais selecionadas de Matheus para `/sobre`.
- Fotos reais até P-009.

## Registro — Épico 6, Fatia A (fundação local do formulário)

- Data: 2026-09-15
- Status: implementação técnica na branch `feat/forms-analytics-privacy`, sem commit nesta passagem
- Escopo: `/contato` com formulário acessível, validação Zod 4 no servidor, Server Action pública e provider desabilitado. Sem Resend, sem persistência, sem analytics, sem banner, sem páginas jurídicas publicadas e sem commit dos logos.

### D-030 — Entrega transacional via Resend e Server Action

- Data: 2026-09-15
- Status: aceita
- Contexto: o Épico 4 deixou `/contato` só com WhatsApp e e-mail (D-016). P-005 pedia destino do formulário/CRM.
- Decisão: a entrega futura dos leads será por e-mail transacional via Resend, acionada por Server Action tratada como endpoint público. Sem Route Handler para esta mutação. Sem banco ou CRM no MVP.
- Alternativas: webhook de CRM; persistência imediata; Route Handler `/api/contato`.
- Consequências: a Fatia A define o contrato (`submitContactLead` + provider). A Fatia B conecta o provider Resend. Preview não deve enviar leads reais ao destinatário de produção.
- Responsável: Matheus

### D-031 — Destinatários de produção e preview

- Data: 2026-09-15
- Status: aceita
- Contexto: P-005 e a regra de preview da arquitetura técnica.
- Decisão: produção envia para `contato@azworkcenter.com.br`. Preview e testes enviam para `matheusqueiroz@azworkcenter.com.br`.
- Alternativas: caixa única; discard em preview.
- Consequências: a Fatia B deve selecionar o destinatário pelo ambiente. A Fatia A não envia e-mail e não adiciona variáveis de ambiente.
- Responsável: Matheus

### D-032 — Remetente planejado e acesso DNS

- Data: 2026-09-15
- Status: aceita com condição
- Contexto: envio autenticado exige SPF/DKIM/DMARC no domínio.
- Decisão: remetente planejado `site@azworkcenter.com.br`, sujeito à validação DNS. Matheus possui acesso ao DNS de `azworkcenter.com.br`. Agentes não alteram DNS de produção.
- Alternativas: remetente em domínio de teste do Resend; `contato@` como From.
- Consequências: a Fatia B só ativa o envio depois da validação humana do DNS. P-010 continua aberto para inventário WordPress e para qualquer mudança de DNS.
- Responsável: Matheus

### D-033 — Campos do formulário

- Data: 2026-09-15
- Status: aceita
- Contexto: o diagnóstico precisa de contexto operacional sem coleta excessiva.
- Decisão: obrigatórios — nome, empresa, e-mail, tipo de necessidade (enum dos desafios já publicados em `src/content/contact.ts`) e contexto. Opcional — telefone/WhatsApp. Sem orçamento, faturamento, arquivo, CPF, CNPJ do lead, senha, newsletter ou checkbox de marketing. Sem checkbox jurídico apontando para política inexistente.
- Alternativas: só e-mail e mensagem; checkbox de política nesta fatia.
- Consequências: a Fatia A implementa esses campos e reserva o consentimento jurídico para a etapa legal.
- Responsável: Matheus

### D-034 — WhatsApp como fallback

- Data: 2026-09-15
- Status: aceita
- Contexto: D-016 já confirmou WhatsApp e e-mail reais.
- Decisão: o formulário não substitui esses canais. WhatsApp permanece secundário/fallback, visível em `/contato` junto com o e-mail.
- Alternativas: ocultar canais depois do formulário existir.
- Consequências: estados `unavailable`, `blocked` e erro interno apontam para WhatsApp e e-mail.
- Responsável: Matheus

### D-035 — Sem prazo numérico de resposta

- Data: 2026-09-15
- Status: aceita
- Contexto: P-006 pedia um prazo prometido. Não há evidência operacional para um número público.
- Decisão: nenhuma promessa numérica de prazo de resposta no site.
- Alternativas: “até X horas úteis”; horário de atendimento.
- Consequências: copy de expectativa/diagnóstico não ganha SLA. P-006 deixa de ser um texto a inventar e permanece como ausência de promessa.
- Responsável: Matheus

### D-036 — Sem banco/CRM; retenção na caixa comercial

- Data: 2026-09-15
- Status: aceita
- Contexto: P-005 também perguntava por CRM.
- Decisão: sem banco ou CRM no MVP. Leads não convertidos ficam retidos por até seis meses na caixa comercial, salvo necessidade contratual ou jurídica.
- Alternativas: persistir no Postgres; CRM imediato.
- Consequências: a Fatia A não grava filesystem, cookie, localStorage nem banco. A Fatia B envia e-mail; a retenção vive na caixa, não no app.
- Responsável: Matheus

### D-037 — Sem newsletter ou marketing nesta fase

- Data: 2026-09-15
- Status: aceita
- Contexto: consentimento de marketing exigiria oferta, base legal e copy aprovados.
- Decisão: não coletar newsletter nem consentimento de marketing nesta fase.
- Alternativas: checkbox opcional já no MVP.
- Consequências: o formulário não tem checkbox de marketing. Qualquer texto auxiliar sobre dados é factual e não finge política publicada.
- Responsável: Matheus

### D-038 — Hospedagem inicial na Vercel

- Data: 2026-09-15
- Status: aceita
- Contexto: a arquitetura técnica já sugeria Vercel.
- Decisão: Vercel é a hospedagem inicial do site institucional.
- Alternativas: VPS próprio; outro PaaS.
- Consequências: preview/produção seguem o modelo da Vercel. Não implica ativar produtos extras (Analytics, Speed Insights) nesta fatia.
- Responsável: Matheus

### D-039 — Vercel Web Analytics posterior

- Data: 2026-09-15
- Status: aceita
- Contexto: P-007 pedia a ferramenta de analytics.
- Decisão: Vercel Web Analytics é a escolha planejada, para fase posterior. Não ativar agora.
- Alternativas: GA4; Plausible; nada.
- Consequências: sem `@vercel/analytics`, sem eventos, sem tags. P-007 não está implementado.
- Responsável: Matheus

### D-040 — Sem banner de cookies por enquanto

- Data: 2026-09-15
- Status: aceita com condição
- Contexto: P-008 e D-015. Sem rastreadores não essenciais nesta fatia.
- Decisão: não há banner de cookies enquanto não houver rastreadores não essenciais. A decisão está sujeita à validação jurídica.
- Alternativas: banner preventivo; só aviso textual.
- Consequências: Footer sem preferências de cookies. D-015 permanece. P-008 não está resolvido.
- Responsável: Matheus, com revisão jurídica

### D-041 — Dados cadastrais sem publicação automática

- Data: 2026-09-15
- Status: aceita
- Contexto: P-003 e P-004 pediam razão social, CNPJ e endereço.
- Decisão: razão social `A Z WORK CENTER ESCRITORIO VIRTUAL LTDA - ME`; CNPJ `36.987.516/0001-19`; endereço cadastral `Rua Góes Calmon, nº 118 - sala 05. Centro. Vitória da Conquista-BA. CEP: 45.000-400`. Esses dados não entram automaticamente no Header, Footer ou Contato. O uso público será decidido na etapa legal e conforme o atendimento presencial.
- Alternativas: rodapé com CNPJ e endereço já nesta fatia.
- Consequências: `src/content/company.ts` permanece sem e-mail, telefone, endereço ou CNPJ. `/contato` não exibe o endereço cadastral.
- Responsável: Matheus

### D-042 — Canal de privacidade e redação da política

- Data: 2026-09-15
- Status: aceita com condição
- Contexto: P-008 e a necessidade de um canal do titular.
- Decisão: canal recomendado `privacidade@azworkcenter.com.br`, ainda pendente de criação/confirmação. A política poderá ser redigida com base na LGPD e em orientações da ANPD, mas não será apresentada como parecer jurídico. Revisão profissional permanece recomendada antes do lançamento.
- Alternativas: usar só `contato@` como canal de titular; publicar rascunho agora.
- Consequências: sem rotas públicas de privacidade/cookies. Sem link para política inexistente no formulário. D-015 e `legal.ts` (`published: false`) seguem.
- Responsável: Matheus, com revisão profissional

### Registro de implementação — Fatia A

- `page.tsx` de `/contato` permanece Server Component (async só para `connection()` e o instante `startedAt`).
- Schema, parser hostil e limites: `src/lib/contact-fields.ts` (constantes sem Zod) e `src/lib/contact-schema.ts` (Zod 4, só servidor).
- Estado serializável da Action: `src/lib/contact-action-state.ts`.
- Função de domínio `submitContactLead` e providers: `src/lib/contact-submit.ts`.
- Server Action: `src/app/(marketing)/contato/actions.ts`, sempre com `disabledContactProvider`.
- Ilha Client: `src/app/(marketing)/contato/_components/contact-form.tsx` (`useActionState`, pending e foco do feedback).
- Na aplicação, o provider desabilitado devolve `unavailable`. `success` só existe nos testes de domínio com fake injetado.
- Sem Resend, sem env, sem `console.log` de FormData, sem persistência, sem rate limit in-memory, sem CAPTCHA, sem analytics e sem banner.
- `connection()` deixa `/contato` dinâmica de forma intencional. `startedAt` é gerado por requisição/render (`Date.now()` depois de `connection()`), não congelado entre acessos. A checagem de tempo mínimo é heurística: token ausente ou inválido não bloqueia chamada direta. Não documentar isso como defesa suficiente contra abuso.
- Com JS, os valores de nome, empresa, e-mail, telefone, necessidade e contexto permanecem no estado local da instância após `validation`, `blocked`, `unavailable` ou exceção, enquanto o formulário continua montado. Só são limpos depois de `status: "success"` (`{ ok: true }` do provider). Desmontar a ilha ou sair de `/contato` descarta o rascunho; uma nova montagem começa vazia. `ContactActionState` não ecoa PII. Sem localStorage, sessionStorage, cookie, querystring, arquivo, log ou variável mutável de módulo desses campos.
- O botão de envio permanece focável durante `pending` (`aria-busy`, `aria-disabled`, texto `Enviando…`). Clique, Enter e Space repetidos não disparam segunda Action. Isso não é idempotência de segurança (Fatia B).
- Progressive enhancement: o `<form method="post">` usa a Server Action real (`submitContactAction`), não um wrapper Client. O HTML inicial do Next 16 na ilha pode exibir o placeholder `javascript:throw` do React até a hidratação; sem JS, o POST não recolocará PII na URL nem no estado serializado. Sem hidratação, os campos também não podem ser recolocados no HTML de erro — limitação do fallback sem JS, não um transporte de PII. WhatsApp e e-mail permanecem.
- Ilha Client de `/contato`: chunk `35xbfk9jgsz7y.js` (4 645 B gzip, sem Zod). Ausente em Home, `/sobre` e 404. Não carrega mídia da Hero nem Motion.

## Registro — Épico 6, Fatia B (entrega via Resend)

- Data: 2026-09-15
- Status: implementação técnica na branch `feat/forms-analytics-privacy`, sem commit nesta passagem
- Escopo: adapter Resend, configuração tipada por ambiente, e-mail interno com `text`/`html`, idempotência e proteção operacional best-effort. Sem envio real, sem DNS, sem variáveis da Vercel, sem Analytics, sem banner, sem páginas jurídicas, sem CRM/banco e sem confirmação ao remetente do lead.

### Contrato de ambiente

- Nomes: `CONTACT_PROVIDER`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`. Nenhuma usa `NEXT_PUBLIC_`.
- `CONTACT_PROVIDER` aceita só `disabled` ou `resend`. Omissão ou vazio = `disabled`.
- Desenvolvimento/local permanece `disabled` por padrão (`.env.example`).
- Quando `CONTACT_PROVIDER=resend`, destinatário, remetente e chave são obrigatórios e validados antes do envio. Configuração ausente/inválida vira `unavailable`, sem detalhe ao usuário.
- A separação Preview/Production é feita pelos escopos de variáveis da Vercel, não por endereços hardcoded. Preview sem `CONTACT_TO_EMAIL` não herda o destinatário de Production.
- Destinatários aprovados para configuração posterior: Production `contato@azworkcenter.com.br`; Preview `matheusqueiroz@azworkcenter.com.br`; remetente desejado `AZ Work Center <site@azworkcenter.com.br>`. Esses valores não entram no código.

### Provider e fronteiras

- Interface `ContactProvider.deliver(lead, { idempotencyKey })` permanece no domínio (`src/lib/contact-submit.ts`).
- `getContactProvider()` escolhe `disabled` ou o adapter Resend. O SDK `resend` só é importado dinamicamente no servidor, no momento do envio.
- A ilha Client não importa Zod, schema, submit, provider, Resend nem a chave.
- `from` = `CONTACT_FROM_EMAIL`; `to` = `CONTACT_TO_EMAIL`; `replyTo` = e-mail do lead. O lead nunca é `from`.
- Assunto interno: `Pedido de diagnóstico pelo site`. Corpo: nome, empresa, e-mail, telefone se houver, tipo de necessidade e contexto. HTML escapa conteúdo do usuário.
- Sucesso devolve identificador opaco `c_` + hash; o id bruto do Resend não vai ao Client.
- Log operacional, se houver, usa só código estável, ambiente, id opaco e categoria (`timeout` | `provider_error` | `misconfigured` | `rejected`). Sem PII, sem mensagem bruta do provider.

### Idempotência

- `attemptId` (UUID v4) é gerado no Server render, separado de `startedAt`, enviado como campo oculto e validado no servidor.
- Chave Resend: `contact-lead/<attemptId>`, via opção oficial `idempotencyKey` (header `Idempotency-Key`).
- Janela do provider: 24 horas. Não é exactly-once absoluto. Payload diferente com a mesma chave pode retornar conflito (`invalid_idempotent_request`).
- Retry após falha inequívoca: o mesmo `attemptId` pode ser reenviado; o adapter não tenta de novo na mesma invocação.
- Timeout ambíguo: a invocação atual não dispara segundo POST; o retry do usuário reutiliza o `attemptId` para o Resend deduplicar. Preferimos duplicidade evitada a um segundo envio “por garantia”. Não rotacionar em `unavailable`/timeout.
- Envios concorrentes com o mesmo id coalescem na instância e compartilham a chave.
- Depois de `{ ok: true }`, o Server Action devolve `nextAttemptId` (UUID novo, sem PII). O Client limpa o rascunho e atualiza o campo oculto uma vez por `submissionId` (não a cada render em `success`), permitindo um segundo lead na mesma montagem com chave distinta. `validation`, `blocked` e `unavailable` conservam o identificador atual.
- Sem JavaScript: o POST continua sem PII na URL. Após o round-trip, um novo render de `/contato` gera outro `attemptId` via `createContactAttemptId()`. O `nextAttemptId` no estado serve sobretudo ao caminho com JS que permanece montado; sem JS não há garantia de reaproveitar o estado Client entre renders.

### Anti-spam

Ordem antes do provider: limite bruto → schema/normalização → honeypot e tempo mínimo → frequência best-effort da instância → provider.

A frequência in-memory (mapa limitado, TTL, sem IP bruto) é insuficiente em múltiplas instâncias/serverless. Sem IP confiável, não há bucket global. Rate limit distribuído fica como configuração posterior no Vercel Firewall, se o plano e o endpoint da Server Action permitirem; não está aplicado nesta passagem.

### Falha e fallback

WhatsApp e e-mail continuam visíveis. `unavailable` preserva o rascunho com JS e não revela recusa, supressão ou rate limit do Resend. Sem confirmação automática ao lead. Sem SLA numérico.

Retenção operacional: até seis meses na caixa comercial para leads não convertidos, depois exclusão, salvo necessidade contratual ou jurídica. O app não persiste o lead.

### Dependência

- `resend@6.28.1`: SDK oficial Node para `emails.send` e idempotência. Sem React Email; o aviso interno é `text`/`html` pequenos no servidor.

### Bundle e verificação local

- Ilha Client de `/contato`: chunk `392ymqehjndt0.js` (4 527 B gzip). Fatia A media `35xbfk9jgsz7y.js` em 4 645 B gzip; variação −118 B, sem materialidade. Sem `resend`, sem Zod e sem chave no Client. Chunk ausente em Home, `/sobre` e 404.
- Produção local em `http://127.0.0.1:3028/contato` com `CONTACT_PROVIDER=disabled`: overflow ausente em 320×568, 375×812, 768×1024, 1024×768 e 1440×900; envio válido → `unavailable` com rascunho preservado, foco em `#contato-form-status` e canais WhatsApp/e-mail visíveis; sem PII na URL. Sucesso real não foi exercido (sem envio externo); coberto por testes com fake.

### Pendências externas

Ver `docs/14-checklist-configuracao-resend.md`.

**Verificado (2026-09):** domínio `azworkcenter.com.br` Verified no Resend; três registros DNS exigidos adicionados; equipe Vercel do projeto no Pro; quatro variáveis de contato só em Preview; teste Preview com sucesso e e-mail recebido em `matheusqueiroz@azworkcenter.com.br`. Sem colar chave, DNS completo ou PII do lead.

**Ainda não concluído:** variáveis e envio em Production; Firewall/rate limit distribuído; procedimento de rotação da chave; política jurídica/Analytics da Fatia C. Confirmação por mensagem de `replyTo`/autenticação no cliente de e-mail não está registrada como inspecionada.

## Registro — Evolução pós-lançamento (planejamento)

- Data: 2026-09-16
- Status: direção estratégica aprovada por Matheus e Lucas para o **planejamento**; escopo técnico, orçamento, cronograma e implementação **não aprovados**
- Fonte incorporada ao repositório: `docs/15-plano-pos-lancamento.md`
- Esta passagem é somente documental. Não implementa frentes, não instala OpenClaw/Hermes, não configura Resend/Vercel/DNS e não altera o Launch gate nem os Épicos 6–8/9

### D-043 — Plano pós-lançamento como direção de planejamento

- Data: 2026-09-16
- Status: aceita
- Contexto: ideias pós-lançamento alinhadas entre Matheus e Lucas; risco de misturar com o cronograma do site.
- Decisão: incorporar o plano em `docs/15-plano-pos-lancamento.md` e apontá-lo a partir de `docs/08-roadmap-de-implementacao.md` como fase **posterior** ao lançamento. Não autoriza código, dependências de agentes, pilotos reais nem mudança do escopo de lançamento do site.
- Alternativas: adiar qualquer registro; embutir frentes nos Épicos 6–8 (rejeitado).
- Consequências: agentes e humanos tratam o documento como planejamento, não como backlog imediato. Pendências condicionais do MVP (P-005 a P-008 etc.) permanecem abertas.
- Responsável: Matheus e Lucas

### D-044 — `estrutura` como ferramenta interna com subsistemas

- Data: 2026-09-16
- Status: aceita (direção)
- Contexto: risco de interpretar a área administrativa como produto multiempresa ou como um único agente com acesso total.
- Decisão: `estrutura.azworkcenter.com.br` é ponto de entrada interno da AZ para Marketing/Vendas, Projetos/Desenvolvimento e Manutenção/Suporte. Trabalho e contexto autorizado transitam por handoffs, APIs e eventos versionados. Memória compartilhada = conhecimento/histórico por cliente e projeto, com origem, versão e permissões — não chat global.
- Alternativas: SaaS administrativo vendável; monolito com um agente global (rejeitados como direção).
- Consequências: hospedagem Vercel × VPS do `estrutura`, banco e workers ficam para decisão técnica futura; a hospedagem do site institucional na Vercel (D-038) não muda.
- Responsável: Matheus e Lucas

### D-045 — Oferta futura = método/serviço; visão restrita de resultados

- Data: 2026-09-16
- Status: aceita (direção)
- Contexto: distinguir o que a AZ pode comercializar do que permanece operação interna.
- Decisão: a oferta futura é o método/serviço (diagnóstico, planejamento, implementação e evolução). O cliente poderá, eventualmente, visualizar resultados e marcos em interface restrita, sem controlar CRM interno, agentes, filas ou a esteira. Harness de projetos exige aprovação humana para arquitetura, mudança de escopo, dados reais e deploy. Stack preferencial provisória React/Next.js, TypeScript, Node.js e Tailwind, a confirmar na auditoria do portfólio; repositórios anteriores só com leitura autorizada e curadoria humana.
- Alternativas: vender a plataforma de controle; liberar autonomia ampla de agentes no MVP pós-lançamento (rejeitadas como direção).
- Consequências: chatbot/funil/pilotos (AZ Work Center, Óticas Queiroz, AZ News) permanecem frentes futuras com autorização e dados separados; métricas de sucesso são conversão, tempo, retrabalho, qualidade, margem e custo — não volume de mensagens/código.
- Responsável: Matheus e Lucas

### D-046 — OpenClaw e Hermes Agent como candidatos

- Data: 2026-09-16
- Status: aceita (direção)
- Contexto: ferramentas externas aparecem no plano de pesquisa de agentes.
- Decisão: OpenClaw e Hermes Agent são candidatos a avaliação em experimentos internos futuros. Não são dependências deste repositório, não estão escolhidos e não substituem a arquitetura de dados/eventos.
- Alternativas: adotar já uma das ferramentas; proibir qualquer menção no planejamento.
- Consequências: nenhum `package.json` nem integração nesta passagem; comparação fica para piloto pós-lançamento com critérios explícitos.
- Responsável: Matheus e Lucas

### D-047 — Fundadores na página Sobre

- Data: 2026-09-17
- Status: aceita
- Contexto: a Home ficou mais focada depois da Hero e da assinatura de marca; a apresentação dos fundadores competia com a narrativa comercial.
- Decisão: retirar a seção `#equipe` da Home e reunir Matheus e Lucas em `/sobre#fundadores`, aproveitando os perfis já publicados sem repetição na mesma página.
- Consequências: a Home mantém a menção textual à condução direta no bloco de confiança. Não publicar fotografia provisória; os retratos reais continuam em P-009.
- Responsável: Matheus

### D-048 — ProblemSection nativa e microinterações do Header

- Data: 2026-09-17
- Status: aceita
- Contexto: a lista de `#problemas` estava sempre expandida; o Header sticky precisava de feedback hover/focus sem virar Client, sem esconder a barra e sem copiar chrome de referências.
- Decisão: `ProblemSection` usa `<details>`/`<summary>` no Server Component, com o primeiro item aberto e o conteúdo aprovado de `homeProblems` no HTML inicial. No desktop, o conjunto da `DesktopNav` ganha moldura discreta; os links passam à cor AZ com linha inferior crescente no hover fino e no `focus-visible`; o CTA “Solicitar diagnóstico” recebe preenchimento vermelho gradual por pseudo-elemento. Tudo CSS-only, com `prefers-reduced-motion`. Sem alterar Hero, menu mobile, logo oficial ou o comportamento sticky.
- Alternativas: Accordion Radix (já usado no FAQ); Header Client com Motion; barra flutuante com blur.
- Consequências: a seção permanece compreensível sem JavaScript. Hover não é o único acesso. D-018 e D-047 permanecem. Não reabre decisões da Hero, da marca ou da arquitetura.
- Responsável: implementação nesta passagem

### D-049 — Header flutuante e accordion exclusivo nativo

- Data: 2026-09-17
- Status: aceita
- Contexto: o Header sticky ainda lia como barra sólida; a `ProblemSection` abria vários itens ao mesmo tempo e o título dentro de `summary` não era conteúdo de phrasing válido.
- Decisão: o `<header>` permanece sticky e transparente, sem borda inferior nem sombra. Logo, navegação e CTA “Solicitar diagnóstico” ficam na mesma moldura interna, com tinta escura sutil, `backdrop-filter` moderado e borda de baixa opacidade. As microinterações CSS atuais permanecem. A `ProblemSection` usa o mesmo `name="problemas-home"` em todos os `<details>`: o navegador mantém no máximo um item aberto, o primeiro começa aberto e o usuário pode fechar o item atual. Os títulos usam `role="heading"` e `aria-level="3"` dentro de `summary`. Sem ilha Client, listeners ou Motion novos. Sem alterar Hero, logo oficial, menu mobile ou D-018.
- Alternativas: Accordion Radix exclusivo; Header Client com scroll; glassmorphism dominante.
- Consequências: D-018, D-047 e D-048 permanecem. O blur sai em `prefers-reduced-motion`, com fundo mais opaco para leitura. Não reabre decisões da Hero, da marca ou da arquitetura.
- Responsável: implementação nesta passagem

### D-050 — Header overlay na Home

- Data: 2026-09-18
- Status: aceita
- Contexto: o Header sticky ocupava fluxo e deixava uma faixa clara acima da Hero; a mídia não começava no topo da viewport.
- Decisão: a Home marca `main` com `data-header-overlay`. O Header Server permanece no layout de marketing e, só nesse caso, passa a `position: fixed` por CSS estrutural (`body:has([data-header-overlay])`). A Hero começa no topo, atrás da moldura translúcida, sem alterar object-position, mídias ou os cálculos originais de min-height. Páginas internas (`/sobre`, `/solucoes`, `/como-trabalhamos`, `/contato`) não usam o atributo e conservam o Header sticky no fluxo. Sem ilha Client, pathname por texto, listener de scroll ou Motion.
- Alternativas: Header Client com `usePathname`; dois layouts por route group; overlay em todas as rotas com spacer.
- Consequências: D-018, D-048 e D-049 permanecem. Âncoras continuam com `scroll-padding-top`. Não reabre decisões da Hero, da marca ou da arquitetura.
- Responsável: implementação nesta passagem

### Registro — Atuação (CTAs, estado ativo e diagramas)

- Data: 2026-09-18
- Status: implementação técnica na branch `feat/forms-analytics-privacy`, sem commit nesta passagem
- Escopo: refino da `ServicesSection` sem redesenho. Hero e Header permanecem. Sem nova ilha Client.
- CTAs das quatro ofertas passam de `TextLink` sublinhado para um controle editorial compacto (`data-service-cta`): borda fina, `min-h-touch`, radius `xs`, seta SVG própria e preenchimento vermelho gradual no hover/focus. Os hrefs e os nomes acessíveis não mudam.
- O observer já usado pelo Service Story marca `data-service-story-active` na lista. Filete vermelho e título acompanham o serviço em leitura no desktop, inclusive com `prefers-reduced-motion` (sem transições decorativas e sem importar Motion). Mobile não observa a lista. Os índices 01–04 saíram da lista.
- Os diagramas passam a miniaturas de interface/fluxo (shell, pipeline, roadmap e painel de canais). O fallback Server reusa o diagrama de Sistemas; o painel Motion continua com crossfade `opacity`/`y`. Sem imagens de banco, 3D ou bibliotecas novas.
- No mobile (`<1024px`), cada oferta vira `details` nativo com `name="solucoes-home"`: um aberto por vez, o primeiro inicia aberto e o atual pode ser fechado. Uma única árvore Server; no desktop o disclosure não opera e a lista/diagrama sticky permanecem. Sem nova ilha Client.

### Registro — Atuação (copy unificada, nomes e ilustrações)

- Data: 2026-09-19
- Status: implementação técnica na branch `feat/forms-analytics-privacy`, sem commit nesta passagem
- Escopo: refino da `ServicesSection` sem redesenho das duas colunas. Hero, Header, ProblemSection e ProcessSection permanecem. Sem nova ilha Client e sem dependências novas.
- Um parágrafo de ligação entra após o H2. Cada serviço passa a um parágrafo único, label “Frentes de entrega”, marcadores quadrados e CTA visual uniforme “Conhecer solução”, com nome acessível específico. Slugs e hrefs não mudam.
- Títulos visíveis: “Produtos digitais” e “Web e vendas digitais”. Metadados SEO das páginas internas permanecem. Sem redirects.
- O filete ativo cobre só título e parágrafo. As ilustrações viram interfaces abstratas de produto, com animação pontual de 650 ms na ativação e estado final estático em reduced motion.

### Pendências pós-lançamento (abertas — não resolvidas)

Não confundir com bloqueadores do lançamento do site. Detalhamento em `docs/15-plano-pos-lancamento.md`.

- P-021: definir ICP inicial (segmentos, porte, região, decisor, dores).
- P-022: decidir CRM pronto × módulo interno e ponto de integração com `estrutura`.
- P-023: regras de preço/prazo/capacidade e o que o chatbot pode dizer sem revisão humana.
- P-024: canais de captação autorizados, permissões Meta, opt-out e base legal.
- P-025: políticas de privacidade, retenção e uso de IA antes de chatbot/funil públicos.
- P-026: orçamento mensal máximo de IA, mensageria e infraestrutura; critérios de sucesso e de parada por piloto.
- P-027: inventário e autorização de repositórios anteriores; curadoria de padrões; stack preferencial confirmada.
- P-028: aprovações humanas obrigatórias (arquitetura, escopo, PR, dados, deploy) e isolamento por cliente.
- P-029: escopo, aprovadores, dados e retenção dos pilotos Óticas Queiroz e AZ News.
- P-030: contratos de handoff Vendas→Projetos e Projetos→Suporte; versionamento da memória compartilhada.
- P-031: avaliar OpenClaw, Hermes Agent ou outra ferramenta (nenhuma escolhida).
- P-032: o que o cliente visualiza na visão de resultados; precificação do método/serviço (sem vender a plataforma interna).

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
