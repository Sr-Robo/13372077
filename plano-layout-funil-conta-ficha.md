# Plano — Funil (ex-Fase 1) + Conta (ex-Fase 2) + Ficha de produto

Unificado em 2026-08-28 a pedido do fxlip, pra execução posterior (as
partes são independentes — fechar o ciclo de uma e deixar o resto pra
próxima é ok; a Parte E/ficha é a mais pesada, provavelmente merece sessão
própria). Ordem sugerida: **C/D (conta, só CSS, rápido) → A/B (funil) →
E (ficha, a maior)**.

Contexto: Fases 3 (globais: breadcrumb off + sticky footer) e 4 (reativação
de links/busca/login) já concluídas em 2026-08-27. Regras de `agents.md`
valem pra tudo aqui: fase de **layout** apenas, `PlaceholderNotice` no que
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

## Parte E — Ficha de produto (`/bones/g3ng4r` etc.)

Ref real: `https://wp.nkdev.info/cyberpulse/product/band-t-shirt/`
(baixada e dissecada em 2026-08-28 — não há espelho local de product; se
precisar de novo: `curl -sL -A "Mozilla/5.0" <url>`, a URL viva renderiza).
Produto da ref é **simples, sem variações** — igual aos nossos; o delta
abaixo não depende de variantes.

### Estrutura do fork (onde mexer)

Página: `packages/evershop/src/modules/catalog/pages/frontStore/productView/ProductView.tsx`
(ÁREAS: `productPageTop` · `productPageMiddleLeft` · `productPageMiddleRight`
· `productSingleDescription` · `productPageBottom`). Componentes do core em
`packages/evershop/src/components/frontStore/catalog/`: `Media.tsx` (galeria
slick), `ProductSingleName.tsx`, `ProductSingleForm.tsx` (qty/add-to-cart +
attrs/sku), `ProductSingleDescription.tsx`. **Override do tema = criar
arquivo com mesmo path em `src/components/frontStore/catalog/`** (mesmo
mecanismo do `product/list/List.jsx`). Componente NOVO (rating, related)
entra por `export const layout = { areaId, sortOrder }` como o LoginHero.

### O que a ref tem e a nossa não (delta levantado 2026-08-28)

| Ref (band-t-shirt) | Nossa ficha hoje | Gap |
|---|---|---|
| Galeria multi-imagem + thumbs 180px + lightbox (pswp) | slick com 1 imagem (vargr só tem 1) | thumbs sem CSS próprio; lightbox não existe |
| Rating: estrelas + "N customer reviews" + link p/ tab Reviews | nada (rating decorativo só no card do /shop) | sem estrelas na ficha |
| Short description acima do botão | descrição é full-width abaixo do grid | ordem/posição difere |
| Tabs abaixo: Description · Additional information · Reviews (1) | description full-width; attrs dentro do form | sem tabs/seções de conteúdo |
| Related `.products.columns-4` (cards = mesmo padrão do loop /shop) | `productPageBottom` VAZIA — o fork tem engine (`Recommendation.resolvers.ts` + regras no admin) mas NENHUM componente frontStore renderiza | seção inteira a criar |
| `product_meta` (SKU/categoria/tags) | `.cpk-meta-list` já cobre | ok |

- [ ] **E1. Galeria com thumbs** — o `Media.tsx` do core é slick: primeiro
      **popular o produto de teste com 3+ imagens** (dado de admin, ver
      pendências) e ver o que o slick já entrega sozinho (slides + dots?).
      O que faltar de visual (coluna de thumbs 180px ao lado/abaixo como a
      ref) entra por CSS override no tema (`.product-slider` etc. em
      `components.scss`, escopo `.cpk-gallery` já existente) ou override do
      `Media.jsx`. **Lightbox/zoom = funcionalidade** → não implementar;
      se a ref for seguida à risca, `<PlaceholderNotice />` no clique.
- [ ] **E2. Rating decorativo** — componente novo do tema
      (`src/components/frontStore/catalog/ProductSingleRating.jsx`),
      `areaId: 'productPageMiddleRight'`, `sortOrder: 20` (entre Name=10 e
      Form=30). Reutilizar `item/Rating.jsx` do /shop (já isolado pra
      receber média por prop) + linha "(0 avaliações)" muted. **DECISÃO**:
      decorativo agora (como o card) ou omitir até existir sistema.
- [ ] **E3. Short description** — a ref traz um resumo curto entre rating e
      botão. O EverShop só tem `description` (um campo): decidir entre (a)
      manter como hoje (full-width abaixo, revisado às cegas) e só conferir
      tipografia com dado populado, ou (b) mover `ProductSingleDescription`
      pra dentro da coluna direita acima do form (override com layout
      `areaId: 'productPageMiddleRight'`, sortOrder 25). Alinhar com o que
      o fxlip preferir visualmente na comparação.
- [ ] **E4. Seções de conteúdo abaixo do grid** — a ref usa TABS
      (Description/Additional/Reviews). Tabs reais = interação JS =
      funcionalidade → **fora da fase de layout**. Recomendação: seções
      empilhadas full-width no padrão `cpk-` (heading uppercase miúdo +
      régua brand, mesmo tratamento dos widgets do /shop): "DESCRIÇÃO"
      (dados reais), "INFORMAÇÕES ADICIONAIS" (attrs que hoje moram no
      form), "AVALIAÇÕES" (`<PlaceholderNotice />`). **DECISÃO**: seções
      empilhadas vs tabs visuais estáticas (CSS puro não faz tabs bem).
- [ ] **E5. Relacionados** — seção nova na área `productPageBottom`
      (componente do tema com `layout.areaId: 'productPageBottom'`,
      título "RELACIONADOS" no padrão do E4). Dois caminhos: (a) consumir
      `recommendations` — a query existe no core
      (`Recommendation.resolvers.ts`) mas **verificar se o schema frontStore
      expõe e se há dado** (regras se configuram no admin:
      `RelatedProductsRules` por categoria + `CatalogSetting`); (b)
      `<PlaceholderNotice />` até popular. Cards no MESMO padrão do /shop
      (reutilizar `product/list/` se o dado vier em shape compatível).
- [ ] **E6. Meta/SKU** — já coberto por `.cpk-meta-list`; só conferir na
      comparação se a ref mostra algo a mais (tags clicáveis = link morto
      hoje → não linkar).

### Dado de admin que travaria a validação (levantar ANTES de printar)

1. Produto de teste com **descrição populada** (vargr está vazia).
2. **3+ imagens na galeria** do mesmo produto.
3. **Regras de related** no admin (categoria com produtos suficientes pra
   recomendar) — senão E5 não renderiza dado nenhum.
Sem isso, E1/E3/E5 são revisão às cegas de novo (ver pendência "Ficha:
descrição e relacionados dependem de dado" no `memory.md`).

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

## Pendências de decisão do fxlip (embutidas nos passos)

- **A1**: texto do título ("CHECKOUT"?).
- **A3**: order note não existe no EverShop deste fork → PlaceholderNotice
  ou descartar do escopo?
- **D1**: push de tradução no repo `www` (aprovação explícita).
- **E2**: rating decorativo na ficha agora ou omitir até existir sistema?
- **E3**: descrição full-width abaixo (como hoje) ou curta na coluna direita?
- **E4**: seções empilhadas (recomendado) vs tabs visuais estáticas?
- **E5**: relacionados consumindo `recommendations` agora (se o schema
  expuser e houver dado) ou PlaceholderNotice até popular?
- **Dado de admin** (trava E1/E3/E5): descrição + 3 imagens no produto de
  teste + regras de related no admin — quem popula? (frente popular / fxlip)
