import cover1 from "@/assets/blog-cover-1.webp";
import cover2 from "@/assets/blog-cover-2.webp";
import cover3 from "@/assets/blog-cover-3.webp";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "source"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  cover: string;
  readingTime: string;
  intro: string;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "regressao-sindrome-down",
    title: "Regressão na Síndrome de Down: o que é, sintomas e como agir",
    category: "Síndrome de Down",
    metaTitle: "Regressão na Síndrome de Down: sintomas e como agir",
    metaDescription:
      "Entenda o que é a regressão na síndrome de Down, quais são os sintomas da DRSD, suas causas e como agir diante do diagnóstico. Informação baseada em consenso internacional.",
    keywords: "regressão síndrome de Down, DRSD, perda de habilidades Down, tratamento regressão Down",
    cover: cover1,
    readingTime: "6 min de leitura",
    intro:
      "Quando uma pessoa com síndrome de Down começa a perder habilidades que já havia conquistado — como falar, ir ao banheiro sozinha ou interagir com quem ama — é natural que a família se assuste. Essa situação tem nome: regressão. E entender o que está por trás dela pode fazer toda a diferença no tratamento e na qualidade de vida.",
    blocks: [
      { type: "h2", text: "O que é regressão na síndrome de Down?" },
      {
        type: "p",
        text: "Regressão é a perda de habilidades do desenvolvimento que uma pessoa já havia adquirido. Ela pode afetar a linguagem, as atividades da vida diária, as funções motoras ou a interação social. O declínio pode acontecer ao longo de semanas ou meses, e o ritmo com que surge é um dado importante para identificar a causa.",
      },
      {
        type: "p",
        text: "Uma das causas mais estudadas é a Desordem Regressiva da Síndrome de Down (DRSD) — também chamada de Desordem Desintegrativa da Síndrome de Down (DDSD) ou Regressão Inexplicável da Síndrome de Down (RISD). Esses termos costumam ser usados como sinônimos.",
      },
      {
        type: "quote",
        text: "A regressão pode ser causada por muitos fatores e está associada a um declínio acentuado nas funções previamente estabelecidas.",
      },
      { type: "h2", text: "Quais são os sintomas da DRSD?" },
      { type: "p", text: "Os sinais variam de pessoa para pessoa, mas os mais comuns incluem:" },
      {
        type: "ul",
        items: [
          "Afastamento social — da família, amigos e colegas",
          "Perda ou diminuição da linguagem — fala reduzida, “falar como bebê”, voz sussurrada",
          "Perda de habilidades do desenvolvimento adquiridas anteriormente",
          "Maior dependência nas atividades diárias — dificuldade para ir ao banheiro, se alimentar ou se vestir sozinha, quando antes conseguia",
          "Características semelhantes ao autismo que não estavam presentes antes — como diminuição do contato visual, ecolalia, estereotipias",
          "Alterações motoras — rigidez, movimentos lentos, “congelamento”, tiques",
          "Catatonia — inflexibilidade muscular, posturas estranhas, movimentos sem propósito",
          "Mudanças nos padrões alimentares — falta de interesse ou lentidão extrema ao comer",
          "Insônia e dificuldade para dormir",
          "Comportamentos compulsivos ou obsessivos",
          "Conteúdo de pensamento bizarro (psicose) — alucinações, delírios, consciência alterada",
          "Humor e afeto inadequados — choro sem motivo, risos fora de contexto",
          "Agressividade consigo mesmo ou com outros",
          "Aumento de monólogo (“falar sozinho”)",
        ],
      },
      {
        type: "p",
        text: "Um ponto importante: pessoas com DRSD geralmente apresentam um início subagudo, com sintomas surgindo em menos de 3 meses. A presença de “gatilhos” — como mudanças no ambiente doméstico ou escolar, doenças ou hospitalizações — pode preceder o início dos sintomas.",
      },
      { type: "h2", text: "Quais são as outras causas de regressão?" },
      {
        type: "p",
        text: "Antes de confirmar o diagnóstico de DRSD, é fundamental investigar outras causas, pois muitas delas são reversíveis:",
      },
      { type: "h3", text: "Causas médicas" },
      {
        type: "p",
        text: "Apneia obstrutiva do sono, hipotireoidismo, distúrbios da coluna cervical e doença celíaca estão entre as condições que podem provocar ou contribuir para a regressão.",
      },
      { type: "h3", text: "Causas psiquiátricas e psicológicas" },
      {
        type: "p",
        text: "Pessoas com síndrome de Down têm taxas mais altas de depressão, ansiedade, catatonia e transtornos do espectro do autismo. A catatonia, em especial, merece atenção: é comum na DRSD e tem tratamento específico, com bons resultados por benzodiazepínicos (como o Lorazepam) e eletroconvulsoterapia (ECT).",
      },
      { type: "h3", text: "Causas neurológicas" },
      {
        type: "p",
        text: "Convulsões (epilepsia), doença de Alzheimer, AVC e doenças mitocondriais precisam ser descartadas. Uma avaliação neurológica completa — incluindo EEG, ressonância magnética e análise do líquor — é fortemente recomendada.",
      },
      { type: "h3", text: "Causas neuro-imunológicas" },
      {
        type: "p",
        text: "Em alguns casos, a regressão está associada a inflamação cerebral. Imunoterapias têm mostrado benefício em estudos, mas a indicação deve ser feita por especialista.",
      },
      { type: "h3", text: "Causas genéticas, nutricionais e ambientais" },
      {
        type: "p",
        text: "Variações genéticas adicionais, deficiências vitamínicas graves, infecções e exposição a toxinas também podem estar envolvidas.",
      },
      { type: "h2", text: "O que fazer diante da regressão?" },
      {
        type: "p",
        text: "Se seu familiar apresentar alguns desses sintomas, a recomendação é buscar avaliação médica imediata. O diagnóstico precoce pode melhorar significativamente os resultados.",
      },
      {
        type: "p",
        text: "O ideal é contar com uma equipe multidisciplinar: neurologista, psiquiatra, psicólogo, terapeuta e serviço social. A DRSD é um diagnóstico de exclusão — ou seja, outras causas precisam ser descartadas antes de confirmá-la.",
      },
      {
        type: "quote",
        text: "Nós, como comunidade médica, ainda estamos aprendendo as melhores maneiras de testar, diagnosticar e tratar pessoas com DRSD. Um diálogo aberto entre você e seu médico é a melhor maneira de otimizar o atendimento.",
        cite: "Down Syndrome Medical Interest Group (DSMIG-USA)",
      },
      { type: "h2", text: "Existe tratamento?" },
      {
        type: "p",
        text: "Não existe um tratamento único. As opções variam conforme a causa identificada e podem incluir antidepressivos, anticonvulsivantes, antipsicóticos, benzodiazepínicos, imunoterapia e eletroconvulsoterapia. O cuidado multidisciplinar é fortemente encorajado.",
      },
      {
        type: "source",
        text: "Fonte: DSMIG-USA — Down Syndrome Medical Interest Group. Regressão em Pessoas com Síndrome de Down: atualização do consenso para famílias. Mais informações sobre ensaios clínicos: clinicaltrials.gov",
      },
    ],
  },
  {
    slug: "envelhecimento-deficiencia-intelectual",
    title:
      "Envelhecimento da Pessoa com Deficiência Intelectual: desafios, cuidados e o papel das instituições",
    category: "Envelhecimento Ativo",
    metaTitle: "Envelhecimento e Deficiência Intelectual: cuidados",
    metaDescription:
      "Como o envelhecimento afeta pessoas com deficiência intelectual? Conheça os desafios, as perdas funcionais observadas e as estratégias de cuidado desenvolvidas por instituições de São Paulo.",
    keywords:
      "envelhecimento deficiência intelectual, pessoa idosa deficiência intelectual, PICDI, cuidado idoso Down",
    cover: cover2,
    readingTime: "7 min de leitura",
    intro:
      "O envelhecimento da população é uma realidade global — e esse fenômeno também alcança as pessoas com deficiência intelectual. Com o aumento da expectativa de vida desse grupo, cresce também a necessidade de cuidados especializados, políticas públicas adequadas e instituições preparadas para oferecer suporte de qualidade.",
    blocks: [
      { type: "h2", text: "Quem são as pessoas idosas com deficiência intelectual?" },
      {
        type: "p",
        text: "A deficiência intelectual (DI) é caracterizada por limitações significativas no funcionamento intelectual e no comportamento adaptativo, afetando a capacidade de aprender, comunicar e realizar atividades cotidianas de forma independente. Quando essa condição se combina com o envelhecimento, surgem novos desafios e necessidades específicas.",
      },
      {
        type: "p",
        text: "Estima-se que o número de adultos com deficiência intelectual e de desenvolvimento com mais de 60 anos deva crescer de cerca de 641 mil em 2000 para 1,2 milhão até 2030. No Brasil, esse grupo ainda é pouco visível nos serviços de saúde e assistência social — o que torna o trabalho das instituições ainda mais essencial.",
      },
      { type: "h2", text: "O que muda com o envelhecimento?" },
      { type: "p", text: "Pessoas com deficiência intelectual podem envelhecer mais precocemente e enfrentar:" },
      {
        type: "ul",
        items: [
          "Declínio cognitivo — comprometimento de memória, linguagem, raciocínio e percepção",
          "Problemas de saúde crônicos — doenças cardíacas, diabetes, hipotireoidismo, entre outros",
          "Isolamento social — agravado pela perda de cuidadores familiares que também envelhecem",
          "Dificuldades na comunicação — limitando a capacidade de expressar sintomas e necessidades",
          "Dependência aumentada nas atividades da vida diária",
        ],
      },
      {
        type: "p",
        text: "Aproximadamente um terço dos adultos com DI vive com um cuidador familiar com 60 anos ou mais — e um número considerável dessas famílias permanece invisível para os serviços de saúde e assistência social.",
      },
      { type: "h2", text: "O que revelou a pesquisa do FEPIDI?" },
      {
        type: "p",
        text: "O Fórum do Envelhecimento da Pessoa com Deficiência Intelectual (FEPIDI), fundado há mais de 10 anos em São Paulo, realizou uma pesquisa com 198 pessoas idosas com DI atendidas por 8 instituições durante o período da pandemia de COVID-19 (2020–2022).",
      },
      {
        type: "p",
        text: "Os resultados evidenciaram o impacto da pandemia sobre essa população já vulnerável. As principais perdas funcionais observadas foram:",
      },
      {
        type: "table",
        head: ["Área", "O que foi observado"],
        rows: [
          ["Linguagem", "Repetições, lentidão na comunicação, anomia"],
          ["Memória", "Dificuldade para reter informações recentes"],
          ["Raciocínio", "Lentificação, dificuldade para argumentar"],
          ["Percepção", "Rebaixamento, falta de atenção"],
          ["Cognição social", "Introversão, maior isolamento"],
          ["Comportamento e humor", "Depressão, agressividade, estereotipias"],
          ["Habilidades motoras", "Lentidão, desequilíbrio, sobrepeso"],
          ["Atividades da vida diária", "Dificuldades no autocuidado"],
        ],
      },
      {
        type: "p",
        text: "A faixa etária de 40 a 49 anos concentrou o maior número de pessoas atendidas — reforçando que o processo de envelhecimento nessa população começa mais cedo do que na população geral.",
      },
      { type: "h2", text: "Como as instituições responderam à pandemia?" },
      {
        type: "p",
        text: "Diante do isolamento social imposto pela COVID-19, as instituições do FEPIDI desenvolveram estratégias criativas e adaptativas para manter o cuidado:",
      },
      {
        type: "ul",
        items: [
          "Envio de atividades para execução em domicílio",
          "Atendimento presencial pontual quando necessário",
          "Uso da tecnologia para conexão com atendidos e famílias",
          "Oficinas de intervenção cognitiva e estimulação online",
          "Atividades de corpo e movimento, música e arteterapia",
          "Jogos em grupo à distância",
          "Orientação e capacitação de pais e cuidadores",
          "Oficinas da memória online",
          "Manutenção de datas comemorativas no formato virtual",
        ],
      },
      { type: "h2", text: "Quais foram os ganhos observados?" },
      { type: "p", text: "Apesar dos desafios, as instituições registraram avanços importantes:" },
      {
        type: "ul",
        items: [
          "Aumento do nível motivacional",
          "Maior envolvimento das famílias",
          "Aprendizado de tarefas domésticas",
          "Melhor interação por meio da tecnologia",
          "Maior capacidade de adaptação a mudanças",
          "Melhoria na resolução de problemas",
          "Alterações positivas no comportamento e humor",
        ],
      },
      {
        type: "p",
        text: "Esses resultados mostram que, com suporte adequado e abordagem centrada na pessoa, é possível promover envelhecimento ativo mesmo em condições adversas.",
      },
      { type: "h2", text: "O papel das instituições de apoio" },
      {
        type: "p",
        text: "A pesquisa do FEPIDI contou com a participação de instituições como ADERE, ADID, APABEX, APOIE, Chaverim, Instituição Beneficente Nosso Lar e a Fundação Dona Paulina de Souza Queiroz — que desde 2020 retomou suas atividades com foco em emprego apoiado a partir dos 18 anos e envelhecimento ativo a partir dos 35 anos.",
      },
      {
        type: "p",
        text: "O estudo reforça que o cuidado à pessoa idosa com deficiência intelectual exige uma abordagem holística, multidisciplinar e centrada na pessoa — considerando não apenas as necessidades clínicas, mas também os aspectos emocionais, sociais e práticos da vida diária.",
      },
      {
        type: "quote",
        text: "O envelhecimento ativo, conceituado pela OMS como o processo de otimização das oportunidades de saúde, aprendizagem ao longo da vida, participação e segurança, estende-se às pessoas com deficiência intelectual.",
      },
      {
        type: "source",
        text: "Fonte: Fórum do Envelhecimento da Pessoa com Deficiência Intelectual (FEPIDI). Inovando no Atendimento das Pessoas Idosas com Deficiência Intelectual — Desafios nas Instituições de Apoio. São Paulo, 2022.",
      },
    ],
  },
  {
    slug: "alzheimer-sindrome-down",
    title: "Alzheimer na Síndrome de Down: iniciativa espanhola abre caminho para o cuidado e a pesquisa",
    category: "Pesquisa & Ciência",
    metaTitle: "Alzheimer na Síndrome de Down: a iniciativa DS-BAI",
    metaDescription:
      "Uma nova iniciativa espanhola está transformando o cuidado de adultos com síndrome de Down em risco de Alzheimer. Saiba como o projeto DS-BAI funciona e o que suas descobertas significam.",
    keywords:
      "Alzheimer síndrome de Down, doença de Alzheimer Down, declínio cognitivo Down, DS-BAI pesquisa Down",
    cover: cover3,
    readingTime: "6 min de leitura",
    intro:
      "Pessoas com síndrome de Down têm uma predisposição geneticamente determinada para desenvolver a doença de Alzheimer. Essa realidade, já bem documentada pela ciência, exige respostas concretas — e uma iniciativa espanhola está dando passos importantes nessa direção.",
    blocks: [
      { type: "h2", text: "O que é o DS-BAI?" },
      {
        type: "p",
        text: "O Down Syndrome–Basque Alzheimer Initiative (DS-BAI) é um projeto multidisciplinar lançado em San Sebastián, Espanha, liderado pela Fundação CITA-Alzheimer. Seu objetivo é duplo: oferecer atendimento clínico completo a adultos com síndrome de Down e conduzir pesquisas clínico-biológicas sobre envelhecimento e doença de Alzheimer nessa população.",
      },
      {
        type: "p",
        text: "A iniciativa foi desenhada para identificar todas as pessoas com síndrome de Down no País Basco e em Navarra com mais de 18 anos, independentemente do grau de deficiência intelectual, estado cognitivo ou presença de comorbidades — desde que acompanhadas por um cuidador.",
      },
      { type: "h2", text: "Como funciona o atendimento?" },
      { type: "p", text: "A consulta clínica do DS-BAI é estruturada e abrangente, contemplando:" },
      { type: "h3", text: "Avaliação médica completa" },
      {
        type: "ul",
        items: [
          "Histórico pessoal, familiar e atual",
          "Exame físico com avaliação de pressão arterial, IMC, frequência cardíaca e exame neurológico detalhado",
          "Escalas de marcha e equilíbrio (Tinetti) e habilidades motoras (SCOPA)",
          "Exames de sangue: função hepática e renal, perfil lipídico, função tireoidiana, glicose, entre outros",
        ],
      },
      { type: "h3", text: "Avaliação neuropsicológica" },
      {
        type: "ul",
        items: [
          "Escalas de funcionalidade (DMR)",
          "Testes de inteligência (K-BIT2)",
          "Bateria neuropsicológica abrangente (CAMCOG-DS)",
          "Testes de memória episódica, atenção, linguagem, pensamento abstrato e praxia",
        ],
      },
      { type: "h3", text: "Exames complementares (opcionais)" },
      {
        type: "ul",
        items: [
          "Ressonância magnética cerebral",
          "Análise do líquido cefalorraquidiano para biomarcadores de Alzheimer (amiloide, tau)",
          "Vídeo-eletroencefalograma",
          "Estudos do sono",
        ],
      },
      { type: "h2", text: "O que os primeiros resultados revelaram?" },
      {
        type: "p",
        text: "No primeiro ano de atividade, o DS-BAI atraiu 114 participantes, com média de idade de 46,3 anos. O perfil da amostra: 53,8% do sexo masculino; grau de deficiência intelectual leve (40,4%), moderada (49,4%), grave (9,2%) e profunda (0,9%).",
      },
      {
        type: "p",
        text: "O dado mais impactante: 36% da amostra apresentava sintomas de Alzheimer — ou seja, declínio cognitivo além da deficiência intelectual da síndrome de Down. No entanto, apenas 5,7% tinham esse diagnóstico antes de chegar à consulta. Isso revela um enorme subdiagnóstico na população com síndrome de Down — e reforça a urgência de iniciativas como essa.",
      },
      { type: "h2", text: "Por que esse projeto importa para além da Espanha?" },
      {
        type: "p",
        text: "A pesquisa com adultos com síndrome de Down é considerada uma das melhores formas de estudar os mecanismos do Alzheimer na população geral. Isso porque todas as pessoas com síndrome de Down carregam uma cópia extra do cromossomo 21 — onde está localizado o gene da proteína precursora do amiloide (APP), diretamente relacionada ao desenvolvimento da doença de Alzheimer.",
      },
      {
        type: "p",
        text: "Ao estudar esse grupo, pesquisadores ganham uma janela privilegiada para entender a progressão da doença e testar possíveis intervenções. Os autores do estudo concluem que essa pesquisa não beneficia apenas as pessoas com síndrome de Down e suas famílias — ela tem impacto positivo no conhecimento científico aplicável à sociedade como um todo.",
      },
      { type: "h2", text: "Formação e disseminação do conhecimento" },
      {
        type: "p",
        text: "Além do atendimento clínico, o DS-BAI inclui um robusto programa de formação, com sessões estruturadas para profissionais de saúde envolvidos no cuidado de cada paciente e para familiares, cuidadores e educadores. Também foi criada uma plataforma de pesquisa para reunir e analisar os dados coletados — com perspectiva de integração a consórcios nacionais e internacionais.",
      },
      { type: "h2", text: "O que isso significa para o Brasil?" },
      {
        type: "p",
        text: "Iniciativas como o DS-BAI são um modelo a ser seguido. No Brasil, onde o cuidado à pessoa adulta com síndrome de Down ainda carece de estrutura especializada, a experiência espanhola mostra que é possível — e necessário — organizar atendimento clínico de qualidade, produzir conhecimento científico e envolver famílias e profissionais em um projeto comum.",
      },
      {
        type: "p",
        text: "Instituições como a Fundação Dona Paulina de Souza Queiroz, que atua com envelhecimento ativo de pessoas com deficiência intelectual a partir dos 35 anos, estão alinhadas a essa visão — e acompanham de perto os avanços da pesquisa internacional para oferecer o melhor cuidado possível às pessoas que atendem.",
      },
      {
        type: "source",
        text: "Fonte: Altuna M. et al. Síndrome de Down – Iniciativa Basca de Alzheimer (DS-BAI): Coorte Clínica-Biológica. J. Clin. 2024, 13, 1139. https://doi.org/10.3390/jcm13041139",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);