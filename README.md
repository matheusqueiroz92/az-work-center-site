# AZ Work Center — Blueprint do novo site

Versão: 1.0  
Data: 11 de setembro de 2026  
Status: especificação para implementação  
Responsáveis de negócio: Matheus Queiroz e Lucas Queiroz

## Resultado esperado

Reconstruir `azworkcenter.com.br` como uma presença digital autoral, rápida e orientada a conversão para a nova fase da AZ Work Center: sistemas sob medida, produtos digitais/SaaS, automações com inteligência artificial e infraestrutura web para crescimento.

O site deve transmitir competência técnica, proximidade regional e maturidade empresarial sem parecer um template de agência, um tema WordPress ou uma interface genérica gerada por IA.

## Decisões consolidadas

- Manter **AZ Work Center** como marca principal.
- Usar **Tecnologia & Growth** como descritor, não como nova empresa.
- Priorizar Vitória da Conquista e região no lançamento, preparando linguagem, SEO e arquitetura para expansão nacional.
- Exibir comunicação visual e pesquisas apenas como atuações ocasionais, fora da navegação principal.
- Tratar AZ News como iniciativa independente relacionada à história da empresa, sem misturar sua operação editorial com a oferta de tecnologia.
- Construir o novo site com React, Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui e Motion.
- Preservar o WordPress em produção até o novo site ser aprovado e migrado.
- Não publicar métricas, depoimentos ou resultados não comprovados.

## Como usar este pacote no Cursor

1. Adicionar todo este diretório ao repositório do novo site.
2. Fazer os agentes lerem primeiro `AGENTS.md`.
3. Usar `docs/01-estrategia-e-posicionamento.md` como fonte de verdade de negócio.
4. Usar `docs/02-arquitetura-de-informacao-e-conteudo.md` para rotas e composição das páginas.
5. Implementar tokens e componentes conforme `docs/04-design-system.md` e os arquivos de `design-system/`.
6. Implementar movimento conforme `docs/05-motion-system.md`; qualquer animação fora desse catálogo exige revisão.
7. Validar cada entrega com `docs/07-qualidade-acessibilidade-performance.md`.
8. Seguir a sequência de épicos em `docs/08-roadmap-de-implementacao.md`.

## Índice

- [Instruções para agentes](AGENTS.md)
- [Estratégia e posicionamento](docs/01-estrategia-e-posicionamento.md)
- [Arquitetura de informação e conteúdo](docs/02-arquitetura-de-informacao-e-conteudo.md)
- [Manual de marca](docs/03-manual-da-marca.md)
- [Design system](docs/04-design-system.md)
- [Motion system](docs/05-motion-system.md)
- [Arquitetura técnica](docs/06-arquitetura-tecnica.md)
- [Qualidade, acessibilidade e performance](docs/07-qualidade-acessibilidade-performance.md)
- [Roadmap de implementação](docs/08-roadmap-de-implementacao.md)
- [Pesquisa de referências](docs/09-referencias-e-inspiracoes.md)
- [Modelo futuro para cases](docs/10-modelo-de-cases.md)
- [Decisões e pendências](docs/11-decisoes-e-pendencias.md)
- [Wireframe e mapa de componentes da Home](docs/12-wireframe-e-componentes-home.md)
- [Playbook de skills e agentes](docs/13-playbook-de-skills.md)
- [Tokens em JSON](design-system/tokens.json)
- [Tokens em CSS](design-system/tokens.css)
- [Prompts de agentes](agent-prompts/README.md)

## Escopo da primeira versão

### Incluído

- Home completa;
- páginas de soluções;
- página institucional;
- página “Como trabalhamos”;
- página de contato e diagnóstico;
- estrutura de projetos/cases preparada;
- políticas de privacidade e cookies;
- SEO técnico e local;
- analytics e eventos de conversão;
- responsividade, acessibilidade e motion reduzido;
- migração do domínio e redirecionamentos.

### Adiado

- conteúdo definitivo dos quatro cases;
- blog/CMS completo;
- área de clientes;
- simulador de orçamento;
- chatbot/agente de IA público;
- versões em inglês ou espanhol;
- páginas específicas para cada segmento de mercado.

## Princípio central

> Demonstrar tecnologia por meio de clareza, produto real e execução — não por clichês visuais futuristas.
