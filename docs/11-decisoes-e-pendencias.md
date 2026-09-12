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

