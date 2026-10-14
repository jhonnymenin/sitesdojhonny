/**
 * Palestrantes.
 * Apenas dados confirmados. Campos opcionais (specialty, institution, bio, photo)
 * devem ficar ausentes enquanto a informação não estiver confirmada — o app
 * simplesmente não exibe o campo.
 * As sessões relacionadas são calculadas automaticamente a partir de agendaData.
 */
const photos = import.meta.glob("../assets/committee/*.jpg", { eager: true }) as Record<
  string,
  { default: string }
>;

const photoBy = (file: string) => {
  const entry = Object.entries(photos).find(([p]) => p.endsWith(`/${file}`));
  return entry?.[1].default;
};

export type Speaker = {
  id: string;
  name: string;
  specialty?: string;
  institution?: string;
  bio?: string;
  photo?: string;
};

export const speakersData: Speaker[] = [
  { id: "alexandre-ibrahim", name: "Dr. Alexandre Ibrahim", photo: photoBy("Dr._Alexandre_Ibrahim.jpg") },
  { id: "ana-teresa-amoedo", name: "Dra. Ana Teresa Amoedo", photo: photoBy("Dra._Ana_Teresa_Amoedo.jpg") },
  { id: "antonio-condino", name: "Dr. Antonio Condino", photo: photoBy("Dr._Antonio_Condino.jpg") },
  { id: "carla-saad", name: "Dra. Carla Saad", photo: photoBy("Dra._Carla_Saad.jpg") },
  { id: "genoile-silva", name: "Dra. Genoile Silva", photo: photoBy("Dra._Genoile_Silva.jpg") },
  { id: "gleison-duarte", name: "Dr. Gleison Duarte", photo: photoBy("Dr._Gleison_Duarte.jpg") },
  { id: "julio-bertacini", name: "Dr. Júlio Bertacini", photo: photoBy("Dr._Júlio_Bertacini.jpg") },
  { id: "rafael-carvalho", name: "Dr. Rafael Carvalho", photo: photoBy("Dr._Rafael_Carvalho.jpg") },
  { id: "samila-apostolo", name: "Dra. Samila Apóstolo", photo: photoBy("Dra._Samila_Apóstolo.jpg") },
  { id: "julio-moraes", name: "Dr. Júlio Moraes" },
  { id: "henrique-dalmolin", name: "Dr. Henrique Dalmolin" },
];

export const speakerById = (id: string) => speakersData.find((s) => s.id === id);
