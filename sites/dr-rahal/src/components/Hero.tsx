import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import cutout from "@/assets/dr-rahal-cutout.png";
import { ButterflyField } from "./ButterflyField";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.95, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const techniques = [
  "Radiofrequência (R.F.A.)",
  "Micro-ondas (M.W.A.)",
  "Alcoolização (E.A.)",
  "Crioablação / Eletroporação Irreversível (IRE)",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 lg:pt-32 pb-0 bg-hero text-white"
    >
      {/* Animated butterflies in the background */}
      <ButterflyField preset="hero" variant="dark" baseOpacity={0.09} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-12 items-end min-h-[calc(100svh-7rem)]">
        <div className="pb-6 lg:pb-28 order-1">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex items-start gap-3"
          >
            <span className="mt-2 h-px w-10 shrink-0 bg-[var(--brand-soft)]" />
            <span
              className="label-eyebrow text-[10px] leading-[1.7] max-w-[420px]"
              style={{ color: "var(--brand-soft)" }}
            >
              Referência em ultrassonografia e procedimentos minimamente invasivos em tireoide
            </span>
          </motion.div>

          <h1 className="mt-7 font-display leading-[1.02] text-[38px] sm:text-[54px] lg:text-[62px] tracking-tight text-white">
            <motion.span custom={1} initial="hidden" animate="show" variants={fadeUp} className="block">
              Dr. Antonio Rahal
            </motion.span>
          </h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 italic-accent text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.18] text-[var(--brand-soft)] max-w-[600px]"
          >
            Pioneiro em ablação de tireoide, paratireoide e linfonodos cervicais
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 max-w-[520px]"
          >
            <div className="label-eyebrow text-[10px] text-white/60">
              Protagonismo em ablação por diferentes técnicas
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {techniques.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14px] font-light text-white/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--brand-soft)]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-3 border hairline-light rounded-full px-5 py-2"
          >
            <span className="font-display text-[var(--brand-soft)] text-lg leading-none">2.000+</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
              tratamentos realizados
            </span>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              Agende sua consulta agora
            </a>
            <a
              href="#procedimento"
              className="group inline-flex items-center gap-2 text-sm text-white/90 border-b border-white/40 pb-1 hover:border-white transition-colors"
            >
              Sobre a ablação de nódulos
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Cutout portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full flex items-end justify-center lg:justify-end order-2 -mt-2 lg:mt-0"
        >
          <img
            src={cutout}
            alt="Dr. Antonio Rahal"
            className="relative z-10 max-h-[55svh] sm:max-h-[60svh] lg:max-h-[88svh] w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
