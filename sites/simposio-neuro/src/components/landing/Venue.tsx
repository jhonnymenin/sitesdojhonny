import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import venue1 from "@/assets/venue-1.jpg";
import venue2 from "@/assets/venue-2.jpg";
import venue3 from "@/assets/venue-3.jpg";
import { SplitText } from "./SplitText";

const ADDRESS = "R. Dr. Bacelar, 1043 — Vila Clementino, São Paulo, SP · 04026-002";
const MAPS_QUERY = encodeURIComponent(`Centro de Convenções Millenium, ${ADDRESS}`);

export function Venue() {
  return (
    <section id="local" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Local do Evento</span>
            <SplitText
              text="Centro de Convenções Millenium"
              className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
            />
            <p className="mt-5 flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4 text-accent" />
              {ADDRESS}
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-accent hover:text-white md:self-end"
          >
            Abrir no Google Maps
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { src: venue1, alt: "Auditório do Centro de Convenções Millenium" },
            { src: venue2, alt: "Auditório com plateia preparada para o evento" },
            { src: venue3, alt: "Área de exposição e lounge de networking" },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-card"
            >
              <img
                src={v.src}
                alt={v.alt}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 shadow-card"
        >
          <iframe
            title="Mapa do Centro de Convenções Millenium"
            src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
            className="h-[420px] w-full grayscale invert-[0.92] saturate-[2] hue-rotate-[230deg] contrast-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 mix-blend-overlay" />
        </motion.div>
      </div>
    </section>
  );
}
