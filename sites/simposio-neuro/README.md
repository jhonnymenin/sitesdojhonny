# 1º Simpósio Técnico e Prático de Neurociência da Memória

> ## ⚠️ Esta pasta é um ESPELHO — o site no ar é o do Lovable
>
> O site continua rodando e sendo gerenciado no Lovable, em
> https://simposioneuro.on-dig.online. Esta cópia existe para alterações e para
> uma migração futura, **não deve ser publicada na Vercel enquanto isso não mudar**.
>
> Para que o espelho não interfira na operação de lá, o rastreamento nasce
> **desligado**: `VITE_META_PIXEL_ID` não tem valor padrão. Sem ela, o Pixel não é
> sequer inicializado e nenhum evento sai — nem do navegador, nem da Conversions
> API. Verificado com o navegador: zero requisições ao Facebook e `window.fbq`
> indefinido.
>
> Isso importa porque o Pixel é o de produção. Com o ID embutido no código, um
> simples `npm run dev` já mandaria `PageView` e `ViewContent` para a campanha real.
>
> **Quando este virar o site no ar**, defina as variáveis do `.env.example` no
> painel da Vercel. Nada mais precisa mudar.

Landing page do simpósio da On Educação — 5 de dezembro de 2026, Centro de
Convenções Millenium, São Paulo.

**Produção:** https://simposioneuro.on-dig.online

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

## Deploy

**Não publicado hoje** — ver o aviso no topo. Quando for a hora: projeto próprio
na Vercel, **Root Directory** `sites/simposio-neuro`, Framework Preset = Other.

### Variáveis de ambiente

Diferente dos outros sites do monorepo, **este precisa de variáveis**. Todas
começam vazias de propósito; ver `.env.example`.

| Variável | Para quê | Vazia |
| --- | --- | --- |
| `VITE_META_PIXEL_ID` | ID do Pixel (build-time) | **Rastreamento inteiro desligado** — Pixel e CAPI. É o que mantém o espelho inofensivo. Valor de produção: `553465707797085` |
| `META_CAPI_ACCESS_TOKEN` | Conversions API (server-side) | O endpoint responde 204 e não envia nada |
| `LOVABLE_API_KEY` | Gateway do Lovable para a planilha de leads | Lead não é gravado (a compra segue normalmente) |
| `GOOGLE_SHEETS_API_KEY` | Chave da conexão Google Sheets no gateway | Idem |

## Rastreamento (Meta Pixel + Conversions API)

O tracking é a parte mais elaborada deste projeto e vive em
`src/lib/meta-pixel.ts` e `src/routes/api/public/meta-capi.ts`.

**Pixel ID: `553465707797085`** (IDs de pixel são públicos por natureza).

Cada evento é disparado **duas vezes de propósito**: pelo `fbq()` no navegador e
pela Conversions API no servidor, ambos com o mesmo `event_id`. A Meta deduplica
o par e conta uma conversão só. Isso mantém a medição de pé mesmo quando o
navegador bloqueia o pixel.

Eventos automáticos (`src/components/landing/MetaPixel.tsx`): `PageView`,
`ViewContent`, `ScrollDepth` (25/50/75/90%) e, por seção visível, `ViewSpeakers`,
`ViewSchedule`, `ViewPricing` e `FindLocation`.

Eventos de clique: `PreLead` (abre o formulário), `Lead` (envia nome e telefone),
`InitiateCheckout` (vai para o pagamento) e `Contact` (WhatsApp).

O endpoint da CAPI só aceita eventos de uma lista fechada e **não recebe PII** —
só nome do evento, `event_id` e os identificadores de navegador da Meta
(`_fbp`/`_fbc`). IP e user-agent são lidos do próprio request.

> **Nota da migração:** o IP era lido de `cf-connecting-ip`, header exclusivo da
> Cloudflare, onde o projeto rodava antes. Na Vercel passou a ser `x-real-ip`,
> com `x-forwarded-for` como alternativa. O IP influencia a taxa de
> correspondência da Meta, então vale conferir se algum dia mudar de hospedagem.

## Captura de leads

`src/lib/leads.functions.ts` grava nome e telefone numa planilha Google
(recuperação de carrinho), **através do gateway do Lovable**
(`connector-gateway.lovable.dev`).

Essa é a única amarra com o Lovable que sobrou, e ela é frágil: o gateway é
infraestrutura deles, pensada para projetos hospedados lá. Pode parar de
responder a qualquer momento fora da plataforma.

O impacto é limitado de propósito: a gravação é *best-effort*, dentro de um
`try/finally`. Se falhar, **o usuário segue para o checkout normalmente** — perde-se
o lead, não a venda.

Planilha: `1V1se6MeBuiChFf98ueWhzWqKtvp-y5ROHkMJpS7t6DI`, aba `Leads`.

## Notas da migração (Lovable → Vercel)

- As imagens já eram arquivos reais — não havia ponteiros `.asset.json`.
- Nenhum `.env` versionado e **nenhum segredo no histórico do git** (auditado).
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`.
- Os metadados traziam `author: "Lovable"` e `twitter:site: "@Lovable"`.
- Removidos 2 componentes e 2 imagens sem uso (~284 KB).
- O botão principal ("GARANTA SUA VAGA") ficava 5 px cortado em telas de 360 px;
  passou a ocupar a largura total no mobile.
