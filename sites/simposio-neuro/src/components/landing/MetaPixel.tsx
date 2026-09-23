import { useEffect } from "react";
import {
  EVENT_PRODUCT,
  initMetaPixel,
  trackMetaEvent,
  type MetaEventName,
} from "@/lib/meta-pixel";

/** Seções observadas → evento customizado disparado ao entrarem em viewport. */
const SECTION_EVENTS: ReadonlyArray<{ id: string; event: MetaEventName }> = [
  { id: "coordenacao", event: "ViewSpeakers" },
  { id: "programacao", event: "ViewSchedule" },
  { id: "inscricao", event: "ViewPricing" },
  { id: "local", event: "FindLocation" },
];

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

/**
 * Inicializa o Pixel + CAPI e dispara os eventos automáticos da página:
 * PageView, ViewContent, profundidade de rolagem e visualização de seções.
 * Eventos de clique (InitiateCheckout / Contact) ficam nos próprios CTAs.
 */
export function MetaPixel() {
  useEffect(() => {
    initMetaPixel();
    trackMetaEvent("PageView");
    trackMetaEvent("ViewContent", EVENT_PRODUCT);

    // --- Profundidade de rolagem ---------------------------------------
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackMetaEvent("ScrollDepth", { percent: milestone });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Visualização de seções ----------------------------------------
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (seen.has(id)) continue;
          seen.add(id);
          const match = SECTION_EVENTS.find((s) => s.id === id);
          if (match) trackMetaEvent(match.event, { section: id });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );

    for (const { id } of SECTION_EVENTS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
