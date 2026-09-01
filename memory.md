# Memory — Front (tema Cyberpunk)

Fatos, arquitetura e estado atual do tema. Consultado sob demanda (não é
importado automaticamente pelo `CLAUDE.md`). Atualizar sempre que uma
decisão for tomada, uma página avançar de fase, ou um gotcha novo for
descoberto.

## Identidade visual

Repositório: `Sr-Robo/13372077`. Tema EverShop da loja `sr.robo.net.br`.
Referência visual: CyberPulse (`wp.nkdev.info/cyberpulse/shop`) — inspiração
de estrutura/efeitos, nunca cópia de código/assets. Paleta e identidade são
próprias (marca `#bd00ff`, fundo `#050505`, fonte Purista).

## Arquitetura do tema

```
src/
├── styles/
│   ├── tokens.scss       ← paleta, tipografia, espaçamento (variáveis CSS)
│   ├── effects.scss      ← glitch, glow, cursor, noise, clip-path, header/footer override
│   └── components.scss   ← .cpk-btn, .cpk-card, .cpk-input, overrides de páginas do core
├── pages/
│   ├── all/              ← presentes em TODA página (areaId body/head)
│   │   ├── Theme.jsx     ← (head) importa os 3 scss
│   │   ├── Cursor.tsx    ← (body) cursor "mira" custom
│   │   ├── PageFade.tsx  ← (body) fade entre navegações
│   │   ├── Noise.tsx     ← (body) textura animada de fundo (SVG feTurbulence)
│   │   ├── Fonts.jsx/scss ← @font-face Purista
│   │   ├── Logo.jsx      ← (headerMiddleCenter) cyber-robo ↔ cyber-rob0 no hover
│   │   ├── CyberpunkFooter.tsx ← (footerBottom) copyleft lê themeConfig.copyRight
│   │   │                        (metafield custom.copyright do admin, 2026-08-22);
│   │   │                        full-bleed igual o header (ver Gotchas)
│   │   ├── EveryWhere.tsx ← retorna null (limpo)
│   │   └── OffcanvasToggle.jsx
│   ├── homepage/
│   │   └── OnlyHomePage.tsx ← hero com glitch + botões
│   ├── login/
│   │   └── LoginHero.tsx    ← wrapper fino de AuthHero (AUTH_PROTOCOL_INIT)
│   └── register/
│       └── RegisterHero.tsx ← wrapper fino de AuthHero (USER_REGISTRATION_INIT)
│   ├── productView/
│   │   ├── ProductMiniDesc.jsx      ← E3: mini-desc via metafield cpk.mini_desc
│   │   ├── ProductSingleRating.jsx  ← E4: rating decorativo + label→tab reviews
│   │   └── ProductSingleTabs.jsx    ← E5: tabs CSS-only (desc/specs/reviews)
│   ├── cart/
│   │   └── ShoppingCart.jsx, ShoppingCartOverride.scss
│   └── checkout/
│       └── Checkout.jsx, CheckoutOverride.scss
├── components/
│   ├── Logo.tsx              ← componente de logo reutilizável
│   ├── AuthHero.tsx          ← sub-header glitch das páginas de auth
│   │                           (cantoneira absoluta ancora NO CARD — não
│   │                           pôr position:relative no wrapper)
│   ├── PlaceholderNotice.jsx ← filler "Em breve" (.cpk-card/.cpk-placeholder)
│   │                           pra área sem funcionalidade pronta (ver
│   │                           § Pendências de funcionalidade)
│   ├── frontStore/catalog/
│   │   ├── ProductSingleDescription.jsx ← null-override (desc → tabs)
│   │   ├── ProductSingleAttributes.jsx  ← null-override (specs → tabs)
│   │   └── product/list/
│       ├── List.jsx/scss, item/{Name,Price,Thumbnail,Rating}.jsx
│       │   (Name/Thumbnail linkam pra ficha via `p.url` (formato
│       │   `/<categoria>/<url_key>`) — reativados 2026-08-27, Fase 4,
│       │   após desabilitação de 2026-08-22; Rating decorativo desde
│       │   2026-08-23, ver pendências;
│       │   promo no card desde 2026-08-25: badge "Promoção!" no Thumbnail
│       │   + Price com ins(promo, contraste) antes del(anterior riscado
│       │   cinza `--cpk-color-muted`, negrito) — dado vem do resolver da
│       │   extensão product_discount no fork www, ver gotcha abaixo)
└── (dist/ é gerado por compile; ver nota abaixo)
```

**Mecanismo de descoberta**: componentes em `pages/<rota>/` são descobertos
por `getComponentsByRoute` → `scanRouteComponents` a partir de `dist/`, não
`src/`. Cada componente exporta `{ default, layout: { areaId, sortOrder } }`.
`pages/all/` = todas as páginas.

**`dist/`**: o deploy (`deploy-ecommerce.sh`) compila o tema do zero
(`npm install && npm run compile` em container node:20 `--user 1000:1000`) —
o `src/` é a fonte da verdade. Parte do `dist/` é trackeada no git (legado,
~34 de 90 arquivos; `.gitignore` do repo ignora `dist/`), mas arquivos novos
do dist NÃO precisam ser commitados: o deploy regenera tudo.

## Tokens de design

| Token | Valor |
|---|---|
| Brand | `#bd00ff` (roxo/magenta) |
| Fundo | `#050505` |
| Superfícies | `--cpk-color-bg-100/200/300` (tons escuros) |
| Glitch | `--color-glitch-1/2` (fixas, não acompanham brand) |
| Fonte | Purista, self-hosted (.woff2 em `public/fonts/`) |
| Corpo | 16px, line-height 1.8, letter-spacing 0.02em, peso 300 (Light) |
| Títulos | peso 600, h1 40px/1.2, display 80px/1.2 |
| Borda | raio 0 — cortes via `clip-path: polygon()` paramétrico |
| Prefixo CSS | `cpk-` |

## Estado das páginas (Fase 2)

- [x] Listagem `/shop` (extensão `catalog_shop` no fork `www`, não no tema) —
      página piloto do padrão cyberpulse validado (2026-08-22)
- [x] Header + Logo (CSS override + Logo.jsx em `headerMiddleCenter`)
- [x] Footer (CSS override em `effects.scss`)
- [x] Home (hero com glitch em `OnlyHomePage.tsx`) — desde 2026-08-22 a home
      não é mais alcançada por navegação normal (`/` redireciona pra `/shop`,
      ver `extensions/catalog_shop/src/pages/frontStore/homepage/homeToShop.js`
      no fork `www`); ver pendência abaixo
- [x] Login/Cadastro/Esqueceu senha/Nova senha — revisados contra o
      piloto /shop em 2026-08-26: família de auth unificada em
      `components.scss` (escopos `.login__page`, `.register__form`,
      `.reset__password__form`, `.update-password-form`,
      `.reset__password__success`; reset/update ganham sub-header técnico
      via `::before` porque o JSX do core não tem Área); `AuthHero.tsx`
      compartilhado injeta o sub-header no login/criar conta; CTA agora
      PRENCHIDO no padrão `.cpk-btn` (clip-path direto no botão + glow
      via drop-shadow, que respeita o corte)
- [x] Página de produto — revisada contra o piloto /shop em 2026-08-26
      (override em `components.scss`; extraídos `.cpk-price-block`,
      `.cpk-meta-list`, `.cpk-gallery`; breadcrumb global removido de
      todas as páginas em 2026-08-27, Fase 3). A ficha responde por
      `/<categoria>/<url_key>` (formato de `p.url` usado nos links da
      listagem) — validado renderizando no dev em 2026-08-27; a observação
      anterior ("só `/product/<uuid>`, url_key dá 404") era do core 2.2.1
      legado e não se aplica ao formato atual.
      **2026-08-28 — Fase 1 (plano-layout-funil-conta-ficha): ba04470,
      REPROVADA na revisão de 2026-08-29 — causa: componentes de área em
      path errado (`src/components/` em vez de `src/pages/productView/`).
      **2026-08-29 — CORRIGIDA e VALIDADA** (62a67ba): 3 componentes
      movidos para `src/pages/productView/` (ProductMiniDesc,
      ProductSingleRating, ProductSingleTabs). Null-overrides mantidos em
      `src/components/` (corretos para override por path via import
      alias). Validação: dev (F1-12) e produção (F1-15) OK — mini-desc
      com valor, tabs renderizando (descrição via `Editor` + SKU +
      review fake), sem duplicação, regressão da área
      `productSingleDescription` curada. E1/E2 confirmados de quebra
      (metafield `cpk.mini_desc` provisionado e preenchido na caneca GTA).
      ⚠️ Gotcha de validação: `curl` no dev só devolve o shell React
      (sem SSR) — dump-dom do dev exige headless Chrome `--dump-dom`
      (ver `skills.md`); curl serve só pra produção (SSR ativo).
- [x] Carrinho (2026-08-29, Fase 2): migrado para `src/pages/cart/` (route.id `cart`), título "CARRINHO" centralizado com subtitle de itens, grid 2 colunas com totals na direita (`lg:grid-cols-[1fr_360px]`), CTA de checkout preenchido no padrão .cpk-btn, dots `--cpl-table-dots` emulados nas bordas dos itens e tabela.
      **2026-08-31 — refino contra a ref cyberpulse (5c8af49)**: lista de
      itens sem cabeçalho de colunas; "remover" vira só ícone X ao fim da
      linha (sem texto); cupom sai do resumo e vai pra **abaixo dos itens**
      (`<CouponForm/>` em `.cpl-coupon-form` na coluna esquerda; `Discount`
      do `CartTotalSummary` retorna null sem cupom); resumo direito enxuto
      (Subtotal/Descontos/Frete/Total, sem h2 "CART TOTALS"); subtítulo de
      contagem removido; **dots recuados das pontas** via tokens
      `--cpk-table-gap-v/-h`/`--cpk-table-dot-w` (antes colados em 0/100%).
      **Title da aba `sr@robo:~/cart$`**: middleware no fork www
      (`extensions/catalog_shop/src/pages/frontStore/cart/cartTitle.js`,
      d97c24ace) — ver gotcha do id de middleware abaixo.
- [x] Checkout (2026-08-29, Fase 2): migrado para `src/pages/checkout/` (route.id `checkout`), título "CHECKOUT" centralizado (.cpk-h1), layout 2 colunas com resumo do pedido (.cpk-order-summary — clip-path + linhas de acento com glow; a ref NÃO usa dots no resumo do checkout, só na tabela do carrinho) e shipping note na coluna direita, textareas e campos shadcn integrados com hover glow e foco do tema. Aprovado na revisão de 2026-08-29 (revalidado de forma independente em dev+produção).
- [x] Dashboard do cliente (conta/pedidos) — revisado contra o piloto /shop
      em 2026-08-26 (override em `components.scss`; JSX do fork www:
      `MyAccount.tsx`/`OrderList.tsx` com wrapper `.account`, `AccountHeader`
      → `.account-header h1` + sub-header `CUSTOMER_TERMINAL_INIT`,
      `AccountNav` sticky com tab ativa `.border-foreground`, `OrderHistory`
      → `.order-history-list`/`.rounded-full` pills, `MyAddresses` com
      cartões `[data-slot='item']`/`&.border-primary` e dialog shadcn
      `[data-slot='dialog-content']` (portaliza pro body, escopo próprio).
      Botões shadcn `button[data-slot='button']` reskinados: base anel
      brand, `.bg-primary` preenchido com clip-path, `.bg-destructive/10`
      anel vermelho)
- [x] Página 404 — revisada contra o piloto /shop em 2026-08-26 (`NotFound.tsx`
      do fork www: wrapper `.notfound-page`, número gigante `.text-7xl`/
      `.md:text-8xl` vira marca d'água com `-webkit-text-stroke` brand, `h1`
      em brand+glow, CTA `button[data-slot='button']` preenchido no padrão
      .cpk-btn)
- [ ] Página estática/CMS (about)
- [ ] Páginas de erro 502/504 — **fora do escopo do tema**: são erros de
      gateway servidos pela infra (Traefik/Cloudflare), não páginas do
      EverShop. O "erro/502.html" no git antigo é só referência de design
      (origem da paleta em `tokens.scss`/`effects.scss`); revisar o visual
      real dessas páginas é trabalho de infra, não deste repo.

Fases 3 (interação/scroll-reveal) e 4 (responsivo/acessibilidade/performance)
ainda não iniciadas.

**2026-08-22 — revisão cyberpulse em andamento**: `/shop` foi validado como
piloto do padrão atual; login, criar conta, esqueceu senha, produto,
carrinho, checkout e home entraram de novo em checklist de revisão contra
esse padrão (mesmo os já `[x]` acima) — ver `~/server/docs/tema-cyberpunk.md`
e o backlog do fxlip pro estado desse checklist.

## Pendências de funcionalidade

- **GOTCHA do scanner de componentes (2026-08-29, reprovou a Fase 1)**:
  componente NOVO com `export const layout` tem que viver em
  **`src/pages/<route.id>/`** (compila pra `dist/pages/<route.id>/`) — o
  scanner do tema (`www/packages/evershop/src/lib/componee/scanForComponents.ts`)
  só varre `dist/pages/<route.id>/` e `dist/pages/all/`, **não-recursivo**, e
  NUNCA `dist/components/`. `src/components/…` só serve pra **override por
  path** (mesmo caminho do core, ex. `List.jsx`, null-overrides) — não pra
  injeção por área. Sintoma do erro: componente compilado, CSS no ar, zero
  markup na página (e null-overrides irmãos funcionando sozinhos = regressão:
  removeram o core sem o substituto renderizar). Route ids conhecidos:
  ficha=`productView`, login=`login`, carrinho=`cart`, checkout=`checkout`,
  home=`homepage`, registro=`register`; `src/pages/all/` vale pra todas.
  **Variante 2026-08-29 (Fase 2)**: o mesmo vale pra página inteira — os
  overrides de página em `src/pages/frontStore/{cart,checkout}/` eram
  **código morto** desde a criação (o scanner nunca leu `pages/frontStore/`;
  /cart e /checkout rodavam com a página do CORE, só estilizada por CSS
  global). O move pra `src/pages/{cart,checkout}/` na Fase 2 é o que ativou
  os overrides de página de verdade. Lição: **qualquer coisa em
  `src/pages/frontStore/` não existe pro EverShop** — se precisar de override
  de página, é `src/pages/<route.id>/`.

Lista viva do que foi visto e adiado durante trabalho de **layout** (fase
atual). Cada item aqui é um lembrete pra uma sessão futura de
workflow/testes — não implementar durante uma sessão de layout.

- **Home inalcançável por navegação normal** (2026-08-22): com `/` →
  redirect 302 pra `/shop`, o hero de `OnlyHomePage.tsx` (CTA "Explorar
  Catálogo") nunca mais renderiza pro usuário comum. Decidir: remover o
  componente, reaproveitar em outra rota (`/home`?), ou manter como está
  (código morto, sem custo real).
- **Estrelas de avaliação decorativas** (2026-08-23): `item/Rating.jsx`
  renderiza 5 estrelas fixas (`RATING_COUNT`) no card do `/shop` — não há
  sistema de avaliações no EverShop deste fork. Quando existir, passar a
  média por prop (componente já isolado pra isso).
- **Ficha: seletor de variantes sem como validar** (2026-08-26): o
  catálogo só tem produtos `simple` — as regras `.variant-selector` do CSS
  continuam do corte anterior, não vistas renderizadas. Criar produto
  variável no admin quando for validar.
- **Traduções trocadas no fluxo de auth (repo `www`, 2026-08-26)**:
  `translations/pt-br/account.csv` linha 10 traduz "Sign In" como
  "REGISTRAR" (botão da tela de ENTRAR manda "registrar"); o link
  "Sign in" do rodapé do criar-conta e o título "Create account" ficam
  em inglês (sem entrada no CSV). Fix é dado de tradução no fork `www`
  (1 linha + push = deploy) — decidido deixar pro fxlip aprovar, não é
  escopo do tema.
- **Ficha: descrição e relacionados dependem de dado** (2026-08-26): o
  vargr (produto de teste) tem descrição vazia e
  `related_products_mode=inherit` não renderiza seção de relacionados —
  layout dessas áreas revisado às cegas; revalidar com produto populado.
- **Ficha: form de avaliação não grava** (2026-08-28): o form em
  `ProductSingleTabs.jsx` (tab Avaliações) é visual-only — textarea
  readOnly, botão disabled, `PlaceholderNotice` com "Sistema de avaliações
  em breve". Quando o sistema de reviews existir, ligar ao backend.
- **Ficha: rating decorativo na ficha** (2026-08-28):
  `ProductSingleRating.jsx` renderiza 5 estrelas fixas (mesmo que o card
  do /shop). Quando o sistema de reviews existir, receber média por prop.
- **Ficha: mini_desc pendente nos demais produtos** (2026-08-28): o
  metafield `cpk.mini_desc` foi provisionado via `theme.json`, mas só o
  produto de teste (caneca GTA) deve ter valor preenchido no admin. Os
  demais produtos ficam sem mini-desc (componente retorna null — OK).

## Backlog de layout — próxima sessão (ditado pelo fxlip 2026-08-27)

Lista de ajustes de **layout** pra atacar na próxima sessão de front. Cada
página tem uma ref do CyberPulse pra comparar lado a lado (tirar print da
nossa vs. a ref — sobre renderizar refs cruas ver `skills.md`).

- **/checkout** — comparar com `https://wp.nkdev.info/cyberpulse/checkout/`:
  - textareas devem ter o **mesmo efeito do `select` do /shop**;
  - "order note", cupom e total vão pra **coluna da direita**;
  - título "Checkout" **centralizado**.
- **/cart** — comparar com `https://wp.nkdev.info/cyberpulse/cart/`:
  - "Cart totals" vai pra **coluna da direita**;
  - bordas das divs já estão parecidas, mas falta o
    **`--cpl-table-dots--dot__width`** nas pontas (pegar da ref).
- **/account/orders**:
  - **remover o `CUSTOMER_TERMINAL_INIT`** (sub-header técnico do
    `.account-header h1::before`);
  - **centralizar o "Minha Conta"** igual o título do checkout.
- **/account**:
  - **algumas strings ainda em inglês** — investigar de onde vêm e traduzir
    (provável dado de tradução no fork `www`, cruzar com a pendência de
    traduções de auth acima);
  - o **pop-up de novo endereço** (`[data-slot='dialog-content']`) ficou
    bom; pegar a referência **`lwa lwa-login lwa-default`** pra estilizar
    as **bordas** do pop-up.

**Organização de fases**: a numeração VIGENTE é a do
`plano-layout-funil-conta-ficha.md` (2026-08-28): **Fase 1 ficha** ✓ ·
**Fase 2 funil** ✓ · **Fase 3 conta** (pendente). A numeração antiga abaixo
(combinada em 2026-08-27: funil=1, conta=2, globais=3, reativação=4) fica
só como histórico — **não usar**:
- **Antiga Fase 4 concluída 2026-08-27** (ad7e4f9+a873627): Name/Thumbnail
  voltam a `<a href={p.url}>`, remove `pointer-events:none` de busca/login
  no header, classe `.cpk-link-disabled` extinta.
- **Antiga Fase 3 concluída 2026-08-27** (f02bb27+fe714c9): breadcrumb
  escondido globalmente (`display:none !important` em `components.scss`,
  mesmo par de seletores que a extensão catalog_shop usava no /shop —
  Heading `sr@robo:~/shop$` não afetado) e sticky footer (wrapper
  `[data-evershop-area-id='body']` flex column com min-height 100vh/dvh,
  `> main` com flex:1, em `effects.scss`).
- Restam (numeração do plano): **Fase 3 — Conta** (Partes C/D, só CSS).

## Gotchas resolvidos (contexto / causa-raiz)

### Carrinho por sessão: print "cru" sempre vazio, add-to-cart da UI do dev não bate no dev (2026-09-01)
`/cart` e `/checkout` renderizam a partir do carrinho da **sessão**: cookie
`sid` (express-session, store no Postgres, assinado) → coluna `cart.sid` →
`getMyCart` filtra `status=1 AND sid=<sid>`; o GraphQL `myCart` (que alimenta
`useCartState` da página) resolve pela MESMA sessão. Consequências:
- **Headless chrome cru (skills.md § screenshot) sempre printa carrinho
  vazio** — não tem cookie. Os `dev-cart.png`/`prod-cart.png` vazios de
  2026-08-31 eram isso, não bug de layout. Pra printar cheio: `server dev
  shot` (skills.md) — puppeteer ganha sessão, semeia via `POST
  /api/cart/mine/items` (fetch RELATIVO na página, cookie same-origin), printa
  e zera o carrinho no fim.
- **Clicar "adicionar" na UI do dev NÃO enche o carrinho do dev**: as URLs de
  API saem absolutas do `siteUrl` (`EVERSHOP_HOME_URL` do container dev =
  `https://beta.robo.net.br`) — o POST vai pro beta, não pro dev. Mesmo
  mecanismo do gotcha do "Sign in" do header. Pra encher a sessão DO BROWSER:
  snippet IIFE async de console (skills.md — `await` top-level dá SyntaxError
  no console do Firefox; colar a versão de UMA linha na aba do
  `100.94.54.16:8090`, nunca na do beta).
- **Remove de item é `DELETE`, não POST** (`route.json` de
  `removeCartItem`/`removeMineCartItem`): POST dá 404 silencioso. O
  `removeApi` retornado pelo GraphQL já vem relativo (`/api/cart/…`).
- Carrinho semeado grava um cart anônimo no Postgres **compartilhado com
  produção** (o dev usa o mesmo `database`); ao zerar, o `saveCart` DELETA a
  linha do `cart` — o `server dev shot` se auto-limpa, não acumula órfãos.
- SKUs de teste sem estoque dão `{"error":{"message":"We do not have enough
  stock"}}` (500): `CCC-0001` Caneca GTA está sem estoque; usar `C-0008`,
  `CAP-0001`, `B-0002`, `D-0001` (confirmados com estoque em 2026-09-01).

### Middleware de extensão em rota core NUNCA pode se chamar `index.js` (id = basename)
Middleware novo em `extensions/catalog_shop/src/pages/frontStore/<rota>/` se
anexa a uma rota core pelo **nome da pasta** (= routeId), sem route.json. Mas
o `id` do middleware é o **basename sem extensão** — um `index.js` colide com
o `index.ts` do core na MESMA rota e `addMiddleware` lança `"Found two
middleware with the same id"` **no boot, derrubando a loja inteira**
(validado empiricamente em dev 2026-08-31: container morreu na hora com o
cart/index.js; renomear pra `cartTitle.js` curou). Sempre nome único
(mesma armadilha já documentada em `homepage/homeToShop.js`). Detalhe:
`dist/` da extensão é gitignored — o Dockerfile do fork recompila
(`npm run compile -w catalog_shop`), commit é só o `src/`.
### Validar seletor de override contra o fork `www`, NUNCA contra o `node_modules` do tema
Este repo tem seu próprio `node_modules/@evershop/evershop` (pra compilar/tipos),
mas a loja em produção roda o **fork `www`** — que é uma versão MUITO mais nova
do EverShop (TSX + shadcn + `data-slot`), enquanto o `node_modules` daqui é
legado (JSX antigo, `.account-details`/`.order-history`, `Button` com
`className="button primary outline"`, `Area` sem `className` no NotFound).
Conferir um seletor de override contra o `node_modules` local dá conclusão
ERRADA: em 2026-08-26 quase reprovei o CSS do dashboard/404 porque no legado
`.notfound-page`/`.account`/`button[data-slot='button']` "não casavam" — mas no
fork www casam exatamente (`NotFound.tsx` tem `<div className="notfound-page">`
+ `404` em `.text-7xl md:text-8xl` + `<Button variant="default">`;
`MyAccount.tsx` tem `<div className="account">` + `AccountHeader`/`AccountNav`
shadcn). Regra: pra saber que HTML/classe o core renderiza, ler
`~/server/repos/www/packages/evershop/src/...`, não o `node_modules` deste repo.

### Preço promocional no card depende do backend do fork `www`
O tema só APRESENTA promo: `List.jsx` passa `isSpecial` (compara
`price.special < price.regular`) pro `Thumbnail` (badge) e o `Price.jsx`
renderiza `ins`(promo)/`del`(riscado). O dado `price.special` vem do resolver
`Product.price` da extensão `product_discount` (repo `www`) — que até
2026-08-25 era sobrescvido em silêncio pelos stubs do core (bug de merge no
`buildResolvers`) e lia a coluna errada do row da listagem. Fix no lado do
`www`; se a badge sumir, debugar LÁ (schema/resolver), não no tema.

### Bind mount com container root
Todo `docker run` que monta `repos/*` precisa de `--user 1000:1000`. Container
root muda dono de `dist/` → rsync falha com `Permission denied` → deploy
silenciosamente não aplica. Sintoma: produção fica na versão antiga sem erro
visível. *(Procedimento de recuperação: ver `skills.md`.)*

### Race do watcher de dev com `.scss`
Dois saves quase simultâneos de `.scss` fazem o watcher apagar `dist/styles/`
(corrida no `compileSwc.ts`). Mitigação: salvar `.scss` um por vez com pausa
entre saves. *(Fix rápido de recuperação: ver `skills.md`.)* Em 2026-08-26 a
mesma race derrubou o compile com `ENOTEMPTY` em `dist/pages` quando o
`dev-sync` rsyncou vários arquivos novos de uma vez — sintoma: dev serve a
página SEM o tema (visual default do core, PNG de screenshot encolhe pra
~1/4). O fix manual de copiar styles não cobre; recuperar com `docker restart
evershop-dev`.

### Pushes rápidos / deploys concorrentes
Serializado por `flock` desde 2026-07-30 — segundo disparo é descartado se o
primeiro ainda roda. Sempre confirmar SHA no `deploy.log`.

### EverShop não é SPA
Navegação é reload completo. `PageFade` simula transição com overlay +
fade-out antes do unload — não é roteamento client-side.

### CSS do tema em dev chega FORMATADO em <style> — grep minificado dá falso negativo
O tema não gera `<link>` css: os 3 .scss são injetados via JS como `<style>`
tags (~23 no DOM), **formatadas** (espaços/newlines, ex. `display: none
!important`). Procurar por padrão minificado (`display:none!important`) num
dump-dom retorna zero e leva a culpar o watcher/bundle à toa — 2026-08-27:
restart desnecessário do `evershop-dev` por causa disso. Conferir regra com
padrão espaçado ou listar as `<style>` por script antes de concluir que o
bundle está stale.

### Rotas de auth no fork novo + URL absoluta do header
Login no fork `www` é **`/account/login`** (não `/customer/login` do
EverShop clássico — esse dá 404 de verdade). O link "Sign in" do header usa
URL **absoluta** montada do `siteUrl` (`https://sr.robo.net.br/...`): no dev
o clique navega pra PRODUÇÃO, não pro localhost. Antes de concluir 404 de
auth, conferir o href real no DOM renderizado.

### Cursor/Noise e performance
Usam `style.setProperty` direto (não state do React) — evita re-render a cada
mousemove/frame. Não converter pra state controlado sem necessidade.
