# Playbook de skills e agentes

Versão: 1.0  
Data da curadoria: 11 de setembro de 2026  
Objetivo: orientar agentes do Cursor e revisores durante o design, implementação, motion e validação do novo site.

## 1. Decisão executiva

Não usar todas as skills disponíveis. A combinação recomendada para a AZ é:

1. **`frontend-design`** para direção visual e composição autoral;
2. **`web-design-guidelines`** para auditoria objetiva de interface;
3. **`vercel-react-best-practices`** para qualidade e performance em React/Next.js;
4. **`vercel-composition-patterns`** para arquitetura de componentes;
5. **`framer-motion-animator` ou `animate`** para implementar animações — escolher uma;
6. **`improve-animations`** para revisar o sistema de movimento depois de implementado;
7. **`accessibility-review`** para WCAG, teclado e redução de movimento;
8. **`playwright-cli` ou browser verification** para verificar a experiência real em navegadores.

As skills locais `design-system`, `design-critique`, `design-handoff`, `ux-copy`, `nextjs`, `shadcn`, `testing-strategy`, `code-review` e `deploy-checklist` entram em momentos específicos, conforme a matriz abaixo.

## 2. Por que esta seleção é adequada

O risco principal do projeto não é faltar efeito visual. É os agentes produzirem:

- uma landing page genérica de “agência de IA”;
- componentes shadcn pouco personalizados;
- excesso de cards, gradientes e glows;
- animações isoladas sem uma linguagem comum;
- um site bonito, mas pesado ou pouco acessível;
- decisões visuais contraditórias entre agentes.

A stack selecionada separa quatro responsabilidades:

| Responsabilidade | Skill principal | Papel |
|---|---|---|
| Criar | `frontend-design` | direção visual e composição |
| Estruturar | `vercel-composition-patterns`, `design-system`, `shadcn` | componentes e tokens |
| Animar | `framer-motion-animator` **ou** `animate` | implementação de motion |
| Auditar | `web-design-guidelines`, `improve-animations`, `accessibility-review` | crítica independente |

Uma skill criadora não deve aprovar sozinha o próprio trabalho.

## 3. Stack mínima recomendada para o Cursor

### 3.1 Instalar primeiro

#### `frontend-design`

Fonte: Anthropic. É a principal skill para combater estética genérica e orientar interfaces de produção com direção clara.

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Usar em:

- direção visual da Home;
- composição das páginas principais;
- definição de ritmo, hierarquia, grid e imagem;
- revisão anti-template antes do motion.

Não usar para redefinir tokens aprovados, alterar posicionamento de negócio ou decidir arquitetura técnica.

#### `web-design-guidelines`

Fonte: Vercel. Audita código de interface contra regras atuais de design, UX e acessibilidade e retorna achados por arquivo/linha.

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
```

Usar na revisão de cada página pronta, no gate antes de merge e em formulários/componentes interativos. Ela é régua de correção, não diretora de arte.

#### `vercel-react-best-practices`

Fonte: Vercel. Reúne regras de performance para React e Next.js, priorizadas por impacto.

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

Usar na geração e revisão de TSX, limites Server/Client Components, carregamento, bundle e renderização.

#### `vercel-composition-patterns`

Fonte: Vercel. Orienta APIs de componentes escaláveis e evita componentes cheios de flags booleanas.

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-composition-patterns
```

Usar em primitives e componentes como `Header`, `Navigation`, `ServiceShowcase`, `CasePreview`, formulários e modais.

### 3.2 Motion: escolher uma skill de construção

#### Opção A — `framer-motion-animator`

Já disponível no ambiente Codex. É direta para Motion/Framer Motion e cobre variants, stagger, presença, layout compartilhado, scroll e reduced motion.

Melhor quando o catálogo já está definido em `docs/05-motion-system.md` e o agente precisa de implementação prática próxima da biblioteca.

#### Opção B — `animate`

Fonte: Emil Kowalski. Tem postura mais criteriosa: aceita que a melhor decisão possa ser não animar e implementa motion com regras de craft.

```bash
npx skills add https://github.com/emilkowalski/skills --skill animate
```

**Recomendação para este projeto:** usar `animate` no Cursor. Manter `framer-motion-animator` como alternativa local no Codex, não como segunda direção concorrente.

### 3.3 Auditoria de motion

#### `improve-animations`

Fonte: Emil Kowalski. Faz inventário, prioriza problemas e produz planos; não deve implementar silenciosamente.

```bash
npx skills add https://github.com/emilkowalski/skills --skill improve-animations
```

Usar somente após uma página possuir movimento funcional. Ordem correta:

1. estrutura estática;
2. implementação com `animate`;
3. auditoria com `improve-animations`;
4. correções em tarefa separada;
5. reteste de reduced motion e performance.

Opcionalmente, `find-animation-opportunities` pode ser usado uma vez antes da implementação para propor no máximo cinco oportunidades de alto valor. Ele não substitui o motion system.

```bash
npx skills add https://github.com/emilkowalski/skills --skill find-animation-opportunities
```

## 4. Skills por momento de uso

| Skill | Prioridade | Quando ativar | Saída esperada |
|---|---:|---|---|
| `frontend-design` | P0 | fundação e páginas-chave | direção visual autoral |
| `design:design-system` | P0 | tokens e primitives | variantes, estados e consistência |
| `vercel:nextjs` | P0 | arquitetura e implementação | App Router correto |
| `vercel:shadcn` | P0 | primitives acessíveis | componentes customizados |
| `vercel-react-best-practices` | P0 | toda revisão de TSX | performance e renderização corretas |
| `framer-motion-animator`/`animate` | P0 | fase de motion | animações implementadas |
| `design:accessibility-review` | P0 | componentes, Home e pré-lançamento | achados WCAG priorizados |
| `playwright-cli` | P0 | após rotas funcionais | fluxos e screenshots verificáveis |
| `design:design-critique` | P1 | wireframe, preview e polish | crítica visual estruturada |
| `design:design-handoff` | P1 | antes do código visual | especificações exatas |
| `design:ux-copy` | P1 | textos e microcopy | CTAs, formulários e estados claros |
| `engineering:testing-strategy` | P1 | início da implementação | plano de testes proporcional ao risco |
| `engineering:code-review` | P1 | pull requests | achados de correção, segurança e performance |
| `engineering:deploy-checklist` | P1 | pré-produção | checklist de release |
| `ui-ux-pro-max` | P2 | pesquisa ou segunda opinião | alternativas e regras de UX |
| `imagegen` | P2 | somente assets abstratos próprios | conceito visual, não foto falsa |
| `vercel-react-view-transitions` | P2 | depois do MVP | transições progressivas entre rotas |

## 5. O que não instalar agora

- múltiplos pacotes de Motion/Framer Motion com a mesma função;
- skill de GSAP enquanto não existir necessidade aprovada de timeline ou pinning complexo;
- skills de Three.js/WebGL para o hero;
- `extract-design-system`, pois o sistema já está documentado e tokenizado;
- packs inteiros de dezenas de skills sem revisar cada instrução;
- skills com pouca adoção e repositório sem reputação quando existe alternativa oficial;
- geradores de “landing page premium” que imponham paleta, tipografia ou linguagem próprias.

`vercel-react-view-transitions` é opcional. Só testar depois que navegação, foco, scroll, reduced motion e fallback estiverem corretos.

## 6. Matriz de atribuição por agente

### Diretor de design

Recebe `frontend-design`, `design:design-system` e `design:design-critique`. Lê estratégia, marca, design system, referências e wireframe. Não recebe motion na primeira passagem. Entrega composição estática desktop/mobile, com decisões explícitas de tipografia, grid, mídia e hierarquia.

### Engenheiro de UI

Recebe `vercel:nextjs`, `vercel:shadcn`, `vercel-react-best-practices` e `vercel-composition-patterns`. Implementa a direção aprovada; não redesenha por gosto próprio.

### Engenheiro de motion

Recebe `animate` **ou** `framer-motion-animator`, `docs/05-motion-system.md` e os componentes estáticos aprovados. Pode recusar animação sem função. Não instala GSAP, smooth scroll ou WebGL sem decisão humana.

### Auditor de motion

Recebe `improve-animations`, `accessibility-review` e métricas de bundle/performance. Preferencialmente não é o mesmo agente que implementou o motion.

### Auditor de interface e QA

Recebe `web-design-guidelines`, `design:accessibility-review`, `playwright-cli` ou browser verification e `engineering:testing-strategy`. Testa desktop, mobile, teclado, zoom, contraste, loading/error e `prefers-reduced-motion`.

### Integrador

Recebe `engineering:code-review`, `vercel-react-best-practices` e `engineering:deploy-checklist`. Resolve conflitos e impede que a estética amplie o escopo técnico.

## 7. Ordem operacional por página

1. **Brief:** confirmar objetivo, público, CTA e conteúdo aprovado.
2. **Composição:** `frontend-design`, sem motion avançado.
3. **Crítica:** `design-critique`; corrigir hierarquia e aparência genérica.
4. **Handoff:** registrar grid, estados, mídia, responsividade e pontos de movimento.
5. **Implementação:** Next.js + shadcn + design system + composition patterns.
6. **Motion:** uma única skill de construção, seguindo o motion system.
7. **Auditoria técnica:** React best practices e web design guidelines.
8. **Auditoria humana:** acessibilidade, browser real, mobile e reduced motion.
9. **Polish:** uma rodada limitada, orientada pelos achados; não redesenhar tudo.
10. **Gate:** lint, typecheck, testes, build, screenshots e relatório.

## 8. Regras contra “design feito por IA”

Antes de aprovar uma seção, responder:

1. Qual parte só poderia pertencer à AZ?
2. O conteúdo fala de problema real ou apenas usa adjetivos?
3. A composição depende de cards arredondados para organizar tudo?
4. O acento vermelho possui função ou virou decoração?
5. Existe evidência real: tela, processo, pessoa, local ou arte própria?
6. A animação explica algo ou apenas revela elementos?
7. O mobile é uma composição ou virou uma pilha automática?
8. Algum componente ainda parece shadcn sem direção de marca?
9. A seção imita Linear, Vercel ou outra referência reconhecível?
10. Remover o efeito faria a mensagem desaparecer? Se sim, reescrever a mensagem.

## 9. Política de conflito

1. Acessibilidade e conteúdo verdadeiro vencem estética.
2. `AGENTS.md`, marca, tokens e motion system vencem presets externos.
3. Performance e funcionalidade vencem efeitos decorativos.
4. Direção visual aprovada vence preferências do implementador.
5. Auditorias geram achados; não mudam silenciosamente a direção.
6. Decisão humana registrada em `docs/11` encerra o conflito.

## 10. Prompts curtos para invocação

### Direção visual

```text
Use frontend-design para compor esta página a partir do manual da marca, tokens e wireframe da AZ. Preserve o conteúdo aprovado. Evite bento grid automático, cards em excesso, glow de IA e qualquer assinatura copiável das referências. Antes do código, declare a ideia visual da página em duas frases e o que a torna específica da AZ.
```

### Motion

```text
Use uma única skill de construção de animações e siga docs/05-motion-system.md. Para cada efeito, registre função, gatilho, propriedades, duração/easing, comportamento mobile e fallback reduced motion. Se a animação não orientar, demonstrar, dar feedback ou reforçar a narrativa, não a implemente.
```

### Auditoria anti-genérico

```text
Audite o preview sem reescrever código. Procure aparência de template/IA, repetição estrutural, estética shadcn crua, hierarquia fraca, mídia genérica, texto vazio e motion preset. Liste achados por impacto e proponha correções específicas da AZ, citando a seção e o token/componente afetado.
```

### QA final

```text
Use web-design-guidelines, accessibility-review e browser verification. Teste teclado, foco, zoom, breakpoints, loading/error, reduced motion, console, imagens e CTAs. Entregue evidência reproduzível; não aprove a página apenas por uma nota de Lighthouse.
```

## 11. Critérios e fontes da curadoria

Critérios: adequação ao stack, origem oficial ou autor reconhecido, adoção pública, escopo delimitado, compatibilidade com Cursor, complementaridade e segurança. Toda skill deve ser revisada antes da instalação; popularidade não garante confiabilidade.

- [Skills.sh — Design & UI](https://www.skills.sh/topic/design)
- [frontend-design — Anthropic](https://www.skills.sh/anthropics/skills/frontend-design)
- [web-design-guidelines — Vercel](https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines)
- [Vercel React Best Practices](https://www.skills.sh/vercel-labs/agent-skills/react-best-practices)
- [animate — Emil Kowalski](https://www.skills.sh/emilkowalski/skills/animate)
- [improve-animations — Emil Kowalski](https://www.skills.sh/emilkowalski/skills/improve-animations)
- [find-animation-opportunities — Emil Kowalski](https://www.skills.sh/emilkowalski/skills/find-animation-opportunities)
- [Skills CLI](https://www.skills.sh/docs/cli)

## 12. Recomendação final

Começar com somente quatro skills externas no Cursor:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
npx skills add https://github.com/emilkowalski/skills --skill animate
```

Adicionar `vercel-composition-patterns` quando a biblioteca de componentes começar e `improve-animations` quando a primeira página animada estiver pronta. Essa progressão evita ruído precoce e mantém cada skill ligada a uma entrega verificável.
