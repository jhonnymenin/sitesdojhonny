import { Reveal, Section, SectionTitle } from "./primitives";
import malufPhoto from "@/assets/maluf-oficial.jpg";
import buzaidPhoto from "@/assets/buzaid-oficial.jpg";

const PEOPLE = [
  {
    photo: buzaidPhoto,
    name: "Dr. Antonio Carlos Buzaid",
    role: "Coordenador do X Curso Intensivo de Oncologia | Embaixador do curso Onco IA",
    bio: "Diretor Médico Geral do Centro de Oncologia do Hospital Nove de Julho e Hospital Samaritano Higienópolis de São Paulo – Rede Américas - CRM-SP 45.405",
  },
  {
    photo: malufPhoto,
    name: "Dr. Fernando Maluf",
    role: "Coordenador do X Curso Intensivo de Oncologia",
    bio: "Diretor Médico Associado do Centro Oncológico da BP – A Beneficência Portuguesa de São Paulo; Membro do Comitê Gestor do Centro de Oncologia do Hospital Israelita Albert Einstein; Doutor em Urologia pela FMUSP - CRM-SP 81.930",
  },
];

export function Coordinators() {
  return (
    <Section id="coordenadores">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionTitle>
          Uma formação tradicional liderada por quem contribui para o avanço da Oncologia no Brasil.
        </SectionTitle>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {PEOPLE.map((p) => (
          <Reveal
            key={p.name}
            className="glass flex flex-col gap-5 rounded-lg p-5 sm:flex-row sm:p-6"
          >
            <img
              src={p.photo}
              alt={p.name}
              loading="lazy"
              width={640}
              height={800}
              className="h-40 w-full shrink-0 rounded-md border border-border object-cover object-top sm:h-40 sm:w-32"
            />
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm leading-snug text-cyan">{p.role}</p>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">{p.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
