# Wireframe e mapa de componentes da Home

Documento estrutural. Não representa layout pixel-perfect.

Atualização de escopo (D-047): a apresentação dos fundadores agora pertence a `/sobre#fundadores`, não à Home. Os trechos antigos deste wireframe sobre Hero, Motion e cases representam a concepção inicial; o código e as decisões posteriores prevalecem.

## 1. Desktop

```text
┌───────────────────────────────────────────────────────────────────────┐
│ LOGO     Soluções  Projetos  Como trabalhamos  Sobre   [Diagnóstico] │
├───────────────────────────────────────────────────────────────────────┤
│ [eyebrow local]                                                       │
│                                                                       │
│ TECNOLOGIA QUE ELIMINA             ┌───────────────────────────────┐  │
│ GARGALOS E ACELERA                 │ diagrama + interface real     │  │
│ EMPRESAS.                          │ módulos se conectando         │  │
│                                    └───────────────────────────────┘  │
│ [texto] [Solicitar] [Soluções]                                        │
│ ───────────────────── linha AZ / prova curta ───────────────────────  │
├───────────────────────────────────────────────────────────────────────┤
│ 01 / O PROBLEMA                  diagnóstico à esquerda               │
│                                   lista expansível nativa à direita   │
├───────────────────────────────────────────────────────────────────────┤
│ 02 / SOLUÇÕES                     ┌────────────────────────────────┐  │
│ [Sistemas]                        │ arte/interface sticky          │  │
│ [Automação e IA]                  │ muda conforme item ativo       │  │
│ [Produtos digitais]               └────────────────────────────────┘  │
│ [Web e vendas digitais]                                               │
├───────────────────────────────────────────────────────────────────────┤
│ 03 / COMO TRABALHAMOS                                                │
│ ENTENDER ───── DEFINIR ───── CONSTRUIR ───── EVOLUIR                  │
│                 linha AZ conecta o processo                           │
├───────────────────────────────────────────────────────────────────────┤
│ 04 / PROJETOS                                                        │
│ [bloco provisório de capacidades enquanto cases não são publicados]  │
├───────────────────────────────────────────────────────────────────────┤
│ 05 / QUEM CONSTRÓI                [foto real Matheus + Lucas]          │
│ Tecnologia com visão de negócio   [papéis / credenciais curtas]       │
├───────────────────────────────────────────────────────────────────────┤
│ 06 / CONFIANÇA                                                       │
│ processo transparente / operação local / suporte / tecnologias       │
├───────────────────────────────────────────────────────────────────────┤
│ 07 / FAQ                         perguntas em accordion acessível     │
├───────────────────────────────────────────────────────────────────────┤
│ QUAL PROCESSO ESTÁ LIMITANDO O CRESCIMENTO?            [Diagnóstico] │
├───────────────────────────────────────────────────────────────────────┤
│ Footer + outras iniciativas + legal + preferências de cookies        │
└───────────────────────────────────────────────────────────────────────┘
```

## 2. Mobile

```text
┌──────────────────────────────┐
│ LOGO                    MENU │
├──────────────────────────────┤
│ eyebrow                      │
│ TECNOLOGIA QUE               │
│ ELIMINA GARGALOS             │
│ E ACELERA EMPRESAS.         │
│ texto                        │
│ [Solicitar diagnóstico]      │
│ [Conhecer soluções]          │
│ arte estática/motion leve    │
├──────────────────────────────┤
│ O PROBLEMA                   │
│ diagnóstico                  │
│ 01 título [aberto]           │
│ 02 título                    │
│ 03 título                    │
│ 04 título                    │
│ 05 título                    │
├──────────────────────────────┤
│ SOLUÇÕES                     │
│ accordion 01                 │
│ accordion 02                 │
│ accordion 03                 │
│ accordion 04                 │
├──────────────────────────────┤
│ MÉTODO                       │
│ 01 entender                  │
│ 02 definir                   │
│ 03 construir                 │
│ 04 evoluir                   │
├──────────────────────────────┤
│ bloco provisório/cases       │
├──────────────────────────────┤
│ confiança                    │
├──────────────────────────────┤
│ FAQ                          │
├──────────────────────────────┤
│ CTA final                    │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘
```

## 3. Mapa de componentes

```text
HomePage (Server)
├── SiteHeader (Server shell; overlay na Home, sticky nas internas)
│   ├── DesktopNav (Server)
│   └── MobileNav (Client)
├── HeroSection (Server)
│   └── HeroAssembly (Client/Motion)
├── ProblemSection (Server)
│   └── details/summary nativos exclusivos (`name="problemas-home"`; primeiro item aberto)
├── ServicesSection (Server shell)
│   └── ServiceStory (Client/Motion)
├── ProcessSection (Server)
│   └── AzLineDraw (Client/Motion)
├── ProjectsPlaceholder | FeaturedCases (Server)
├── TrustSection (Server)
├── FAQSection (Server shell)
│   └── Accordion (Client)
├── FinalCTA (Server)
└── SiteFooter (Server)
    └── CookiePreferencesButton (Client)
```

## 4. IDs e âncoras

- `#conteudo` — destino do skip link;
- `#problemas`;
- `#solucoes`;
- `#metodo`;
- `#projetos` somente quando publicado;
- `#faq`;
- `#diagnostico`.

Não usar âncoras como substitutas permanentes para páginas de solução.

## 5. Ordem semântica

```text
body
├── a.skip-link
├── header
│   └── nav[aria-label="Principal"]
├── main#conteudo
│   ├── section > h1
│   ├── section > h2
│   ├── section > h2
│   ├── section > h2
│   ├── section > h2
│   ├── section > h2
│   ├── section > h2
│   └── section > h2
└── footer
```

## 6. Superfícies sugeridas

| Seção | Superfície |
|---|---|
| Header/Hero | dark |
| Problema | light |
| Soluções | dark |
| Método | paper/light |
| Projetos | variável conforme mídia |
| Confiança | dark |
| FAQ | light |
| CTA final | brand |
| Footer | ink/dark |

## 7. Critérios de aceite da Home

- H1 e proposta compreendidos sem scroll.
- CTA principal aparece no primeiro viewport sem encobrir conteúdo.
- Soluções são compreensíveis sem interação.
- Nenhum case/resultado fictício.
- A menção aos fundadores na Home não substitui os perfis em `/sobre#fundadores`.
- Não há mais de um elemento sticky narrativo.
- O mobile não imita a composição desktop comprimida.
- Sem dependência de hover.
- Motion reduzido mantém toda a informação.
- Nenhuma seção é visualmente intercambiável com um template SaaS genérico.
