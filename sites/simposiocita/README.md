# I Simpósio CITA de Doenças Imunomediadas

Site do evento — 17 de outubro de 2026, Espaço Milenium, São Paulo.

**Produção:** https://simposiocita.com.br

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

Conectado à Vercel via GitHub — todo push na `main` publica automaticamente.
Nenhuma variável de ambiente é necessária.

O projeto não usa o Framework Preset da Vercel: o Nitro já gera o output pronto.
Ajustes de rota ou headers ficam em `vite.config.ts`, não em `vercel.json`.
