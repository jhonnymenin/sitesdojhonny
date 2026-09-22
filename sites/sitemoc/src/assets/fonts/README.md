# Barmeno — fonte de marca

Os nomes **X Curso Intensivo de Oncologia** e **Banco de Questões** saem em
Barmeno, via o token `--font-course` em `src/styles.css`.

| Arquivo | Peso | Origem |
| --- | --- | --- |
| `barmeno-regular.woff2` | 400 | `barmeno-regular-588ce228b68dd.otf` |
| `barmeno-bold.woff2` | 700 | `barmeno-bold-588ce24f8a369.otf` |

## Como foram gerados

A fonte veio em OTF/TTF, formatos de desktop. Para a web foram convertidos para
woff2 (metade do tamanho, e é o formato que todo navegador atual entende):

```py
from fontTools.ttLib import TTFont
ft = TTFont("barmeno-regular-588ce228b68dd.otf")
ft["OS/2"].usWeightClass = 400   # vinha marcado como 500
ft.flavor = "woff2"
ft.save("barmeno-regular.woff2")
```

Precisa de `fonttools` e `brotli` (`pip install fonttools brotli`).

## Cuidado ao escolher o arquivo de origem

Os nomes dos arquivos OTF/TTF **não batem com o peso real**. Conferidos um a um:

| Arquivo original | O que é de verdade |
| --- | --- |
| `barmeno-regular-588ce228b68dd.otf` | Regular |
| `Barmeno Medium.otf` | Medium |
| `barmeno-bold-588ce24f8a369.otf` | Bold |
| `Barmeno Regular.ttf` | **Extra Bold** — o nome do arquivo está errado |

Ao acrescentar um peso novo, renderize antes para confirmar; não confie no nome
nem no `usWeightClass`.

## Licença

Barmeno é uma fonte comercial da URW. Licença de desktop e licença de webfont
são coisas diferentes: servir a fonte num site público normalmente exige a
licença de webfont. Vale confirmar com quem contratou a fonte antes de publicar.
