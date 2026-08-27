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
│   └── frontStore/checkout/
│       ├── Checkout.jsx, Summary.jsx, CheckoutOverride.scss
├── components/
│   ├── Logo.tsx              ← componente de logo reutilizável
│   ├── AuthHero.tsx          ← sub-header glitch das páginas de auth
│   │                           (cantoneira absoluta ancora NO CARD — não
│   │                           pôr position:relative no wrapper)
│   ├── PlaceholderNotice.jsx ← filler "Em breve" (.cpk-card/.cpk-placeholder)
│   │                           pra área sem funcionalidade pronta (ver
│   │                           § Pendências de funcionalidade)
│   └── frontStore/catalog/product/list/
│       ├── List.jsx/scss, item/{Name,Price,Thumbnail,Rating}.jsx
│       │   (Name/Thumbnail sem link pra produto desde 2026-08-22, ver
│       │   pendências; Rating decorativo desde 2026-08-23, ver pendências;
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
      `.cpk-meta-list`, `.cpk-gallery`, breadcrumb
      `[data-slot="breadcrumb"]` global). Atenção: a ficha só responde em
      `/product/<uuid>` — `url_key` no lugar do uuid dá 404 (comportamento
      do core 2.2.1, não bug do tema).
- [x] Carrinho — revisado contra o piloto em 2026-08-26 (CTA de checkout
      agora PRENCHIDO no padrão .cpk-btn, valores: subtotal em contraste /
      unitário em muted, thumb com corte de canto como o card do /shop;
      estado vazio extraído como `.cpk-empty-state` reutilizável)
- [x] Checkout (2026-08-20)
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

Lista viva do que foi visto e adiado durante trabalho de **layout** (fase
atual). Cada item aqui é um lembrete pra uma sessão futura de
workflow/testes — não implementar durante uma sessão de layout.

- **Home inalcançável por navegação normal** (2026-08-22): com `/` →
  redirect 302 pra `/shop`, o hero de `OnlyHomePage.tsx` (CTA "Explorar
  Catálogo") nunca mais renderiza pro usuário comum. Decidir: remover o
  componente, reaproveitar em outra rota (`/home`?), ou manter como está
  (código morto, sem custo real).
- **Busca e login/conta desabilitados no header** (2026-08-22): CSS-only
  (`pointer-events: none`), não semântico — sem `aria-disabled` (exigiria
  editar `SearchBox.tsx`/`CustomerIcon.tsx` do core). Reavaliar quando essas
  duas funcionalidades tiverem destino real.
- **Link de produto removido na listagem** (2026-08-22): `Thumbnail.jsx` e
  `Name.jsx` não linkam mais pra ficha de produto (viraram `<span
  className="... cpk-link-disabled">`). Reverter quando a ficha de produto
  tiver conteúdo real pronto pra receber tráfego da listagem.
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

## Gotchas resolvidos (contexto / causa-raiz)

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

### Cursor/Noise e performance
Usam `style.setProperty` direto (não state do React) — evita re-render a cada
mousemove/frame. Não converter pra state controlado sem necessidade.
