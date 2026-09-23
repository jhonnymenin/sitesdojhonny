import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ImpactStatementProps {
  text: string;
}

export const ImpactStatement = ({ text }: ImpactStatementProps) => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 surface-deep overflow-hidden">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Decorative quotes */}
      <div className="absolute top-6 left-8 text-white/10 text-[120px] sm:text-[180px] font-heading font-bold leading-none select-none pointer-events-none">"</div>
      <div className="absolute bottom-6 right-8 text-white/10 text-[120px] sm:text-[180px] font-heading font-bold leading-none select-none pointer-events-none rotate-180">"</div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          {/* Top line */}
          <motion.div
            className="w-16 h-[2px] bg-brand-tint mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <p className="text-white text-lg sm:text-xl md:text-3xl font-heading font-medium text-center max-w-4xl mx-auto leading-snug">
            {text}
          </p>

          {/* Bottom line */}
          <motion.div
            className="w-16 h-[2px] bg-brand-tint mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
