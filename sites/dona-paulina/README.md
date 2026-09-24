# Fundação Dona Paulina de Souza Queiroz

Site da Fundação Dona Paulina de Souza Queiroz — há mais de 90 anos promovendo
autonomia, inclusão e qualidade de vida para adultos com deficiência
intelectual e TEA, em São Paulo.

**Produção:** https://paulina.on-dig.online

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR) sobre Vite 7
- Tailwind CSS v4 + shadcn/ui (Radix)
- Nitro v3 como camada de servidor — detecta a Vercel pela env `VERCEL` no build
  e emite o Build Output API v3 em `.vercel/output`

Diferente dos outros sites do monorepo, este usa o **server entry padrão** do
TanStack Start: não há `src/server.ts`, e por isso o `tanstackStart()` no
`vite.config.ts` vai sem a opção `server`.

## Rotas

| Arquivo | URL |
| --- | --- |
| `src/routes/index.tsx` | `/` |
| `src/routes/blog.index.tsx` | `/blog` |
| `src/routes/blog.$slug.tsx` | `/blog/:slug` |

Os posts do blog são estáticos e vivem em `src/content/blog.ts` — não há CMS
nem banco. Para publicar um post novo, adicione uma entrada ali.

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
`sites/dona-paulina` e Framework Preset = Other. Nenhuma variável de ambiente
é necessária.

## SEO

O domínio público fica em **um lugar só**: `SITE_URL` em `src/lib/site.ts`.
O helper `siteUrl(path)` monta as URLs absolutas de `og:url`, `canonical` e
`og:image` nas três rotas. **Se o domínio mudar, altere apenas esse arquivo.**

Há JSON-LD em todas as páginas: `NGO` na home e `Article` em cada post. O schema
da home só afirma o que o próprio site afirma — não há endereço, CNPJ nem redes
sociais no conteúdo, então esses campos ficam de fora em vez de serem inventados.

`public/sitemap.xml` lista as 5 URLs e precisa ser atualizado quando um post novo
entrar; `public/robots.txt` aponta para ele.

O `favicon.ico` existia mas não era declarado — o navegador o encontrava sozinho
na raiz, e as variantes de alta resolução e de iOS não existiam. Agora há
`favicon-32`, `favicon-192` e `apple-touch-icon`, este com fundo branco porque o
iOS compõe sobre branco e recorta mal ícones transparentes.

**Correção importante:** o `og:image` dos posts era o caminho relativo que o Vite
gera (`/assets/blog-cover-1-…webp`). Crawler de WhatsApp e Facebook não resolve
URL relativa, então **todo post compartilhado aparecia sem imagem**. Agora sai
absoluto, junto com o `twitter:image` por post — sem ele, o post herdaria a
imagem genérica do site no Twitter/X.

## Arquivos pesados

`public/relatorios/` guarda os relatórios anuais de transparência em PDF
(~30MB no total, o maior com ~10MB) e `public/videos/` três vídeos (~5,5MB).
Ficam versionados no repo e a Vercel os serve como estáticos. Se esse peso
incomodar no clone, o caminho é movê-los para um bucket externo e apontar as
URLs — mas aí a Fundação passa a depender de mais um serviço.

## Notas da migração (Lovable → Vercel)

- As imagens já eram arquivos reais no repo — não havia ponteiros `.asset.json`
  para o CDN do Lovable.
- O `og:image` era um **screenshot de preview do Lovable** hospedado no R2 deles;
  agora é `public/og-image.png`, servido pelo próprio site.
- Os metadados traziam `author: "Lovable"` e `twitter:site: "@Lovable"`;
  foram trocados pelos da Fundação.
- A home não tinha `og:url` nem `canonical` (as rotas do blog tinham); foram
  adicionados.
- Removidas 16 imagens órfãs (~1,4MB), sobras de iterações anteriores do design
  (`community-*`, `comunidade-*`, `real-*`). Continuam recuperáveis no repo
  `donapaulina`.
