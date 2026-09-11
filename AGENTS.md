# Instruções para agentes de implementação

Este arquivo é normativo. Todo agente que planejar, gerar, revisar ou modificar código deve lê-lo integralmente antes de agir.

## 1. Hierarquia das fontes de verdade

Em caso de conflito, seguir esta ordem:

1. solicitação explícita e mais recente do responsável humano;
2. este `AGENTS.md`;
3. `docs/11-decisoes-e-pendencias.md`;
4. estratégia, arquitetura de informação e arquitetura técnica;
5. manual de marca e design system;
6. especificações de páginas/componentes;
7. preferências inferidas do código existente.

Não preencher lacunas importantes inventando decisões. Registrar a dúvida em `docs/11-decisoes-e-pendencias.md`.

## 1.1 Política de skills

- Ler `docs/13-playbook-de-skills.md` antes de atribuir skills a um agente.
- Cada agente deve receber apenas as skills necessárias para sua etapa.
- Não ativar simultaneamente duas skills que disputem direção visual ou duas que implementem motion.
- A documentação deste repositório prevalece sobre presets, exemplos e preferências de qualquer skill.
- Skills de auditoria não devem redesenhar ou reescrever código sem uma tarefa de correção separada.
- Toda recomendação de uma skill externa deve ser revisada antes de instalação e registrada no relatório da tarefa.

## 2. Objetivo do produto

Construir um site institucional e comercial que gere contatos qualificados para projetos de:

- sistemas sob medida;
- automações e IA aplicada;
- produtos digitais e MVPs/SaaS;
- sites, e-commerce e infraestrutura de Growth.

O público inicial são empresas de Vitória da Conquista e região com processos manuais, sistemas desconectados ou necessidade de crescimento digital.

## 3. Restrições de conteúdo

- Não inventar clientes, números, prêmios, depoimentos, métricas, certificações ou resultados.
- Não publicar os cases enquanto seu conteúdo não estiver aprovado.
- Não usar “líder”, “melhor”, “referência” ou “especialista número 1” sem evidência.
- Não prometer prazo, preço ou ganho financeiro não aprovado.
- Não apresentar o AZ News como cliente da AZ Work Center; tratá-lo como iniciativa relacionada.
- Não transformar comunicação visual e pesquisas em ofertas principais.
- Todo texto público deve estar em português brasileiro, salvo nomes técnicos ou marcas.
- Evitar mistura gratuita de português e inglês. “Growth” é permitido apenas no descritor e em contexto de mercado.

## 4. Restrições visuais

- Não usar gradiente roxo/azul de “IA”.
- Não usar cérebro digital, robô humanoide, foguete, holograma, globo de partículas ou mãos tocando interfaces invisíveis.
- Não usar ícones de brilho/sparkles como símbolo genérico de IA.
- Não usar um bento grid em todas as seções.
- Não colocar todo conteúdo dentro de cards arredondados.
- Não usar glassmorphism como linguagem dominante.
- Não usar animação apenas para provar capacidade técnica.
- Não usar imagens de banco quando uma tela real, fotografia da equipe ou diagrama puder comunicar melhor.
- Não copiar layout, texto, ilustração ou animação de uma referência.

## 5. Stack e arquitetura

- Next.js com App Router e TypeScript em modo estrito.
- Server Components por padrão.
- Client Components somente quando houver estado, evento de navegador ou animação Motion.
- Tailwind CSS usando tokens semânticos; evitar valores arbitrários repetidos.
- shadcn/ui como base acessível, nunca como estética pronta.
- Motion para animações de interface e scroll moderado.
- Usar `next/image`, `next/font`, Metadata API e arquivos especiais de sitemap/robots/OG.
- Formulários por Server Action ou endpoint dedicado conforme a integração escolhida.
- Nenhum segredo em componentes cliente ou variável `NEXT_PUBLIC_*`.

## 6. Convenções de código

- Componentes em PascalCase; funções/variáveis em camelCase; rotas em kebab-case.
- Preferir composição a componentes com muitas flags booleanas.
- Co-localizar componente específico da rota; promover para `components/` apenas quando houver reutilização real.
- Separar conteúdo de apresentação. Textos, serviços e projetos devem vir de objetos tipados ou CMS.
- Criar tipos explícitos para `Service`, `CaseStudy`, `Testimonial`, `TeamMember` e `FAQItem`.
- Não usar `any` sem justificativa registrada.
- Não criar abstração antes de dois usos comprovados.
- Não introduzir biblioteca para algo simples que CSS ou APIs nativas resolvem.
- Desinstalar dependências experimentais abandonadas antes do merge.

## 7. Regras de acessibilidade

- Meta mínima: WCAG 2.2 AA.
- HTML semântico e ordem de títulos lógica, com um H1 por página.
- Navegação completa por teclado.
- Foco visível em todos os controles.
- Alvos de toque mínimos de 44 × 44 px.
- Contraste mínimo de 4.5:1 para texto comum e 3:1 para texto grande/componentes.
- Labels persistentes nos formulários; placeholder nunca substitui label.
- Mensagens de erro próximas do campo e resumo quando houver múltiplos erros.
- `MotionConfig reducedMotion="user"` no provider global.
- Em movimento reduzido, remover parallax, deslocamentos grandes e autoplay; manter o estado final legível.
- Carrosséis não devem avançar automaticamente. Se avançarem, precisam de pausa, teclado e anúncio acessível.

## 8. Regras de performance

- Não transformar a Home inteira em Client Component.
- Animar apenas `transform` e `opacity` sempre que possível.
- Evitar filtros/blur animados, sombras grandes e listeners de scroll manuais.
- Lazy load para mídia abaixo da dobra e componentes pesados.
- Reservar dimensões de imagens e vídeos para impedir CLS.
- Hero sem vídeo obrigatório. Se houver vídeo, usar poster, controles, compressão e fallback estático.
- Bibliotecas 3D/WebGL não entram na primeira versão sem aprovação.
- Terceiros devem carregar após consentimento quando aplicável e sem bloquear renderização.

## 9. Regras de movimento

- Cada animação deve ter uma função: orientar, demonstrar relação, dar feedback ou reforçar narrativa.
- No máximo um momento coreografado dominante por viewport.
- Não animar parágrafos caractere por caractere.
- Não bloquear ou substituir o scroll nativo.
- Sticky storytelling é permitido em uma única seção da Home, com fallback linear no mobile.
- Ver catálogo, durações e easings em `docs/05-motion-system.md`.

## 10. Estados obrigatórios

Todo componente interativo deve prever, conforme aplicável:

- default;
- hover;
- focus-visible;
- active/pressed;
- disabled;
- loading;
- success;
- error;
- empty;
- reduced motion.

## 11. Testes obrigatórios antes de concluir uma tarefa

- lint;
- typecheck;
- testes unitários dos utilitários e regras de negócio;
- testes de componentes críticos;
- build de produção;
- navegação principal em 375, 768, 1024 e 1440 px;
- navegação somente por teclado;
- verificação com redução de movimento;
- ausência de erros no console;
- inspeção de links, formulários, metadata e imagens.

## 12. Definition of Done

Uma tarefa só está concluída quando:

- atende aos critérios de aceite do épico;
- não possui conteúdo fictício apresentado como real;
- usa tokens do design system;
- funciona em teclado e mobile;
- possui estados de erro/loading necessários;
- passa lint, typecheck, testes e build;
- atualiza a documentação afetada;
- inclui uma descrição curta de como foi verificada.
