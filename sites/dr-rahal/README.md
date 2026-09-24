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

### Domínios

O principal na Vercel é **`www.drrahaltireoide.com`**; o apex
(`drrahaltireoide.com`) responde 308 redirecionando para ele.

`SITE_URL`, em `src/lib/site.ts`, precisa ser **exatamente o domínio principal**,
com www — é ele que alimenta `og:url`, `canonical`, a URL absoluta do `og:image`,
o `sitemap.xml` e o `robots.txt`. Apontar o canonical para uma URL que
redireciona faz o buscador dar um salto a mais e abre espaço para ele escolher
sozinho qual versão indexar.

Se o apex virar o principal na Vercel, `SITE_URL`, o sitemap e o robots mudam
junto.

## Pendências

- **Imagens pesadas.** `dr-rahal-clinic.jpeg` tem 1,8 MB e `dr-rahal-cutout.png`,
  que é o retrato do hero e carrega acima da dobra, tem 1,5 MB. Converter para
  WebP reduziria para uma fração disso sem diferença visível. Não foi feito
  porque mexe no arquivo que o cliente aprovou — vale combinar antes.

## Contato

O WhatsApp e o Instagram ficam em `src/lib/site.ts`, num lugar só, e alimentam
os 9 pontos de contato do site — 6 na home, 3 na listagem do blog e 4 no post.

O número chegou do projeto original como `5511999999999`, nove noves: um exemplo
que nunca foi trocado. Foi substituído pelo número real do consultório. A
mensagem pré-preenchida foi mantida exatamente como estava.

## Rastreamento — OpenAI Ads

O site usa o **Measurement Pixel do OpenAI Ads**. O ID vem de
`VITE_OPENAI_PIXEL_ID`, **sem valor padrão**: vazio, o pixel não carrega e nenhum
evento é enviado. Com o ID embutido no código, um `npm run dev` já registraria
conversão na conta de anúncios e sujaria a otimização da campanha.

Defina a variável **só em Production**, no painel da Vercel. O valor está em
`.env.example`.

### A conversão é o clique no WhatsApp

O site não tem formulário: a conversão é a pessoa abrir a conversa. O evento
enviado é `lead_created` com `{ type: "customer_action" }` — exatamente o payload
que o Ads Manager gerou. Campos fora do esquema da OpenAI não são enviados: um
evento rejeitado some sem aviso, e isso significaria campanha otimizando às cegas.

Os links de WhatsApp estão em 8 lugares, espalhados por 7 componentes. Em vez de
um `onClick` em cada um — mexendo em arquivos aprovados pelo cliente — o evento
sai de **um listener único no documento**, em `OpenAiPixel.tsx`. Nenhum componente
existente foi tocado, e qualquer link de WhatsApp novo já nasce medido.

Verificado em navegador, com ID falso para não tocar na conta real: no
carregamento saem os eventos internos do SDK e, a cada clique, um `lead_created`
com `event_id` próprio. Os 13 links das três rotas foram clicados e geraram 13
eventos — o SDK os agrupa numa requisição só, então contar requisições engana.

### O que o número significa

`lead_created` conta **cliques no WhatsApp**, não conversas iniciadas. Quem clica
e não envia mensagem entra na conta. O número real de leads é sempre menor, e a
diferença só apareceria com confirmação do outro lado — CRM ou API do WhatsApp.
Vale ter isso em mente ao comparar com os atendimentos de fato.

### Conversions API (server-side)

A OpenAI recomenda enviar os mesmos eventos pelo servidor, deduplicando pelo
`event_id`. `trackLeadCreated()` já devolve esse id justamente para isso. Não foi
implementado porque aqui não acrescentaria precisão — não existe um momento de
"lead confirmado" no servidor —, apenas resiliência contra bloqueadores de
anúncio. Se for fazer, a chave é um segredo de servidor e **não** pode usar o
prefixo `VITE_`, que expõe a variável no bundle do navegador.

## SEO

Cada rota declara o seu `canonical` e `og:url` — home, `/blog` e cada post.
Eles **não** ficam no `__root.tsx`: lá valeriam para o site inteiro e diriam ao
Google que o blog e todos os posts são cópias da home, o que os tiraria do
índice.

Há dados estruturados em JSON-LD: `Physician` na home e `Article` em cada post.
Os posts não têm data no conteúdo, então `datePublished` fica de fora em vez de
ser inventado; se as datas forem adicionadas a `src/content/blog.ts`, vale
incluir.

`public/sitemap.xml` lista as 5 URLs e precisa ser atualizado quando um post
novo entrar. `public/robots.txt` aponta para ele.

Os favicons foram gerados a partir de `src/assets/symbol-rahal.png` — o site não
tinha nenhum. O `apple-touch-icon` leva fundo azul-marinho da marca porque o iOS
não respeita transparência e compõe sobre branco, onde o dourado sumiria.

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
