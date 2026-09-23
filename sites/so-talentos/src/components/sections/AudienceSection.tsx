import { motion } from "framer-motion";
import { Building2, Landmark, Music, ClipboardList, PartyPopper, Hotel, Users, Gift, type LucideIcon } from "lucide-react";
import { transition, staggerChild } from "@/lib/motion";

const audiences: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: "Empresas" },
  { icon: Landmark, label: "Prefeituras" },
  { icon: Music, label: "Casas de shows" },
  { icon: ClipboardList, label: "Produtores de eventos" },
  { icon: PartyPopper, label: "Festivais" },
  { icon: Hotel, label: "Hotéis e resorts" },
  { icon: Users, label: "Clubes" },
  { icon: Gift, label: "Eventos particulares" },
];

const AudienceSection = () => (
  <section id="para-quem" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
        className="mb-14"
      >
        <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Para quem trabalhamos</p>
        <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl max-w-3xl">
          Atendemos todo tipo de <span className="text-gradient">produção</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {audiences.map((item, i) => (
          <motion.div
            key={item.label}
            className="premium-card card-pulse-ring rounded-inner p-6 flex flex-col items-center text-center gap-4 group"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={staggerChild(i % 4)}
          >
            <div className="w-11 h-11 rounded-full bg-secondary/15 flex items-center justify-center transition-colors group-hover:bg-primary/20">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="heading-sub text-foreground text-xs md:text-sm">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
