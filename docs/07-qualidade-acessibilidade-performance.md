# Qualidade, acessibilidade e performance

## 1. Metas

### Experiência real

- LCP ≤ 2.5 s no percentil 75;
- INP ≤ 200 ms no percentil 75;
- CLS ≤ 0.10 no percentil 75;
- ausência de bloqueio de scroll e jank perceptível;
- formulário operável em rede lenta e com JavaScript limitado quando possível.

### Lighthouse em ambiente de produção controlado

- Performance: ≥ 90 mobile;
- Accessibility: ≥ 95, meta 100;
- Best Practices: ≥ 95;
- SEO: ≥ 95.

Lighthouse é diagnóstico, não objetivo isolado. Dados reais de Web Vitals têm prioridade.

## 2. WCAG 2.2 AA

### Estrutura

- `lang="pt-BR"`;
- skip link visível ao foco;
- regiões `header`, `nav`, `main`, `footer`;
- um H1 por página;
- headings sem saltos semânticos injustificados;
- landmarks com nomes quando houver repetição;
- breadcrumb em páginas internas.

### Teclado

- todas as ações operáveis por teclado;
- ordem de tab coerente com a ordem visual;
- nenhuma armadilha de foco;
- menu/dialog gerencia entrada e retorno de foco;
- foco não fica oculto sob header/footer sticky;
- `scroll-padding-top` configurado;
- não usar `tabIndex` positivo.

### Foco

- indicador mínimo visual equivalente a 2 px;
- contraste do estado de foco ≥ 3:1 em relação ao adjacente;
- não remover outline sem substituto;
- foco visível em light, dark e brand surfaces.

### Cor

- texto normal ≥ 4.5:1;
- texto grande ≥ 3:1;
- componentes/estados ≥ 3:1;
- erro/sucesso nunca comunicados apenas por cor;
- testar vermelho sobre superfícies reais.

### Movimento

- respeitar `prefers-reduced-motion`;
- nenhuma mídia decorativa com autoplay no modo reduzido;
- sem parallax em texto;
- animações essenciais possuem alternativa sem deslocamento grande;
- conteúdo não desaparece para sempre por falha de observer/JS.

### Formulários

- labels explícitas;
- campos com `autocomplete`;
- instrução antes do preenchimento;
- erros específicos e conectados por `aria-describedby`;
- foco no resumo de erro quando houver falha múltipla;
- success persistente e anunciado;
- consentimento não pré-selecionado;
- mensagem não depende apenas de toast.

### Mídia

- alt contextual;
- alt vazio para decoração;
- legendas/transcrição para vídeo falado;
- controles visíveis;
- nenhuma informação apenas dentro de imagem.

## 3. Matriz responsiva

Testar pelo menos:

| Viewport | Objetivo |
|---:|---|
| 320 × 568 | limite estreito; nada pode quebrar |
| 375 × 812 | mobile primário |
| 390 × 844 | mobile moderno |
| 768 × 1024 | tablet retrato |
| 1024 × 768 | tablet/paisagem |
| 1280 × 800 | laptop comum |
| 1440 × 900 | desktop primário |
| 1728 × 1117 | wide |

Critérios:

- sem scroll horizontal;
- H1 não cria órfã visual ruim;
- menu não quebra linha;
- CTAs não saem da tela;
- sticky sections viram fluxo comum em mobile;
- touch targets ≥ 44 px;
- imagens mantêm proporção e foco;
- conteúdo não depende de hover.

## 4. Navegadores

- Chrome atual e anterior;
- Edge atual;
- Firefox atual;
- Safari atual em macOS/iOS quando houver acesso;
- Chrome Android.

Progressive enhancement para View Transitions e efeitos novos. A ausência de API não pode impedir navegação.

## 5. Orçamento de recursos

Metas iniciais para a Home comprimida:

- JavaScript inicial próprio: ideal ≤ 150 KB gzip, teto 220 KB;
- CSS: ideal ≤ 50 KB gzip;
- hero visual: ≤ 250 KB em mobile quando imagem;
- nenhuma fonte individual acima de 100 KB sem justificativa;
- no máximo duas famílias críticas no carregamento inicial;
- terceiros: mínimo possível e atrasados;
- nenhuma dependência 3D no MVP.

Os números devem ser medidos no build real e revisados quando o conteúdo definitivo entrar.

## 6. Imagens

- usar dimensões corretas e `sizes`;
- não carregar imagem desktop completa no mobile;
- preload/priority somente para LCP;
- poster para vídeo;
- AVIF/WebP com fallback;
- blur placeholder apenas quando ajuda, sem base64 excessivo;
- nomes descritivos;
- apagar EXIF/metadata sensível quando aplicável.

## 7. SEO técnico

Checklist por rota:

- title único;
- meta description específica;
- canonical correta;
- H1 único;
- OG/Twitter image;
- links internos;
- breadcrumb onde aplicável;
- JSON-LD válido;
- status HTTP correto;
- index/noindex correto;
- imagens com alt;
- conteúdo principal renderizado no servidor.

Checklist global:

- sitemap acessível;
- robots correto em produção e bloqueado em preview;
- favicon/manifest;
- redirects antigos;
- página 404 útil;
- URL sem parâmetros desnecessários;
- Search Console e analytics verificados.

## 8. Segurança e privacidade

- formulário validado no servidor;
- honeypot, tempo mínimo de preenchimento, identificador opaco de submissão e frequência best-effort por instância na Fatia B; rate limit distribuído ainda externo (Vercel Firewall, se o plano e o endpoint da Server Action permitirem — não aplicado nesta passagem);
- o tempo mínimo é heurística, não proteção suficiente contra abuso: token ausente ou inválido não bloqueia POST direta;
- a UI de `/contato` trata provider desabilitado, misconfigured, timeout ou erro do Resend como `unavailable`; `success` só após entrega `ok` do provider, com identificador opaco (nunca o id bruto do Resend);
- com JavaScript, validação/`blocked`/`unavailable`/exceção do provider preservam os valores no estado local da instância montada; o formulário só é limpo após `{ ok: true }` mapeado para `status: "success"`; desmontar descarta o rascunho;
- sem JavaScript, a Server Action continua sendo o destino da mutação e não devolve PII no estado serializado; o HTML de erro não recoloca campos (limitação objetiva do fallback sem JS, sem PII na URL); a hidratação da ilha Client é necessária para o POST progressivo completo nesta stack;
- idempotência via `Idempotency-Key` do Resend (`contact-lead/<attemptId>`), janela de 24 h; timeout/`unavailable` conservam o identificador; sucesso emite `nextAttemptId` no servidor para a próxima tentativa na mesma montagem;
- logs operacionais sem PII, sem payload completo e sem mensagem bruta do provider;
- retenção operacional de até seis meses na caixa comercial para leads não convertidos, depois exclusão, salvo necessidade contratual/jurídica; o app não persiste o lead;
- Preview e Production usam destinatários configurados nos respectivos escopos da Vercel; Preview não herda Production;
- WhatsApp e e-mail permanecem fallback visível; sem SLA numérico; sem confirmação automática ao endereço do lead;
- CSP validada sem quebrar integrações;
- dependências auditadas;
- secrets apenas no servidor;
- consentimento e políticas acessíveis;
- tratamento de erro não expõe stack/segredo.

## 9. Testes automatizados

### Unitários

- schemas Zod;
- filtros de conteúdo aprovado/publicado;
- geração de metadata;
- utilitários de URL/analytics;
- normalização de telefone.

### Componentes

- Button e estados;
- menu mobile;
- accordion;
- formulário e erros;
- cookie preferences;
- CaseCard oculto quando não publicado;
- reduced motion em componentes críticos.

### E2E

1. Navegar Home → solução → contato.
2. Abrir/fechar menu somente por teclado.
3. Enviar formulário válido e confirmar o estado vigente (local/Development: `unavailable` com canais alternativos enquanto `CONTACT_PROVIDER=disabled`; `success` só com Resend configurado e entrega real).
4. Enviar inválido e verificar mensagens/foco.
5. Rejeitar cookies e confirmar que analytics não carrega.
6. Aceitar analytics e confirmar evento sem PII.
7. Acessar URL antiga e confirmar redirect.
8. Acessar case não publicado e obter 404/noindex conforme regra.

## 10. Revisão humana obrigatória

Automação não substitui:

- leitura completa do português;
- avaliação de autenticidade visual;
- navegação real no celular;
- inspeção das fotos e dados expostos;
- verificação de consentimento de logos/depoimentos;
- confirmação do recebimento de leads;
- revisão de contraste sobre imagens;
- revisão jurídica das políticas.

## 11. Checklist de lançamento

- [ ] Backup WordPress e DNS concluído.
- [ ] Crawl antigo exportado.
- [ ] Redirects testados.
- [ ] Conteúdo aprovado.
- [ ] Dados empresariais conferidos.
- [ ] Formulário entregue ao destino correto.
- [ ] Analytics e consentimento validados.
- [ ] Preview está com noindex.
- [ ] Produção permite indexação.
- [ ] Sitemap enviado.
- [ ] SSL e domínio canônico corretos.
- [ ] 404 e erros monitorados.
- [ ] Performance mobile validada.
- [ ] Teclado e reduced motion testados.
- [ ] Rollback documentado e testável.

