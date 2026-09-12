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

