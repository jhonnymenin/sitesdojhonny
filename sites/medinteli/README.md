# MedInteli — LP

> ## ⚠️ Esta pasta é um ESPELHO — o site no ar é o do Lovable
>
> A landing continua rodando e sendo gerenciada no Lovable, em
> https://lp.medinteli.com.br. Esta cópia existe para alterações e para uma
> migração futura, **não deve ser publicada na Vercel enquanto isso não mudar**.
>
> Para que o espelho não interfira na operação de lá, **GA4 e Meta Pixel nascem
> desligados**: `VITE_GA4_ID` e `VITE_META_PIXEL_ID` não têm valor padrão. Sem
> elas, nenhum script de rastreamento é carregado e nada é enviado — nem pelo
> navegador, nem pela Conversions API. Verificado no navegador: zero requisições
> para Facebook, Google e Supabase, e `fbq`/`gtag`/`dataLayer` indefinidos.
>
> Isso importa porque os dois snippets ficavam embutidos no `<head>` e disparavam
> antes do React montar: um simples `npm run dev` já mandava `page_view` e
> `PageView` para as contas de produção.
>
> **Quando este virar o site no ar**, preencha o `.env.example` no painel da
> Vercel. Nada mais precisa mudar.

Landing page da MedInteli — automação de atendimento para clínicas médicas via
WhatsApp.

## Stack

Como `sites/so-talentos`, este veio do **template antigo do Lovable**: é um
**Vite SPA** puro, sem SSR (os outros são TanStack Start).

- React + Vite (plugin SWC), Tailwind v3, `react-router-dom`
- `react-helmet-async` para as metas por página
- Vitest configurado

## Rotas

| Arquivo | URL |
| --- | --- |
| `src/pages/Index.tsx` | `/` |
| `src/pages/Privacidade.tsx` | `/politica-de-privacidade` |
| `src/pages/Termos.tsx` | `/termos-de-uso` |
| `src/pages/NotFound.tsx` | catch-all |

## Desenvolvimento

```sh
npm install
npm run dev        # http://localhost:8080
npm test
npm run build      # gera dist/
```

## Deploy

**Não publicado hoje** — ver o aviso no topo. Quando for a hora: **Root
Directory** `sites/medinteli`, Framework Preset = Other.

O `vercel.json` traz o rewrite de tudo para `/index.html`. Aqui ele é ainda mais
importante do que no so-talentos: sem a regra, **`/politica-de-privacidade` e
`/termos-de-uso` devolveriam o 404 da Vercel** — e são páginas que uma operação
com anúncios precisa ter no ar.

### Variáveis de ambiente

Todas começam vazias de propósito; ver `.env.example`.

| Variável | Vazia |
| --- | --- |
| `VITE_GA4_ID` | GA4 não carrega. Valor de produção: `G-R71GQ8HMR7` |
| `VITE_META_PIXEL_ID` | **Pixel e Conversions API desligados.** Valor: `927463216939252` |
| `VITE_SUPABASE_URL` / `_PUBLISHABLE_KEY` / `_PROJECT_ID` | A chamada à Edge Function não acontece |

## Rastreamento

- **GA4** e **Meta Pixel** carregados por `src/lib/analytics.ts`.
- `src/lib/tracking.ts` dispara os eventos de conversão (`Lead` no diagnóstico,
  `Contact` no WhatsApp) no Pixel **e** na Conversions API, com o mesmo
  `event_id` para a Meta deduplicar.
- A **CAPI roda numa Edge Function do Supabase** (`supabase/functions/fb-conversions`),
  não neste site. O token (`FB_CONVERSIONS_API_TOKEN`) fica nas variáveis do
  Supabase, não no código — e a função continua funcionando independentemente de
  onde o front esteja hospedado.

## Supabase

Usado **apenas** para hospedar a Edge Function acima. Não há formulário,
escrita em tabela nem autenticação.

`src/integrations/supabase/` é scaffolding gerado pelo Lovable e **não é
importado por nenhuma tela** — o `tracking.ts` chama a função por `fetch` direto.
Ficou no repo por ser gerado automaticamente e não custar nada no bundle (o
bundler descarta o que ninguém importa), mas atenção: `client.ts` chama
`createClient` com as variáveis de ambiente, então passaria a quebrar se alguém
o importasse sem configurá-las.

## Notas da migração (Lovable → Vercel)

- O `.env` **estava versionado** no repo de origem (privado) com as chaves do
  Supabase. Como o `sitesdojhonny` é público, ele não foi trazido: entrou no
  `.gitignore` e virou `.env.example` sem valores. As chaves são
  publishable/anon, mas num repo público ficariam indexáveis e coladas ao nome
  do projeto.
- Removidos `lovable-tagger` (o `componentTagger` do `vite.config.ts`), `.lovable/`
  e os lockfiles do bun.
- Removidas 7 imagens sem uso (~860 KB, a maior parte em `whatsapp-mockup.png`)
  e o `placeholder.svg` de boilerplate.
- As metas já vinham corretas: `canonical`, `og:url` e `og:image` absolutos,
  `og:locale`, `og:site_name` e `author` próprios. `robots.txt` e `sitemap.xml`
  também apontam para o domínio certo.
- **Sugestão não aplicada:** o `sitemap.xml` lista só a raiz; as duas páginas
  legais ficaram de fora.
