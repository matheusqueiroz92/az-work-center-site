# Motion system

## 1. Princípio

Movimento deve explicar que a AZ organiza complexidade: elementos dispersos entram, conectam-se e encontram uma posição estável.

Não usar animação como ruído decorativo nem esconder conteúdo essencial até o JavaScript carregar.

## 2. Intensidade

- Global: 6/10.
- Hero: 7/10, um momento coreografado.
- Seções informativas: 3–5/10.
- Formulários e navegação: 2–3/10.
- Mobile: reduzir quantidade e distância em aproximadamente 30–50%.
- Reduced motion: 0–1/10, usando principalmente opacity instantânea/curta.

## 3. Tokens

### Duração

| Token | Valor | Uso |
|---|---:|---|
| instant | 80 ms | feedback visual mínimo |
| fast | 160 ms | hover, focus, tooltip |
| base | 240 ms | botões, accordion, menu |
| slow | 420 ms | entrada de seção |
| deliberate | 650 ms | hero/arte principal |
| narrative | 900 ms | transição editorial pontual |

### Easing

| Token | Curva | Uso |
|---|---|---|
| standard | `[0.22, 1, 0.36, 1]` | entradas e deslocamentos |
| emphasized | `[0.16, 1, 0.3, 1]` | hero e painéis |
| exit | `[0.4, 0, 1, 1]` | saídas mais rápidas |
| linear | `[0, 0, 1, 1]` | progresso ligado ao scroll |

Springs:

- UI: stiffness 320, damping 30, mass 0.8;
- painel: stiffness 220, damping 28, mass 1;
- evitar bounce perceptível em conteúdo B2B.

## 4. Regras globais

- Provider global: `MotionConfig reducedMotion="user"`.
- Carregar recursos avançados com `LazyMotion` quando houver benefício real.
- Um observer compartilhado ou recursos internos da Motion; não criar listener de scroll por componente.
- Animar `transform` e `opacity`.
- Nunca animar layout de grandes áreas com `width`, `height`, `top` ou `left` em loop.
- `will-change` apenas durante a animação.
- O DOM inicial precisa conter conteúdo legível e indexável.
- Animações de entrada devem ocorrer uma vez, salvo componentes explicitamente interativos.

## 5. Catálogo

### 5.1 Hero Assembly

Objetivo: mostrar módulos dispersos formando uma solução.

Sequência desktop:

1. eyebrow aparece em 240 ms;
2. H1 revela por linhas, não caracteres, com 50–70 ms de stagger;
3. texto e CTAs entram juntos;
4. linha AZ percorre o diagrama;
5. módulos/interface estabilizam.

Duração total: 900–1200 ms.  
Reduced motion: todos visíveis; fade único de até 160 ms.

### 5.2 Section Reveal

Opacity `0 → 1`, Y `24 → 0`, 420 ms, uma vez.  
Stagger máximo: 60 ms por item, até 6 itens.

Não aplicar a cada parágrafo.

### 5.3 AZ Line Draw

SVG com `pathLength 0 → 1`. Uso em:

- conexão do hero;
- método;
- transição para CTA final.

Máximo de três ocorrências na Home. Deve ser decorativa e `aria-hidden`.

### 5.4 Service Story

Desktop:

- títulos/descrições rolam normalmente;
- painel visual usa `position: sticky`;
- mudança de serviço faz crossfade e pequeno deslocamento de 12–20 px;
- barra/progresso discreto acompanha a seção.

Mobile:

- conteúdo linear/accordion;
- nenhuma rolagem horizontal forçada;
- sem pinning.

### 5.5 Case Preview

- imagem responde ao hover com scale máximo 1.02;
- máscara/clip revela informação complementar;
- cursor permanece padrão ou pointer; não substituir por cursor customizado obrigatório;
- teclado recebe o mesmo estado visual via focus-visible.

### 5.6 Metric Transition

Somente para métricas aprovadas. Número pode contar uma vez, mas o valor final deve existir no HTML/aria-label. Não animar números falsos ou placeholders.

### 5.7 Header Behavior

- fundo transita em 240 ms;
- esconder ao descer somente após 120 px de scroll;
- reaparecer imediatamente ao subir;
- não ocultar enquanto foco estiver dentro do header;
- compensar âncoras com `scroll-padding-top`.

### 5.8 Accordion

240–320 ms. Ícone gira 90/180 graus. Conteúdo usa clip/grid rows ou biblioteca acessível. Reduced motion: instantâneo.

### 5.9 Button

- hover: deslocamento de seta 3–4 px;
- active: scale 0.98;
- foco: ring sem animação longa;
- loading: spinner discreto;
- sem brilho percorrendo o botão em loop.

### 5.10 Page Transition

Opcional após MVP. Preferir transição curta por opacity/clip, preservando foco e posição esperada. A View Transition API pode ser avaliada progressivamente, mas não deve comprometer navegação, anúncio de leitores de tela ou compatibilidade.

## 6. Efeitos proibidos

- scroll-jacking;
- smooth scroll que substitui comportamento nativo em todo o documento;
- texto seguindo cursor;
- cursor customizado necessário para compreender ação;
- parallax em texto;
- rotação infinita de elementos centrais;
- marquee automático sem controle;
- glitch, scanlines ou neon cyberpunk;
- loading intro que bloqueia a página;
- animação de todas as palavras/caracteres;
- partículas seguindo o mouse;
- 3D pesado no hero antes de comprovar orçamento de performance.

## 7. Reduced motion

Regras obrigatórias:

- usar `MotionConfig reducedMotion="user"`;
- usar `useReducedMotion()` para casos condicionais;
- substituir transformações grandes por opacity;
- desativar parallax e autoplay;
- mostrar estado final de linhas, diagramas e counters;
- manter feedback funcional de formulário;
- permitir navegação sem atraso artificial.

## 8. Performance budget de motion

- Nenhuma animação deve causar long task acima de 50 ms em uso normal.
- Evitar mais de 12 elementos animando simultaneamente.
- Não manter loops offscreen.
- Pausar animação quando `document.hidden`.
- Testar em dispositivo Android intermediário ou em CPU throttling.
- Efeitos avançados abaixo da dobra devem ser carregados dinamicamente.

## 9. Ferramenta: Motion ou GSAP?

### Padrão

Motion é a ferramenta oficial do projeto.

### GSAP permitido somente se

- houver sequência de timeline/pinning que Motion/CSS não resolva com clareza;
- a dependência e licença forem revisadas;
- a seção estiver isolada;
- houver cleanup, reduced motion e orçamento de performance;
- a decisão for registrada.

Não instalar as duas bibliotecas apenas por conveniência.

## 10. Critério de aceite

Uma animação só é aprovada se:

- sua função pode ser descrita em uma frase;
- conteúdo continua acessível sem ela;
- teclado e leitor de tela não perdem contexto;
- reduced motion foi testado;
- não piora Core Web Vitals;
- mantém 60 fps no cenário-alvo ou degrada graciosamente;
- parece parte da identidade AZ, não um preset copiado.

