# Skills — Front (tema Cyberpunk)

Procedimentos reaplicáveis e comandos prontos. Consultado sob demanda (não é
importado automaticamente pelo `CLAUDE.md`).

## Compilar o tema

Gera `dist/` a partir de `src/` — obrigatório depois de criar/mover qualquer
componente ou editar SCSS:

```bash
npm run compile    # = tsc && copyfiles -u 1 "src/**/*.{graphql,scss,json}" dist
```

## Container de dev (live reload)

Sobe uma instância de dev apontando pro banco real, acessível só pela tailnet:

```bash
docker run -d --rm --name evershop-dev \
  --network ecommerce \
  -p 100.94.54.16:8090:3000 \
  -v ~/server/repos/www:/app \
  -e DB_NAME=evershop -e DB_USER=evershop \
  -e DB_PASSWORD="$(grep '^DB_PASSWORD=' ~/server/stacks/ecommerce/.env | cut -d= -f2-)" \
  -e DB_HOST=database -e DB_PORT=5432 -e NODE_ENV=development -e HOME=/tmp \
  -u 1000:1000 \
  node:20-alpine sh -c "cd /app && npm run dev"
```

⚠️ **Sempre `--user 1000:1000`** — container root quebra o dono de `dist/`
e o deploy silenciosamente para de aplicar (ver `memory.md § Bind mount`).

## Screenshot headless

Validar visualmente uma página sem abrir navegador:

```bash
docker run --rm -v /tmp/scratchpad:/work zenika/alpine-chrome \
  --no-sandbox --headless --disable-gpu \
  --screenshot=/work/out.png --window-size=1440,900 \
  "http://100.94.54.16:8090/pagina"
```

⚠️ **Janela alta (≥~1600px) exige `--shm-size`** (2026-08-26): sem ele o
chrome não imprime nada e o `docker run` pendura até o timeout — sintoma
silencioso, só sai um "Terminado" quando morre. Usar
`docker run --rm --shm-size=256m … --window-size=1440,2400 …`.

⚠️ **Este chrome cru NÃO serve pra /cart nem /checkout** — essas páginas
renderizam a partir do carrinho da SESSÃO (cookie `sid` → coluna `cart.sid`
no Postgres). Sem cookie, sempre caem no `ShoppingCartEmpty` ("Seu carrinho
está vazio"). Pra printar essas páginas CHEIAS, use `server dev shot` abaixo.

## Screenshot COM carrinho cheio — `server dev shot` (2026-09-01)

Pra printar `/cart`, `/checkout` (ou qualquer rota) com um carrinho populado,
reproduzível e sem deixar rastro no banco:

```bash
server dev shot            # default: /cart
server dev shot /checkout  # outra rota
```

Saída em `/tmp/scratchpad/shot-<rota>.png`. Requer `server dev on` no ar.
O script (`~/server/scripts/dev-shot.js`, roda dentro de
`ghcr.io/puppeteer/puppeteer`, rede `ecommerce`): ganha uma sessão → semeia
itens via `POST /api/cart/mine/items` (fetch **relativo**, cookie same-origin)
→ printa → **zera o carrinho no fim** (remove via `DELETE`, o `saveCart`
deleta a linha do `cart` ao zerar). Env: `SHOT_SEED="SKU:qty,SKU:qty"`,
`SHOT_W`, `SHOT_H` (janela fixa; ausente = full-page), `SHOT_FORCE=1`
(re-semeia), `SHOT_KEEP_CART=1` (não apaga no fim). SKUs de teste válidos:
`C-0008` (Camisa Umbreon), `CAP-0001` (Boné), `B-0002` (Bag), `D-0001`
(Cyberdeck). Detalhe do mecanismo e gotchas: `memory.md § Carrinho por sessão`.

## Encher o carrinho da SUA sessão no browser (ajuste fino ao vivo)

Pra iterar CSS de `/cart` ao vivo (editar `.scss` em `src/` → F5), o carrinho
precisa estar cheio na SUA sessão. **Não dá pra clicar "adicionar" na UI do
dev** — os botões apontam pra URL absoluta `beta.robo.net.br` (ver `memory.md
§ Carrinho por sessão`). Cole no console (F12) da aba do dev — caminho
relativo, bate no próprio dev, e o carrinho fica persistido (sobrevive a F5 e
restart do container):

```js
(async()=>{for(const[sku,qty]of[['C-0008',1],['CAP-0001',1],['B-0002',1]])await fetch('/api/cart/mine/items',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sku,qty})});location.reload()})();
```

(IIFE async — `await` solto no console dá `SyntaxError: await is only valid
in async functions`.)

⚠️ **Refs `~/refs/cyberpulse/cyberpulse/*.html` não renderizam cruas**:
são espelhos wget de páginas WordPress com scripts/fonts externos que
penduram o load. Renderizar via cópia higienizada: strip de
`<script>`/`<iframe>`/`<link>`-externo, neutralizar `src|href="http…"`
→ `data:,` (também `url()`/`@import` http dentro dos `*_arquivos/*.css`)
e abrir por `file://`.

## Build de produção isolado

Preview da build sem afetar produção (só compila a imagem):

```bash
docker compose -f ~/server/stacks/ecommerce/docker-compose.yml build
```

## Iterar CSS rápido

Pra micro-ajustes visuais sem rebuild completo: montar um `.html` standalone
no scratchpad com só o HTML/CSS do componente → renderizar com headless Chrome
(comando acima) → inspecionar PNG. Muito mais rápido que rebuild.

## Fix rápido: race do watcher apagou `dist/styles/`

Quando o watcher de dev apaga `dist/styles/` por corrida de saves simultâneos:

```bash
mkdir -p repos/13372077/dist/styles
cp repos/13372077/src/styles/*.scss repos/13372077/dist/styles/
```

Mitigação permanente: salvar `.scss` um por vez com pausa entre saves.
