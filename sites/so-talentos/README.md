# Agência Só Talentos — LP de vendas

Landing page da Agência Só Talentos, agenciamento e contratação de artistas
para eventos em todo o Brasil.

**Produção:** https://lp.sotalentos.com.br

## Stack

Diferente dos outros sites do monorepo, **este não é TanStack Start**: é um
**Vite SPA** puro, do template antigo do Lovable.

- React 19 + Vite 7 (plugin SWC) — SPA estático, sem SSR
- `react-router-dom` com rota única (`/`) e catch-all para a 404
- Tailwind CSS **v3** (`tailwind.config.ts` + PostCSS) — os outros usam v4
- Framer Motion nas animações de entrada
- Vitest para testes unitários, Playwright configurado

## Desenvolvimento

```sh
npm install
npm run dev        # http://localhost:8080
npm test           # vitest
npm run build      # gera dist/
npm run preview
```

## Deploy

Projeto próprio na Vercel, com **Root Directory** apontando para
`sites/so-talentos` e Framework Preset = Other. Nenhuma variável de ambiente.

O `vercel.json` traz uma peça que os outros sites não precisam:

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

Sem isso, **qualquer URL que não seja a raiz devolveria o 404 da Vercel** em vez
da página de 404 do app: o roteamento é todo no cliente, e o servidor só tem
`index.html`. A regra roda depois da checagem de arquivos, então os assets
estáticos continuam sendo servidos normalmente.

## Auditoria (sem rastreamento)

Varrido por Google Analytics/gtag, GTM, Meta Pixel, TikTok, LinkedIn Insight,
Hotjar, Clarity, PostHog, Mixpanel, Amplitude e Segment: **nenhum**. Também não
há backend, formulário com envio, webhook ou integração via gateway do Lovable.
Nenhum `.env` versionado e nenhum segredo no histórico do git.

Os contatos saem por links diretos de WhatsApp e Instagram.

## Imagens externas (Unsplash)

Três seções carregam fotos direto do CDN do Unsplash, por hotlink:

| Seção | Arquivo |
| --- | --- |
| Sobre | `AboutSection.tsx` |
| Diferenciais | `DifferentialsSection.tsx` |
| CTA final | `FinalCTASection.tsx` |

Funciona, mas o site depende do Unsplash continuar no ar e das URLs seguirem
válidas — e as imagens não passam pela otimização do build. Baixá-las para
`src/assets/` remove a dependência; fica como sugestão, não foi feito.

## Notas da migração (Lovable → Vercel)

- Template antigo do Lovable (Vite SPA), então o caminho foi diferente: sem
  Cloudflare, sem nitro, sem `wrangler.jsonc`.
- Removidos `lovable-tagger` (o `componentTagger` do `vite.config.ts`) e os
  plugins `@lovable.dev/vite-plugin-dev-server-bridge` e `-hmr-gate`.
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`.
- `canonical` e `og:url` eram `"/"`, que crawler nenhum resolve; viraram URLs
  absolutas. Acrescentados `og:site_name` e `og:locale`.
- Removida `src/assets/icon-so-talentos.png`, sem uso.
- **Corrigida rolagem horizontal no mobile** (25 px a 360 px de largura): as
  animações de entrada do Framer Motion começam deslocadas para a direita
  (`initial={{ x: 30 }}` em `DifferentialsSection`) e empurravam a página
  enquanto não entravam em viewport. O título do hero, com
  `clamp(2.5rem, 8vw, 6.5rem)`, também encosta na borda em telas estreitas.
  Resolvido com `overflow-x: clip` em `html, body` — `clip` e não `hidden`,
  porque `hidden` cria contexto de rolagem e quebra `position: sticky`.
