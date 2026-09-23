import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { transition, staggerChild } from "@/lib/motion";
import { artists } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ArtistsSection = () => (
  <section id="artistas" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
        className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="heading-sub text-primary text-xs tracking-[0.25em] mb-4">Nossos artistas</p>
          <h2 className="heading-display text-foreground text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            Talentos para todo tipo de <span className="text-gradient">público</span>
          </h2>
        </div>
        <Button variant="heroOutline" size="lg" asChild>
          <a
            href={whatsappLink("Olá! Quero conhecer o catálogo completo de artistas da Só Talentos.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver catálogo completo <ArrowUpRight />
          </a>
        </Button>
      </motion.div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {artists.map((artist, i) => (
            <CarouselItem key={artist.name} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <motion.article
                className="group relative rounded-outer overflow-hidden premium-card h-[420px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={staggerChild(i % 3)}
              >
                <img
                  src={artist.image}
                  alt={`${artist.name} — ${artist.style}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 to-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block heading-sub text-[10px] tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-3 backdrop-blur-sm">
                    {artist.style}
                  </span>
                  <h3 className="heading-sub text-foreground text-xl mb-3">{artist.name}</h3>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {artist.formats.map((format) => (
                      <span
                        key={format}
                        className="text-body text-[10px] rounded-full border border-foreground/10 bg-background/40 px-2.5 py-1 backdrop-blur-sm"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-xs inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-primary" />@{artist.instagram}
                    </a>
                  )}
                </div>

              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-card border-foreground/10 text-foreground hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="hidden md:flex -right-4 bg-card border-foreground/10 text-foreground hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
    </div>
  </section>
);

export default ArtistsSection;
