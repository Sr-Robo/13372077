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
│   │   └── LoginHero.tsx    ← sub-header glitch na página de login
│   └── frontStore/checkout/
│       ├── Checkout.jsx, Summary.jsx, CheckoutOverride.scss
├── components/
│   ├── Logo.tsx              ← componente de logo reutilizável
│   ├── PlaceholderNotice.jsx ← filler "Em breve" (.cpk-card/.cpk-placeholder)
│   │                           pra área sem funcionalidade pronta (ver
│   │                           § Pendências de funcionalidade)
│   └── frontStore/catalog/product/list/
│       ├── List.jsx/scss, item/{Name,Price,Thumbnail}.jsx (Name/Thumbnail
│       │   sem link pra produto desde 2026-08-22, ver pendências)
└── (dist/ é gerado por compile — versionado no git)
```

**Mecanismo de descoberta**: componentes em `pages/<rota>/` são descobertos
por `getComponentsByRoute` → `scanRouteComponents` a partir de `dist/`, não
`src/`. Cada componente exporta `{ default, layout: { areaId, sortOrder } }`.
`pages/all/` = todas as páginas.

**`dist/` é versionado** (diferente do fork `www` onde `dist` é ignorado).

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
- [x] Login/Cadastro (override em `components.scss` + `LoginHero.tsx`)
- [x] Página de produto (override em `components.scss`)
- [x] Carrinho (2026-08-20)
- [x] Checkout (2026-08-20)
- [ ] Página estática/CMS (about)
- [ ] Dashboard do cliente (conta/pedidos)
- [ ] Páginas de erro 502/504

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

## Gotchas resolvidos (contexto / causa-raiz)

### Bind mount com container root
Todo `docker run` que monta `repos/*` precisa de `--user 1000:1000`. Container
root muda dono de `dist/` → rsync falha com `Permission denied` → deploy
silenciosamente não aplica. Sintoma: produção fica na versão antiga sem erro
visível. *(Procedimento de recuperação: ver `skills.md`.)*

### Race do watcher de dev com `.scss`
Dois saves quase simultâneos de `.scss` fazem o watcher apagar `dist/styles/`
(corrida no `compileSwc.ts`). Mitigação: salvar `.scss` um por vez com pausa
entre saves. *(Fix rápido de recuperação: ver `skills.md`.)*

### Pushes rápidos / deploys concorrentes
Serializado por `flock` desde 2026-07-30 — segundo disparo é descartado se o
primeiro ainda roda. Sempre confirmar SHA no `deploy.log`.

### EverShop não é SPA
Navegação é reload completo. `PageFade` simula transição com overlay +
fade-out antes do unload — não é roteamento client-side.

### Cursor/Noise e performance
Usam `style.setProperty` direto (não state do React) — evita re-render a cada
mousemove/frame. Não converter pra state controlado sem necessidade.
