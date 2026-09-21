# Dr. Luís Felipe Lopez — Método Elevation®

Landing page do Dr. Luís Felipe Lopez, cirurgião plástico (rejuvenescimento
facial e cirurgia mamária), São Paulo.

**Produção:** https://felipe.on-dig.online

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
`sites/felipe-lopez` e Framework Preset = Other. Nenhuma variável de ambiente
é necessária.

## Notas da migração (Lovable → Vercel)

- As imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram baixadas
  e versionadas aqui como arquivos reais.
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`,
  servido pelo próprio site.
- `BeforeAfterGallery.tsx` e os 19 SVGs em `src/assets/gallery/` **não são
  usados por nenhuma tela** — já era assim no Lovable. Ficaram preservados de
  propósito, porque esses SVGs só existiam no CDN do Lovable. Para usar o
  carrossel, basta importar o componente em `src/routes/index.tsx`.
