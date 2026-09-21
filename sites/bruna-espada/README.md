# Ateliê Bruna Espada

Landing page do Ateliê Bruna Espada — micropigmentação, regeneração de
sobrancelhas, despigmentação e estética facial avançada, em São Caetano do Sul.

**Produção:** https://bruna.on-dig.online

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR) sobre Vite 7
- Tailwind CSS v4 + shadcn/ui (Radix)
- Nitro v3 como camada de servidor — detecta a Vercel pela env `VERCEL` no build
  e emite o Build Output API v3 em `.vercel/output`

## Desenvolvimento

```sh
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```sh
npm run build    # build de produção
npm run preview  # serve o build localmente
npm run lint
npm run format
```

## Deploy

Projeto próprio na Vercel, com **Root Directory** apontando para
`sites/bruna-espada` e Framework Preset = Other. Nenhuma variável de ambiente
é necessária.

## SEO

A home traz dois blocos de JSON-LD (`BeautySalon` e `FAQPage`) definidos em
`src/routes/index.tsx`. O `og:url` e o `canonical` vêm da constante `SITE_URL`
no mesmo arquivo — **se o domínio mudar, atualize ali**, porque crawlers não
resolvem caminhos relativos.

**Pendência:** o site não define `og:image`, então links compartilhados no
WhatsApp e no Instagram aparecem sem imagem. Falta uma arte 1200×630 — as
imagens da marca hoje disponíveis têm proporções que não servem.

## Notas da migração (Lovable → Vercel)

- As 5 imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram
  baixadas e versionadas aqui como arquivos reais.
- Removido `src/lib/lovable-error-reporting.ts`, que enviava erros de runtime
  para a telemetria do Lovable via `window.__lovableEvents`.
