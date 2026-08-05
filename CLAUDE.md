# Tema Cyberpunk (13372077) — contexto para o Claude Code

Tema EverShop da loja `sr.robo.net.br`. Repositório: `Sr-Robo/13372077`.
Referência visual: CyberPulse (`wp.nkdev.info/cyberpulse/shop`) — inspiração
de estrutura/efeitos, nunca cópia de código/assets. Paleta e identidade são
próprias (marca `#bd00ff`, fundo `#050505`, fonte Purista).

Contexto completo de infra/servidor: `~/server/CLAUDE.md` e `~/server/docs/`.
**Não leia esses docs a menos que a tarefa exija algo de infra** — este
arquivo tem tudo que você precisa para trabalho de tema/layout.

## Fluxo de comando (herdado do servidor)

Toda vez que precisar que o fxlip rode algo:
```
Rode:
sudo bash /caminho/script.sh
```
Formato fixo de 2 linhas. Scripts completos (nunca heredoc nem comandos soltos).

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
│   │   ├── EveryWhere.tsx ← retorna null (limpo)
│   │   └── OffcanvasToggle.jsx
│   ├── homepage/
│   │   └── OnlyHomePage.tsx ← hero com glitch + botões
│   ├── login/
│   │   └── LoginHero.tsx    ← sub-header glitch na página de login
│   └── frontStore/checkout/
│       ├── Checkout.jsx, Summary.jsx, CheckoutOverride.scss
├── components/
│   ├── Logo.tsx           ← componente de logo reutilizável
│   └── frontStore/catalog/product/list/
│       ├── List.jsx/scss, item/{Name,Price,Thumbnail}.jsx
└── (dist/ é gerado por compile — versionado no git)
```

**Mecanismo do EverShop**: componentes em `pages/<rota>/` são descobertos por
`getComponentsByRoute` → `scanRouteComponents` a partir de `dist/`, não `src/`.
Cada componente exporta `{ default, layout: { areaId, sortOrder } }`.
`pages/all/` = todas as páginas.

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
| Prefixo CSS | `cpk-` (classes: `cpk-btn`, `cpk-card`, `cpk-display`, `cpk-glitch`…) |

## Convenções

- **Classe CSS sempre com prefixo `cpk-`** — separa do core e de extensões.
- **Zero dependência de terceiros** — só SVGs próprias e Purista self-hosted.
- **Tailwind é a base CSS** (já vem do core do EverShop).
- **`dist/` é versionado** (diferente do fork `www` onde `dist` é ignorado).
- **Header/Footer: só CSS override** — são importados em `Base.tsx` dentro de
  `CartProvider`; componente com `areaId: 'body'` que os substituísse ficaria
  fora do provider tree → crash (`useCartState must be used within CartProvider`),
  HTTP 500 silencioso. Usar áreas do EverShop (`headerMiddleCenter`,
  `footerBottom`) pra injetar conteúdo.
- **Mudança só vale commitada e pushada** — `repos/www` e `repos/13372077` no
  servidor são o working tree do deploy. Push em qualquer um reseta os DOIS
  (`git reset --hard`). Commit local não pushado é descartado sem aviso.
- **Fonte Purista é "Personal Use Only"** — comprar licença antes de operar
  comercialmente.

## Gotchas

1. **Página nova não aparece sem compilar** — EverShop escaneia `dist/`, não
   `src/`. Rodar `npm run compile` (`tsc` + `copyfiles`). Em produção o deploy
   recompila automaticamente; em dev local, precisa rodar manualmente.

2. **Bind mount com container root quebra o deploy** — todo `docker run` que
   monta `repos/*` precisa de `--user 1000:1000`. Container root muda dono de
   `dist/` → rsync falha com `Permission denied` → deploy silenciosamente não
   aplica. Sintoma: produção fica na versão antiga sem erro visível.

3. **Race do watcher de dev com `.scss`** — dois saves quase simultâneos de
   `.scss` fazem o watcher apagar `dist/styles/` (corrida no `compileSwc.ts`).
   Fix rápido: `mkdir -p .../dist/styles && cp .../src/styles/*.scss .../dist/styles/`.
   Mitigação: salvar `.scss` um por vez com pausa entre saves.

4. **Pushes rápidos**: serializado por `flock` desde 2026-07-30 — segundo
   disparo é descartado se o primeiro ainda roda. Confirmar SHA no `deploy.log`.

5. **EverShop não é SPA** — navegação é reload completo. PageFade simula
   transição com overlay + fade-out antes do unload.

6. **Cursor/Noise usam `style.setProperty` direto** (não state do React) —
   evita re-render a cada mousemove/frame.

## Build e teste local

```bash
# Compilar o tema (gera dist/ a partir de src/)
npm run compile    # = tsc && copyfiles -u 1 "src/**/*.{graphql,scss,json}" dist

# Container de dev (live reload, só na tailnet)
docker run -d --rm --name evershop-dev \
  --network ecommerce \
  -p 100.94.54.16:8090:3000 \
  -v ~/server/repos/www:/app \
  -e DB_NAME=evershop -e DB_USER=evershop \
  -e DB_PASSWORD="$(grep '^DB_PASSWORD=' ~/server/stacks/ecommerce/.env | cut -d= -f2-)" \
  -e DB_HOST=database -e DB_PORT=5432 -e NODE_ENV=development -e HOME=/tmp \
  -u 1000:1000 \
  node:18-alpine sh -c "npm run dev"

# Screenshot headless pra validar
docker run --rm -v /tmp/scratchpad:/work zenika/alpine-chrome \
  --no-sandbox --headless --disable-gpu \
  --screenshot=/work/out.png --window-size=1440,900 \
  "http://100.94.54.16:8090/pagina"

# Build de produção isolado (preview sem tocar produção)
docker compose -f ~/server/stacks/ecommerce/docker-compose.yml build
```

**Iterar CSS rápido**: montar `.html` standalone no scratchpad com só o
HTML/CSS do componente → renderizar com headless Chrome → inspecionar PNG.
Muito mais rápido que rebuild completo pra micro-ajuste visual.

## Estado das páginas (Fase 2)

- [x] Listagem `/shop` (extensão `catalog_shop` no fork `www`, não no tema)
- [x] Header + Logo (CSS override + Logo.jsx em `headerMiddleCenter`)
- [x] Footer (CSS override em `effects.scss`)
- [x] Home (hero com glitch em `OnlyHomePage.tsx`)
- [x] Login/Cadastro (override em `components.scss` + `LoginHero.tsx`)
- [x] Página de produto (override em `components.scss`)
- [ ] Carrinho
- [ ] Checkout
- [ ] Página estática/CMS (about)
- [ ] Dashboard do cliente (conta/pedidos)
- [ ] Páginas de erro 502/504

Fases 3 (interação/scroll-reveal) e 4 (responsivo/acessibilidade/performance)
ainda não iniciadas.

## Docs completos (só se precisar)

| Doc | Quando consultar |
|---|---|
| `~/server/docs/tema-cyberpunk.md` | Histórico detalhado de decisões, ato 1, referência de design |
| `~/server/docs/ecommerce.md` | Build do EverShop, Dockerfile custom, extensões, admin |
| `~/server/docs/deploy-webhook.md` | Pipeline de deploy, webhooks, gotchas de push |
| `~/server/CLAUDE.md` | Infra do servidor (só se a tarefa envolver infra) |
