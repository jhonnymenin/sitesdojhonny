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

O post do blog emite JSON-LD (`Article`). A home ainda não tem dados
estruturados — um schema `NGO`/`Organization` ali ajudaria na busca.

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
