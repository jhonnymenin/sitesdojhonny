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

Os 5 itens da revisão foram tratados. Três dependem de material ou definição
que ainda não chegou — todos já estão com o encaixe pronto, faltando só o dado:

| # | Item | Situação |
| --- | --- | --- |
| 1 | Fonte **Barmeno** nos nomes de marca | **Falta o arquivo.** Barmeno é comercial (URW) e não pode ser baixada. Ver `src/assets/fonts/README.md`: basta colocar os `.woff2` e descomentar o `@font-face` em `src/styles.css`. Até lá, Signika segue como fallback. |
| 2 | Logos dos patrocinadores | **Feito**, com marcas provisórias. Posição, rótulos Diamante/Ouro e proporção conforme prints 01 e 02. Os SVGs em `src/assets/sponsors/` vieram do Wikimedia e foram passados para branco (versão reversa, fundo escuro) — **substituir pelos oficiais da pasta compartilhada antes de publicar**. |
| 3 | Revisar a URL | **Centralizado** em `src/lib/site.ts`. Hoje aponta para o domínio de homologação; trocar lá e em mais nenhum lugar. |
| 4 | Revisar links dos botões + cupons | **Feito.** Ver abaixo. |
| 5 | Texto de formas de pagamento | **Feito.** O FAQ agora diz "À vista no Cartão de Crédito, Boleto ou Pix ou parcelado em 2x no Cartão de Crédito" — a menção à WorldMed saiu, conforme alinhado. |

### Sobre os botões (item 4)

Os 14 CTAs apontavam todos para `#CHECKOUT_URL_EAD`, uma âncora que não existe:
**nenhum deles levava a lugar nenhum**. Agora cada um declara o produto que vende
e a posição de onde partiu, e a URL é montada em `src/lib/checkout.ts`.

Falta preencher lá, e só lá:

- `CHECKOUT_BASE` — a URL de checkout de cada produto (curso, banco de questões, combo)
- `COUPON` — o cupom de desconto de cada produto
- `COUPON_PARAM` — o nome do parâmetro de cupom, que muda conforme a plataforma
- `SUPPORT_URL` — o WhatsApp do botão "Fale com nossa equipe"

Enquanto `CHECKOUT_BASE` estiver vazio, os botões rolam para a seção de preços
(`#inscricao`) em vez de apontar para uma âncora morta.

Preenchido, cada botão sai com o cupom e com um `utm_content` próprio da sua
posição (`hero`, `precos`, `header`, `final`…), que é o que permite medir de
onde veio a conversão. Exemplo do que é gerado:

```
https://.../checkout/combo?cupom=XXXX&utm_source=landing&utm_medium=site
  &utm_campaign=x-intensivo-oncologia&utm_content=hero
```
