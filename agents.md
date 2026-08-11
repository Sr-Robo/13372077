@../../docs/frentes/agents-comum.md

# Regras de agente — Front (tema Cyberpunk)

Regras sempre válidas ao mexer neste repo. Fatos/arquitetura estão em
`memory.md`; procedimentos e comandos em `skills.md` (leia sob demanda,
não são importados automaticamente).

- **Classe CSS sempre com prefixo `cpk-`** — separa do core do EverShop e de
  extensões (`cpk-btn`, `cpk-card`, `cpk-display`, `cpk-glitch`…).
- **Zero dependência de terceiros** — só SVGs próprias e a fonte Purista
  self-hosted. Tailwind é a base CSS (já vem do core, não conta como
  dependência nova).
- **Header/Footer: só CSS override, nunca componente com `areaId: 'body'`**
  — eles são importados em `Base.tsx` dentro do `CartProvider`; um componente
  de área `body` que os substituísse ficaria fora do provider tree e quebra
  em runtime (`useCartState must be used within CartProvider`, HTTP 500
  silencioso). Usar as áreas do EverShop (`headerMiddleCenter`,
  `footerBottom`) pra injetar conteúdo.
- **Mudança só vale commitada e pushada** — este repo é o working tree do
  deploy; push (aqui ou em `repos/www`) reseta os DOIS com `git reset --hard`.
  Commit local não pushado é descartado sem aviso. Detalhe: `skills.md` e
  `~/server/docs/deploy-webhook.md`.
- **Página nova exige `npm run compile` antes de valer** — o EverShop
  descobre componentes escaneando `dist/`, não `src/`. Em dev local, rodar
  manualmente; em produção o deploy já recompila.
- **Fonte Purista é "Personal Use Only"** — comprar licença antes de operar
  a loja comercialmente. Não assumir liberação sem confirmar com o fxlip.
- **Referência de design**: a página 502 no git log é mais autoritativa que
  o CyberPulse externo (inspiração, nunca cópia de código/assets).
