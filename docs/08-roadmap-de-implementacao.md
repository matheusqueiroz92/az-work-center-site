# Roadmap de implementação

## Estratégia de execução

Agentes podem trabalhar em paralelo apenas quando seus arquivos e decisões não se sobrepõem. O agente integrador mantém o design system, resolve conflitos e valida o build completo.

## Épico 0 — Descoberta técnica

### Tarefas

- inventariar domínio, DNS, hospedagem e WordPress;
- exportar sitemap/URLs atuais;
- reunir logotipos vetoriais, fotos e arquivos de marca;
- confirmar telefone, e-mail, endereço, CNPJ e razão social;
- identificar analytics/pixels atuais;
- criar repositório e estratégia de branches;
- registrar variáveis e integrações necessárias.

### Aceite

- inventário versionado;
- nenhum segredo incluído no Git;
- mapa de URLs antigas criado;
- pendências adicionadas ao decision log.

## Épico 1 — Fundação do projeto

### Tarefas

- scaffold Next.js + TypeScript strict;
- configurar Tailwind;
- configurar aliases;
- instalar somente dependências aprovadas;
- lint, formatter, typecheck e testes;
- configurar ambientes;
- criar layout raiz, metadata base, robots e sitemap;
- adicionar fontes via `next/font`;
- integrar tokens CSS.

### Aceite

- `dev`, `lint`, `typecheck`, `test` e `build` passam;
- preview deploy ativo;
- preview com noindex;
- nenhuma rota depende de Client Component global.

## Épico 2 — Design system

### Tarefas

- mapear tokens no Tailwind;
- criar Button, Link, Container, Section, SectionHeading;
- criar Header, Footer, Sheet/Menu;
- criar Input, Select, Textarea, Checkbox e mensagens;
- criar Accordion, Breadcrumb e CookieBanner;
- documentar variantes/estados;
- montar página interna de showcase ou Storybook, se custo justificar.

### Aceite

- componentes em light/dark/brand;
- teclado e foco verificados;
- nenhum hex repetido em componentes;
- todos os estados obrigatórios demonstrados.

## Épico 3 — Home estrutural

### Tarefas

- hero;
- problemas;
- soluções;
- método;
- bloco provisório no lugar dos cases;
- fundadores;
- confiança;
- FAQ;
- CTA final;
- footer.

Primeiro entregar sem motion avançado. A narrativa e responsividade devem ser aprovadas antes das animações.

### Aceite

- conteúdo completo sem lorem ipsum;
- H1 e hierarquia corretos;
- mobile/desktop funcionais;
- nenhuma métrica não aprovada;
- CTAs levam ao fluxo de diagnóstico.

## Épico 4 — Páginas internas

### Tarefas

- índice de soluções;
- quatro páginas de solução;
- Como trabalhamos;
- Sobre;
- Contato;
- privacidade/cookies;
- 404.

### Aceite

- metadata única;
- breadcrumb;
- CTA contextual;
- links internos;
- sem páginas “hero + footer”.

### Registro de implementação

- Soluções usam `/solucoes/[slug]` com composição visual por oferta (D-014, aceita).
- “Projetos” saiu da navegação até o Épico 9 (D-013, aceita).
- Privacidade e Cookies ficam fora do Footer e sem rotas públicas até P-008 (D-015, aceita). O conteúdo editorial permanece em `src/content/legal.ts`; `/privacidade` e `/cookies` caem na 404 raiz.
- `/contato` permanece sem formulário no Épico 4; WhatsApp e e-mail confirmados são as ações reais (D-016, aceita com evolução). O envio pelo site continua no Épico 6.

## Épico 5 — Motion e acabamento

### Tarefas

- Motion provider;
- hero assembly;
- section reveal;
- AZ line draw;
- service sticky story;
- microinterações;
- header behavior;
- reduced motion;
- lazy load dos módulos avançados.

### Aceite

- catálogo respeitado;
- nenhuma regressão de teclado;
- reduced motion mostra o estado final;
- performance dentro do orçamento;
- agentes revisores não identificam presets genéricos repetidos.

## Épico 6 — Formulário, analytics e privacidade

### Tarefas

- formulário tipado;
- validação servidor/cliente;
- integração de e-mail/CRM;
- anti-spam e rate limit;
- estados success/error;
- consentimento de cookies;
- eventos;
- política e redaction de logs.

### Aceite

- lead real de teste recebido;
- lead duplicado/spam tratado;
- evento só dispara após sucesso;
- rejeitar cookies impede analytics não essencial;
- nenhum dado pessoal em evento/URL.

## Épico 7 — SEO e migração

### Tarefas

- metadata final;
- OG;
- JSON-LD;
- sitemap/robots;
- redirects;
- Search Console;
- canonical;
- dados locais;
- crawl de preview.

### Aceite

- zero links internos quebrados;
- URLs antigas relevantes redirecionam corretamente;
- preview não indexa;
- produção indexa após lançamento;
- rich results sem erro crítico.

## Épico 8 — QA e lançamento

### Tarefas

- suíte automatizada;
- revisão visual responsiva;
- teclado/leitor de tela;
- Lighthouse/Web Vitals;
- browsers;
- segurança;
- conteúdo;
- backup;
- switch de domínio;
- smoke test;
- monitoramento.

### Aceite

Todos os itens de `07-qualidade-acessibilidade-performance.md` atendidos ou exceções formalmente aprovadas.

## Épico 9 — Cases (segunda fase)

- levantar conteúdo;
- obter autorizações;
- construir template;
- gerar OG/metadata;
- publicar um por vez;
- atualizar Home e links internos.

## Sugestão de agentes

| Agente | Responsabilidade | Pode paralelizar com |
|---|---|---|
| Lead/Integrator | arquitetura, decisões e merge | todos, revisando contratos |
| Design System | tokens e componentes | conteúdo/SEO |
| Marketing Pages | Home e páginas internas | formulário/analytics após contratos |
| Motion | animações isoladas | SEO/conteúdo, após estrutura aprovada |
| Forms/Platform | formulário, privacidade, integrações | páginas estáticas |
| QA | testes, a11y, performance | continuamente |

Não usar vários agentes para editar `globals.css`, `layout.tsx` ou os mesmos componentes simultaneamente.

## Estratégia de branches/PRs

- uma branch por épico ou fatia vertical;
- PRs pequenos, verificáveis e com screenshots;
- descrição inclui: objetivo, decisões, testes e impacto visual;
- componentes novos mostram estados e breakpoints;
- motion PR separado da estrutura quando possível;
- cada PR atualiza docs/decision log se houver mudança.

## Gates

1. **Strategy gate:** sitemap e mensagens aprovados.
2. **Structure gate:** layout sem motion aprovado.
3. **Visual gate:** tokens e componentes aprovados.
4. **Motion gate:** performance e reduced motion aprovados.
5. **Content gate:** textos, fotos e dados aprovados.
6. **Launch gate:** QA, migração e rollback prontos.

