import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitText } from "./SplitText";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-32">
      {/* Mesh gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl">
        <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-violet-gradient mesh-rotate" />
        <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-ember-gradient mesh-rotate" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,1,24,0.85)_70%)]" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Última chamada</span>
        <SplitText
          text="Não fique de fora."
          className="mt-5 text-balance text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
        />
        <SplitText
          text="Vagas limitadas."
          delay={0.3}
          className="block text-5xl leading-[0.95] tracking-tight text-gradient-ember md:text-7xl lg:text-8xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-lg text-white/70"
        >
          5 de Dezembro de 2026 · Centro de Convenções Millenium, São Paulo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10"
        >
          <Button
            asChild
            size="lg"
            className="shine group h-auto w-full bg-ember-gradient px-10 py-7 text-base font-bold text-[--ember-foreground] shadow-glow-ember transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:w-auto md:text-lg"
          >
            <a href="#inscricao">
              GARANTA SUA VAGA · R$ 250
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
