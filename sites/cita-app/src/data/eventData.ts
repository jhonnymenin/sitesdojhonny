/**
 * Dados institucionais do evento.
 * Edite aqui nome, data, local, contatos e o link do Google Maps.
 */
export const eventData = {
  name: "I Simpósio CITA de Doenças Imunomediadas",
  shortName: "Simpósio CITA",
  presentedBy: "Grupo CITA",
  organizedBy: "WorldMed Academy",
  tagline: "O futuro das doenças imunomediadas começa pela integração.",
  dateLabel: "17 de outubro de 2026",
  weekdayLabel: "Sábado",
  /** Data/hora base usada para calcular a "próxima atividade" (horário de Brasília). */
  isoDate: "2026-10-17",
  venue: "Espaço Millenium",
  city: "São Paulo – SP",
  /** Cole aqui o link do Google Maps do local quando estiver disponível. */
  mapsUrl: "",
  about:
    "O I Simpósio CITA de Doenças Imunomediadas nasce para discutir a jornada do paciente imunomediado de forma integrada, prática e multidisciplinar.\n\nO encontro reúne especialistas e médicos da linha de frente para discutir casos reais, desafios diagnósticos, decisões compartilhadas, terapias inovadoras e avanços científicos.",
  highlights: [
    { value: "250", label: "médicos convidados" },
    { value: "10", label: "doenças prioritárias" },
    { value: "5", label: "mesas científicas" },
    { value: "4", label: "simpósios satélites" },
    { value: "1", label: "dia de imersão científica" },
  ],
  practical: [
    { key: "local", title: "Local", lines: ["Espaço Millenium", "São Paulo – SP"] },
    { key: "data", title: "Data", lines: ["17 de outubro de 2026", "Sábado"] },
    { key: "credenciamento", title: "Credenciamento", lines: ["Início às 07h30"] },
    { key: "estacionamento", title: "Estacionamento", lines: ["Estacionamento disponível no térreo"] },
    {
      key: "alimentacao",
      title: "Alimentação",
      lines: ["Coffee breaks no próprio espaço", "Almoço e networking às 13h00"],
    },
    { key: "publico", title: "Público", lines: ["Evento direcionado a médicos convidados"] },
  ],
  contact: {
    email: "daniel@worldmedacademy.com",
    whatsapp: "https://wa.me/5511970687422",
    whatsappLabel: "(11) 97068-7422",
  },
} as const;
