import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Phone, Search, Settings, GraduationCap, HeadphonesIcon, ArrowRight, Play } from "lucide-react";

const steps = [
  { icon: Phone, title: "Contato", description: "Você fala com a gente pelo WhatsApp. Sem burocracia.", color: "" },
  { icon: Search, title: "Análise", description: "Mapeamos onde você está perdendo pacientes e dinheiro.", color: "" },
  { icon: Settings, title: "Implantação", description: "Configuramos a operação e acompanhamos os primeiros dias de uso.", color: "" },
  { icon: GraduationCap, title: "Treinamento", description: "Orientação rápida. Em 15 minutos, todo mundo sabe usar.", color: "" },
  { icon: HeadphonesIcon, title: "Suporte", description: "Suporte contínuo. Qualquer ajuste, a gente resolve.", color: "" },
];

const MobileStep = ({ step, index, Icon, isLastItem }: {
  step: typeof steps[0];
  index: number;
  Icon: typeof Phone;
  isLastItem: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center py-4 ${isLastItem ? 'col-span-2 max-w-[50%] mx-auto' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div style={{ y }} className="flex flex-col items-center">
        <span className="text-xs text-brand/80 font-medium mb-2">0{index + 1}</span>
        <div className={`w-12 h-12 rounded-full bg-brand-tint ring-1 ring-brand/15 ${step.color} flex items-center justify-center shadow-sm transition-shadow group-hover:shadow-md`}>
          <Icon className="w-5 h-5 text-brand" />
        </div>
        <span className="text-sm font-semibold text-foreground mt-2 text-center">
          {step.title}
        </span>
        <p className="text-xs text-muted-foreground text-center max-w-[140px] mt-1">{step.description}</p>
      </motion.div>
    </motion.div>
  );
};

export const HowItWorks = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="relative">
            <div className="absolute inset-x-4 inset-y-4 bg-brand/10 blur-3xl rounded-3xl -z-10" />

            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand mb-3"
                >
                  <Settings className="w-4 h-4 text-brand" />
                  <span className="text-sm text-brand font-medium">Processo simples</span>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
                  Como colocamos sua clínica{" "}
                  <span className="text-brand shimmer-text">no automático</span>
                </h2>
                <p className="text-base sm:text-lg text-foreground/70 mt-3">Do primeiro contato ao sistema rodando, com acompanhamento em cada etapa.</p>
              </div>

              {/* Steps - grid on mobile */}
              <div className="grid grid-cols-2 gap-6 sm:hidden">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <MobileStep
                      key={step.title}
                      step={step}
                      index={index}
                      Icon={Icon}
                      isLastItem={index === 4}
                    />
                  );
                })}
              </div>

              {/* Steps - horizontal flow on desktop */}
              <div className="hidden sm:flex flex-wrap justify-center items-start gap-4 md:gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start">
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-xs text-brand/60 font-medium mb-2">0{index + 1}</span>
                        <motion.div
                          className={`w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-tint ring-1 ring-brand/15 ${step.color} flex items-center justify-center shadow-sm transition-shadow group-hover:shadow-md`}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-7 h-7 text-brand" />
                        </motion.div>
                        <span className="text-base font-semibold text-foreground mt-3 text-center">
                          {step.title}
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-[140px] mt-1">{step.description}</p>
                      </motion.div>

                      {index < steps.length - 1 && (
                        <motion.div
                          className="mt-[46px] mx-2 md:mx-3 flex items-center gap-1 flex-shrink-0"
                          initial={{ opacity: 0, scaleX: 0.4 }}
                          whileInView={{ opacity: 1, scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        >
                          <span className="flow-line w-10 md:w-14" />
                          <ArrowRight className="w-4 h-4 text-brand flex-shrink-0" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Video embed */}
              <div className="mt-8 sm:mt-10" ref={videoRef}>
                <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-border">
                  {isVideoInView ? (
                    <iframe
                      id="panda-00ae8053-e847-479a-b878-398fa1c4d6ba"
                      src="https://player-vz-5a8391ea-f4b.tv.pandavideo.com.br/embed/?v=00ae8053-e847-479a-b878-398fa1c4d6ba"
                      className="w-full h-full border-none"
                      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-card/80 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-brand" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
