import { motion } from "framer-motion";
import { SplitText } from "./SplitText";

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-28 md:py-36">
      {/* Big background number */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 -translate-y-1/2 select-none text-[clamp(14rem,38vw,32rem)] leading-none text-white/[0.035]"
      >
        01
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— O Simpósio</span>
          <SplitText
            text="Ciência, prática e troca em altíssimo nível."
            className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70"
          >
            O Simpósio reúne especialistas, profissionais da saúde e estudantes em um ambiente de troca
            científica e atualização profissional. Palestras, práticas imersivas, estudos de caso e a
            cerimônia de entrega de diplomas da{" "}
            <em className="text-white">Pós-Graduação em Neurociência da Memória</em>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { k: "250", l: "Participantes" },
            { k: "20+", l: "Palestrantes" },
            { k: "08h", l: "de conteúdo" },
            { k: "1", l: "Dia imersivo" },
          ].map((s) => (
            <div
              key={s.l}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
            >
              <div className="text-5xl text-gradient-violet">{s.k}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/60">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
