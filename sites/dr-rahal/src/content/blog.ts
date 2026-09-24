/**
 * Conteúdo editorial do blog.
 * Estrutura em blocos para renderização tipada e consistente.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export interface BlogPost {
  slug: string;
  num: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  /** Frase de abertura destacada abaixo do título. */
  lead: string;
  /** Vazio = artigo ainda não publicado (aguardando texto). */
  blocks: Block[];
  references?: string;
}

const comparativo: BlogPost = {
  slug: "cirurgia-ou-ablacao-por-radiofrequencia",
  num: "03",
  tag: "Comparativo",
  title: "Cirurgia ou ablação por radiofrequência: qual escolher?",
  excerpt:
    "Comparação criteriosa em segurança, recuperação, custos e resultados — para uma decisão consciente.",
  readTime: "10 min",
  lead: "Segurança, recuperação, custos e resultados: entenda as diferenças entre os tratamentos e quais critérios devem orientar uma decisão consciente.",
  references:
    "European Thyroid Association — ablação de nódulos benignos; European Thyroid Association — manejo dos nódulos tireoidianos; NICE — ablação por radiofrequência de nódulos benignos; American Thyroid Association — diretrizes e consensos.",
  blocks: [
    {
      type: "p",
      text: "Ao descobrir um nódulo na tireoide que precisa de tratamento, é comum surgir a dúvida: realizar uma cirurgia ou optar pela ablação por radiofrequência?",
    },
    {
      type: "p",
      text: "As duas técnicas podem ser seguras e eficazes, mas possuem indicações, objetivos e limitações diferentes. A escolha não deve ser baseada apenas no desejo de evitar uma cirurgia ou resolver o problema rapidamente. É necessário avaliar a natureza do nódulo, os sintomas, os exames e as condições clínicas de cada paciente.",
    },
    { type: "h2", text: "A primeira pergunta: o nódulo realmente precisa ser tratado?" },
    { type: "p", text: "Nem todo nódulo na tireoide necessita de intervenção." },
    {
      type: "p",
      text: "Quando o nódulo é benigno, pequeno, estável e não causa sintomas, o acompanhamento com consultas e ultrassonografias pode ser suficiente.",
    },
    { type: "p", text: "O tratamento costuma ser considerado quando o nódulo:" },
    {
      type: "ul",
      items: [
        "apresenta crescimento significativo;",
        "provoca dificuldade para engolir;",
        "causa pressão ou desconforto no pescoço;",
        "interfere na respiração;",
        "gera incômodo estético;",
        "produz hormônios em excesso;",
        "apresenta características suspeitas;",
        "possui diagnóstico confirmado de malignidade.",
      ],
    },
    {
      type: "p",
      text: "Somente depois de confirmar a necessidade de tratamento é possível comparar adequadamente a cirurgia e a ablação.",
    },
    { type: "h2", text: "Como funciona a cirurgia da tireoide?" },
    {
      type: "p",
      text: "A cirurgia consiste na retirada de parte da tireoide ou de toda a glândula, dependendo da doença e da extensão do tratamento necessário.",
    },
    { type: "p", text: "Entre as principais modalidades estão:" },
    {
      type: "ul",
      items: [
        "Lobectomia: retirada de um dos lados da tireoide;",
        "Tireoidectomia total: retirada completa da glândula;",
        "Cirurgias associadas: podem incluir a retirada de linfonodos quando existe indicação oncológica.",
      ],
    },
    {
      type: "p",
      text: "O procedimento é realizado em ambiente hospitalar, geralmente sob anestesia geral. O tecido removido é encaminhado para análise anatomopatológica, permitindo uma avaliação definitiva da lesão.",
    },
    { type: "h2", text: "Como funciona a ablação por radiofrequência?" },
    {
      type: "p",
      text: "A ablação por radiofrequência é um procedimento minimamente invasivo realizado com orientação ultrassonográfica.",
    },
    {
      type: "p",
      text: "Por meio de um eletrodo fino introduzido no nódulo, o médico aplica energia térmica de maneira controlada. O tecido tratado sofre uma redução progressiva, sendo gradualmente absorvido pelo organismo.",
    },
    {
      type: "p",
      text: "Na maioria dos casos, o procedimento utiliza anestesia local, não exige cortes e permite que o paciente receba alta no mesmo dia.",
    },
    {
      type: "p",
      text: "Diferentemente da cirurgia, a ablação não retira imediatamente o nódulo. Seu objetivo é diminuir o volume da lesão e melhorar os sintomas, preservando o restante da tireoide.",
    },
    { type: "h2", text: "Principais diferenças entre cirurgia e ablação" },
    {
      type: "table",
      head: ["Critério", "Cirurgia", "Ablação por radiofrequência"],
      rows: [
        ["Forma de tratamento", "Retira parte ou toda a tireoide", "Trata o interior do nódulo com energia térmica"],
        ["Anestesia", "Geral, na maioria dos casos", "Local, podendo haver sedação leve"],
        ["Internação", "Pode exigir internação", "Geralmente ambulatorial"],
        ["Corte no pescoço", "Sim", "Não"],
        ["Cicatriz", "Pode haver cicatriz cervical", "Não costuma deixar cicatriz visível"],
        ["Recuperação", "Geralmente mais longa", "Tendência de retorno mais rápido às atividades"],
        ["Resultado sobre o volume", "Retirada imediata do nódulo", "Redução progressiva ao longo dos meses"],
        ["Análise completa do tecido", "Sim", "Não"],
        ["Preservação da tireoide", "Depende da extensão da cirurgia", "Preserva a maior parte da glândula"],
        ["Reposição hormonal", "Pode ser necessária", "Menor probabilidade, mas depende do caso"],
        ["Nova intervenção", "Menos frequente no local removido", "Pode ser necessária se houver volume residual ou crescimento"],
        ["Indicação para câncer", "Tratamento principal em muitos casos", "Restrita a situações muito selecionadas"],
      ],
    },
    { type: "h2", text: "Qual opção é mais segura?" },
    {
      type: "p",
      text: "Quando corretamente indicadas e realizadas por profissionais experientes, tanto a cirurgia quanto a ablação apresentam bons perfis de segurança. No entanto, nenhum procedimento é totalmente isento de riscos.",
    },
    { type: "h3", text: "Possíveis riscos da cirurgia" },
    { type: "p", text: "Entre os riscos relacionados à cirurgia da tireoide estão:" },
    {
      type: "ul",
      items: [
        "sangramento;",
        "infecção;",
        "alterações temporárias ou permanentes da voz;",
        "lesão dos nervos relacionados às cordas vocais;",
        "alterações das glândulas paratireoides e do controle do cálcio;",
        "necessidade de reposição hormonal;",
        "riscos associados à anestesia geral;",
        "formação de cicatriz.",
      ],
    },
    {
      type: "p",
      text: "A probabilidade dessas complicações varia conforme a extensão da cirurgia, as características do paciente e a experiência da equipe.",
    },
    { type: "h3", text: "Possíveis riscos da ablação" },
    { type: "p", text: "A ablação pode apresentar:" },
    {
      type: "ul",
      items: [
        "dor ou sensação de calor;",
        "inchaço;",
        "hematoma;",
        "sangramento;",
        "alteração temporária da voz;",
        "queimadura na pele;",
        "lesão de estruturas próximas;",
        "ruptura do nódulo;",
        "necessidade de uma nova sessão.",
      ],
    },
    {
      type: "p",
      text: "Complicações graves são incomuns, mas a segurança depende do planejamento adequado, do acompanhamento ultrassonográfico durante todo o procedimento e do domínio técnico do profissional.",
    },
    {
      type: "note",
      text: "A ablação ser menos invasiva não significa que seja um procedimento simples ou que possa ser indicada sem uma avaliação criteriosa.",
    },
    { type: "h2", text: "Como é a recuperação?" },
    { type: "p", text: "A recuperação é uma das diferenças mais perceptíveis entre as duas opções." },
    { type: "h3", text: "Recuperação após a cirurgia" },
    {
      type: "p",
      text: "Após a cirurgia, o paciente pode precisar permanecer no hospital por um período de observação. Nos primeiros dias, são comuns desconforto cervical, dificuldade leve para movimentar o pescoço e sensibilidade na região operada.",
    },
    {
      type: "p",
      text: "O retorno ao trabalho e às atividades físicas depende da extensão do procedimento, da evolução clínica e do tipo de atividade exercida pelo paciente. Também pode ser necessário acompanhar os níveis dos hormônios tireoidianos e do cálcio. Quando toda a tireoide é retirada, a reposição hormonal passa a ser necessária.",
    },
    { type: "h3", text: "Recuperação após a ablação" },
    {
      type: "p",
      text: "A ablação costuma ser realizada de forma ambulatorial, com alta no mesmo dia. Alguns pacientes apresentam dor leve, sensibilidade, pequeno inchaço ou hematoma. Em geral, o retorno às atividades habituais é mais rápido, embora esforços físicos possam precisar ser evitados por alguns dias.",
    },
    {
      type: "p",
      text: "Como o nódulo permanece no organismo e diminui gradualmente, o acompanhamento por ultrassonografia faz parte do tratamento.",
    },
    { type: "h2", text: "Qual apresenta o melhor resultado?" },
    { type: "p", text: "A resposta depende do objetivo." },
    {
      type: "p",
      text: "A cirurgia remove o tecido de forma imediata e permite sua análise completa. Por isso, continua sendo uma opção fundamental quando existe suspeita ou confirmação de câncer, necessidade de tratar vários nódulos ou alterações que envolvem grande parte da glândula.",
    },
    {
      type: "p",
      text: "A ablação não retira o nódulo imediatamente. O resultado ocorre de forma progressiva, com redução do volume e melhora dos sintomas ao longo dos meses.",
    },
    { type: "p", text: "Em nódulos benignos corretamente selecionados, a ablação pode proporcionar:" },
    {
      type: "ul",
      items: [
        "redução expressiva do volume;",
        "melhora dos sintomas compressivos;",
        "melhora do desconforto estético;",
        "preservação da função tireoidiana;",
        "ausência de cicatriz cervical.",
      ],
    },
    {
      type: "p",
      text: "Entretanto, parte do nódulo pode permanecer. Em algumas situações, principalmente em lesões muito volumosas, pode haver necessidade de mais de uma sessão ou de outro tratamento no futuro.",
    },
    { type: "h2", text: "Quando a cirurgia costuma ser mais indicada?" },
    { type: "p", text: "A cirurgia tende a ser considerada quando:" },
    {
      type: "ul",
      items: [
        "há diagnóstico ou suspeita relevante de câncer;",
        "é necessário obter uma análise completa do tecido;",
        "existem vários nódulos que comprometem a glândula;",
        "há bócio muito volumoso;",
        "existe extensão para o tórax;",
        "os sintomas compressivos são importantes;",
        "há associação com outras doenças cirúrgicas da tireoide;",
        "a localização ou as características do nódulo dificultam uma ablação segura;",
        "o paciente prefere uma retirada definitiva após compreender os riscos.",
      ],
    },
    {
      type: "p",
      text: "Em casos de câncer, a cirurgia permanece como tratamento principal para muitos pacientes. A utilização de ablação em lesões malignas é restrita a situações específicas e exige avaliação multidisciplinar.",
    },
    { type: "h2", text: "Quando a ablação pode ser uma boa opção?" },
    { type: "p", text: "A ablação pode ser considerada principalmente quando:" },
    {
      type: "ul",
      items: [
        "o nódulo é comprovadamente benigno;",
        "existe crescimento, desconforto ou alteração estética;",
        "o paciente apresenta sintomas causados pelo nódulo;",
        "há interesse em preservar a tireoide;",
        "deseja-se evitar uma cicatriz cervical;",
        "existem condições que aumentam o risco cirúrgico;",
        "o paciente não deseja se submeter à cirurgia;",
        "a anatomia permite a realização segura do procedimento.",
      ],
    },
    {
      type: "p",
      text: "Antes de tratar um nódulo benigno, sua natureza deve ser confirmada por meio da avaliação ultrassonográfica e da punção aspirativa por agulha fina, a PAAF. Dependendo do caso, pode ser necessária mais de uma confirmação citológica benigna.",
    },
    { type: "h2", text: "E quanto aos custos?" },
    { type: "p", text: "Não existe uma resposta única sobre qual tratamento custa menos." },
    { type: "p", text: "Na cirurgia, devem ser considerados:" },
    {
      type: "ul",
      items: [
        "honorários da equipe;",
        "custos hospitalares;",
        "anestesia;",
        "materiais;",
        "exames;",
        "internação;",
        "medicamentos;",
        "período de afastamento;",
        "acompanhamento após o procedimento;",
        "eventual reposição hormonal contínua.",
      ],
    },
    { type: "p", text: "Na ablação, entram no cálculo:" },
    {
      type: "ul",
      items: [
        "avaliação especializada;",
        "punções para confirmação da benignidade;",
        "materiais específicos;",
        "equipe e estrutura para o procedimento;",
        "ultrassonografias de acompanhamento;",
        "possibilidade de uma sessão complementar.",
      ],
    },
    {
      type: "p",
      text: "A cobertura por planos de saúde, a disponibilidade da técnica e os valores podem variar. Por isso, a comparação deve considerar não somente o preço do procedimento, mas todo o percurso de tratamento. Uma opção inicialmente mais cara pode representar menor afastamento das atividades. Por outro lado, uma cirurgia pode ser mais adequada e resolutiva em situações nas quais a ablação exigiria mais de uma sessão ou não trataria toda a doença.",
    },
    { type: "h2", text: "Existe uma escolha melhor?" },
    {
      type: "p",
      text: "Não existe uma técnica universalmente superior. A cirurgia oferece retirada imediata, análise completa do tecido e ampla aplicação em doenças malignas. A ablação oferece uma abordagem menos invasiva, recuperação mais rápida e maior preservação da tireoide, mas depende de uma indicação mais específica e produz uma redução gradual. A escolha consciente deve responder a algumas perguntas:",
    },
    {
      type: "ul",
      items: [
        "O nódulo é comprovadamente benigno?",
        "Existem características suspeitas?",
        "O objetivo é eliminar a lesão ou reduzir seu volume?",
        "Há sintomas compressivos?",
        "Existe necessidade de analisar todo o tecido?",
        "Quantos nódulos precisam ser tratados?",
        "Há risco de reposição hormonal?",
        "A ablação pode ser realizada com segurança naquela localização?",
        "O paciente compreende a possibilidade de acompanhamento ou nova sessão?",
        "Qual opção se adapta melhor às suas condições clínicas e prioridades?",
      ],
    },
    { type: "h2", text: "A decisão precisa ser individualizada" },
    {
      type: "p",
      text: "Cirurgia e ablação por radiofrequência não devem ser vistas como técnicas concorrentes. Elas são ferramentas diferentes para situações diferentes.",
    },
    {
      type: "p",
      text: "Uma indicação correta considera os exames, a classificação do nódulo, os resultados das punções, a anatomia do pescoço, os sintomas, os riscos e as preferências do paciente.",
    },
    {
      type: "p",
      text: "Se você recebeu indicação de tratamento para um nódulo na tireoide, procure uma avaliação especializada e converse sobre todas as alternativas disponíveis. Uma decisão consciente começa com um diagnóstico preciso e uma explicação transparente sobre os benefícios e as limitações de cada opção.",
    },
  ],
};

const nodulos: BlogPost = {
  slug: "nodulo-na-tireoide-quando-se-preocupar",
  num: "01",
  tag: "Nódulos",
  title: "Nódulo na tireoide: quando realmente se preocupar?",
  excerpt:
    "Nem todo nódulo é perigoso. Entenda os critérios que definem quando agir e quais opções estão disponíveis hoje.",
  readTime: "6 min",
  lead: "Nem todo nódulo é perigoso. Entenda os critérios que definem quando agir e quais opções estão disponíveis hoje.",
  references:
    "American Thyroid Association — diretrizes para nódulos tireoidianos; Sociedade Brasileira de Endocrinologia e Metabologia — consensos sobre nódulos da tireoide; AACE/ACE — guidelines de diagnóstico e manejo dos nódulos tireoidianos.",
  blocks: [
    {
      type: "p",
      text: "Receber a notícia de que existe um nódulo na tireoide assusta. A primeira associação de muitas pessoas é com câncer — mas a realidade é bem diferente: a grande maioria dos nódulos tireoidianos é benigna e nunca vai representar uma ameaça à saúde.",
    },
    {
      type: "p",
      text: "Nódulos são extremamente comuns. Estudos de ultrassonografia mostram que uma parcela significativa dos adultos — especialmente mulheres acima dos 40 anos — apresenta ao menos um nódulo na tireoide, muitas vezes sem qualquer sintoma. A pergunta certa, portanto, não é 'tenho um nódulo?', e sim: 'este nódulo precisa de alguma conduta?'",
    },
    { type: "h2", text: "O que é, exatamente, um nódulo na tireoide?" },
    {
      type: "p",
      text: "Um nódulo é uma área de crescimento diferente do tecido normal da glândula. Pode ser sólido, cheio de líquido (cístico) ou misto. Pode aparecer sozinho ou acompanhado de outros. Na maioria das vezes, é descoberto por acaso — num exame de rotina, numa ultrassonografia do pescoço ou até num exame de imagem feito por outro motivo.",
    },
    { type: "h2", text: "Sinais que merecem atenção" },
    {
      type: "p",
      text: "Embora a maioria dos nódulos seja inofensiva, algumas características pedem uma avaliação mais cuidadosa:" },
    {
      type: "ul",
      items: [
        "crescimento progressivo do nódulo ao longo dos exames;",
        "dificuldade para engolir ou sensação de bolo na garganta;",
        "rouquidão persistente ou alteração da voz;",
        "desconforto, pressão ou dor na região anterior do pescoço;",
        "dificuldade para respirar, principalmente ao deitar;",
        "aumento visível do volume do pescoço (bócio);",
        "linfonodos (gânglios) aumentados no pescoço;",
        "história familiar de câncer de tireoide;",
        "exposição a radiação na região do pescoço, principalmente na infância.",
      ],
    },
    {
      type: "p",
      text: "Nenhum desses sinais, isoladamente, significa câncer. Mas qualquer um deles justifica uma consulta com especialista e uma investigação adequada.",
    },
    { type: "h2", text: "Como o nódulo é avaliado?" },
    { type: "h3", text: "Ultrassonografia: o primeiro passo" },
    {
      type: "p",
      text: "A ultrassonografia é o exame fundamental. Ela mostra o tamanho, a localização e as características internas do nódulo — e é a partir dessas características que se classifica o risco. Sistemas como o TI-RADS organizam os achados (composição, bordas, formato, calcificações) em categorias que orientam a conduta: apenas acompanhar ou investigar mais.",
    },
    { type: "h3", text: "PAAF: a punção que define o diagnóstico" },
    {
      type: "p",
      text: "Quando o nódulo ultrapassa determinado tamanho ou apresenta características suspeitas, indica-se a punção aspirativa por agulha fina — a PAAF. É um procedimento rápido, feito com agulha muito fina e guiado por ultrassom, que coleta células do nódulo para análise. O resultado, classificado pelo sistema Bethesda, indica se o nódulo é benigno, suspeito ou maligno.",
    },
    { type: "h3", text: "Exames de sangue" },
    {
      type: "p",
      text: "A dosagem de TSH (e, em alguns casos, de outros hormônios) avalia se a tireoide funciona normalmente. Nódulos que produzem hormônio em excesso — os chamados nódulos tóxicos — têm comportamento e tratamento próprios.",
    },
    { type: "h2", text: "Quando apenas acompanhar?" },
    {
      type: "p",
      text: "Nódulos benignos, pequenos, estáveis e assintomáticos geralmente pedem apenas acompanhamento: consultas e ultrassonografias periódicas para confirmar que nada mudou. Operar ou tratar um nódulo desses traz mais risco do que benefício.",
    },
    { type: "h2", text: "Quando tratar — e com o quê?" },
    {
      type: "p",
      text: "O tratamento entra em cena quando o nódulo cresce, incomoda, comprime estruturas do pescoço, produz hormônio em excesso ou apresenta suspeita de malignidade. E aqui está a boa notícia: hoje, tratar não significa necessariamente operar.",
    },
    {
      type: "p",
      text: "Para nódulos benignos sintomáticos, a ablação por radiofrequência permite tratar a lesão sem cortes, sem anestesia geral e preservando a tireoide — com alta no mesmo dia. A cirurgia segue indicada principalmente quando há suspeita ou confirmação de câncer, bócios muito volumosos ou necessidade de análise completa do tecido.",
    },
    {
      type: "note",
      text: "Descobrir um nódulo não é sentença — é o início de uma avaliação. Com diagnóstico preciso, a maioria dos pacientes descobre que precisa apenas de acompanhamento ou de um tratamento muito mais simples do que imaginava.",
    },
    { type: "h2", text: "O essencial para lembrar" },
    {
      type: "ul",
      items: [
        "a maioria dos nódulos é benigna;",
        "ultrassonografia bem feita classifica o risco;",
        "a PAAF define a natureza do nódulo quando necessário;",
        "nem todo nódulo precisa de tratamento;",
        "quando precisa, nem sempre o tratamento é cirúrgico;",
        "a escolha deve ser individualizada, com especialista.",
      ],
    },
    {
      type: "p",
      text: "Se você descobriu um nódulo na tireoide, o próximo passo não é se preocupar — é investigar corretamente. Uma avaliação especializada transforma incerteza em um plano claro de conduta.",
    },
  ],
};

const ablacao: BlogPost = {
  slug: "ablacao-de-tireoide-como-funciona",
  num: "02",
  tag: "Procedimento",
  title: "Ablação de tireoide: como funciona na prática?",
  excerpt:
    "O passo a passo do procedimento que dispensa a cirurgia para milhares de pacientes no Brasil.",
  readTime: "8 min",
  lead: "O passo a passo do procedimento que dispensa a cirurgia para milhares de pacientes no Brasil.",
  references:
    "European Thyroid Association — ablação térmica de nódulos benignos; Korean Society of Thyroid Radiology — recomendações para ablação por radiofrequência; NICE — ablação por radiofrequência de nódulos tireoidianos benignos.",
  blocks: [
    {
      type: "p",
      text: "Durante décadas, quem precisava tratar um nódulo na tireoide tinha basicamente um caminho: a cirurgia. Isso mudou. A ablação por radiofrequência permitiu tratar nódulos benignos de forma minimamente invasiva — sem corte no pescoço, sem anestesia geral e, na maioria dos casos, preservando toda a tireoide.",
    },
    {
      type: "p",
      text: "Mas como funciona, na prática, um procedimento que trata um nódulo por dentro, sem removê-lo? Aqui está o passo a passo completo — da avaliação inicial ao acompanhamento.",
    },
    { type: "h2", text: "Antes do procedimento: a avaliação" },
    {
      type: "p",
      text: "Nenhuma ablação começa na sala de procedimento. Começa na avaliação. Antes de qualquer indicação, é preciso confirmar três pontos:",
    },
    {
      type: "ul",
      items: [
        "a natureza benigna do nódulo, confirmada por punção (PAAF) — dependendo do caso, com mais de uma confirmação citológica;",
        "a necessidade real de tratamento: sintomas compressivos, crescimento, desconforto estético ou produção excessiva de hormônio;",
        "a viabilidade técnica: localização do nódulo e anatomia do pescoço que permitam o acesso seguro do eletrodo.",
      ],
    },
    {
      type: "p",
      text: "Ultrassonografia detalhada, exames de sangue e, em alguns casos, avaliação da voz e das cordas vocais completam o planejamento. É essa etapa que separa uma indicação correta de um procedimento desnecessário.",
    },
    { type: "h2", text: "O dia do procedimento" },
    { type: "h3", text: "Anestesia local — sem dormir, sem cortar" },
    {
      type: "p",
      text: "A ablação é realizada em ambiente ambulatorial. O paciente chega, é posicionado confortavelmente e recebe anestesia local na região do pescoço. Não há anestesia geral, não há corte, não há internação.",
    },
    { type: "h3", text: "O eletrodo: precisão guiada por ultrassom" },
    {
      type: "p",
      text: "Com a ultrassonografia em tempo real, o médico introduz um eletrodo muito fino — semelhante a uma agulha — até o interior do nódulo. Cada movimento é acompanhado na tela, milímetro a milímetro. É essa visualização contínua que garante a segurança: as estruturas importantes do pescoço (nervos da voz, vasos, traqueia, esôfago) são identificadas e respeitadas durante todo o procedimento.",
    },
    { type: "h3", text: "A energia que trata por dentro" },
    {
      type: "p",
      text: "Uma vez posicionado, o eletrodo emite energia de radiofrequência que aquece o tecido do nódulo de forma controlada. Essa energia desnatura as células da lesão, que passam a ser gradualmente absorvidas pelo próprio organismo. A técnica mais utilizada é a do 'moving shot': o eletrodo é reposicionado várias vezes para tratar o nódulo por completo, unidade por unidade.",
    },
    {
      type: "p",
      text: "Durante a aplicação, é comum sentir calor ou uma leve pressão na região. O procedimento costuma durar entre 20 e 60 minutos, dependendo do tamanho e das características do nódulo.",
    },
    { type: "h2", text: "Depois da ablação: a recuperação" },
    {
      type: "p",
      text: "Terminado o procedimento, o paciente permanece em observação por um curto período e recebe alta no mesmo dia. Nas primeiras 48 a 72 horas, podem ocorrer:",
    },
    {
      type: "ul",
      items: [
        "dor leve ou sensibilidade no pescoço;",
        "pequeno inchaço ou hematoma no local da punção;",
        "sensação de calor residual na região.",
      ],
    },
    {
      type: "p",
      text: "Esses sintomas são, em geral, discretos e autolimitados. A maioria dos pacientes retoma as atividades habituais em poucos dias — apenas esforços físicos intensos pedem uma pausa um pouco maior.",
    },
    { type: "h2", text: "O resultado acontece ao longo dos meses" },
    {
      type: "p",
      text: "Diferentemente da cirurgia, que retira o nódulo imediatamente, a ablação produz um resultado progressivo. O nódulo tratado diminui mês a mês: é comum observar reduções expressivas de volume já nos primeiros seis meses, com continuação do processo ao longo do primeiro ano.",
    },
    {
      type: "p",
      text: "Por isso, o acompanhamento faz parte do tratamento. Ultrassonografias periódicas documentam a redução do volume e a melhora dos sintomas — e, em nódulos muito volumosos, podem indicar a necessidade de uma sessão complementar.",
    },
    {
      type: "note",
      text: "A ablação não retira o nódulo na hora: ela o trata por dentro, e o corpo faz o resto. O resultado é construído em meses — sem cicatriz, sem afastamento prolongado e com a tireoide preservada.",
    },
    { type: "h2", text: "Para quem a ablação é indicada?" },
    {
      type: "p",
      text: "A ablação por radiofrequência é especialmente valiosa para pacientes com nódulos benignos que crescem, incomodam ou comprometem a estética do pescoço — e também para quem apresenta risco cirúrgico elevado ou simplesmente deseja evitar a cirurgia. Em contrapartida, nódulos com suspeita de malignidade seguem, na maioria dos casos, com indicação cirúrgica.",
    },
    {
      type: "p",
      text: "A escolha entre ablação, cirurgia ou acompanhamento deve ser sempre individualizada — baseada em exames, sintomas, anatomia e nas prioridades de cada paciente. Se você recebeu indicação de tratar um nódulo, vale a pena conhecer todas as alternativas antes de decidir.",
    },
  ],
};

export const posts: BlogPost[] = [nodulos, ablacao, comparativo];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function isPublished(post: BlogPost): boolean {
  return post.blocks.length > 0;
}
