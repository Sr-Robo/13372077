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
