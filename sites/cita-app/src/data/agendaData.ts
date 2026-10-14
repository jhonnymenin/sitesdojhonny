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

export const agendaData: AgendaItem[] = [
  {
    id: "credenciamento",
    time: "07h30",
    session: "Credenciamento",
    title: "Welcome Coffee e entrega de materiais",
    kind: "credenciamento",
    period: "manha",
  },
  {
    id: "abertura",
    time: "08h15",
    session: "Abertura",
    title: "Abertura Institucional",
    kind: "abertura",
    period: "manha",
    description: "Carlos Cunha, CEO do Grupo CITA, e diretores médicos.",
  },
  {
    id: "mesa-1",
    time: "08h30",
    session: "Mesa 1",
    title: "Integração do Cuidado e Jornada do Paciente",
    kind: "mesa",
    period: "manha",
    speakerIds: ["rafael-carvalho", "ana-teresa-amoedo", "julio-moraes"],
    talks: [
      { time: "08h30", title: "Jornada do Paciente como Instrumento de Eficiência", speakerId: "julio-moraes" },
      {
        time: "08h45",
        title: "Importância da Integração entre Médico Prescritor e Centro de Terapia Assistida",
        speakerId: "rafael-carvalho",
      },
      { time: "09h00", title: "Acompanhamento de Desfechos e Experiência do Paciente", speakerId: "ana-teresa-amoedo" },
      { time: "09h15", title: "Discussão" },
    ],
  },
  { id: "satelite-1", time: "09h30", session: "Simpósio Satélite I", kind: "satelite", period: "manha" },
  { id: "coffee-1", time: "10h00", session: "Coffee Break", kind: "coffee", period: "manha" },
  {
    id: "mesa-2",
    time: "10h30",
    session: "Mesa 2",
    title: "Hot Topics em Doenças Imunomediadas",
    kind: "mesa",
    period: "manha",
    speakerIds: ["henrique-dalmolin"],
    talks: [
      { time: "10h30", title: "Papel dos Exames Genéticos no Diagnóstico e Manejo" },
      { time: "10h50", title: "Manejo de Comorbidades e Impacto nos Desfechos" },
      { time: "11h10", title: "Terapia Celular nas Doenças Imunomediadas", speakerId: "henrique-dalmolin" },
      { time: "11h30", title: "Discussão" },
    ],
  },
  { id: "satelite-2", time: "12h00", session: "Simpósio Satélite II", kind: "satelite", period: "manha" },
  { id: "satelite-3", time: "12h30", session: "Simpósio Satélite III", kind: "satelite", period: "manha" },
  { id: "almoco", time: "13h00", session: "Almoço e Networking", kind: "almoco", period: "tarde" },
  {
    id: "mesa-3",
    time: "14h00",
    session: "Mesa 3",
    title: "Controvérsias em Doenças Imunomediadas",
    kind: "mesa",
    period: "tarde",
    speakerIds: ["samila-apostolo"],
    talks: [
      { time: "14h00", title: "Diagnóstico e Manejo das Imunodeficiências Primárias" },
      {
        time: "14h15",
        title: "Neuroimunologia: Diagnóstico Preciso e Tratamento Precoce",
        speakerId: "samila-apostolo",
      },
      { time: "14h30", title: "Desafios no Diagnóstico e Manejo da Hidradenite Supurativa" },
      { time: "14h45", title: "Discussão" },
    ],
  },
  {
    id: "mesa-4",
    time: "15h00",
    session: "Mesa 4",
    title: "Aplicações Clínicas e Decisões Compartilhadas",
    kind: "mesa",
    period: "tarde",
    talks: [
      { time: "15h00", title: "Do Intestino às Articulações: Individualização do Tratamento" },
      { time: "15h15", title: "Dermatite Atópica: Impacto do Diagnóstico na Escolha do Tratamento" },
      { time: "15h30", title: "Lúpus em 2026: Estratégia para Cada Paciente" },
      { time: "15h45", title: "Discussão" },
    ],
  },
  { id: "satelite-4", time: "16h00", session: "Simpósio Satélite IV", kind: "satelite", period: "tarde" },
  { id: "coffee-2", time: "16h30", session: "Coffee Break", kind: "coffee", period: "tarde" },
  {
    id: "mesa-5",
    time: "17h00",
    session: "Mesa 5",
    title: "Casos Clínicos Interativos",
    kind: "mesa",
    period: "tarde",
    moderator: "Dr. Fernando — EV CITI",
    talks: [
      { time: "17h00", title: "Caso Clínico: Gastroenterologia, Dermatologia e Reumatologia" },
      { time: "17h30", title: "Caso Clínico: Neuroimunologia, Dermatologia, Imunologia e Reumatologia" },
    ],
  },
  {
    id: "encerramento",
    time: "18h00",
    session: "Encerramento",
    title: "Mensagens Finais",
    kind: "encerramento",
    period: "tarde",
    description: "Carlos Cunha, CEO do Grupo CITA, e diretores médicos.",
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
