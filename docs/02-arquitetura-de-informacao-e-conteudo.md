# Arquitetura de informação e conteúdo

## 1. Sitemap

```text
/
├── /solucoes
│   ├── /solucoes/sistemas-sob-medida
│   ├── /solucoes/automacao-inteligencia-artificial
│   ├── /solucoes/produtos-digitais-mvp
│   └── /solucoes/web-growth
├── /projetos
│   └── /projetos/[slug]
├── /como-trabalhamos
├── /sobre
├── /contato
├── /privacidade
├── /cookies
└── /404
```

`/conteudos` fica reservado para a segunda fase. Não lançar uma área vazia.

## 2. Navegação global

### Desktop

- Logo → Home
- Soluções
- Projetos
- Como trabalhamos
- Sobre
- CTA: Solicitar diagnóstico

### Mobile

- Logo compacto
- botão de menu com nome acessível
- painel em tela cheia ou sheet
- mesmos itens e mesma ordem do desktop
- CTA persistente dentro do menu, não sobrepondo o conteúdo

O WhatsApp flutuante é opcional. Se usado, precisa respeitar safe areas, não cobrir foco/conteúdo e ter label explícito. Preferência: CTA contextual no header e no fim das seções.

## 3. Home

### 3.1 Header

Objetivo: permitir orientação sem competir com o hero.

Comportamento:

- transparente/tonal no topo;
- torna-se superfície sólida ao rolar;
- pode recolher levemente ao descer e reaparecer ao subir;
- sem menus de três níveis;
- foco visível e área clicável mínima de 44 px.

### 3.2 Hero

Eyebrow:

> Tecnologia aplicada a negócios • Vitória da Conquista, BA

H1:

> Tecnologia que elimina gargalos e acelera empresas.

Texto:

> Desenvolvemos sistemas sob medida, automações com inteligência artificial e estruturas digitais para empresas que querem operar melhor e crescer com mais controle.

CTAs:

- Solicitar diagnóstico
- Conhecer soluções

Arte recomendada:

- composição abstrata baseada em fluxo, módulos e conexões;
- trechos reais e anonimizados de interfaces;
- textura discreta inspirada em impressão/engenharia;
- nunca foguete, robô ou globo futurista.

Prova curta sob o hero:

> Estratégia, desenvolvimento e evolução conduzidos diretamente pelos fundadores.

### 3.3 Reconhecimento do problema

Título:

> Quando a empresa cresce, os improvisos começam a custar caro.

Problemas:

- informações espalhadas;
- tarefas repetitivas;
- sistemas que não conversam;
- decisões sem dados confiáveis;
- presença digital que não converte.

Formato: uma lista editorial progressiva, não cinco cards idênticos.

### 3.4 Soluções

Título:

> Construímos a estrutura digital que o próximo estágio do seu negócio exige.

Itens:

1. Sistemas sob medida
2. Automação e IA aplicada
3. Produtos digitais e MVPs
4. Web e Growth

Cada item deve conter resultado, descrição curta, 3 capacidades e link. Pode usar accordion no mobile e painel visual sticky no desktop.

### 3.5 Método

Título:

> Da complexidade à solução, em quatro movimentos.

Etapas:

1. **Entender** — contexto, processo e objetivo.
2. **Definir** — prioridade, escopo e indicadores.
3. **Construir** — ciclos curtos, validação e qualidade.
4. **Evoluir** — dados, suporte e melhoria contínua.

O método deve ser visualizado como fluxo contínuo, não como promessa de processo linear inflexível.

### 3.6 Projetos

Até aprovação dos cases:

- manter a estrutura no código;
- usar flag `published: false`;
- não exibir cards vazios ou textos fictícios;
- substituir temporariamente por uma seção de capacidades/demonstrações autorizadas.

Quando publicados, ordem inicial sugerida:

1. Óticas Queiroz;
2. M.Agendy;
3. Dentyvo;
4. Rebouças & Bulhões.

### 3.7 Sobre/fundadores

Título:

> Tecnologia com visão de negócio e gente responsável por cada entrega.

Apresentar Matheus e Lucas com fotos reais, funções objetivas e trajetórias resumidas. A história de Gildásio e da formação familiar entra na página Sobre, sem sugerir atuação operacional diária onde ela não exista.

### 3.8 Prova e confiança

Aceitável:

- logos autorizados;
- tecnologias usadas;
- depoimentos aprovados;
- CNPJ e endereço;
- processo transparente;
- projetos em produção;
- atendimento direto.

Não aceitável:

- contadores animados sem fonte;
- “+300 clientes” sem lista/evidência;
- percentuais genéricos;
- logos chamados de parceiros quando são clientes ou iniciativas internas.

### 3.9 FAQ

Perguntas iniciais:

- Vocês atendem apenas Vitória da Conquista?
- Quanto custa desenvolver um sistema?
- Quanto tempo leva um projeto?
- Vocês dão suporte depois da entrega?
- Trabalham com projetos já iniciados?
- Como identifico o que pode ser automatizado?
- Vocês desenvolvem MVPs para novas ideias?

As respostas devem explicar variáveis e próximo passo, não evitar a pergunta com frases vagas.

### 3.10 CTA final

Título:

> Qual processo está limitando o crescimento da sua empresa hoje?

Texto:

> Conte o contexto. Em uma conversa inicial, ajudamos a organizar o problema e avaliar o próximo passo mais adequado.

CTA: **Solicitar diagnóstico**

### 3.11 Footer

Colunas:

- Soluções;
- Empresa;
- Contato;
- Legal.

Bloco secundário “Outras iniciativas”:

- AZ News;
- comunicação visual e pesquisas sob consulta.

Incluir razão social/nome empresarial correto, CNPJ, cidade, e-mail, telefone, links legais e ano dinâmico.

## 4. Páginas de solução

Estrutura padrão:

1. Hero específico orientado ao problema;
2. sintomas que indicam necessidade;
3. resultados esperados;
4. capacidades/entregas;
5. exemplos de aplicação;
6. como trabalhamos;
7. projeto relacionado, quando aprovado;
8. FAQ específica;
9. CTA de diagnóstico.

Evitar páginas que sejam apenas banners. Cada página deve responder o suficiente para um decisor encaminhá-la internamente.

## 5. Página Como trabalhamos

Conteúdo:

- princípios de parceria;
- diagnóstico e descoberta;
- modelos de contratação;
- comunicação e rituais;
- qualidade, segurança e documentação;
- entrega e propriedade intelectual;
- suporte/evolução;
- perguntas frequentes comerciais.

## 6. Página Sobre

Ordem:

1. Origem familiar e abril de 2020;
2. evolução e aprendizados;
3. decisão pelo foco em tecnologia;
4. fundadores e papéis atuais;
5. relação com Vitória da Conquista e região;
6. princípios de trabalho;
7. AZ News e demais frentes como parte da história;
8. CTA.

Não transformar em currículo longo. As formações de Matheus entram como credenciais selecionadas.

## 7. Contato e diagnóstico

Campos:

- Nome completo — obrigatório;
- Empresa — obrigatório;
- WhatsApp — obrigatório;
- E-mail — obrigatório;
- Cidade/UF — opcional;
- Tipo de desafio — obrigatório;
- Descrição do contexto — obrigatório;
- Consentimento de privacidade — obrigatório.

Opções de desafio:

- Organizar ou integrar processos;
- Desenvolver um sistema;
- Automatizar tarefas com IA;
- Criar ou validar um produto digital;
- Melhorar site, e-commerce ou aquisição;
- Ainda não sei definir.

Após envio:

- confirmar recebimento;
- informar prazo real de retorno, quando definido;
- não redirecionar automaticamente para WhatsApp;
- registrar evento de conversão apenas após sucesso confirmado.

## 8. Tom e microcopy

### Usar

- “Conte seu contexto”;
- “Vamos entender o problema”;
- “Solução adequada à operação”;
- “Resultados verificáveis”;
- “Atendimento direto”.

### Evitar

- “Revolucione seu negócio”;
- “Soluções inovadoras de ponta a ponta”;
- “Leve sua empresa ao próximo nível”;
- “Transformação digital 360º”;
- “Potencialize resultados exponenciais”;
- “Clique aqui”.

## 9. Redirecionamentos planejados

Mapa inicial a confirmar por crawl antes da migração:

| URL antiga | Destino sugerido |
|---|---|
| `/az-digital-growth/` | `/solucoes` |
| `/desenvolvimento-sites` | `/solucoes/web-growth` |
| `/web-design` | `/solucoes/web-growth` |
| `/az-solucoes-visuais/` | página informativa secundária ou Home |
| `/az-pesquisas/` | página informativa secundária ou Home |
| `/identidade-visual` | página informativa secundária ou Home |
| `/marketing-digital` | `/solucoes/web-growth` |

Todos os redirects devem ser 301/308 e testados. Não redirecionar todas as URLs indiscriminadamente para a Home.

