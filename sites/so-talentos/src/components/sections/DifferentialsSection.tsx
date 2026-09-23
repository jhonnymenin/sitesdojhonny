import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { transition, staggerChild } from "@/lib/motion";

const reasons = [
  "Catálogo de artistas de diversos estilos",
  "Processo de contratação simplificado",
  "Negociação transparente",
  "Atendimento personalizado",
  "Experiência no mercado do entretenimento",
  "Suporte do início ao fim",
];

const DifferentialsSection = () => (
  <section id="diferenciais" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 mix-blend-overlay" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Diferenciais</p>
        <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl">
          Por que escolher a <span className="text-gradient">Só Talentos?</span>
        </h2>
        <p className="text-body text-base md:text-lg mt-6 max-w-lg">
          Cuidamos de cada etapa para que a sua única preocupação seja aproveitar o evento.
        </p>
      </motion.div>

      <ul className="space-y-3">
        {reasons.map((reason, i) => (
          <motion.li
            key={reason}
            className="premium-card card-shimmer rounded-inner px-6 py-5 flex items-center gap-4 group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={staggerChild(i)}
          >
            <span className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="text-foreground text-sm md:text-base font-medium">{reason}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default DifferentialsSection;
