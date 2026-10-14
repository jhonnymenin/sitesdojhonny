/**
 * Clínicas do Grupo CITA.
 * Conteúdo institucional — estas marcas não são patrocinadoras, apoiadoras nem parceiras.
 */
import logoIbis from "@/assets/logo-ibis.png";
import logoNovaimuno from "@/assets/logo-novaimuno.png";
import logoEvciti from "@/assets/logo-evciti.png";
import logoCliagen from "@/assets/logo-cliagen.png";

export type CitaClinic = { id: string; name: string; logo: string };

export const citaClinicsData: CitaClinic[] = [
  { id: "ibis", name: "IBIS", logo: logoIbis },
  { id: "nova-imuno", name: "Nova Imuno", logo: logoNovaimuno },
  { id: "ev-citi", name: "EV CITI", logo: logoEvciti },
  { id: "cliagen", name: "Cliagen", logo: logoCliagen },
];
