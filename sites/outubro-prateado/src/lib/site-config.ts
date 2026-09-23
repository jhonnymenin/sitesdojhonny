/**
 * Central configuration: links, CTAs and structured content.
 * Change destinations here — components read from this file only.
 */

export const siteConfig = {
  name: "Outubro Prateado",
  year: "2026",
  tagline: "Envelhecer é continuar.",
  // Replace with real destinations when available.
  ctas: {
    follow: "#participe",
    join: "#participe",
    episodes: "#cast",
    project: "#institucional",
    team: "#institucional",
  },
  // Add official profiles here when the links are provided.
  social: [] as { label: string; href: string }[],
  nav: [
    { label: "O movimento", href: "#movimento" },
    { label: "Os pilares", href: "#pilares" },
    { label: "Longevidade", href: "#toda-a-vida" },
    { label: "Prateado Cast", href: "#cast" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "Participe", href: "#participe" },
  ],
};

export type Pillar = {
  index: string;
  title: string;
  description: string;
  word: string;
};

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "Saúde",
    description:
      "Prevenção, movimento, alimentação, memória, vacinação, sono, medicamentos e acompanhamento médico.",
    word: "Prevenir",
  },
  {
    index: "02",
    title: "Autonomia",
    description:
      "Independência, mobilidade, capacidade funcional e poder de decisão pelo maior tempo possível.",
    word: "Decidir",
  },
  {
    index: "03",
    title: "Conexão",
    description:
      "Família, amizades, sexualidade, afetividade, convivência e combate à solidão.",
    word: "Pertencer",
  },
  {
    index: "04",
    title: "Protagonismo",
    description:
      "Trabalho, novos projetos, aprendizado, tecnologia, viagens, propósito e sonhos.",
    word: "Continuar",
  },
  {
    index: "05",
    title: "Respeito",
    description:
      "Combate ao etarismo, violência, infantilização e invisibilidade da pessoa idosa.",
    word: "Reconhecer",
  },
];

export const ages = ["40", "50", "60", "70", "80", "90+"];

export const castEpisodes = [
  { number: "Episódio 01", status: "Em breve" },
  { number: "Episódio 02", status: "Em breve" },
  { number: "Episódio 03", status: "Em breve" },
  { number: "Episódio 04", status: "Em breve" },
];
