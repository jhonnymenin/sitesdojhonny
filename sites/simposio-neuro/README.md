# 1º Simpósio Técnico e Prático de Neurociência da Memória

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

Projeto próprio na Vercel, com **Root Directory** apontando para
`sites/simposio-neuro` e Framework Preset = Other.

### Variáveis de ambiente (obrigatórias)

Diferente dos outros sites do monorepo, **este precisa de variáveis** para
funcionar por completo. Configure no painel da Vercel:

| Variável | Para quê | Sem ela |
| --- | --- | --- |
| `META_CAPI_ACCESS_TOKEN` | Meta Conversions API (eventos server-side) | O endpoint responde 204 e não envia nada; só o Pixel do navegador continua funcionando |
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
