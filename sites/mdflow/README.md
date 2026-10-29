# MDFlow — página de vendas

Landing page de conversão para estudantes de Medicina que vão prestar o ENAMED.
Uma rota só, `/`, montada por blocos em `src/components/landing/`.

Era uma página institucional voltada a investidores e parceiros até 29/10/2026,
quando a MDFlow pediu a virada para captação de cadastro — ver a seção
"A reformulação" abaixo.

- **Stack:** TanStack Start (React 19, SSR) + Vite 8 + Tailwind v4 + nitro
- **No ar hoje:** https://lp.mdflow.com.br — **servido pelo Lovable**, não por
  este repositório
- **Origem:** migrado de `jhonnymenin/mdflow-smart-path` em 29/10/2026

## Atenção aos três domínios da MDFlow

São três coisas diferentes, e confundi-las já custaria um deploy no lugar errado:

| Domínio | O que é | Onde vive |
|---|---|---|
| `lp.mdflow.com.br` | **esta** página de vendas | Lovable (ainda) |
| `mdflow.com.br` | outro site — "Estude para o ENAMED" | Lovable, atrás da Cloudflare |
| `app.mdflow.com.br` | o produto | Vercel, projeto `mdflow`, **outro repositório** (`jhonnymenin/mdflow`, branch `release/homologacao-vercel`) |

O projeto `mdflow` que já existe na Vercel **é o app**. Esta landing precisa de
um projeto próprio, com Root Directory `sites/mdflow`.

## O que foi desfeito na migração

Segue o roteiro do [README da raiz](../../README.md). Em resumo:

- As 4 imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram baixadas
  da URL ao vivo e commitadas em `src/assets/`. **Os dois arquivos chamados
  `mdflow-logo-*.png` eram WEBP de verdade** — o nome mentia; aqui estão com a
  extensão certa.
- `@lovable.dev/vite-tanstack-config` saiu. Ele traz o alvo Cloudflare fixo no
  código. No lugar, um `vite.config.ts` vanilla; como existe `src/server.ts`, o
  `tanstackStart` recebe `server: { entry: "server" }`.
- `src/lib/lovable-error-reporting.ts` foi apagado, junto da chamada no
  `__root.tsx`.
- `og:url` e `canonical` vinham como `"/"`, que crawler nenhum resolve. Agora
  saem de `src/lib/site.ts`.
- O `og:image` apontava para um `*.r2.dev` e era um **screenshot de preview do
  editor do Lovable**. Foi substituído por `public/og-image.jpg`, que é a dobra
  do próprio site renderizada — serve, mas é um substituto: se a MDFlow tiver
  arte social própria, troque.
- `lang` era `"en"` com a página inteira em português. Virou `pt-BR`.

## O que ficou de fora

- `src/assets/mdflow-logo-light.webp` e `mdflow-icon-gradient.png` vieram do
  Lovable mas **não são importados por nenhum componente**. Ficaram no repositório
  porque são arte da marca; se continuarem sem uso, podem sair.
- No `Nav.tsx`, a versão clara do logo em dark mode é o logo escuro com
  `brightness-0 invert`, e não o `mdflow-logo-light`. É como estava no ar —
  mantido de propósito, para a migração não mudar o visual.

## Rodando

```sh
npm install
npm run dev
```

Não há variáveis de ambiente, integração externa nem rastreador nesta página.

## A reformulação (29/10/2026)

Saíram sete seções institucionais: O problema, Jornada, Plataforma, Dados como
ativo, Carreiras, Mercado, Ecossistema, Modelo de negócio e O momento atual.
Elas falavam com investidor e parceiro; a página agora fala com o aluno.

Entraram Hero, Demonstração, Como funciona, Funcionalidades, CTA de cadastro,
Diferenciais e FAQ — nessa ordem, com os textos do briefing.

**As imagens da plataforma são capturas do app rodando**, em
`~/Developer/Claude_Medflow/mentorflow-ai-plus`, na conta de homologação do
próprio projeto (`pro@mdflow.app`, criada por `scripts/bootstrap-auth.ts`).
Tela real, dados fictícios — nenhum dado de aluno real foi para o repositório,
que é público. Para regerar: subir o app, entrar com essa conta, forçar o tema
claro e capturar `/inicio`, `/plano`, `/questoes`, `/flashcards`, `/caderno`,
`/simulados` e `/progresso`.

**Todos os CTAs vão para `app.mdflow.com.br`** via `src/lib/cadastro.ts`, com
UTM por posição (`hero`, `nav`, `cta-final`, `rodape`).

### O que ainda falta

- **A médica com tablet** e o **mascote do cérebro**, do mockup aprovado. Não
  existem nem aqui nem no app. No lugar do mascote está o ícone oficial da
  marca, em `CtaCadastro.tsx`.
- **"Comunidade de estudantes"** entra em `Funcionalidades.tsx` só como texto:
  é a única das oito que **não tem tela no app**. Confirmar se a funcionalidade
  existe antes de anunciá-la.
- **Data do ENAMED.** O Inep não publicou edital nem cronograma de 2027, e a
  prova passa a ser semestral. A página fala em "a prova", sem data. O app, por
  sua vez, exibe "ENAMED 2026 — faltam 42 semanas", que cai em agosto de 2027:
  o rótulo está defasado **no produto**, não aqui.
- **Nenhuma ferramenta de analytics está instalada.** O briefing pede
  acompanhamento de cliques e cadastros; hoje a única atribuição possível é o
  app ler os UTMs.
- **Depoimentos** não foram incluídos: o briefing só autoriza se forem reais.
