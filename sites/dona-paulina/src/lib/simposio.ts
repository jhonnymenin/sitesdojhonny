/*
 * II Simpósio — dados do evento.
 *
 * Transcritos do PROGRAMA enviado pela Fundação. Ficam num arquivo só porque o
 * pop-up, a página da programação e a faixa da home dizem as mesmas coisas: data
 * e link repetidos em três lugares viram três verdades diferentes na primeira
 * alteração.
 *
 * ATENÇÃO AO LINK DE INSCRIÇÃO: conferido em 21/10/2026 e, em navegador sem
 * sessão do Google, ele NÃO abre o formulário — redireciona para a tela de login
 * ("Faça login com sua Conta do Google para acessar o Google Formulários"). Quem
 * não tiver conta, ou não estiver logado, não consegue se inscrever. A correção
 * é no próprio Google Forms, liberando o acesso para qualquer pessoa com o link.
 */

export const SIMPOSIO = {
  titulo: "II Simpósio",
  subtitulo: "Saberes e Práticas no Envelhecimento da Pessoa com Deficiência Intelectual",
  dataLegivel: "7 de novembro de 2026",
  dataISO: "2026-11-07",
  horario: "das 8h às 17h",
  local: "Avenida Vereador José Diniz, 2.436 — Brooklin, São Paulo",
  /** O `usp=publish-editor` sai: é o que o Google acrescenta ao copiar de dentro
   *  do editor, não faz parte do endereço do formulário. */
  inscricao:
    "https://docs.google.com/forms/d/e/1FAIpQLSeOBivgP1VvZE0AUx5RCy-tTsMBG7B6JsM048CG5fk3fhxL0g/viewform",
} as const;

export type Atividade = {
  hora: string;
  titulo: string;
  /** quem apresenta — vazio nas atividades sem palestrante */
  quem?: string;
  /** minicurrículo, como veio no programa */
  curriculo?: string;
  /** falas de dentro de uma mesa */
  partes?: { titulo: string; quem: string; curriculo?: string }[];
};

export const PROGRAMA: Atividade[] = [
  { hora: "08:00 às 09:00", titulo: "Café da manhã e entrega de material" },
  { hora: "09:00 às 09:20", titulo: "Abertura" },
  { hora: "09:20 às 09:30", titulo: "Apresentação do vídeo institucional" },
  {
    hora: "09:30 às 10:20",
    titulo: "A neurologia e a deficiência intelectual",
    quem: "Dra. Laura Guilhoto",
    curriculo:
      "Neurologista pela USP, pós-doutorado no Children's Hospital Boston, médica da UNIFESP.",
  },
  { hora: "10:20 às 10:50", titulo: "Perguntas e respostas" },
  {
    hora: "11:00 às 12:00",
    titulo: "Além do declínio: a ciência da reabilitação cognitiva e apresentação de cases",
    quem: "Deborah Boschetti",
    curriculo:
      "Psicóloga (FMU), gerontologista (PUC-SP), formação em Neuropsicologia e Reabilitação Neuropsicológica (HC-FMUSP). Orientadora do Núcleo de Envelhecimento da Fundação Dona Paulina de Souza Queiroz.",
  },
  { hora: "12:00 às 12:20", titulo: "Perguntas e respostas" },
  { hora: "12:30 às 13:30", titulo: "Almoço" },
  {
    hora: "13:40 às 15:00",
    titulo: "Roda de conversa",
    partes: [
      {
        titulo: "Audição e o envelhecimento",
        quem: "Dr. Roberto Alcântara Maia",
        curriculo:
          "Médico otorrinolaringologista, graduação e residência pela Faculdade de Medicina da USP. Pós-graduação, mestrado e doutorado pela UNIFESP. Diretor da Clínica de Otorrino e Otoneuro há mais de 30 anos.",
      },
      {
        titulo: "A fonoaudiologia no envelhecimento",
        quem: "Dra. Livia Maia",
        curriculo:
          "Formação em Fonoaudiologia pelo Instituto Brasileiro de Medicina de Reabilitação. Especialista em Audiologia e Otoneurologia (Cediau).",
      },
      {
        titulo: "Apneia do sono",
        quem: "Dra. Emilia Leite de Barros Costa",
        curriculo:
          "Otorrinolaringologista, fellowship em Otorrinolaringologia Pediátrica pela Unifesp — Escola Paulista de Medicina. Mestrado e doutorado em Ciências pela Unifesp.",
      },
      {
        titulo: "Problemas oftalmológicos no envelhecimento",
        quem: "Maria Teresa Borralho Ferreira de Souza",
        curriculo:
          "Formada em Ortóptica pela Escola Paulista de Medicina (hoje UNIFESP). Desde 1999 na Clínica de Olhos Dr. Moacir Cunha e, desde 2010, no IJC, no Programa Novo Olhar.",
      },
    ],
  },
  { hora: "15:00 às 15:30", titulo: "Perguntas e respostas" },
  {
    hora: "15:30 às 16:00",
    titulo: "Quedas em pessoas idosas com deficiência intelectual: fatores de risco e estratégias preventivas",
    quem: "Soraia Fernandes das Neves",
    curriculo:
      "Fisioterapeuta, especialista em Fisioterapia em Gerontologia pela ABRAFIGE e em Fisioterapia Aplicada à Gerontologia pelo HC-FMUSP. MBA em Gestão em Serviços de Saúde pela FMU. Mestre e doutora em Neurociência e Cognição pela UFABC. Docente de Fisioterapia e Psicologia na Faculdade ENAU, em Ribeirão Pires, e supervisora técnica assistencial na Elo Senior Care.",
  },
  { hora: "16:00 às 16:15", titulo: "Perguntas e respostas" },
  {
    hora: "16:15 às 16:40",
    titulo:
      "Ações de promoção e prevenção de saúde cerebral no envelhecimento da pessoa com deficiência intelectual",
    quem: "Claudia Lopes",
    curriculo:
      "Mestre em Ciências pela USP. Fonoaudióloga formada pela Faculdade de Ciências Médicas da Santa Casa de São Paulo. Especializada em Gerontologia e Linguagem pelo Conselho Federal de Fonoaudiologia e em Envelhecimento Ativo da Pessoa com Deficiência Intelectual (Brasília/DF). MBA em Gestão Estratégica da Saúde (Rio de Janeiro). Pesquisadora no Ambulatório de Vida Adulta e Envelhecimento na Síndrome de Down do Instituto de Psiquiatria (IPq-FMUSP) desde 2017.",
  },
  { hora: "16:40 às 17:00", titulo: "Perguntas e respostas" },
  { hora: "17:00", titulo: "Coquetel" },
];
