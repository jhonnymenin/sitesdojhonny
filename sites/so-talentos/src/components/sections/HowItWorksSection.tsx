import { motion } from "framer-motion";
import { transition, staggerChild } from "@/lib/motion";

const steps = [
  {
    title: "Você informa o evento",
    description: "Conte o objetivo, local, data e orçamento disponível.",
  },
  {
    title: "Selecionamos as melhores opções",
    description: "Apresentamos artistas compatíveis com o perfil do seu evento.",
  },
  {
    title: "Cuidamos da negociação",
    description: "Alinhamos agenda, valores, contratos e todas as etapas da contratação.",
  },
  {
    title: "Seu evento acontece",
    description: "Você conta com acompanhamento e suporte para que tudo aconteça da melhor forma.",
  },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />

    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
        className="mb-14"
      >
        <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Como funciona</p>
        <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl max-w-3xl">
          Quatro passos até o <span className="text-gradient">palco</span>
        </h2>
      </motion.div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            className="premium-card card-accent-bar rounded-outer p-8 group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={staggerChild(i)}
          >
            <span className="heading-display text-5xl md:text-6xl text-primary/20 transition-colors duration-500 group-hover:text-primary/50 block mb-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="heading-sub text-foreground text-base mb-3">{step.title}</h3>
            <p className="text-body text-sm">{step.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorksSection;
