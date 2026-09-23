# MOC — X Curso Intensivo de Oncologia

Landing page do X Curso Intensivo de Oncologia do MOC (Manual de Oncologia
Clínica do Brasil).

**Produção:** https://onco.on-dig.online

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

Outros comandos:

```sh
npm run build    # build de produção
npm run preview  # serve o build localmente
npm run lint
npm run format
```

## Deploy

Projeto próprio na Vercel, com **Root Directory** apontando para
`sites/sitemoc` e Framework Preset = Other. Nenhuma variável de
ambiente é necessária.

## SEO

O `og:url` e o `canonical` vêm da constante `SITE_URL` em `src/routes/index.tsx`
— **se o domínio mudar, atualize ali**, porque crawlers não resolvem caminhos
relativos.

Os metadados do `__root.tsx` são o fallback de rotas que não definem os seus
(a 404, por exemplo); a home sobrescreve título e descrição.

**Pendência:** o site não define `og:image`, então links compartilhados no
WhatsApp aparecem sem imagem.

## Notas da migração (Lovable → Vercel)

- As 10 imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram
  baixadas e versionadas aqui como arquivos reais.
- Removido `src/lib/lovable-error-reporting.ts`, que enviava erros de runtime
  para a telemetria do editor do Lovable.
- Os metadados do `__root.tsx` vinham como "Lovable App" / "Lovable Generated
  Project"; foram trocados pelos do curso.
- `src/assets/coordenadores-oficial.jpg` não é usado por nenhuma tela — já era
  assim no Lovable. Ficou preservado de propósito, porque só existia no CDN de lá.

## Pendências da revisão V2 (TOLIVEIRA)

Os 5 itens da revisão foram tratados. O que ainda falta são dados e arquivos
oficiais, não código — o encaixe de cada um já está pronto:

| # | Item | Situação |
| --- | --- | --- |
| 1 | Fonte **Barmeno** nos nomes de marca | **Feito.** Convertida de OTF para woff2 e embarcada; o Signika saiu do Google Fonts. Ver `src/assets/fonts/README.md` — inclusive a ressalva de licença de webfont. |
| 2 | Logos dos patrocinadores | **Feito** com as marcas oficiais. Exibidas na versão reversa (branco) via CSS — sobre o azul-marinho do hero, o roxo da AstraZeneca fica ilegível. Os arquivos originais, em cores de marca, seguem intactos em `src/assets/sponsors/`. |
| 3 | Revisar a URL | **Centralizado** em `src/lib/site.ts`. Hoje aponta para o domínio de homologação; trocar lá e em mais nenhum lugar. |
| 4 | Revisar links dos botões + cupons | **Feito.** Os 10 botões levam ao checkout do combo 16 com o cupom `30PUBLI` já aplicado (R$ 2.659,30), verificado ponta a ponta. Ver abaixo. |
| 5 | Texto de formas de pagamento | **Feito.** O FAQ agora diz "À vista no Cartão de Crédito, Boleto ou Pix ou parcelado em 2x no Cartão de Crédito" — a menção à WorldMed saiu, conforme alinhado. |

### Sobre os botões (item 4)

Os 14 CTAs apontavam todos para `#CHECKOUT_URL_EAD`, uma âncora que não existe:
**nenhum deles levava a lugar nenhum**. Agora cada um declara o produto que vende
e a posição de onde partiu, e a URL é montada em `src/lib/checkout.ts`, saindo
com um `utm_content` próprio (`hero`, `precos`, `header`, `final`…) — é o que
permite medir de onde veio a conversão.

### Cupons — o caminho da URL, não um parâmetro

A EAD Plataforma aceita o cupom **no caminho**:

```
/checkout/combo/{id-do-combo}/{CUPOM}
```

Essa URL monta o carrinho com o combo e o cupom já aplicado e redireciona para
`/cart?coupon=CUPOM`. É por isso que os botões apontam para lá, e não para a
página do produto (`/combo/{slug}`), que exigiria a pessoa digitar o código à mão.

> Uma versão anterior deste README dizia que o cupom só entrava por um campo do
> checkout. Estava errado: aquilo vale para a página de produto, não para esta URL.

**O MOC troca os cupons de tempos em tempos.** Antes de cada campanha, vale abrir
a URL e conferir se o desconto ainda aplica. Tudo fica em `src/lib/checkout.ts`,
em `COMBO_ID` e `COUPON`.

Conhecidos em 23/09/2026:

| Cupom | Combo | Conteúdo | Preço |
| --- | --- | --- | --- |
| `30PUBLI` | 16 | Intensivo + Banco + ONCO IA | R$ 2.659,30 *(em uso)* |
| `15PUBLI` | 16 | Intensivo + Banco + ONCO IA | R$ 3.229,15 *(lote de outubro)* |
| `30MOC` | 20 | Intensivo + Banco, sem ONCO IA | R$ 2.030,00 |

### Medição por botão

Cada CTA sai com um `utm_content` próprio, mas **esses parâmetros não chegam ao
carrinho**: sobrevivem ao primeiro redirect (`/cart/add/...`) e são descartados no
segundo. Ficaram porque não custam nada, mas não dá para medir por eles.

A medição que o cliente pediu funciona **pelo próprio cupom** — cupons distintos
por origem aparecem separados no relatório de vendas do MOC. Criar esses cupons
depende deles.

### Divergência conhecida na tabela de preços

A seção de investimento anuncia **R$ 2.729** no lote de lançamento, mas o checkout
cobra **R$ 2.659,30** — R$ 69,70 a menos. A tabela aplicou 30% ao curso
(2.900 → 2.030) e só ~22% ao Onco IA (899 → 699), enquanto a plataforma dá 30%
linear sobre o combo inteiro (3.799 → 2.659,30). O mesmo no lote de outubro:
tabela 3.264, checkout 3.229,15.

Está a favor do cliente e **foi mantido assim por decisão dele**. Fica registrado
porque, se um dia os números forem revistos, é aqui que a conta diverge.

### Produtos fora da página

O Banco de Questões existe avulso na plataforma
(`/curso/banco-de-questoes-2026`, R$ 510, sem desconto), mas ficou **de fora de
propósito**: abriria uma saída mais barata no meio do funil. O botão da seção do
Banco leva ao combo.

### Ainda pendente

- **Domínio final**, em `src/lib/site.ts`.
- **`og:image`**: o site não tem, então links compartilhados no WhatsApp saem
  sem imagem.
