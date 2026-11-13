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

## Troca de material e registro (12/11/2026)

- **Logotipo.** O Elevation passou a ser a placa `ELEVATION® / O NOVO DEEP PLANE
  / por Dr. Luis Felipe Lopez` (`elevation-logo.webp`), recortada na moldura
  transparente que vinha no PNG. Ela é mais quadrada que a assinatura anterior
  (2,44:1 contra 4,74:1), então as três ocorrências ganharam altura — 40px na
  faixa do topo, 56px na gaveta do celular, 96/112px no cartão de assinatura.
  Na altura antiga a linha "por Dr. Luis Felipe Lopez" sumia.
- **Bloco 1:** `dr-retrato.webp` (1200×800). Como é foto retangular de fundo
  escuro e não mais um recorte sem fundo, o halo dourado saiu e a foto virou
  cartão de canto arredondado.
- **Bloco 3:** `dr-uniforme.webp` (300×450). **O arquivo é pequeno** — ocupando
  a coluna inteira seria ampliado quase três vezes e apareceria borrado. Entra
  num cartão com `max-w-[300px]`, o tamanho real. Quando chegar o original em
  resolução maior, basta soltar o `max-w`.
- **Instagram:** `https://www.instagram.com/lf.lopez/` (era `drluisfelipelopez`,
  que não existe).
- **CRM-SP 170.340 · RQE 87822** entram no cartão de assinatura, ao lado do
  nome, e na linha de copyright.

Ficaram sem uso, mas **não foram apagados**: `dr-hero-transparente.png`,
`centro-cirurgico-perfil.webp`, `elevation-logo-black.png`, `foto-dr-sobre.png`,
`foto-dr-sobre-recorte.webp`, `foto-clinica.jpg`, `mama.jpg`,
`procedimentos-rosto.png`, `ba-*.png` e `src/assets/gallery/`.

## O vídeo (12/11/2026)

`public/depoimento.mp4` — a marcação pré-operatória de uma paciente, com o Dr.
explicando o que será reposicionado. Legendas queimadas na imagem. Entra em
seção própria, logo depois da dobra, que é onde o briefing pedia a mídia da
paciente.

**O original tinha 101 MB** (1080×1920, 69 s, 11,5 Mbps — taxa de masterização).
Recomprimido para H.264 CRF 30 com teto de 1,6 Mbps e áudio AAC 96k mono:
**8,9 MB**, 11 vezes menor, sem diferença visível — comparei quadro a quadro,
inclusive nas legendas.

Para recriar:

```sh
ffmpeg -i original.mp4 -c:v libx264 -profile:v high -preset slow -crf 30 \
  -maxrate 1600k -bufsize 3200k -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 96k -ac 1 depoimento.mp4
```

**`preload="none"` não é detalhe.** Sem ele o navegador baixaria os 8,9 MB em
toda visita, inclusive de quem nunca aperta o play, e o Hobby da Vercel tem
100 GB de tráfego por mês. Com a capa de 19 KB no lugar, o vídeo só sai do
servidor quando alguém pede — da ordem de 11 mil reproduções dentro da cota.
Verificado monitorando a rede: ao carregar a página, o `.mp4` não é requisitado.

`depoimento-capa.webp` é o quadro de 11 s, escolhido de propósito: o quadro do
antes e depois é mais bonito, mas deixaria a composição visível sem ninguém dar
play.

**Pendência:** a página não afirma que há autorização de uso de imagem, porque
ninguém confirmou que existe. Quando a equipe confirmar, a linha a acrescentar
é "Imagens divulgadas com autorização da paciente." E vale lembrar que a
Resolução CFM 1.974/2011 veda imagens de antes e depois em publicidade médica
— o vídeo tem uma.
