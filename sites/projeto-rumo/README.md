# Projeto Rumo

Landing page do Projeto Rumo — apoio a estudantes de Medicina para permanecerem
na graduação, com auxílio financeiro, mentorias e acompanhamento contínuo.

**Produção:** https://projetorumo.org

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
`sites/projeto-rumo` e Framework Preset = Other. Nenhuma variável de ambiente
é necessária.

## SEO

O `og:url` e o `canonical` vêm da constante `SITE_URL` em `src/routes/index.tsx`
— **se o domínio mudar, atualize ali**, porque crawlers não resolvem caminhos
relativos. O `og:image` fica em `public/og-image.png` e é referenciado por URL
absoluta em `src/routes/__root.tsx`.

## Notas da migração (Lovable → Vercel)

- Diferente dos outros sites migrados, as imagens já eram arquivos reais no
  repo — não havia ponteiros `.asset.json` para o CDN do Lovable.
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`,
  servido pelo próprio site.
- Removidos 4 `stock-*.jpg` soltos na raiz do repo (~1MB), que não eram
  referenciados por nenhuma tela.
