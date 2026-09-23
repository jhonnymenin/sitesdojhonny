import { motion } from "framer-motion";
import { transition, staggerChild } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroPalco from "@/assets/hero-palco.jpg";


const HeroSection = () => (
  <section id="hero" className="relative min-h-svh flex items-center overflow-hidden">
    {/* Animated gradient backdrop */}
    <div className="absolute inset-0 z-0">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(13, 13, 18)"
        gradientBackgroundEnd="rgb(26, 26, 46)"
        firstColor="233, 30, 140"
        secondColor="124, 58, 237"
        thirdColor="200, 30, 120"
        fourthColor="90, 40, 180"
        fifthColor="233, 30, 140"
        pointerColor="180, 50, 200"
        size="80%"
        blendingValue="hard-light"
        interactive={true}
        containerClassName="!h-full !w-full !absolute !inset-0"
      />
    </div>

    {/* Stage photo layer */}
    <div className="absolute inset-0 z-[1]">
      <img
        src={heroPalco}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="w-full h-full object-cover opacity-75"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay" />
    </div>


    <div className="relative z-10 section-padding w-full">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="heading-sub text-primary text-xs md:text-sm mb-6 tracking-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={staggerChild(1)}
        >
          Agência Só Talentos
        </motion.p>

        <motion.h1
          className="heading-display text-foreground max-w-4xl"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={staggerChild(2)}
        >
          Os artistas certos para transformar o seu{" "}
          <span className="text-gradient">evento</span>
        </motion.h1>

        <motion.div
          className="mt-8 h-[2px] w-32 bg-gradient-to-r from-primary to-secondary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          transition={staggerChild(3)}
        />

        <motion.p
          className="text-body max-w-2xl mt-8 text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={staggerChild(4)}
        >
          Conectamos empresas, prefeituras, casas de shows, produtores e marcas aos melhores
          artistas para criar eventos memoráveis. Da escolha do talento ideal à contratação e
          acompanhamento, cuidamos de todo o processo.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={staggerChild(5)}
        >
          <Button variant="gradient" size="xl" className="glow-primary" asChild>
            <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Quero contratar um artista <ArrowRight className="ml-1" />
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <a href="#artistas">Ver artistas</a>
          </Button>
        </motion.div>

        <motion.p
          className="text-body text-xs md:text-sm mt-10 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={staggerChild(7)}
        >
          Segurança · Agilidade · Grandes experiências
        </motion.p>
      </div>
    </div>

    <motion.a
      href="#sobre"
      aria-label="Rolar para a próxima seção"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-foreground/40 hover:text-primary transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 8, 0] }}
      transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
    >
      <ChevronDown className="w-6 h-6" />
    </motion.a>
  </section>
);

export default HeroSection;
