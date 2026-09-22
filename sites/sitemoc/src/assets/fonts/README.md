# Fonte Barmeno — pendente

Os nomes de marca **X Curso Intensivo de Oncologia** e **Banco de Questões**
devem sair em **Barmeno**. Hoje saem em Signika, que é o fallback.

Barmeno é uma fonte comercial da URW: não está no Google Fonts e não pode ser
baixada junto com o projeto. Os arquivos precisam vir de quem detém a licença
(a mesma pasta compartilhada das marcas dos patrocinadores, provavelmente).

## Como ativar

1. Coloque nesta pasta, com exatamente estes nomes:
   - `barmeno-regular.woff2` (peso 400)
   - `barmeno-bold.woff2` (peso 700)
2. Em `src/styles.css`, descomente o bloco `@font-face` marcado como
   "FONTE BARMENO — pendente".

Pronto. O token `--font-course` já lista `"Barmeno"` na frente de `"Signika"`,
então os títulos passam a usar Barmeno sem mexer em nenhum componente.

## Se vier em outro formato

Se a licença entregar `.otf`/`.ttf`, converta para `.woff2` antes de subir — o
arquivo fica bem menor e é o formato que todo navegador atual entende. Se os
pesos forem outros (por exemplo Medium em vez de Bold), ajuste o `font-weight`
de cada `@font-face` para bater com o arquivo.
