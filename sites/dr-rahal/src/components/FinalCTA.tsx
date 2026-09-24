import { MapPin, Timer, Lock, Video } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import { ButterflyField } from "./ButterflyField";
import wave from "@/assets/rahal-wave.png";

export function FinalCTA() {
  return (
    <section className="relative py-40 overflow-hidden bg-hero text-white">
      <ButterflyField preset="cta" variant="dark" baseOpacity={0.08} />

      <img
        src={wave}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute bottom-0 right-4 sm:right-10 max-h-[220px] sm:max-h-[320px] md:max-h-[420px] lg:max-h-[500px] w-auto z-0 opacity-50 sm:opacity-90 lg:opacity-100 drop-shadow-[0_24px_36px_rgba(0,0,0,0.45)]"
      />


      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--brand-soft)]" />
            <span className="label-eyebrow text-[10px]" style={{ color: "var(--brand-soft)" }}>
              Próximo Passo
            </span>
            <span className="h-px w-10 bg-[var(--brand-soft)]" />
          </div>

          <h2 className="mt-8 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-white">
            Não espere o problema <br />
            <span className="italic-accent text-[var(--brand-soft)]">evoluir.</span>
          </h2>
          <p className="mt-8 text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed">
            Quanto mais cedo o diagnóstico, maiores as chances de evitar uma cirurgia.
            O Dr. Rahal atende em São Paulo com agenda limitada.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 border hairline-light rounded-full px-5 py-2 text-xs tracking-wide text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-soft)]" />
            Agenda aberta para os próximos dias
          </div>

          <div className="mt-12">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline-light !px-12 !py-5">
              Agendar Consulta
            </a>
          </div>

          <div className="mt-14 pt-10 border-t hairline-light flex flex-wrap justify-center gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <span className="inline-flex items-center gap-2"><MapPin size={12} className="text-[var(--brand-soft)]" /> São Paulo</span>
            <span className="inline-flex items-center gap-2"><Timer size={12} className="text-[var(--brand-soft)]" /> Consulta em poucos dias</span>
            <span className="inline-flex items-center gap-2"><Lock size={12} className="text-[var(--brand-soft)]" /> Sigilo total</span>
            <span className="inline-flex items-center gap-2"><Video size={12} className="text-[var(--brand-soft)]" /> Telemedicina</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
