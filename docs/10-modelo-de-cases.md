# Modelo para cases — segunda fase

Nenhum campo deve ser inventado. Conteúdo não aprovado permanece fora de produção.

## 1. Projetos conhecidos

- Óticas Queiroz;
- M.Agendy;
- Dentyvo;
- sistemas para Rebouças & Bulhões.

Status atual: nomes informados pelo fundador; conteúdo, autorização, métricas e assets pendentes.

## 2. Roteiro de entrevista

### Contexto

- Quem é o cliente/produto?
- Qual segmento e porte?
- Quem usa a solução?
- Qual era o momento do negócio?

### Problema

- O que acontecia antes?
- Quais ferramentas/processos eram utilizados?
- Onde havia erro, atraso, custo ou falta de visibilidade?
- Por que resolver naquele momento?

### Escopo

- O que a AZ diagnosticou?
- Quais hipóteses foram priorizadas?
- O que ficou fora?
- Como foi a colaboração?

### Solução

- Principais módulos;
- integrações;
- perfis de usuário;
- decisões de produto;
- requisitos de segurança/performance;
- tecnologias, somente quando ajudarem a compreender.

### Resultado

- tempo economizado;
- redução de erro/retrabalho;
- adoção e usuários;
- processos substituídos;
- visibilidade/controle;
- impacto comercial;
- depoimento.

### Evidência

- fonte da métrica;
- período;
- responsável que aprovou;
- autorização de logo/nome/telas;
- dados que precisam ser ocultados.

## 3. Estrutura editorial do case

1. Hero: cliente, desafio e imagem.
2. Resumo: contexto, serviços e período.
3. O problema.
4. Como entendemos a operação.
5. Decisões e solução.
6. Demonstração dos principais fluxos.
7. Resultados aprovados.
8. Depoimento.
9. Stack, de forma secundária.
10. CTA relacionado.

## 4. Modelo de dados

```ts
type CaseStudy = {
  slug: string
  client: string
  legalApprovalBy?: string
  segment: string
  projectType: string
  period?: string
  summary: string
  challenge: string
  discovery?: string
  solution: string
  capabilities: string[]
  technologies: string[]
  outcomes: Array<{
    label: string
    value: string
    source: string
    period?: string
  }>
  testimonial?: {
    quote: string
    name: string
    role: string
    approved: boolean
  }
  assets: Array<{
    src: string
    alt: string
    caption?: string
    approved: boolean
  }>
  approved: boolean
  published: boolean
}
```

## 5. Critérios de publicação

- texto revisado pela AZ;
- cliente/nome autorizados;
- logo/telas autorizados;
- PII removida;
- números com fonte e período;
- depoimento aprovado por escrito;
- alt e legendas completos;
- metadata e OG;
- `approved: true` e `published: true`.

## 6. Fallback quando não houver métrica

Usar evidência qualitativa específica:

- processo antes/depois;
- quantidade de etapas centralizadas;
- fluxos substituídos;
- funcionalidades em produção;
- depoimento verificável;
- capturas do produto;
- tempo de operação, se aprovado.

Não transformar ausência de métrica em percentual estimado.

