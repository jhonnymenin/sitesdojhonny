# Outubro Prateado 2026

Landing page do movimento nacional Outubro Prateado — longevidade com saúde,
autonomia, conexão, protagonismo e respeito, com o Prof. Dr. Wilson Jacob Filho
como Embaixador Científico.

**Produção:** https://outubroprata.on-dig.online

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR) sobre Vite 7
- Tailwind CSS v4 + shadcn/ui (Radix)
- Nitro v3 — detecta a Vercel pela env `VERCEL` no build

## Desenvolvimento

```sh
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Deploy

Projeto próprio na Vercel, com **Root Directory** apontando para
`sites/outubro-prateado` e Framework Preset = Other. Nenhuma variável de ambiente.

## SEO

`SITE_URL` em `src/lib/site.ts` alimenta `og:url` e `canonical` — **se o domínio
mudar, altere só esse arquivo**. Os dois não existiam antes da migração e foram
adicionados, junto com `og:locale`.

**Pendência:** o site não define `og:image`, então links compartilhados saem sem
imagem. A foto do hero (`src/assets/hero-couple.jpg`) daria uma boa arte 1200×630.

## Auditoria

Sem rastreadores (GA, GTM, Meta Pixel, TikTok, LinkedIn, Hotjar, Clarity,
PostHog, Mixpanel), sem backend, sem formulário, sem `.env` e sem segredos no
histórico. Os CTAs são links externos.

## Notas da migração (Lovable → Vercel)

- As 2 imagens que eram ponteiros `.asset.json` para o CDN do Lovable foram
  baixadas e versionadas aqui.
- Removido `src/lib/lovable-error-reporting.ts`, a telemetria do editor.
- Config vanilla do TanStack Start + `nitro/vite` no lugar do wrapper do Lovable.
- `lang` passou para `pt-BR` e `ErrorComponent` para `ErrorComponentProps`.

## Ajustes de acabamento

Três defeitos concretos, não uma reformulação — o desenho editorial do site já
estava resolvido:

**1. O logo desenhava uma caixa branca.** O arquivo era um JPEG (sem canal alfa)
com fundo branco e margem larga em volta da arte, então aparecia como um
retângulo branco sobre o creme do site, no header e no rodapé. Virou PNG:
margem recortada e branco do papel convertido em transparência. A arte não foi
redesenhada nem recolorida — inclusive o limiar foi calibrado para preservar o
terceiro ponto do logo (o mais claro, ≈#f0f0f0), que uma conversão mais
agressiva apagava. Como a margem saiu, o logo também ficou maior na mesma altura
de CSS.

**2. A navegação não limpava o item ativo.** O scroll-spy reagia a cada entrada
do `IntersectionObserver` isoladamente: com duas seções cruzando a faixa central
ao mesmo tempo, vencia a que chegasse por último, e ao voltar ao topo — onde
nenhuma seção do menu está visível — o último item continuava sublinhado. Agora
o observer mantém o conjunto do que está visível e escolhe a primeira seção na
ordem do menu, limpando quando não há nenhuma.

**3. A faixa de retratos ficava irregular.** Os quadros tinham **largura** fixa,
e como a tira mistura retratos (3/4) com paisagens (3/2), cada um terminava numa
altura diferente e a linha ficava serrilhada. Invertido: altura fixa, largura
derivada da proporção. A base alinha e a variação passa a ser de largura, que é
o que dá ritmo à tira.
