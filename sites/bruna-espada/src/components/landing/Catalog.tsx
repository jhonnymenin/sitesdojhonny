import { Cta, Eyebrow, Reveal } from "./ui";

/*
 * Guia de procedimentos, transcrito da revista digital que a Bruna enviou em
 * 13/10/2026 — os quatro grupos, os dezesseis procedimentos e os valores.
 *
 * As seções anteriores da página vendem a experiência; esta responde "o que
 * existe e quanto custa", que é a pergunta que chega pelo WhatsApp. Por isso
 * fica depois delas e antes do CTA final.
 *
 * Alguns procedimentos aparecem também nas seções editoriais (Hollywood Peel,
 * Radiance Skin, Reviva Face, Peeling Coreano, Limpeza de Pele, e os três de
 * micropigmentação). Aqui as descrições são as do catálogo, mais curtas e
 * objetivas: lá o texto convence, aqui ele informa.
 *
 * `nota` é o `**` da revista — protocolo personalizado com condição especial.
 */
type Procedimento = {
  nome: string;
  preco: string;
  precoNota?: string;
  texto: string;
  nota?: boolean;
};

type Grupo = {
  n: string;
  titulo: string;
  resumo: string;
  itens: Procedimento[];
};

const GRUPOS: Grupo[] = [
  {
    n: "01",
    titulo: "Faciais",
    resumo:
      "Procedimentos personalizados para restaurar a saúde, a qualidade e a beleza da pele.",
    itens: [
      {
        nome: "Limpeza de Pele Enzimática",
        preco: "R$ 300",
        texto:
          "Muito mais do que uma limpeza convencional: higienização profunda, renovação celular e equilíbrio da pele, deixando-a preparada para receber outros tratamentos.",
      },
      {
        nome: "Dermaplaning",
        preco: "R$ 120",
        texto:
          "Esfoliação física controlada que remove células mortas e os pelos finos da face, deixando a pele mais lisa, iluminada e pronta para absorver melhor os ativos.",
      },
      {
        nome: "Peeling Coreano",
        preco: "R$ 354",
        precoNota: "por sessão",
        texto:
          "Tecnologia inspirada na estética coreana que promove renovação progressiva da pele, melhorando textura, luminosidade e uniformidade, sem descamação intensa.",
      },
      {
        nome: "Reviva Face",
        preco: "R$ 354",
        precoNota: "por sessão",
        nota: true,
        texto:
          "Protocolo regenerativo personalizado que estimula os mecanismos naturais da pele. Pode ser direcionado para rejuvenescimento, flacidez, cicatrizes de acne ou clareamento de manchas.",
      },
      {
        nome: "Radiance Skin",
        preco: "R$ 354",
        precoNota: "por sessão",
        nota: true,
        texto:
          "Devolve hidratação, luminosidade e viço à pele, proporcionando o efeito conhecido como pele de vidro: aparência saudável, uniforme e naturalmente iluminada.",
      },
      {
        nome: "Hollywood Peel",
        preco: "R$ 500",
        precoNota: "por sessão",
        nota: true,
        texto:
          "Promove renovação da pele, melhora a textura, uniformiza o tom e devolve luminosidade, com aspecto revitalizado desde as primeiras sessões.",
      },
    ],
  },
  {
    n: "02",
    titulo: "Micropigmentação",
    resumo:
      "Técnicas personalizadas que devolvem definição preservando um resultado natural e harmônico.",
    itens: [
      {
        nome: "Sobrancelhas",
        preco: "R$ 1.020",
        texto:
          "Corrige falhas, melhora o desenho e devolve definição às sobrancelhas, sempre respeitando a naturalidade.",
      },
      {
        nome: "Lábios",
        preco: "R$ 1.200",
        texto:
          "Realça o contorno e a tonalidade natural dos lábios, com mais definição, uniformidade e aparência saudável.",
      },
      {
        nome: "Olhos",
        preco: "R$ 660 a R$ 1.500",
        precoNota: "superior R$ 1.200 · inferior R$ 660 · superior + inferior R$ 1.500",
        texto:
          "Realça o olhar com definição e elegância, respeitando o formato dos olhos e o resultado desejado.",
      },
    ],
  },
  {
    n: "03",
    titulo: "Sobrancelhas",
    resumo: "Do design ao protocolo regenerativo, para fios mais saudáveis e bem definidos.",
    itens: [
      {
        nome: "Design de Sobrancelhas",
        preco: "R$ 75",
        texto:
          "Design personalizado, respeitando o formato natural, a estrutura facial e o crescimento dos fios. Quando indicado, pode ser associado à henna ou coloração.",
      },
      {
        nome: "Brow Lamination",
        preco: "R$ 183",
        texto:
          "Alinhamento e direcionamento dos fios para sobrancelhas mais organizadas, preenchidas e definidas, mantendo a naturalidade.",
      },
      {
        nome: "Brow Care",
        preco: "R$ 183",
        precoNota: "mensal · contratação mínima de 6 meses",
        texto:
          "Cuidado contínuo que associa design periódico a tratamentos específicos para os fios e a pele, preservando a qualidade e o alinhamento ao longo do tempo.",
      },
      {
        nome: "Regeneração — Método F.R.E.™",
        preco: "R$ 450",
        precoNota: "por sessão",
        nota: true,
        texto:
          "Engenharia Regenerativa Folicular para sobrancelhas com falhas, afinamento ou perda de fios. A partir de uma avaliação individual, combina estímulos regenerativos e acompanhamento da evolução.",
      },
    ],
  },
  {
    n: "04",
    titulo: "Despigmentação e cuidados complementares",
    resumo: "Remoção de pigmentos indesejados e protocolos de finalização.",
    itens: [
      {
        nome: "Despigmentação a Laser",
        preco: "R$ 350",
        precoNota: "por sessão · micropigmentação de sobrancelhas · tatuagens sob consulta",
        texto:
          "Remoção progressiva de pigmentos, respeitando as características da pele e a resposta de cada caso. A sessão inclui laser de baixa potência e microagulhamento com drug delivery.",
      },
      {
        nome: "Hydralips",
        preco: "R$ 210",
        texto:
          "Hidratação e revitalização labial que melhora textura, maciez e aparência dos lábios, devolvendo aspecto saudável e bem cuidado.",
      },
      {
        nome: "Epilação Egípcia — Buço",
        preco: "R$ 35",
        texto:
          "Remoção dos pelos com linha, de forma precisa e delicada, proporcionando pele lisa e acabamento uniforme.",
      },
    ],
  },
];

export function Catalog() {
  return (
    <section id="procedimentos" className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Guia de procedimentos</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[2.4rem] leading-[1.08] text-ink sm:text-[3.4rem]">
            Cada procedimento tem um porquê.
            <span className="mt-2 block italic text-gold">E um investimento transparente.</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {GRUPOS.map((grupo) => (
            <Reveal key={grupo.titulo}>
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-gold/40">{grupo.n}</span>
                  <h3 className="text-xl text-ink sm:text-2xl">{grupo.titulo}</h3>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">{grupo.resumo}</p>

                <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
                  {grupo.itens.map((item) => (
                    <li
                      key={item.nome}
                      className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline"
                    >
                      <div className="md:max-w-2xl">
                        <h4 className="text-base text-ink sm:text-lg">
                          {item.nome}
                          {item.nota ? <span className="align-super text-gold"> **</span> : null}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.texto}</p>
                      </div>
                      {/*
                        No mobile o valor fica abaixo do texto, não ao lado: lado a
                        lado, com os preços mais longos, a coluna do nome ficava
                        espremida em duas ou três palavras por linha.
                      */}
                      <div className="md:text-right">
                        <span className="font-serif text-lg text-gold sm:text-xl">{item.preco}</span>
                        {item.precoNota ? (
                          <span className="mt-1 block text-xs leading-relaxed text-ink/45 md:max-w-[15rem]">
                            {item.precoNota}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-xs leading-relaxed text-ink/45">
            ** Protocolos personalizados com condições especiais. Os valores podem variar conforme a
            avaliação individual — na dúvida sobre qual procedimento é o mais indicado para você,
            fale com a Bruna.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            {/* O Cta já é a âncora do WhatsApp; aninhar outra invalidaria o HTML. */}
            <Cta variant="outline">Tirar dúvidas sobre qual procedimento escolher</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
