# Plano — Ficha de produto (Fase 1) + Funil (Fase 2) + Conta (Fase 3)

Unificado em 2026-08-28 a pedido do fxlip, pra execução posterior (as
partes são independentes — fechar o ciclo de uma e deixar o resto pra
próxima é ok). Reorganizado em fases nomeadas em 2026-08-28, depois que o
fxlip fechou as decisões da ficha:

- **Fase 1 — Ficha de produto** (Parte E) — a mais pesada; decisões fechadas
  nesta data, provavelmente merece sessão própria. Escopo desta rodada de
  decisão: mini-desc + tabs + rating + reviews fake. Galeria (E1) e
  relacionados (E5) ficam pra rodada própria.
- **Fase 2 — Funil** (Partes A/checkout + B/cart) — inalteradas.
- **Fase 3 — Conta** (Partes C/account/orders + D/account) — só CSS, rápido.

Ordem de execução fica a critério do fxlip (as três são independentes).

> **Companion executável**: `plano-layout-funil-conta-ficha.yaml` — tarefas
> atômicas sequenciais (só input/output) espelhando este doc. Este `.md` é o
> **plano original**, referência da etapa de revisão (ver "Revisão
> pós-execução" no fim).

Contexto: Fases 3 (globais: breadcrumb off + sticky footer) e 4 (reativação
de links/busca/login) já concluídas em 2026-08-27 — **numeração antiga,
não confundir com as Fases 1/2/3 deste doc**. Regras de `agents.md` valem
pra tudo aqui: fase de **layout** apenas, `PlaceholderNotice` no que
depender de funcionalidade, prefixo `cpk-`, mudança só vale pushada.

## Pré-requisitos (fazer antes de abrir os browsers)

1. Dev no ar: `server dev on` (container `evershop-dev` + `dev-sync`
   espelhando este repo → `www/themes/cyberpunk`). Dev: `100.94.54.16:8090`.
2. Refs do CyberPulse em `~/refs/cyberpulse/cyberpulse/{checkout,cart}.html`
   — **não renderizar cruas** (scripts/fonts externos penduram o Chrome):
   copiar higienizada pro scratchpad (strip `<script>/<iframe>/<link>`
   externo, neutralizar `src|href|url()|@import` http → `data:,`) e abrir
   por `file://`. Procedimento completo em `skills.md § Screenshot`.
3. Prints "atual vs ref" lado a lado — print do nosso vem do dev, nunca de
   produção (o dev aceita dump-dom; produção exige UA custom).

## Parte A — /checkout

Ref: `https://wp.nkdev.info/cyberpulse/checkout/` (espelho local:
`checkout.html`). Nossos arquivos: `src/pages/frontStore/checkout/`
(`Checkout.jsx`, `Summary.jsx`, `CheckoutOverride.scss`).

Estrutura atual (`Checkout.jsx:110-133`): grid `md:grid-cols-2`, col-1 =
steps (contato/endereço/envio via `checkoutPageLeft`), col-2 =
`checkoutPageRight` → `Summary` (Order Review + totals). O carrinho precisa
ter item pro checkout renderizar em dev.

- [ ] **A1. Título "Checkout" centralizado** — a página hoje NÃO tem título
      (só steps). Comparar com a ref: se a ref tem `<h1>` centralizado no
      topo, adicionar heading no `Checkout.jsx` no mesmo padrão do cart
      (`Title` em `ShoppingCart.jsx:12-23`: `cpk-h1`, `text-center`,
      texto "CARRINHO" → aqui decidir texto: "CHECKOUT"). Confirmar com o
      fxlip o texto se houver dúvida.
- [ ] **A2. Textareas com o efeito do select do /shop** — o efeito de
      referência é o `select#shop-sort-by` (`components.scss:1204-1229`:
      borda `--cpk-color-border`, fundo `--cpk-color-bg-200`, foco com
      `border-color` brand + inset glow `rgba(brand-rgb, 0.2)`, ícone
      custom que clareia no hover). As textareas do checkout JÁ têm parte
      do tratamento (`components.scss:213-241`, bloco shadcn
      `[data-slot='input-group']/[data-slot='select-trigger']/textarea`).
      Print atual → apontar a divergência visual (provável: hover/glow do
      select não existe no bloco shadcn; textarea não tem ícone, o efeito
      carregável é borda+fundo+foco) → completar no bloco shadcn em
      `components.scss`, NÃO criar seletor novo solto.
- [ ] **A3. Order note / cupom / total na coluna da direita** — total já
      está (Summary na col-2). Cupom: verificar onde renderiza hoje
      (CartSummary dentro do Summary; dump-dom do `/checkout` com carrinho
      e procurar `CouponForm`). **Order note: verificar se existe no
      EverShop** — grep no fork `www` não achou `OrderNote`; se não
      existir mesmo, é funcionalidade nova → `<PlaceholderNotice />` na
      col-2 + registrar em `memory.md § Pendências` (não implementar).
      Reposicionar o que existir via JSX do `Checkout.jsx` (é nosso) ou
      `CheckoutOverride.scss`, conforme o que for (estrutura vs estilo).
- [ ] **A4. Dots da ref nas bordas** — mesmo mecanismo da Parte B2 (ver
      lá); aplicar no card de resumo da direita se a ref tiver.

## Parte B — /cart

Ref: `https://wp.nkdev.info/cyberpulse/cart/` (espelho: `cart.html`).
Arquivos: `src/pages/frontStore/cart/ShoppingCart.jsx` +
`ShoppingCartOverride.scss` + `components/frontStore/cart/`.

**Descoberta 2026-08-28**: o grid já é 2 colunas com o resumo na direita
(`ShoppingCart.jsx:32`: `lg:grid-cols-[1fr_360px]`, col 2 = `cart-summary`
com "CART TOTALS" em `:50`). O item "Cart totals vai pra coluna da direita"
do backlog parece **já atendido** — confirmar com print vs ref (atenção ao
breakpoint: `lg:` — abaixo disso empilha; conferir se a queixa original era
do desktop ou do mobile) antes de mexer em qualquer coisa.

- [ ] **B1. Print atual vs ref** — se "totals na direita" já bate, marcar
      como pronto e seguir pro B2. Se o mobile empilha feio, alinhar
      ordem/dimensionamento com a ref.
- [ ] **B2. Dots nas pontas das bordas (`--cpl-table-dots--dot__width`)** —
      variável da ref. Extrair o mecanismo de lá: grep
      `cpl-table-dots` em `~/refs/cyberpulse/cyberpulse/cart_arquivos/*.css`
      (e `checkout_arquivos/`) — emular com CSS próprio `cpk-` (gradiente
      radial repetido nos cantos da borda, sem copiar código: só o efeito).
      Aplicar nos cards do cart (itens + totals) onde a ref aplicar.

## Parte C — /account/orders

Arquivos: override em `components.scss` (escopo `.account`, bloco
`.account-header` em `:471-489`); JSX é do fork `www`
(`MyAccount.tsx`/`OrderList.tsx`) — não editar, só CSS.

- [ ] **C1. Remover `CUSTOMER_TERMINAL_INIT`** — apagar o bloco
      `&::before { content: 'CUSTOMER_TERMINAL_INIT'; … }`
      (`components.scss:478-488`) inteiro.
- [ ] **C2. Centralizar "Minha Conta"** — mesmo tratamento do título do
      checkout (A1): `.account-header` com `text-align: center` (o h1 já é
      `text-transform: uppercase` + brand + glow — mantém).

## Parte D — /account

- [ ] **D1. Strings em inglês** — páginas de conta exigem sessão logada
      (dump-dom headless não autentica): listar as strings EN com o fxlip
      logado (ou lendo os TSX do fork
      `~/server/repos/www/packages/evershop/src/modules/customer/pages/…` e
      cruzando com `www/translations/pt-br/account.csv`). **Cruzamento
      importante**: já existe pendência de traduções trocadas de auth
      (`memory.md § Pendências` — "Sign In"→"REGISTRAR" no CSV, linha 10).
      Se o fix for dado de tradução (CSV), é **push no repo `www`** —
      outro território, deploy separado: preparar o diff e **pedir
      aprovação do fxlip antes de pushar**.
- [ ] **D2. Bordas do pop-up de novo endereço** — dialog shadcn
      (`[data-slot='dialog-content']`, já com escopo próprio em
      `components.scss` — portaliza pro body). Ref: classes
      `lwa lwa-login lwa-default` da ref do CyberPulse = widget de login
      deles; pegar o tratamento de BORDA (provavelmente os mesmos dots de
      B2 — grep `lwa-login` na ref). Aplicar como emulação `cpk-`.

## Parte E — Ficha de produto (Fase 1)

Ref real: `https://wp.nkdev.info/cyberpulse/product/band-t-shirt/`
(baixada e dissecada em 2026-08-28 — não há espelho local de product; se
precisar de novo: `curl -sL -A "Mozilla/5.0" <url>`, a URL viva renderiza).
Produto da ref é **simples, sem variações** — igual aos nossos; o delta
abaixo não depende de variantes. **Produto de teste desta fase: caneca GTA**
(`/admin/products/edit/e9541d6d-1454-4b4d-a3a1-acec774d583a`).

### Decisões fechadas (fxlip, 2026-08-28 — substituem as pendências antigas de E2/E3/E4)

1. **Duas descrições como na ref**: nas tabs fica a `description` real do
   produto; acima do botão de compra fica uma **mini-desc** = campo
   personalizado novo no admin (metafield `mini_desc`), preenchido por
   produto.
2. **Descrição / Informações adicionais / Avaliações em tabs**, como na ref
   — implementadas **só-CSS (radio hack)**: zero JavaScript, dentro da
   regra de fase de layout.
3. **Estrelas decorativas** (sem função real, como o card do /shop) com
   "(1 avaliação)" + link pra tab de avaliações.
4. **Avaliações**: 1 post fake de exemplo (avatar/nome/data/comentário)
   validando a estrutura + campo visual de envio da avaliação — sem
   gravação.

Notas técnicas dessas decisões (descobertas 2026-08-28):

- **O "shoppers will see" do admin NÃO é campo de texto** — é o rótulo do
  preview da aba de Recomendações (`Recommendations.tsx`). E a coluna
  `short_description` existe no banco mas **não é exposta no GraphQL do
  storefront**. Por isso o mini-desc precisa nascer como campo novo.
- Caminho escolhido pro campo: **metafield do fork** (`short_text`), pois a
  query da ficha (`ProductView.tsx`) **já busca `metafields`** e o resolver
  filtra por `visible_to_customer` — zero mudança de schema/GraphQL/repo
  `www`. A definição nasce **auto-provisionada pelo `theme.json` do tema**
  (mecanismo `www/.../lib/metafield/provision.ts`, idempotente; namespace
  próprio do tema, nunca `custom` que é espaço do merchant).
- **Specs saem do form**: SKU + atributos migram pra tab "Informações
  adicionais" (a ref não tem specs no bloco de compra). Markup reusa o
  padrão `.cpk-meta-list` (CSS já existente).

### Estrutura do fork (onde mexer)

Página: `packages/evershop/src/modules/catalog/pages/frontStore/productView/ProductView.tsx`
(ÁREAS: `productPageTop` · `productPageMiddleLeft` · `productPageMiddleRight`
· `productSingleDescription` · `productPageBottom`). Componentes do core em
`packages/evershop/src/components/frontStore/catalog/`: `Media.tsx` (galeria
slick), `ProductSingleName.tsx` (sort 10), `ProductSingleForm.tsx` (sort 30;
qty/add-to-cart + attrs/sku via `ProductSingleAttributes`), `ProductSingleDescription.tsx`
(default da área `productSingleDescription`). **Override do tema = criar
arquivo com mesmo path em `src/components/frontStore/catalog/`** (mesmo
mecanismo do `product/list/List.jsx`) — retorna `null` quando o alvo é
remover. Componente NOVO entra por `export const layout = { areaId,
sortOrder }` como o LoginHero. Dados do produto nos componentes: hook
`useProduct()` de `@components/frontStore/catalog/ProductContext.js`; a
descrição real renderiza com o `<Editor>` do core (dado é JSON de block
editor).

### O que a ref tem e a nossa não (delta levantado 2026-08-28)

| Ref (band-t-shirt) | Nossa ficha hoje | Quem cobre |
|---|---|---|
| Galeria multi-imagem + thumbs 180px + lightbox (pswp) | slick com 1 imagem (vargr só tem 1) | **E1 (rodada própria)** |
| Rating: estrelas + "N customer reviews" + link p/ tab Reviews | nada (rating decorativo só no card do /shop) | **E5** |
| Short description acima do botão | descrição é full-width abaixo do grid | **E3+E4** |
| Tabs abaixo: Description · Additional information · Reviews (1) | description full-width; attrs dentro do form | **E6** |
| Related `.products.columns-4` (cards = mesmo padrão do loop /shop) | `productPageBottom` VAZIA — o fork tem engine (`Recommendation.resolvers.ts` + regras no admin) mas NENHUM componente frontStore renderiza | **E2 (rodada própria)** |
| `product_meta` (SKU/categoria/tags) | `.cpk-meta-list` já cobre | E6 (SKU migra pra tab; tags não linkar) |

### Itens desta fase

- [ ] **E1. `theme.json` + definição do metafield mini_desc** — criar
      `theme.json` na raiz do tema (não existe) com `metafieldDefinitions`:
      ownerType `product`, namespace **`cpk`**, key **`mini_desc`**, name
      "Mini descrição", type `short_text`, `visibleToCustomer: true`.
      Validar o schema exato contra
      `www/.../lib/metafield/provision.ts` (`ManifestMetafieldDefinition`)
      antes de salvar. Provisionar (roda em boot/`theme:active`; em dev pode
      exigir restart do container) e **confirmar no admin da caneca GTA**
      que "Mini descrição" aparece no card Custom fields.
- [ ] **E2. Dado de admin na caneca GTA** — preencher `mini_desc` e
      conferir que a `description` está populada (senão a tab fica às
      cegas, como aconteceu com a vargr).
- [ ] **E3. Mini-desc acima do botão** — componente novo
      `src/components/frontStore/catalog/ProductMiniDesc.jsx`, `areaId:
      'productPageMiddleRight'`, `sortOrder: 25` (entre nome=10 e form=30).
      Lê `useProduct()`, acha `metafields.find(m => m.key === 'mini_desc')`
      e renderiza `value` em `.cpk-mini-desc` (parágrafo curto, tipografia
      muted, conferir ref). Sem valor → não renderiza nada (degrada limpo).
- [ ] **E4. Rating decorativo na ficha** — componente novo
      `src/components/frontStore/catalog/ProductSingleRating.jsx`,
      `areaId: 'productPageMiddleRight'`, `sortOrder: 15` (entre nome e
      mini-desc). Reusa `Rating` de `product/list/item/Rating.jsx` + linha
      "(1 avaliação)" muted; a linha inteira é `<label for>` do radio da
      tab Avaliações (label-for funciona de qualquer ponto do DOM → "link"
      pra reviews só-CSS, sem JS).
- [ ] **E5. Tabs só-CSS (Descrição / Informações adicionais / Avaliações)**
      — abaixo do grid, como a ref:
      - Anular os defaults que migram: overrides de mesmo path no tema
        retornando `null` — `src/components/frontStore/catalog/ProductSingleDescription.jsx`
        (descrição full-width) e `.../ProductSingleAttributes.jsx` (specs
        dentro do form). Comentário curto em cada um explicando o pra quê.
      - Componente novo `src/components/frontStore/catalog/ProductSingleTabs.jsx`,
        injetado em `areaId: 'productSingleDescription'`, `sortOrder: 5`
        (assume o lugar da descrição). Radio hack: inputs `radio` `sr-only`
        (`name="cpk-product-tab"`, ids `cpk-tab-desc` — `defaultChecked` —
        `cpk-tab-info`, `cpk-tab-reviews`) → labels (as abas) → painéis, no
        MESMO container pra `:checked ~` funcionar.
      - Tab **Descrição**: `product.description` com o `<Editor>` do core.
      - Tab **Informações adicionais**: `product.sku` + `product.attributes`
        na markup que `.cpk-meta-list` já estiliza.
      - Tab **Avaliações**: 1 post fake (avatar/nome/data/comentário) +
        form visual de envio (seletor de estrelas + textarea + botão) sem
        gravação — `<PlaceholderNotice />` conforme padrão do tema e
        pendência registrada no `memory.md § Pendências`.
      - Títulos das abas no padrão do tema (uppercase miúdo, conferir
        headings das seções do /shop).
- [ ] **E6. CSS** — tudo em `components.scss` no bloco "Override para a
      página de Produto" (~:862–1165), prefixo `cpk-`: `.cpk-tabs` (+ estados
      checked), `.cpk-tab-panel`, `.cpk-mini-desc`, `.cpk-product-rating`,
      `.cpk-review`, `.cpk-review-form`. Tokens de `tokens.scss`/
      `effects.scss`; zero dependência nova.

### Fora desta fase (rodada própria)

- [ ] **Galeria com thumbs** (ex-E1 antigo) — popular o produto de teste
      com 3+ imagens (dado de admin) e ver o que o slick entrega sozinho;
      o que faltar (coluna de thumbs 180px como a ref) por CSS override no
      escopo `.cpk-gallery` existente ou override do `Media.jsx`.
      **Lightbox/zoom = funcionalidade** → `<PlaceholderNotice />` no clique.
- [ ] **Relacionados** (ex-E5 antigo) — seção nova em `productPageBottom`
      (título "RELACIONADOS" no padrão das abas). Consumir `recommendations`
      se o schema frontStore expuser E houver regra no admin; senão
      `<PlaceholderNotice />` até popular. Cards no MESMO padrão do /shop.
- [ ] **Meta/tags** (ex-E6 antigo) — SKU já migra pra tab (E5); conferir na
      comparação se a ref mostra algo mais (tags clicáveis = link morto
      hoje → não linkar).

### Dado de admin que travaria a validação (levantar ANTES de printar)

1. Caneca GTA com `mini_desc` preenchida (E1+E2) e `description` populada.
2. (**só pra rodada da galeria**) 3+ imagens na galeria do produto de teste.
3. (**só pra rodada de relacionados**) regras de related no admin.
Sem isso, tabs ficam às cegas de novo (ver pendência "Ficha: descrição e
relacionados dependem de dado" no `memory.md`).

## Fechamento (cada parte, ou tudo no fim)

1. `npm run compile` no repo do tema.
2. Validar no dev: dump-dom (CSS do tema chega FORMATADO em `<style>` —
   grep com espaços, ex. `display: none !important`; padrão minificado dá
   falso negativo) + screenshot (janela alta exige `--shm-size=256m`).
3. Commits no padrão da casa: `feat(<escopo>): …` + `build(dist): …` (o
   `git add dist/...` reclama de gitignore mas stageia mesmo assim —
   commitar direto).
4. `git push origin main` → deploy. **Confirmar SHA no
   `~/server/stacks/deploy/deploy.log`** (pushes concorrentes são
   descartados pelo flock — nunca empurrar dois seguidos sem confirmar).
5. Validação de produção com dump-dom (UA custom `sr-robo-check/1.0`).
6. Atualizar `memory.md` (estado das páginas, pendências, backlog —
   marcar o que fechar deste plano) e `server frente log front "…"`.

## Revisão pós-execução (depois de TODOS os updates — última etapa do plano)

Para cada tarefa executada (na ordem do companion `.yaml`, P-01..F3-06), rodar
o comando de revisão:

```
Leia esse output do executor.
Compare com a etapa {etapa_ref} do plano original (este arquivo).
Retorne apenas os diffs e as correções necessárias em formato de patch.
```

Saída: unified diff aplicável com `git apply`. Patches aceitos são aplicados,
o output da tarefa corrigida é reexecutado e o dev revalidado (e a produção,
se a fase já foi pushada). Também está no `.yaml` em `review:`.

## Pendências de decisão do fxlip (embutidas nos passos)

Fase 2 (Funil):
- **A1**: texto do título ("CHECKOUT"?).
- **A3**: order note não existe no EverShop deste fork → PlaceholderNotice
  ou descartar do escopo?

Fase 3 (Conta):
- **D1**: push de tradução no repo `www` (aprovação explícita).

Fase 1 (Ficha) — decisões fechadas 2026-08-28 (ver "Decisões fechadas"
acima); só resta operacional:
- **E1/E2**: quem preenche o dado de admin da caneca GTA (mini_desc +
  descrição)? (frente popular / fxlip)

Rodadas próprias da ficha (fora desta fase):
- **Galeria**: 3+ imagens no produto de teste — quem popula?
- **Relacionados**: consumir `recommendations` (se o schema expuser e houver
  regra/dado no admin) ou PlaceholderNotice até popular? + regras no admin.
