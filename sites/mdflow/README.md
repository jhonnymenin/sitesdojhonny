# MDFlow — página de vendas

Landing page institucional da MDFlow ("AI Medical Learning Network"). Uma rota
só, `/`, montada por blocos em `src/components/landing/`.

- **Stack:** TanStack Start (React 19, SSR) + Vite 8 + Tailwind v4 + nitro
- **No ar hoje:** https://lp.mdflow.com.br — **servido pelo Lovable**, não por
  este repositório
- **Origem:** migrado de `jhonnymenin/mdflow-smart-path` em 29/10/2026

## Atenção aos três domínios da MDFlow

São três coisas diferentes, e confundi-las já custaria um deploy no lugar errado:

| Domínio | O que é | Onde vive |
|---|---|---|
| `lp.mdflow.com.br` | **esta** página de vendas | Lovable (ainda) |
| `mdflow.com.br` | outro site — "Estude para o ENAMED" | Lovable, atrás da Cloudflare |
| `app.mdflow.com.br` | o produto | Vercel, projeto `mdflow`, **outro repositório** (`jhonnymenin/mdflow`, branch `release/homologacao-vercel`) |

O projeto `mdflow` que já existe na Vercel **é o app**. Esta landing precisa de
um projeto próprio, com Root Directory `sites/mdflow`.

## O que foi desfeito na migração

Segue o roteiro do [README da raiz](../../README.md). Em resumo:

- As 4 imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram baixadas
  da URL ao vivo e commitadas em `src/assets/`. **Os dois arquivos chamados
  `mdflow-logo-*.png` eram WEBP de verdade** — o nome mentia; aqui estão com a
  extensão certa.
- `@lovable.dev/vite-tanstack-config` saiu. Ele traz o alvo Cloudflare fixo no
  código. No lugar, um `vite.config.ts` vanilla; como existe `src/server.ts`, o
  `tanstackStart` recebe `server: { entry: "server" }`.
- `src/lib/lovable-error-reporting.ts` foi apagado, junto da chamada no
  `__root.tsx`.
- `og:url` e `canonical` vinham como `"/"`, que crawler nenhum resolve. Agora
  saem de `src/lib/site.ts`.
- O `og:image` apontava para um `*.r2.dev` e era um **screenshot de preview do
  editor do Lovable**. Foi substituído por `public/og-image.jpg`, que é a dobra
  do próprio site renderizada — serve, mas é um substituto: se a MDFlow tiver
  arte social própria, troque.
- `lang` era `"en"` com a página inteira em português. Virou `pt-BR`.

## O que ficou de fora

- `src/assets/mdflow-logo-light.webp` e `mdflow-icon-gradient.png` vieram do
  Lovable mas **não são importados por nenhum componente**. Ficaram no repositório
  porque são arte da marca; se continuarem sem uso, podem sair.
- No `Nav.tsx`, a versão clara do logo em dark mode é o logo escuro com
  `brightness-0 invert`, e não o `mdflow-logo-light`. É como estava no ar —
  mantido de propósito, para a migração não mudar o visual.

## Rodando

```sh
npm install
npm run dev
```

Não há variáveis de ambiente, integração externa nem rastreador nesta página.
