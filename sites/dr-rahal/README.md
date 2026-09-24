# Dr. Antônio Rahal — Ablação por Radiofrequência

Landing page do Dr. Antônio Rahal, referência em ablação de tireoide,
paratireoide e linfonodos cervicais.

**Produção:** https://drrahaltireoide.com

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR) sobre Vite 7
- Tailwind CSS v4 + shadcn/ui (Radix), Framer Motion
- Nitro v3 — detecta a Vercel pela env `VERCEL` no build

## Rotas

| Arquivo | URL |
| --- | --- |
| `src/routes/index.tsx` | `/` |
| `src/routes/blog.index.tsx` | `/blog` |
| `src/routes/blog.$slug.tsx` | `/blog/:slug` |

Os posts são estáticos, em `src/content/` — não há CMS nem banco.

## Desenvolvimento

```sh
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Deploy

Projeto próprio na Vercel, **Root Directory** `sites/dr-rahal`, Framework
Preset = Other. Nenhuma variável de ambiente por enquanto.

### Dois domínios

O site vai responder por mais de um domínio, de provedores diferentes. O
canônico é `SITE_URL`, em `src/lib/site.ts` — é o que alimenta `og:url`,
`canonical` e a URL absoluta do `og:image`.

Os demais domínios devem **redirecionar** para o canônico, não servir o mesmo
conteúdo: dois domínios entregando a mesma página dividem a autoridade de SEO e
o Google escolhe sozinho qual indexar. Na Vercel isso se resolve adicionando o
domínio ao projeto e marcando "Redirect to" apontando para o principal.

## Pendências

- **O WhatsApp é um número de exemplo.** `WHATSAPP_URL` em `src/lib/site.ts`
  aponta para `5511999999999` — nove noves. Veio assim do projeto original.
  Enquanto não for trocado, **todos os CTAs de contato levam a um número
  inexistente**, e eles são o objetivo da página inteira.
- **Pixel e analytics** ainda não existem no projeto. Quando entrarem, manter os
  IDs em variável de ambiente, não embutidos no código — ver o `CLAUDE.md` da
  raiz do monorepo.
- O site não tem `sitemap.xml` nem `robots.txt`.

## Notas da migração (Lovable → Vercel)

Migração conservadora: o desenho e o conteúdo vieram de muitas rodadas com o
cliente, então **nada de layout, texto ou comportamento foi alterado**. Foram
tocados só 8 arquivos, e nenhum arquivo do original ficou para trás — conferido
comparando o hash de cada blob com o repositório de origem.

- As 9 imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram
  baixadas e versionadas aqui (tamanhos conferidos byte a byte) e os imports
  passaram a apontar para os arquivos reais. `RahalMascot.tsx` usava o formato
  `(asset as AssetPointer).url`; a interface `AssetPointer` saiu junto, porque
  só existia para tipar o ponteiro do CDN.
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`.
- Os metadados traziam `author: "Lovable"` e `twitter:site: "@Lovable"`.
  Acrescentados `og:url`, `canonical`, `og:site_name` e `og:locale`, que não
  existiam.
- `lang` passou para `pt-BR`; `ErrorComponent` passou a usar `ErrorComponentProps`.

### Imagens não referenciadas

Cinco imagens não são importadas por nenhuma tela:

| Arquivo | Observação |
| --- | --- |
| `rahal-welcome.png` | a pose `welcome` do mascote reaproveita `rahal-wave` |
| `rahal-present.png` | a pose `present` reaproveita `rahal-point` |
| `rahalzin.png` | — |
| `dr-rahal-portrait.jpeg` | o hero usa `dr-rahal-cutout.png` |
| `logo-rahal.png` | o rodapé usa `logo-rahal-full.png` |

**Foram mantidas de propósito.** Estavam no projeto original, e as três primeiras
só existiam no CDN do Lovable — apagá-las seria perda definitiva. Como o site
veio de muitas rodadas com o cliente, o critério aqui foi não remover nada que
ele possa querer de volta. Elas não entram no bundle: o Vite só inclui o que é
importado, então não pesam no site, apenas no repositório (~1,8 MB).
