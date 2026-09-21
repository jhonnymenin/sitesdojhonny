# Sites do Jhonny

Monorepo dos sites. Cada pasta em `sites/` é um projeto **independente**, com o
próprio `package.json`, o próprio lockfile e a própria stack — nada é
compartilhado entre eles. Não há npm workspaces: os sites vêm de origens
diferentes (Lovable, Astro, Vite) e cada um trava as próprias versões.

Na prática: você roda `npm install` dentro da pasta do site em que vai mexer,
não na raiz.

## Sites

| Pasta | Site | Stack | Produção |
|---|---|---|---|
| [`sites/simposiocita`](sites/simposiocita) | I Simpósio CITA de Doenças Imunomediadas | TanStack Start (React 19, SSR) + Vite 7 + Tailwind v4 | https://simposiocita.com.br |
| [`sites/felipe-lopez`](sites/felipe-lopez) | Dr. Luís Felipe Lopez — Método Elevation® | TanStack Start (React 19, SSR) + Vite 7 + Tailwind v4 | https://felipe.on-dig.online |
| [`sites/bruna-espada`](sites/bruna-espada) | Ateliê Bruna Espada | TanStack Start (React 19, SSR) + Vite 7 + Tailwind v4 | https://bruna.on-dig.online |
| [`sites/projeto-rumo`](sites/projeto-rumo) | Projeto Rumo | TanStack Start (React 19, SSR) + Vite 7 + Tailwind v4 | https://projetorumo.org |

## Trabalhando num site

```sh
cd sites/simposiocita
npm install
npm run dev
```

## Deploy na Vercel

Cada site é um **projeto separado** na Vercel, todos apontando para este mesmo
repositório. O que os distingue é o **Root Directory**:

1. Vercel → Add New → Project → importa `jhonnymenin/sitesdojhonny`
2. Em **Root Directory**, escolhe a pasta do site (ex.: `sites/simposiocita`)
3. **Framework Preset: Other** — o `vercel.json` de cada site define o resto

A Vercel só dispara o build de um projeto quando há mudança dentro do Root
Directory dele, então mexer num site não redeploya os outros.

## Adicionando um site novo

Cada site entra como uma pasta nova em `sites/`, autocontido, e ganha o próprio
projeto na Vercel com o Root Directory apontando pra ele. Nada na raiz precisa
mudar além da tabela acima.

## Migrando um site do Lovable

Os projetos do Lovable saem prontos para Cloudflare Workers e com amarras na
infra deles. O que precisa ser desfeito, em ordem:

1. **Baixar os assets.** As imagens não estão no repo: `src/assets/*.asset.json`
   são ponteiros para o CDN do Lovable (`/__l5e/assets-v1/...`). Baixe cada uma
   da URL ao vivo do projeto **antes** de cortar o vínculo, troque os imports
   para o arquivo real e apague os `.asset.json`. Nos imports, o objeto vira uma
   string: some o acessor `.url` (e qualquer uso de `.asset_id`).
2. **Trocar o alvo do build.** `@lovable.dev/vite-tanstack-config` tem o preset
   Cloudflare fixo no código e não dá para configurar. Substitua por um
   `vite.config.ts` vanilla com `tanstackStart()` + `nitro()` — veja qualquer
   site já migrado. O Nitro detecta a Vercel sozinho pela env `VERCEL`.
3. **Remover o resto do Cloudflare:** `wrangler.jsonc` e `@cloudflare/vite-plugin`.
   Nos templates mais novos (`tanstack_start_ts_current`) esses dois não existem
   — o Lovable chama o nitro direto, ainda com `cloudflare` como alvo padrão.
   Não conclua que o projeto já está pronto para a Vercel só porque não há
   `wrangler.jsonc`: o passo 2 continua valendo.
4. **Conferir recursos externos no `__root.tsx`**: o `og:image` costuma apontar
   para o storage do Lovable (`storage.googleapis.com/gpt-engineer-file-uploads`).
   Baixe para `public/` e aponte para o domínio do próprio site.
5. **Procurar integrações via gateway do Lovable** (`connector-gateway.lovable.dev`,
   Supabase, Google Sheets). Elas quebram fora do Lovable — confirme se estão
   mesmo em uso antes de manter.
6. **Remover a telemetria**, se houver: `src/lib/lovable-error-reporting.ts`
   manda erros de runtime para o editor do Lovable via `window.__lovableEvents`.
   Fora de lá vira no-op, mas é amarra morta — apague o arquivo e a chamada no
   `__root.tsx` (confira se o `useEffect` do import continua sendo usado).
7. **Checar se há `.env` versionado.** O Lovable commita um. Tire do versionamento
   e configure as variáveis no painel da Vercel.
8. **Descartar o que é do Lovable/bun:** `.lovable/`, `AGENTS.md`, `bun.lock`,
   `bunfig.toml`.
9. **Conferir `og:url` e `canonical`.** O Lovable às vezes os emite como `"/"`,
   que crawler nenhum resolve. Troque por URL absoluta do domínio de produção.
10. **Validar antes de publicar:** `npx tsc --noEmit`, `VERCEL=1 npm run build` e
    um smoke test (`node .output/server/index.mjs`) comparando a contagem de
    `<img>`, os blocos de JSON-LD e os textos-chave com o site ainda no ar.

O `npm run lint` costuma acusar centenas de erros de formatação herdados —
são só do Prettier e não quebram o build.
