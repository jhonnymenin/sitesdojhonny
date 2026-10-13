import { Reveal, Section, SectionTitle } from "./primitives";
import malufPhoto from "@/assets/maluf-oficial.jpg";
import buzaidPhoto from "@/assets/buzaid-oficial.jpg";

/*
 * Os dois coordenadores, **lado a lado em qualquer tela**. Antes empilhavam no
 * mobile: um embaixo do outro, cada um com um currículo de três linhas, e quem
 * rolava via um médico de cada vez em vez da dupla que assina o curso. Juntos
 * eles dizem mais do que separados.
 *
 * O currículo encolheu para a instituição principal. O texto completo trazia
 * cargos em três hospitais, doutorado e número de CRM: é credencial de
 * assinatura de laudo, não argumento de página de venda. Quem reconhece os
 * nomes não precisa ler, e quem não reconhece não vai decidir por causa do CRM.
 */
const PEOPLE = [
  {
    photo: buzaidPhoto,
    name: "Dr. Antonio Carlos Buzaid",
    role: "Coordenador",
    bio: "Diretor Médico Geral do Centro de Oncologia do Hospital Nove de Julho e Samaritano Higienópolis",
  },
  {
    photo: malufPhoto,
    name: "Dr. Fernando Maluf",
    role: "Coordenador",
    bio: "Diretor Médico Associado do Centro Oncológico da BP e membro do Comitê Gestor do Einstein",
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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
        {PEOPLE.map((p) => (
          <Reveal key={p.name} className="glass flex flex-col rounded-lg p-4 sm:p-6">
            {/*
              Retrato em pé: com duas colunas num celular de 390px, cada cartão
              tem ~170px. Foto ao lado do texto não caberia; por cima, cabe e
              ainda dá presença ao rosto, que é o que vende aqui.
            */}
            <img
              src={p.photo}
              alt={p.name}
              loading="lazy"
              width={640}
              height={800}
              className="aspect-[4/5] w-full rounded-md border border-border object-cover object-top"
            />
            <h3 className="mt-4 font-display text-base leading-snug font-semibold text-foreground sm:text-lg">
              {p.name}
            </h3>
            <p className="label-mono mt-1 text-cyan">{p.role}</p>
            <p className="mt-2 text-xs leading-[1.5] text-muted-foreground sm:text-sm">{p.bio}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
