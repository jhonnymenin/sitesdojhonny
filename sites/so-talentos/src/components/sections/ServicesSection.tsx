import { motion } from "framer-motion";
import { Mic2, Handshake, ListMusic, Headphones, Sparkles, type LucideIcon } from "lucide-react";
import { transition, staggerChild } from "@/lib/motion";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Mic2,
    title: "Contratação de artistas",
    description:
      "Encontramos o artista ideal para festivais, eventos corporativos, prefeituras, casas de shows e eventos privados.",
  },
  {
    icon: Handshake,
    title: "Agenciamento artístico",
    description:
      "Representamos talentos e desenvolvemos oportunidades para ampliar sua presença no mercado.",
  },
  {
    icon: ListMusic,
    title: "Curadoria de atrações",
    description:
      "Selecionamos artistas de acordo com o perfil do público, objetivo e orçamento do evento.",
  },
  {
    icon: Headphones,
    title: "Produção e suporte",
    description:
      "Acompanhamos toda a negociação e oferecemos suporte durante o processo de contratação e realização do evento.",
  },
  {
    icon: Sparkles,
    title: "Projetos especiais",
    description:
      "Criamos experiências que unem música, entretenimento e marcas em ações de alto impacto.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
        className="mb-14"
      >
        <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">O que fazemos</p>
        <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl max-w-3xl">
          Soluções completas em <span className="text-gradient">talento</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.article
            key={service.title}
            className="premium-card card-shimmer card-glow-border rounded-outer p-8 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={staggerChild(i)}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-[0_0_28px_hsl(var(--primary)/0.35)]">
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="heading-sub text-foreground text-lg mb-3 transition-colors group-hover:text-primary">
              {service.title}
            </h3>
            <p className="text-body text-sm">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
