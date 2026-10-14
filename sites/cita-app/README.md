# App do I Simpósio CITA

Aplicativo (PWA) para quem vai ao evento: agenda, palestrantes, patrocinadores,
materiais, informações práticas e inscrição. É **outro projeto** que o
[`sites/simposiocita`](../simposiocita), que é o site institucional do evento.

- **Evento:** 17/10/2026, Espaço Millenium — São Paulo
- **Stack:** TanStack Start (React 19, SSR) + Vite 7 + Tailwind v4 + Supabase

## Variáveis de ambiente

Ver `.env.example`. Duas observações que não são óbvias:

- **`SUPABASE_SERVICE_ROLE_KEY` é obrigatória e não vinha do Lovable.** Sem ela
  a inscrição não grava. É segredo: nunca com prefixo `VITE_`, que embute a
  variável no bundle do navegador.
- **O espelho no Google Sheets passa pelo gateway do Lovable** e não funciona
  fora de lá. O código falha de forma tolerante — a inscrição é gravada no
  Supabase de qualquer jeito e só a planilha para de receber, em silêncio.

## Rodando

```sh
npm install
npm run dev
```
