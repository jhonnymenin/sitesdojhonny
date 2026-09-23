import artistaSertanejo from "@/assets/artista-sertanejo.jpg";
import artistaPagode from "@/assets/artista-pagode.jpg";
import artistaDj from "@/assets/artista-dj.jpg";

/**
 * Catálogo de artistas da Agência Só Talentos.
 *
 * Dados extraídos da planilha oficial de artistas.
 * Cachês e contatos diretos são tratados apenas pelo comercial —
 * nunca exponha esses dados nesta lista pública.
 */
export interface Artist {
  /** Nome artístico exibido no card */
  name: string;
  /** Estilo musical principal */
  style: string;
  /** Formatos disponíveis (acústico, banda completa, etc.) */
  formats: string[];
  /** Handle do Instagram, sem o "@" */
  instagram?: string;
  /** Imagem de capa do card */
  image: string;
}

export const artists: Artist[] = [
  {
    name: "Bruno Henrique e Matheus",
    style: "Sertanejo",
    formats: ["Dupla", "Acústico premium", "Banda completa"],
    instagram: "brunoenruiqueematheus",
    image: artistaSertanejo,
  },
  {
    name: "Leandro e Adriano",
    style: "Sertanejo",
    formats: ["Dupla", "Acústico premium", "Banda completa"],
    instagram: "leandroeadriano",
    image: artistaSertanejo,
  },
  {
    name: "Léo e Gustavo",
    style: "Sertanejo",
    formats: ["Acústico", "Acústico + sanfona", "Banda completa"],
    instagram: "leoegustavo",
    image: artistaSertanejo,
  },
  {
    name: "Roberto Mhoreti",
    style: "Sertanejo & Variados",
    formats: ["Banda", "Voz e playback", "Corporativo"],
    instagram: "robertomhoreti",
    image: artistaSertanejo,
  },
  {
    name: "Mateus Bogik",
    style: "Pagode",
    formats: ["Formato reduzido", "Banda completa"],
    instagram: "mateusbogikoficial",
    image: artistaPagode,
  },
  {
    name: "NT na Veia",
    style: "Pagode",
    formats: ["Banda completa"],
    instagram: "projetontnaveia",
    image: artistaPagode,
  },
  {
    name: "DJ Fernando Black",
    style: "DJ",
    formats: ["Open format", "Festas e eventos"],
    instagram: "djfernando.black",
    image: artistaDj,
  },
];
