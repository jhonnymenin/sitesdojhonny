# Dr. Luís Felipe Lopez — Método Elevation®

Landing page de conversão do **Método Elevation**, abordagem autoral do
Dr. Luís Felipe Lopez para rejuvenescimento facial. Quatro blocos, uma rota só.

**Produção:** https://felipe.on-dig.online

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
`sites/felipe-lopez` e Framework Preset = Other. Nenhuma variável de ambiente
é necessária.

## Notas da migração (Lovable → Vercel)

- As imagens eram ponteiros `.asset.json` para o CDN do Lovable. Foram baixadas
  e versionadas aqui como arquivos reais.
- O `og:image` era servido pelo storage do Lovable; agora é `public/og-image.png`,
  servido pelo próprio site.
- `BeforeAfterGallery.tsx` e os 19 SVGs em `src/assets/gallery/` **não são
  usados por nenhuma tela** — já era assim no Lovable. Ficaram preservados de
  propósito, porque esses SVGs só existiam no CDN do Lovable. Para usar o
  carrossel, basta importar o componente em `src/routes/index.tsx`.

## A virada para o Método Elevation (30/10/2026)

Até aqui esta home era um site amplo de cirurgia plástica. O briefing
"Landing Page | Método Elevation — O Novo Deep Plane" pediu uma página com um
assunto só, e a home foi reescrita nos quatro blocos do briefing: Hero,
O Método, Autoridade e Conversão.

**O que saiu do ar:** Especialidades (Face, Mama, Corpo, Procedimentos
Estéticos), Diferenciais, Antes & Depois, o mapa facial, Depoimentos, a faixa
de Números e a seção da Clínica. Os componentes continuam no repositório
(`Numeros.tsx`, `BeforeAfterSlider.tsx`, `BeforeAfterGallery.tsx`) e as imagens
também — nada foi apagado. Para trazer qualquer uma de volta, o texto está no
histórico do git, em `fdc2738..HEAD` sobre `src/routes/index.tsx`.

**Endereço:** o rodapé dizia "Av. Brasil, 2263 — Jardim América". O briefing
diz **"Av. Brasil, 583 — Jardim Paulista"**. Vale o briefing, por ser mais
recente e vir do próprio Dr. — mas é uma divergência que ninguém confirmou, e
endereço errado em página de consultório manda paciente para a porta errada.

**Fotos do centro cirúrgico:** `centro-cirurgico-perfil.webp` (Bloco 3) e
`centro-cirurgico-operando.webp` (Bloco 2), enviadas pela equipe em 30/10/2026.

### O que ainda falta

- **A composição de vídeo / antes e depois da paciente Márcia**, pedida no
  Bloco 1. Depende de autorização dela. O código já tem o lugar: a constante
  `MIDIA_PACIENTE` em `src/routes/index.tsx`. Enquanto for `null`, a dobra
  mostra só o retrato do Dr. — melhor que um buraco marcado "em breve", que é
  o tipo de coisa que acaba indo ao ar.
- **A foto tratada sem fundo** que a fotógrafa vai entregar. A dobra usa a
  antiga, `dr-hero-transparente.png`.
- **"7 cirurgias em 1 só"** é afirmação forte para publicidade médica. O texto
  é do próprio Dr. e foi mantido como veio, mas vale conferir contra a
  Resolução CFM 2.336/2023 antes de anunciar.
- **Os dois blocos abrem quase igual** — "Seu rosto é único. Seu
  rejuvenescimento também deve ser." (Bloco 2) e "Seu rosto é único. Seu
  planejamento também deve ser." (Bloco 4). Está assim no briefing; na página
  lida de ponta a ponta soa repetido.
- **Nenhum rastreador** está instalado nesta página.
