import { Radio } from "lucide-react";
import { Chip, CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

/*
 * Os cinco encontros ao vivo, conforme a tabela enviada pela Ro em 15/10/2026.
 *
 * AS DATAS SÃO TENTATIVAS — está escrito assim no material de origem, e a página
 * precisa dizer o mesmo. Anunciar data fechada e remarcar depois é o tipo de
 * coisa que gera pedido de reembolso.
 *
 * "Buzaid" e "Maluf" vêm abreviados na tabela; aqui entram com o nome completo,
 * o mesmo que a seção de coordenadores usa. Numa página de venda o sobrenome
 * solto só é reconhecido por quem já é de dentro.
 *
 * A ressalva "(avaliar se há outro congresso importante)" do encontro de
 * Ginecologia é nota interna da organização e NÃO entra: para quem compra, ela
 * só levanta dúvida sobre o que foi contratado.
 */
const MEETINGS = [
  {
    data: "13 nov 2026",
    tema: "Pulmão",
    congressos: "Pós-ESMO 2026 e WCLC 2026",
    debatedores: ["Dra. Carol Kawamura", "Dr. Marcos Magalhães"],
  },
  {
    data: "11 dez 2026",
    tema: "Ginecologia",
    congressos: "Pós-ESMO 2026",
    debatedores: ["Dra. Graziela Dal Molin", "Dra. Mariana Scaranti"],
  },
  {
    data: "29 jan 2027",
    tema: "Mama",
    congressos: "Pós-ESMO 2026 e SABCS 2026",
    debatedores: ["Dr. Antonio Carlos Buzaid", "Dra. Debora Gagliato"],
  },
  {
    data: "19 fev 2027",
    tema: "Gastrointestinal",
    congressos: "Pós-ESMO 2026 e ASCO GI 2027",
    debatedores: ["Dra. Renata D'Alpino", "Dr. Lucas dos Santos"],
  },
  {
    data: "19 mar 2027",
    tema: "Geniturinário",
    congressos: "Pós-ESMO 2026 e ASCO GU 2027",
    debatedores: ["Dr. Fernando Maluf", "Dra. Cynthia Lemos"],
  },
];

const HORARIO = "15h às 16h";

export function LiveMeetings() {
  return (
    <Section id="programacao">
      <Reveal className="max-w-3xl">
        <Chip>Novidade da 10ª edição</Chip>
        <SectionTitle className="mt-5">
          Em 2026, o Curso Intensivo de Oncologia vai além das aulas gravadas
        </SectionTitle>
        <p className="mt-4 text-base leading-[1.6] text-muted-foreground md:text-lg">
          Cinco encontros ao vivo, em plataforma exclusiva para quem se inscreve, com as
          atualizações dos principais congressos de 2026 e 2027.
        </p>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
          Quem não puder assistir ao vivo acessa a gravação depois, na mesma plataforma.
        </p>
      </Reveal>

      {/*
        Antes eram cinco cartões num grid de cinco colunas, todos dizendo
        "programação em breve". Com data, tema, congressos e debatedores, cinco
        colunas espremem o texto a ponto de o nome do debatedor quebrar em três
        linhas. Vira lista: no desktop as colunas se alinham e o olho compara
        data com data; no celular cada encontro é um bloco.
      */}
      <ol className="mt-10 space-y-3">
        {MEETINGS.map(({ data, tema, congressos, debatedores }) => (
          <Reveal
            as="li"
            key={data}
            className="glass relative rounded-lg p-5 md:grid md:grid-cols-[10rem_11rem_1fr_1fr] md:items-baseline md:gap-6"
          >
            <span
              aria-hidden="true"
              className="pulse-live absolute top-5 right-5 h-2 w-2 rounded-full bg-cyan md:hidden"
            />

            <p className="label-mono flex items-center gap-2 text-cyan">
              <Radio size={14} strokeWidth={1.5} className="shrink-0 text-electric" />
              {data}
            </p>

            <p className="mt-2 font-display text-lg font-semibold text-foreground md:mt-0">{tema}</p>

            <p className="mt-1 text-sm leading-snug text-muted-foreground md:mt-0">{congressos}</p>

            <p className="mt-1 text-sm leading-snug text-foreground md:mt-0">
              {debatedores.join(" · ")}
            </p>
          </Reveal>
        ))}
      </ol>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Todos os encontros das {HORARIO}. Datas previstas: qualquer ajuste é avisado na plataforma.
      </p>

      <Reveal className="mt-8">
        {/* O MOC pediu que este vá direto ao checkout do combo de 2 cursos
            (item 4 do PDF de 29/09), e não mais à tabela de preços. */}
        <CtaButton href={checkoutUrl("comboIntensivo", "encontros")} className="w-full sm:w-auto">
          Garantir acesso aos encontros
        </CtaButton>
      </Reveal>
    </Section>
  );
}
