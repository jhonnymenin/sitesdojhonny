import { motion } from "framer-motion";
import { Coffee, UtensilsCrossed, GraduationCap } from "lucide-react";
import { SplitText } from "./SplitText";

type Item = { time: string; title: string; kind?: "coffee" | "lunch" | "ceremony" };

const day: Item[] = [
  { time: "09:00–09:30", title: "Palestra de Abertura — Da Memória Cotidiana ao Alerta Clínico" },
  { time: "09:30–10:30", title: "Prática — Imersão em Intervenção Intergeracional" },
  { time: "10:30–11:30", title: "Coffee Break", kind: "coffee" },
  { time: "11:30–12:00", title: "Palestra — Tratamento farmacológico do Alzheimer" },
  { time: "12:00–13:00", title: "Casos Clínicos — Reabilitação Neuropsicológica" },
  { time: "13:00–15:00", title: "Almoço", kind: "lunch" },
  { time: "15:00–16:00", title: "Prática — Realidade Virtual na cognição" },
  { time: "16:00–16:30", title: "Coffee Break", kind: "coffee" },
  { time: "16:30–17:00", title: "Palestra — Alimentação Segura: deglutição, disfagia e presbifagia" },
  { time: "17:00–17:30", title: "Palestra — Comunicação Assertiva como Estratégia" },
  { time: "17:30–18:30", title: "Encerramento e Entrega de Diplomas", kind: "ceremony" },
];

function KindIcon({ kind }: { kind?: Item["kind"] }) {
  if (kind === "coffee") return <Coffee className="h-4 w-4 text-ember" />;
  if (kind === "lunch") return <UtensilsCrossed className="h-4 w-4 text-ember" />;
  if (kind === "ceremony") return <GraduationCap className="h-4 w-4 text-ember" />;
  return null;
}

function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative ml-3 border-l border-white/10">
      {items.map((it, i) => (
        <motion.li
          key={it.time}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
          className="group relative pb-7 pl-8"
        >
          <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background transition-transform group-hover:scale-125" />
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <span className="w-32 shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-accent">{it.time}</span>
            <div className="flex items-center gap-3 text-sm text-white/85 md:text-base">
              <KindIcon kind={it.kind} />
              <span>{it.title}</span>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function Schedule() {
  return (
    <section id="programacao" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Programação</span>
          <SplitText
            text="Oito horas. Uma imersão completa."
            className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            5 de Dezembro de 2026 · Das 09h às 18h30
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur md:p-12">
          <Timeline items={day} />
        </div>
      </div>
    </section>
  );
}
