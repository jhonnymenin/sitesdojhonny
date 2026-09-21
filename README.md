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
