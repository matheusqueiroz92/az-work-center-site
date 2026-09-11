# Arquitetura técnica

## 1. Princípios

- Conteúdo e SEO renderizados no servidor.
- JavaScript cliente apenas onde gera valor.
- Componentes pequenos, compostos e tipados.
- Design tokens como única fonte visual.
- Migração reversível até o lançamento.
- Observabilidade e qualidade desde o primeiro deploy.

## 2. Stack-base

- Next.js App Router;
- React;
- TypeScript strict;
- Tailwind CSS;
- shadcn/ui/Radix para primitivas acessíveis;
- Motion para movimento;
- Zod para validação de dados e formulários;
- ferramenta de formulário apenas se reduzir complexidade real;
- Vitest/Jest para unidades conforme scaffold;
- Testing Library para componentes;
- Playwright para fluxos críticos;
- Vercel como destino inicial sugerido.

Versões devem ser fixadas no scaffold e verificadas na documentação oficial no momento da criação. Não usar `latest` em instruções reprodutíveis.

## 3. Estrutura sugerida

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── solucoes/
│   │   │   ├── page.tsx
│   │   │   ├── sistemas-sob-medida/page.tsx
│   │   │   ├── automacao-inteligencia-artificial/page.tsx
│   │   │   ├── produtos-digitais-mvp/page.tsx
│   │   │   └── web-growth/page.tsx
│   │   ├── projetos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── como-trabalhamos/page.tsx
│   │   ├── sobre/page.tsx
│   │   └── contato/page.tsx
│   ├── api/
│   │   └── webhooks/              # somente quando necessário
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── actions/
│   └── contact.ts
├── components/
│   ├── analytics/
│   ├── forms/
│   ├── layout/
│   ├── motion/
│   ├── sections/
│   └── ui/
├── content/
│   ├── company.ts
│   ├── faqs.ts
│   ├── navigation.ts
│   ├── projects.ts
│   └── services.ts
├── lib/
│   ├── analytics.ts
│   ├── env.ts
│   ├── metadata.ts
│   ├── schemas.ts
│   └── utils.ts
├── styles/
│   └── globals.css
└── types/
    └── content.ts
```

Pastas privadas por rota (`_components`) são preferíveis quando o componente não é global.

## 4. Server e Client Components

### Server por padrão

- páginas;
- layout;
- conteúdo de serviços;
- cards sem interação complexa;
- metadata;
- sitemap/robots;
- consulta a CMS/dados;
- estrutura de formulário.

### Client isolado

- menu mobile;
- componentes Motion;
- accordion quando necessário;
- estados de formulário;
- consentimento de cookies;
- analytics cliente;
- interação de filtros/cases.

Não adicionar `'use client'` na Home para permitir animações em algumas seções. Criar ilhas específicas.

Props Server → Client devem ser serializáveis. Datas vão como string ISO; nenhuma instância de classe/Map/Set.

## 5. Conteúdo tipado

```ts
export type Service = {
  slug: string
  title: string
  shortTitle: string
  summary: string
  outcome: string
  capabilities: string[]
  useCases: string[]
  seo: {
    title: string
    description: string
  }
}

export type CaseStudy = {
  slug: string
  client: string
  segment: string
  summary?: string
  challenge?: string
  solution?: string
  outcomes?: Array<{ label: string; value: string; source?: string }>
  services: string[]
  technologies?: string[]
  heroImage?: string
  gallery?: string[]
  testimonial?: string
  approved: boolean
  published: boolean
}
```

Filtro obrigatório para produção: `approved && published`.

## 6. CMS

### Fase inicial

Conteúdo em objetos TypeScript/MDX versionados, pois Matheus é desenvolvedor e o volume é baixo.

### Gatilhos para adotar CMS

- publicação frequente por pessoa não técnica;
- mais de 15–20 conteúdos/cases;
- revisão/aprovação editorial;
- múltiplos idiomas;
- necessidade de preview editorial.

Escolher CMS apenas após esses requisitos. Não acoplar a primeira versão a uma plataforma sem necessidade.

## 7. Formulário e integração

Fluxo recomendado:

```text
Client form
→ validação progressiva
→ Server Action
→ schema Zod
→ proteção anti-spam/rate limit
→ envio de e-mail/CRM
→ persistência mínima opcional
→ retorno tipado
→ evento de conversão após sucesso
```

Requisitos:

- honeypot;
- limite de requisições;
- validação no servidor;
- sanitização/escape;
- logs sem conteúdo pessoal completo;
- nunca expor chave de e-mail/CRM;
- política de retenção definida;
- mensagens de erro genéricas para falha interna e específicas para validação.

## 8. Analytics e privacidade

### Eventos

Usar nomes definidos em `01-estrategia-e-posicionamento.md`.

### Consentimento

- essenciais podem carregar sem consentimento;
- analytics/marketing apenas conforme base e configuração jurídica escolhida;
- banner sem opção enganosa;
- manter registro local da preferência;
- oferecer reabertura das preferências no footer.

### Dados

- evitar dados pessoais em URL/eventos;
- não enviar texto livre do formulário para analytics;
- anonimizar IP quando a ferramenta permitir;
- documentar terceiros na política.

## 9. SEO

- Metadata API no layout e páginas.
- Title template: `%s | AZ Work Center`.
- Canonical por rota.
- `sitemap.ts`, `robots.ts`, favicon e OG.
- OG por case quando publicado.
- JSON-LD de `Organization`/`ProfessionalService` conforme validação jurídica, `Service`, `BreadcrumbList` e `Article` quando aplicável.
- Nome, endereço e telefone consistentes com Google Business Profile e demais diretórios.
- Conteúdo local natural; não repetir “Vitória da Conquista” artificialmente.
- Preservar URLs úteis e implementar redirects.
- Páginas vazias, rascunhos e preview devem ser `noindex`.

## 10. Imagens e fontes

- `next/image` para imagens de conteúdo.
- Dimensões e `sizes` obrigatórios.
- Formatos AVIF/WebP quando adequados.
- Hero crítico com prioridade apenas quando for LCP.
- Lazy load abaixo da dobra.
- `next/font` para Manrope, Newsreader e IBM Plex Mono.
- Revisar subset e peso para reduzir payload.
- Screenshots devem ocultar dados pessoais e segredos.

## 11. Segurança

- Headers de segurança apropriados após teste: CSP, frame-ancestors, Referrer-Policy, Permissions-Policy e nosniff.
- Dependências com auditoria e atualização controlada.
- `env.ts` validando variáveis no boot/build.
- Nenhuma credencial no Git.
- Server Actions tratadas como endpoints públicos: validação e autorização quando aplicável.
- Não injetar HTML vindo de CMS sem sanitização.
- Webhooks com assinatura.
- Rate limiting no formulário.

## 12. Deploy e ambientes

- `local`;
- `preview` por PR/branch;
- `production`.

Variáveis separadas por ambiente. Preview nunca deve enviar leads reais sem indicação clara; usar destinatário de teste.

## 13. Migração do WordPress

1. Fazer backup de arquivos, banco e DNS.
2. Levantar todas as URLs indexáveis via sitemap/crawl.
3. Registrar title, description, canonical e backlinks conhecidos.
4. Implementar e testar redirects.
5. Publicar preview do Next.js.
6. Validar formulários e integrações com dados de teste.
7. Reduzir TTL de DNS antes da janela, se aplicável.
8. Fazer switch do domínio.
9. Verificar SSL, redirects, robots, sitemap e Search Console.
10. Manter backup WordPress por período acordado.
11. Monitorar 404 e conversões por pelo menos 30 dias.

Rollback: reverter DNS/alias para o host WordPress, preservando a última versão e registros.

## 14. Observabilidade

- erros de runtime;
- falhas de formulário;
- Web Vitals reais;
- uptime;
- páginas 404;
- origem/conversão;
- logs com redaction de PII.

## 15. Dependências a evitar no MVP

- WebGL/Three.js;
- smooth-scroll global;
- duas bibliotecas de motion;
- biblioteca de carrossel para um caso simples;
- CMS sem requisito editorial;
- state manager global;
- pacote de ícones múltiplo;
- componentes shadcn não utilizados.

