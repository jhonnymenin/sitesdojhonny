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
| 4 | Revisar links dos botões + cupons | **Feito** para o combo. Ver abaixo. |
| 5 | Texto de formas de pagamento | **Feito.** O FAQ agora diz "À vista no Cartão de Crédito, Boleto ou Pix ou parcelado em 2x no Cartão de Crédito" — a menção à WorldMed saiu, conforme alinhado. |

### Sobre os botões (item 4)

Os 14 CTAs apontavam todos para `#CHECKOUT_URL_EAD`, uma âncora que não existe:
**nenhum deles levava a lugar nenhum**. Agora cada um declara o produto que vende
e a posição de onde partiu, e a URL é montada em `src/lib/checkout.ts`, saindo
com um `utm_content` próprio (`hero`, `precos`, `header`, `final`…) — é o que
permite medir de onde veio a conversão.

### O cupom não entra pela URL

A EAD Plataforma **não aceita cupom por parâmetro de URL**: o código é digitado
num campo do próprio checkout (`<input name="product-coupom">`). Mandar
`?cupom=30PUBLI` não aplicaria desconto nenhum.

Por isso o cupom é exibido na página, com botão de copiar
(`src/components/landing/CouponBadge.tsx`), dentro da caixa de condição especial
do hero. Sem isso a pessoa chega ao checkout sem saber o que digitar e paga o
preço cheio.

O código fica em `COUPON_CODE`, em `src/lib/checkout.ts`.

### Ainda pendente

- **Checkout do curso avulso e do Banco de Questões.** Só o combo tem URL. Os
  botões desses dois produtos — incluindo o "Quero o Banco de Questões" — rolam
  para a seção de preços. Ou eles ganham URL própria, ou o rótulo do botão muda
  para não prometer uma compra avulsa que não existe.
- **Domínio final**, em `src/lib/site.ts`.
- **`og:image`**: o site não tem, então links compartilhados no WhatsApp saem
  sem imagem.
