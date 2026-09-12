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

## Pendências bloqueadoras antes do desenvolvimento visual final

| ID | Pendência | Responsável sugerido | Impacto |
|---|---|---|---|
| P-001 | vetor oficial e variações do logo | Matheus/design | alto |
| P-002 | confirmar vermelho oficial | design | alto |
| P-003 | nome empresarial/razão social pública | Matheus/contábil | médio |
| P-004 | telefone, e-mail e endereço oficiais | Matheus | alto |
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

