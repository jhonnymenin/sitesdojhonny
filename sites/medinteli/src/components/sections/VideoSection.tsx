import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <Play className="w-4 h-4 text-brand" />,
              text: "Veja em ação",
            }}
            title={
              <>
                Veja a{" "}
                <span className="text-brand shimmer-text">
                  MedInteli em ação
                </span>
              </>
            }
            subtitle="Assista em 2 minutos como funciona a automação na prática"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto" ref={videoRef}>
                        <motion.div
              className="relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video w-full">
                {isInView ? (
                  <iframe
                    id="panda-89691934-cad0-4c82-bb87-30a0284f65eb"
                    src="https://player-vz-5a8391ea-f4b.tv.pandavideo.com.br/embed/?v=89691934-cad0-4c82-bb87-30a0284f65eb&autoplay=1&muted=1"
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
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
