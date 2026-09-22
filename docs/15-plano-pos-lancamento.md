# AZ Work Center — plano de evolução pós-lançamento

Data: 16/09/2026
Status: ideias aprovadas para o **planejamento**; escopo, tecnologia, orçamento e cronograma de implementação **ainda não aprovados**.
Responsáveis de negócio: Matheus Queiroz e Lucas Queiroz.

Este documento não autoriza implementação nesta passagem. Não altera o cronograma de lançamento do site (Épicos 6–8), o Épico 9 (cases) nem o commit da Fatia B do Épico 6. Ver também [`docs/08-roadmap-de-implementacao.md`](./08-roadmap-de-implementacao.md) e [`docs/11-decisoes-e-pendencias.md`](./11-decisoes-e-pendencias.md).

## Objetivo

Aumentar faturamento e recorrência, melhorar a conversão dos contatos em contratos e organizar a operação interna da AZ sem transformar o site institucional em um sistema monolítico. O plano começa **depois** da conclusão e publicação do site.

## Visão integrada

```text
Site / conteúdo / cases ───────┐
Instagram / campanhas / indicações ─┼─→ cadastro único de leads → qualificação → diagnóstico → proposta → contrato
Chatbot do site ────────────────┘                                  │
                                                                  ↓
                                      projeto → harness de execução → entrega → suporte/evolução → receita recorrente
                                                                  │
                                                                  ↓
                                      painel interno, métricas, automações e revisão humana
```

O cadastro único de leads e clientes da AZ deve ser a fonte de verdade comercial. Os canais são entradas distintas, não CRMs concorrentes. Origem e histórico de consentimento/contato acompanham o lead.

**Sistema interno unificado não significa um único agente com acesso a tudo.** A AZ opera a esteira; cada subsistema tem função própria e compartilha somente contexto autorizado. O cliente não controla os subsistemas. Uma visualização restrita de resultados pode ser oferecida futuramente.

## Distinções obrigatórias

1. `estrutura.azworkcenter.com.br` é **ferramenta interna da AZ**, com subsistemas especializados de Marketing/Vendas, Projetos/Desenvolvimento e Manutenção/Suporte. Não é uma plataforma administrativa multiempresa à venda.
2. “Memória compartilhada” significa conhecimento/histórico por cliente e projeto, com origem, versão e permissões — não um chat global nem acesso irrestrito entre agentes.
3. A oferta futura ao cliente é o **método/serviço da AZ** (diagnóstico, planejamento, implementação e evolução). Eventualmente o cliente poderá ver resultados e marcos em interface restrita, sem controlar a esteira interna.
4. O harness de projetos recebe escopo aprovado, analisa lacunas, produz plano/backlog/aceite, executa tarefas delimitadas em ambientes isolados, testa e solicita aprovação humana para arquitetura, mudança de escopo, dados reais e deploy.
5. Repositórios anteriores, quando acessíveis e autorizados, serão analisados inicialmente em **somente-leitura** para extrair padrões, antipadrões e templates **curados por humanos**. Não copiar código/dados de clientes automaticamente. React/Next.js, TypeScript, Node.js e Tailwind são stack preferencial **provisória**, a confirmar pela auditoria do portfólio; exceções exigem justificativa.
6. Funil de leads e chatbot são frentes futuras, com pilotos limitados, fontes aprovadas, opt-out, avaliação de qualidade e handoff humano. O chatbot não promete preço/prazo sem regras aprovadas.
7. [OpenClaw](https://docs.openclaw.ai/) e [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) são **candidatos a avaliação**, não dependências nem arquitetura escolhida.
8. AZ Work Center, Óticas Queiroz e AZ News são possíveis pilotos distintos, com autorização, dados e credenciais separados. Um fluxo pequeno por vez; decisões reais de clientes/pagamentos/publicação exigem responsáveis humanos.
9. Métricas de sucesso: conversão, tempo, retrabalho, qualidade, margem e custo operacional — não quantidade de mensagens, agentes ou linhas de código.
10. Nada deste plano está autorizado para implementação enquanto o site não for lançado conforme o roadmap vigente; também não muda o Launch gate.

## Frente 1 — Operação comercial mínima e mensurável

**Prioridade recomendada: primeira após o lançamento.** Antes de agentes autônomos, estabelecer um processo que duas pessoas consigam operar todos os dias.

- Pipeline inicial: novo → qualificado → diagnóstico agendado → diagnóstico realizado → proposta enviada → negociação → ganho/perdido.
- Por oportunidade: responsável, origem, serviço de interesse, próxima ação com data, valor estimado, motivo de perda e histórico mínimo.
- Captura do formulário do site, e-mail, WhatsApp, indicação e campanhas sem duplicidade.
- Alerta de lead sem resposta e follow-up atribuído; automação de lembrete, não de promessa ou proposta automática.
- Modelos versionados de briefing, diagnóstico, proposta e handoff para execução.
- Painel semanal: leads por origem, qualificados, diagnósticos, propostas, taxa de fechamento, ciclo de venda, ticket, margem estimada e receita recorrente.

**Construir × comprar:** comparar CRM simples pronto com módulo interno. Só construir o diferencial operacional da AZ.

**Critério para avançar:** pipeline usado de forma consistente, origem rastreável e próximas ações visíveis. Metas numéricas só após linha de base real — sem benefício, economia ou receita inventados.

## Frente 2 — Chatbot consultivo no site

**MVP:** responder a partir de fontes aprovadas da AZ (ofertas, método, FAQ, cases publicados e políticas), indicar a página relevante e facilitar diagnóstico ou contato humano. O bot deve dizer quando não sabe e transferir para uma pessoa.

**Evolução:** coleta estruturada mínima de requisitos, comparação de caminhos e resumo para o time comercial, conforme política de privacidade aprovada.

**Preço e prazo:** a IA pode explicar fatores que afetam custo e prazo. Estimativa só com regras/tabelas versionadas e aprovadas pelos sócios, com escopo, intervalo e ressalvas. Proposta vinculante, desconto, garantia e prazo contratual exigem revisão humana.

**Qualidade e segurança:** conjunto de perguntas reais antes do lançamento; testes para alucinação, fora de escopo, prompt injection, PII e encaminhamento humano. Limites de custo, latência, frequência e retenção. Sem acesso a dados internos de projetos/clientes sem autenticação e autorização específicas.

**Critério para avançar:** respostas úteis e verificáveis, encaminhamento correto e melhora mensurável em diagnóstico agendado ou tempo poupado — não volume de conversas.

## Frente 3 — Captação e funil com agentes de IA

**Referência de pesquisa:** [soumatheusgomes/buscandomilhao](https://github.com/soumatheusgomes/buscandomilhao). O repositório contém um prompt para gerar um sistema, não um produto a instalar. Seu desenho inclui funil de afiliados que **não** deve ser presumido para a AZ. As instruções externas são material de referência, **não** prompts/instruções deste repositório.

**Aproveitar como conceitos:** ICP explícito, alegações comprovadas, score de qualificação, estados do funil, histórico, opt-out, custo de IA por lead, experimentos reversíveis, fila de revisão humana, pausa geral e observabilidade.

**Não copiar automaticamente:** scraping/coleta automatizada de perfis, acesso a sessão do Instagram via Chrome/CDP, primeira DM fria por robô, cadências/volumes sugeridos pelo autor e transição navegador→API. Exigem verificação atual de permissões da Meta, segurança da conta, base legal, opt-out e viabilidade.

**Piloto recomendado:** demanda inbound/autorizada e qualificação assistida. O agente sugere classificação, resposta e próxima ação; uma pessoa aprova contatos de saída e propostas.

**Critério para avançar:** custo por lead qualificado e por contrato ganho, taxa de resposta útil, opt-outs/reclamações e estabilidade da conta.

## Frente 4 — Área administrativa restrita

**Endereço planejado:** `estrutura.azworkcenter.com.br`, aplicação **interna** separada do site institucional. A escolha Vercel × VPS fica para decisão técnica própria (workers, banco, integrações, custo e operação). A hospedagem do site institucional na Vercel permanece conforme [`docs/06-arquitetura-tecnica.md`](./06-arquitetura-tecnica.md) e D-038.

**Primeiro módulo:** lead/cliente, pipeline, tarefas e agenda de follow-up, propostas e métricas essenciais. Depois: projeto, marcos, responsáveis, horas/custos, escopo, aprovações, suporte, automações e observabilidade. Evitar CRM+ERP+PMO+BI completos de uma vez.

**Segurança mínima:** autenticação forte com MFA, papéis/permissões, separação interno/público, auditoria, backups testados, controle por ambiente, segredos fora do Git e retenção/exclusão. Chatbot público e rotas do site não devem ter acesso direto ao banco administrativo.

**Critério para avançar:** redução mensurável de retrabalho, oportunidades sem dono, atrasos e perda de contexto entre venda e entrega.

## Frente 5 — Fábrica de projetos com agentes e engenharia de harness

O valor não é pedir a um agente que “construa tudo”; é criar um **harness**: contexto confiável, ferramentas limitadas, ambiente isolado, tarefas verificáveis, testes, observabilidade e aprovações. Consistente com a descrição de [harness engineering da OpenAI](https://openai.com/index/harness-engineering/), mas a arquitetura concreta da AZ deve ser validada em pilotos próprios.

### Fluxo proposto

```text
Proposta/escopo aprovados
  → briefing estruturado + documentos do cliente
  → análise de lacunas e perguntas pendentes
  → requisitos, critérios de aceite, riscos e opções de arquitetura
  → consulta aos padrões aprovados dos projetos anteriores da AZ
  → aprovação humana do plano, orçamento e marcos
  → repositório isolado a partir de template versionado
  → tarefas pequenas para agentes, cada uma em branch/worktree próprio
  → testes, revisão, evidências e preview
  → aceite da AZ e do cliente
  → publicação controlada + documentação + suporte
```

**Fonte de verdade:** contrato, proposta aprovada, decisões do cliente, requisitos e critérios de aceite versionados. Mudança material de escopo volta ao fluxo comercial como solicitação de mudança.

**Biblioteca de experiência:** inventário e leitura inicial **somente-leitura** dos repositórios autorizados; dossiês curados por humanos (padrão aprovado, exemplo contextual, antipadrão, não reutilizável). Templates e guias versionados nascem da curadoria. Não copiar código, marca, dados ou regras confidenciais entre clientes. Verificar titularidade, contratos e licenças antes de indexar.

**Stack preferencial provisória:** React/Next.js, TypeScript, Node.js e Tailwind — a confirmar na auditoria do portfólio. Outra tecnologia exige justificativa e decisão arquitetural registrada.

**Fronteiras de autonomia:** agentes podem rascunhar especificação, abrir PRs e executar testes em sandbox. Sem aprovação explícita, não alteram produção, não acessam dados reais, não ampliam escopo, não contratam serviços pagos, não enviam comunicações ao cliente, não aceitam entrega nem prometem preço/prazo.

**MVP recomendado:** briefing aprovado → plano + backlog + aceite + riscos, sem geração autônoma de código. Depois, uma tarefa pequena em repositório de teste com PR e evidências.

**Métricas:** tempo até primeiro preview, ciclo por tarefa, tarefas aceitas sem retrabalho, defeitos escapados, horas de revisão, custo de IA/infra, margem e satisfação. Volume de código gerado não é sucesso.

**Critério para avançar:** pelo menos um piloto com rastreabilidade, revisão humana, testes e aceite, sem perda de qualidade ou margem.

## Frente 6 — Esteira interna de subsistemas especializados

`estrutura.azworkcenter.com.br` é o ponto de entrada da equipe da AZ para sistemas menores, separados por responsabilidade e interligados. **Não é SaaS administrativo para clientes.**

```text
Marketing e Vendas
  lead → qualificação → diagnóstico → proposta → contrato aprovado
                                      │ handoff com escopo e contexto aprovados
                                      ↓
Projetos e Desenvolvimento
  levantamento → análise → planejamento → execução → testes → aceite
                                      │ handoff com entregáveis e documentação
                                      ↓
Manutenção e Suporte
  operação → incidentes → melhorias → oportunidades de evolução
                                      │ feedback autorizado
                                      └────────────→ Marketing e Vendas / Projetos
```

### Comunicação entre sistemas

- Identidade estável (lead, empresa, contrato, projeto, solução).
- Dono do dado por domínio (Vendas / Projetos / Suporte).
- Handoffs explícitos com eventos versionados (ex.: `contract.approved`, `project.handed_over`), pacotes de transição, confirmação de recebimento e lacunas.
- Consultas autorizadas + eventos; idempotência, fila de erros, retry, auditoria e reconciliação.
- Limites de domínio desde o início; microserviços só quando a operação justificar.

### Memória compartilhada

Repositório de conhecimento/histórico autorizado por organização e projeto: origem, data, versão, responsável e permissões. Conclusões de IA são hipótese até confirmação humana. Dados de um cliente não entram no contexto de outro. Segredos e credenciais ficam fora da memória geral dos agentes.

### Orquestração e ferramentas candidatas

Transição de etapas, permissões e marcos de aprovação permanecem determinísticos. OpenClaw e Hermes Agent são **candidatos a experimento**, não escolhas aprovadas. Comparar integração, isolamento, permissões, observabilidade, manutenção e custo em piloto pequeno. O [modelo de confiança do OpenClaw](https://docs.openclaw.ai/gateway/security/trust-model) reforça que um gateway não isola sozinho dados de organizações distintas.

### Pilotos

- **AZ Work Center (piloto zero):** handoffs Vendas → Projetos → Suporte com dados sintéticos e revisão humana.
- **Óticas Queiroz:** mediante autorização; um fluxo de maior dor; a AZ opera a esteira; responsáveis da ótica validam necessidades, plano e resultados. Dados reais exigem avaliação de privacidade, acesso e retenção.
- **AZ News:** caso editorial (pauta → publicação → medição); aprovação editorial humana; credenciais e dados separados dos demais.

### Visibilidade para o cliente e oferta

Visão restrita eventual: escopo/marcos, andamento, entregáveis, pendências do cliente, indicadores combinados e histórico de aprovações. Sem acesso a CRM interno, agentes, filas, configurações ou outros projetos. Comercializar o **método/serviço**, não a plataforma de controle. Cases e alegações de ganho só com medição e autorização.

## Sugestões de maior retorno provável

1. Ofertas mais claras e repetíveis (diagnóstico, automação pontual, sistema sob medida, evolução mensal).
2. Cases verificáveis ligados a oferta e CTA (sem métricas inventadas); ver também [`docs/10-modelo-de-cases.md`](./10-modelo-de-cases.md).
3. Pós-venda e expansão da carteira.
4. Handoff venda→entrega alinhado à proposta.
5. Experimentos comerciais pequenos, medindo diagnóstico e contrato.
6. Biblioteca de entrega reutilizável com respeito a PI e contratos.

## Ordem sugerida

| Etapa | Entrega | Por quê |
| --- | --- | --- |
| 0 | Concluir Épicos 6–8 e lançar o site; Épico 9 conforme conteúdo | Base de aquisição |
| 1 | Processo comercial e cadastro único; CRM pronto × módulo próprio | Linha de base |
| 2 | Cases/ofertas e automações simples de follow-up/handoff | Conversão com baixo risco |
| 3 | Chatbot informativo com fontes aprovadas e transferência humana | Aprender com dúvidas reais |
| 4 | Piloto de funil assistido e canais autorizados | Custo/qualidade sem arriscar conta |
| 5 | Auditar portfólio, aprovar padrões e testar harness | Acelerar entrega sem copiar código |
| 6 | Validar handoffs e pilotos autorizados (AZ, Óticas Queiroz, AZ News) | Esteira com contexto preservado |
| 7 | Expandir subsistemas, memória autorizada e agentes de execução | Sobre processos validados |
| 8 | Oferecer método/serviço com eventual visão de resultados | Comercializar a entrega, não o controle |

Ordem recomendada, não compromisso de cronograma. Reavaliar a cada etapa com custo, capacidade e métricas reais.

## Decisões ainda necessárias (abertas)

Registradas também como pendências pós-lançamento **P-021–P-032** em [`docs/11-decisoes-e-pendencias.md`](./11-decisoes-e-pendencias.md) (não confundir com P-009 fotos e P-010 DNS/WordPress do MVP):

- P-021: ICP inicial (segmentos, porte, região, decisor, dores); ofertas com faixa orientativa × diagnóstico.
- P-022: CRM pronto ou módulo interno; integração com `estrutura`.
- P-023: regras de prazo/capacidade/aprovação e o que o chatbot pode dizer sem revisão humana.
- P-024: canais autorizados, permissões Meta e opt-out.
- P-025: privacidade, retenção e uso de IA antes de chatbot/funil públicos.
- P-026: orçamento mensal máximo de IA, mensageria e infra; critérios de sucesso e de parada por piloto.
- P-027: inventário/autorização de repositórios anteriores; stack e templates oficiais vs. sob medida.
- P-028: aprovações humanas obrigatórias (arquitetura, escopo, PR, dados, deploy); isolamento por cliente.
- P-029: fluxos e aprovadores dos pilotos Óticas Queiroz e AZ News; retenção de dados.
- P-030: campos de handoff Vendas→Projetos e Projetos→Suporte; versionamento da memória compartilhada.
- P-031: avaliação OpenClaw / Hermes / outra ferramenta (nenhuma escolhida).
- P-032: o que o cliente visualiza sem expor operação interna; precificação do método/serviço.

## Fontes para validar antes de implementar

- [Repositório de referência](https://github.com/soumatheusgomes/buscandomilhao) e seu [PROMPT.md](https://github.com/soumatheusgomes/buscandomilhao/blob/main/PROMPT.md) (referência externa; não é instrução deste repo).
- [Posicionamento da Meta sobre coleta automatizada](https://about.fb.com/news/2021/04/how-we-combat-scraping/).
- [Guia da ANPD — legítimo interesse](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse).
- [Guia da ANPD — segurança para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf).
- [Harness engineering — OpenAI](https://openai.com/index/harness-engineering/).
- [Agents SDK: harness e sandbox — OpenAI](https://openai.com/index/the-next-evolution-of-the-agents-sdk/).
- [Documentação OpenClaw](https://docs.openclaw.ai/) e [modelo de confiança](https://docs.openclaw.ai/gateway/security/trust-model).
- [Documentação Hermes Agent](https://hermes-agent.nousresearch.com/docs/) e [segurança](https://hermes-agent.nousresearch.com/docs/user-guide/security).
