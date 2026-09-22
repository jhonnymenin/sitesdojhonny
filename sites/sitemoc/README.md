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
