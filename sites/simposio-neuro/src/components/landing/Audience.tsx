import { motion } from "framer-motion";
import { Stethoscope, GraduationCap, FlaskConical, Building2 } from "lucide-react";
import { SplitText } from "./SplitText";

const items = [
  {
    icon: Stethoscope,
    title: "Profissionais da saúde",
    text: "Médicos, psicólogos, nutricionistas, fonoaudiólogos, fisioterapeutas, neuropsicólogos e terapeutas ocupacionais.",
    span: "md:col-span-2 md:row-span-2",
  },
  { icon: GraduationCap, title: "Estudantes", text: "Graduação e pós-graduação interessados em neurociência e envelhecimento.", span: "" },
  { icon: FlaskConical, title: "Indústria", text: "Farmacêutica, suplementos e tecnologia em saúde.", span: "" },
  { icon: Building2, title: "Gestores", text: "De clínicas e instituições de ensino.", span: "md:col-span-2" },
];

export function Audience() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Público-Alvo</span>
          <SplitText
            text="Para quem foi pensado."
            className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(180px,1fr)]">
          {items.map(({ icon: Icon, title, text, span }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-7 shadow-card transition-colors hover:border-accent/40 ${span}`}
            >
              <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-violet-gradient opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-gradient shadow-glow">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
