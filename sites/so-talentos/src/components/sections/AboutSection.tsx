import { motion } from "framer-motion";
import { transition, staggerChild } from "@/lib/motion";

const AboutSection = () => (
  <section id="sobre" className="section-padding relative">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Muito mais do que uma agência</p>
        <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl">
          Levamos o artista certo para o <span className="text-gradient">palco certo</span>
        </h2>
        <div className="mt-8 space-y-5">
          <p className="text-body text-base md:text-lg">
            A Agência Só Talentos representa artistas e conecta talentos aos mais diversos eventos
            em todo o Brasil.
          </p>
          <p className="text-body text-base md:text-lg">
            Nosso trabalho é entender o perfil do público, o orçamento e o objetivo de cada evento
            para indicar as melhores atrações, tornando a contratação simples, segura e eficiente.
          </p>
          <p className="text-body text-base md:text-lg">
            Além da intermediação artística, também apoiamos projetos especiais, ativações de
            marcas e produções quando necessário.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="relative rounded-outer overflow-hidden premium-card"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={staggerChild(2)}
      >
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80"
          alt="Artista se apresentando ao vivo em um palco iluminado"
          loading="lazy"
          className="w-full h-[380px] md:h-[520px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay" />
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
