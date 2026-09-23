# Instruções do repositório

Monorepo dos sites do Jhonny. Cada pasta em `sites/` é um projeto independente.
O [README.md](README.md) tem a tabela de sites, o passo a passo de migração do
Lovable e as regras de deploy — **leia antes de mexer em qualquer site**.

## O essencial, em uma passada

**Cada site é autocontido.** `package.json`, lockfile e stack próprios. Não há
npm workspaces, e isso é deliberado: os sites vêm de origens diferentes e travam
versões conflitantes. Rode `npm install` **dentro da pasta do site**, nunca na
raiz.

**`node_modules` não fica instalado.** São ~280 MB por site e o disco do Jhonny
vive perto do limite. Instale só na pasta em que for trabalhar e, ao terminar
uma sessão longa, ofereça remover.

**Nem todos usam a mesma stack.** A maioria é TanStack Start (SSR) + nitro;
`so-talentos` e `medinteli` são Vite SPA puros (sem SSR, Tailwind v3), e o
`vercel.json` deles precisa de rewrite para `/index.html`.

## Sites que NÃO devem ser publicados

`sites/simposio-neuro` e `sites/medinteli` são **espelhos**: os sites no ar
seguem rodando no Lovable. Estão aqui para alteração e migração futura.

Nos dois, **o rastreamento nasce desligado** — os IDs de Pixel/GA vêm de env sem
valor padrão. Não reintroduza IDs no código: com eles embutidos, um `npm run dev`
já dispara evento na conta de produção do cliente.

## Regras ao trabalhar com rastreamento

Vale para qualquer site, e nasceu de um erro real:

1. **Audite rastreadores ANTES de abrir a página em navegador.** Chrome headless
   executa JavaScript: se houver Pixel ou GA embutido, o simples carregamento
   manda evento de verdade e suja os dados da campanha.
2. Para testar o mecanismo ligado, use **ID falso**, nunca o de produção.
3. Verifique o resultado monitorando a rede (CDP `Network.requestWillBeSent`),
   não pelo que o código aparenta fazer.

## Segredos

O `sitesdojhonny` é **público**. O Lovable costuma versionar um `.env`; ele
**não vem junto** — entra no `.gitignore` e vira `.env.example` sem valores, e as
variáveis são configuradas no painel da Vercel.

## Como o Jhonny gosta de trabalhar

- Verificar em vez de afirmar: build, smoke test e, quando envolve layout,
  screenshot. Ele valora quando um problema é provado, não suposto.
- Relatar o que deu errado com a mesma clareza do que deu certo.
- Decisões que são dele — domínio, apagar arquivo, publicar — se pergunta antes.
- Comentário no código explica **por que**, não o que. Em português.
- Mensagens de commit em português, descrevendo a causa, não só a mudança.
