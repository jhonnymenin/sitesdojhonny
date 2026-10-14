/**
 * Programação do evento (programa preliminar, sujeito a alterações).
 * Hierarquia de leitura: HORÁRIO · SESSÃO · TEMA.
 * `talks` são as apresentações internas de cada mesa (aparecem ao tocar no item).
 * `speakerIds` referencia src/data/speakersData.ts.
 */
export type AgendaTalk = {
  time: string;
  title: string;
  speakerId?: string;
  /** nome do palestrante quando não há ficha completa cadastrada */
  speakerName?: string;
};

export type AgendaKind =
  | "credenciamento"
  | "abertura"
  | "mesa"
  | "satelite"
  | "coffee"
  | "almoco"
  | "encerramento";

export type AgendaItem = {
  id: string;
  time: string;
  /** rótulo da sessão: "MESA 1", "SIMPÓSIO SATÉLITE I", "COFFEE BREAK"... */
  session: string;
  /** tema da sessão */
  title?: string;
  kind: AgendaKind;
  period: "manha" | "tarde";
  description?: string;
  moderator?: string;
  talks?: AgendaTalk[];
  speakerIds?: string[];
};

/*
 * Transcrita do PDF "Programação Científica" enviado pela organização em
 * 14/10/2026. Horários, títulos, moderadores e palestrantes seguem o documento;
 * onde ele diz "a definir", o app também diz.
 */
export const agendaData: AgendaItem[] = [
  {
    id: "credenciamento",
    time: "07h30",
    session: "Credenciamento e recepção",
    kind: "credenciamento",
    period: "manha",
  },
  {
    id: "abertura",
    time: "08h00",
    session: "Abertura institucional",
    kind: "abertura",
    period: "manha",
  },
  {
    id: "video-institucional",
    time: "08h25",
    session: "Vídeo institucional",
    kind: "abertura",
    period: "manha",
  },
  {
    id: "mesa-1",
    time: "08h30",
    session: "Mesa 1",
    title: "Integração do cuidado e jornada do paciente",
    kind: "mesa",
    period: "manha",
    moderator: "Dr. Alexandre Ibrahim",
    speakerIds: ["julio-moraes", "rafael-carvalho", "ana-teresa-amoedo"],
    talks: [
      {
        time: "08h30",
        title: "A jornada do paciente como instrumento de eficiência no cuidado",
        speakerId: "julio-moraes",
      },
      {
        time: "08h45",
        title: "A importância da integração entre o médico prescritor e o Centro de Terapia Assistida",
        speakerId: "rafael-carvalho",
      },
      {
        time: "09h00",
        title: "Acompanhamento de desfechos como medida de eficácia clínica e experiência do paciente",
        speakerId: "ana-teresa-amoedo",
      },
      {
        time: "09h15",
        title: "Discussão da mesa",
        speakerName: "Katiucia (enfermeira), Eloisa Amoedo (psicóloga) e Carolina Rolim (nutricionista)",
      },
    ],
  },
  {
    id: "satelite-1",
    time: "09h30",
    session: "Simpósio satélite 1 — Johnson & Johnson / Tremfya",
    title: "Das articulações ao intestino: o papel da segurança na jornada do paciente crônico",
    kind: "satelite",
    period: "manha",
    speakerIds: ["carla-saad", "genoile-silva"],
    description: "Palestrantes: Dra. Carla Saad e Dra. Genóile Santana.",
  },
  { id: "coffee-1", time: "10h00", session: "Coffee break e networking", kind: "coffee", period: "manha" },
  {
    id: "mesa-2",
    time: "10h30",
    session: "Mesa 2",
    title: "Hot topics em doenças imunomediadas",
    kind: "mesa",
    period: "manha",
    moderator: "Dr. Célio Roberto Gonçalves",
    speakerIds: ["antonio-condino", "henrique-dalmolin"],
    talks: [
      {
        time: "10h30",
        title: "O papel dos exames genéticos no diagnóstico e manejo das doenças imunomediadas",
        speakerId: "antonio-condino",
      },
      {
        time: "10h50",
        title: "Manejo de comorbidades e impacto nos desfechos das doenças imunomediadas",
        speakerName: "Dr. Henrique Ayres",
      },
      {
        time: "11h10",
        title: "Terapia celular nas doenças imunomediadas",
        speakerId: "henrique-dalmolin",
      },
      {
        time: "11h30",
        title: "Discussão da mesa",
        speakerName: "Dr. Antônio Condino, Dr. Henrique Ayres e Dr. Henrique Dalmolin",
      },
    ],
  },
  {
    id: "satelite-2",
    time: "12h00",
    session: "Simpósio satélite 2 — Eli Lilly",
    kind: "satelite",
    period: "manha",
    description: "Tema e palestrante a definir.",
  },
  {
    id: "satelite-3",
    time: "12h30",
    session: "Simpósio satélite 3 — GSK",
    title: "Janela de oportunidade no tratamento do LES: um caso de vida real",
    kind: "satelite",
    period: "manha",
    speakerIds: ["henrique-dalmolin"],
    description: "Palestrante: Dr. Henrique Dalmolin.",
  },
  { id: "almoco", time: "13h00", session: "Almoço e networking", kind: "almoco", period: "tarde" },
  {
    id: "mesa-3",
    time: "14h00",
    session: "Mesa 3",
    title: "Controvérsias em doenças imunomediadas",
    kind: "mesa",
    period: "tarde",
    moderator: "Dr. Luiz Adsuara",
    speakerIds: ["samila-apostolo"],
    talks: [
      {
        time: "14h00",
        title: "Diagnóstico e manejo das imunodeficiências primárias",
        speakerName: "Dr. José Carlison",
      },
      {
        time: "14h15",
        title: "Neuroimunologia: diagnóstico preciso e tratamento precoce",
        speakerId: "samila-apostolo",
      },
      {
        time: "14h30",
        title: "Desafios no diagnóstico e manejo da hidradenite supurativa",
        speakerName: "Dr. Wagner Galvão",
      },
      {
        time: "14h45",
        title: "Discussão da mesa",
        speakerName: "Dr. José Carlison, Dra. Samira Apóstolos e Dr. Wagner Galvão",
      },
    ],
  },
  {
    id: "mesa-4",
    time: "15h00",
    session: "Mesa 4",
    title: "Aplicações clínicas e decisões compartilhadas",
    kind: "mesa",
    period: "tarde",
    moderator: "Dra. Lídia Salles",
    speakerIds: ["genoile-silva"],
    talks: [
      { time: "15h00", title: "Red flags: quando investigar DII", speakerId: "genoile-silva" },
      {
        time: "15h15",
        title: "Dermatite atópica: o impacto do diagnóstico na escolha do tratamento",
        speakerName: "Dra. Renata Magalhães",
      },
      {
        time: "15h30",
        title: "Lúpus: como escolher a melhor estratégia para cada paciente?",
        speakerName: "Dr. Joaquim Ivo Vasques",
      },
      {
        time: "15h45",
        title: "Discussão da mesa",
        speakerName: "Dra. Genóile Santana, Dra. Renata Magalhães e Dr. Joaquim Ivo Vasques",
      },
    ],
  },
  {
    id: "satelite-4",
    time: "16h00",
    session: "Simpósio satélite 4 — Johnson & Johnson / Simponi",
    title: "Tomada de decisão no paciente multissistêmico",
    kind: "satelite",
    period: "tarde",
    description: "Palestrante: Dr. Joaquim Ivo Vasques.",
  },
  { id: "coffee-2", time: "16h30", session: "Coffee break e networking", kind: "coffee", period: "tarde" },
  {
    id: "mesa-5",
    time: "17h00",
    session: "Mesa 5",
    title: "Casos clínicos interativos",
    kind: "mesa",
    period: "tarde",
    moderator: "Dr. Fernando Henrique Carlos De Souza",
    speakerIds: ["carla-saad", "samila-apostolo"],
    talks: [
      {
        time: "17h00",
        title:
          "Interface entre gastroenterologia, dermatologia e reumatologia: retocolite ulcerativa e hidradenite supurativa",
        speakerName:
          "Gastroenterologia: Dr. Diogo Delgado Dotta · Reumatologia: Dra. Carla Saad · Dermatologia: Dra. Renata Magalhães",
      },
      {
        time: "17h30",
        title: "Miastenia gravis e espondiloartrite axial",
        speakerName:
          "Reumatologia: Dra. Carla Saad · Imunologia: Dra. Mariana de Gouveia Pereira Pimentel · Neurologia: Dra. Samira Apóstolos",
      },
    ],
  },
  {
    id: "encerramento",
    time: "18h00",
    session: "Encerramento institucional",
    kind: "encerramento",
    period: "tarde",
  },
];

export const agendaById = (id: string) => agendaData.find((a) => a.id === id);

/** Sessões em que um palestrante aparece (mesa ou apresentação individual). */
export const sessionsBySpeaker = (speakerId: string) =>
  agendaData.filter(
    (a) => a.speakerIds?.includes(speakerId) || a.talks?.some((t) => t.speakerId === speakerId),
  );

const toMinutes = (time: string) => {
  const [h, m] = time.replace("h", ":").split(":");
  return Number(h) * 60 + Number(m || 0);
};

/**
 * Próxima atividade: durante o dia do evento usa o horário real;
 * fora dele mostra a primeira atividade do dia.
 */
export function getNextActivity(now: Date = new Date(), eventISODate = "2026-10-17") {
  const spNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const today = `${spNow.getFullYear()}-${String(spNow.getMonth() + 1).padStart(2, "0")}-${String(spNow.getDate()).padStart(2, "0")}`;

  if (today !== eventISODate) {
    return { item: agendaData[0], status: "Programado" as const, live: null as AgendaItem | null };
  }

  const minutes = spNow.getHours() * 60 + spNow.getMinutes();
  const upcoming = agendaData.find((a) => toMinutes(a.time) > minutes);
  const current = [...agendaData].reverse().find((a) => toMinutes(a.time) <= minutes) ?? null;

  return {
    item: upcoming ?? agendaData[agendaData.length - 1],
    status: upcoming ? ("A seguir" as const) : ("Encerrado" as const),
    live: current,
  };
}
