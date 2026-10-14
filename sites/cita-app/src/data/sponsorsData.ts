/**
 * Patrocinadores do evento.
 * As clínicas do Grupo CITA NÃO entram aqui — elas ficam em src/data/citaClinicsData.ts.
 * `status: "a-confirmar"` exibe o selo visual de confirmação pendente.
 * Deixe `logo` vazio quando ainda não houver arquivo de logo disponível.
 */
import lilly from "@/assets/sponsors/lilly.png";
import novartis from "@/assets/sponsors/novartis.png";
import fresenius from "@/assets/sponsors/fresenius-kabi.png";
import jnj from "@/assets/sponsors/jnj.png";
import gsk from "@/assets/sponsors/gsk.png";
import astrazeneca from "@/assets/sponsors/astrazeneca.png";
import grifols from "@/assets/sponsors/grifols.png";
import celltrion from "@/assets/sponsors/celltrion.png";

export type Sponsor = {
  id: string;
  name: string;
  /** URL do logo; vazio mostra o nome da marca */
  logo: string;
  status?: "a-confirmar";
  url?: string;
};

export const sponsorsData: Sponsor[] = [
  { id: "lilly", name: "Lilly", logo: lilly },
  { id: "novartis", name: "Novartis", logo: novartis },
  { id: "fresenius-kabi", name: "Fresenius Kabi", logo: fresenius },
  { id: "jnj", name: "Johnson & Johnson Innovative Medicine", logo: jnj },
  { id: "csl", name: "CSL", logo: "" },
  { id: "gsk", name: "GSK", logo: gsk },
  { id: "astrazeneca", name: "AstraZeneca", logo: astrazeneca, status: "a-confirmar" },
  { id: "grifols", name: "Grifols", logo: grifols },
  { id: "celltrion", name: "Celltrion", logo: celltrion },
];
