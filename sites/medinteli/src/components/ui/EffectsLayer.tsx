import { useEffect, useRef } from "react";
import { CursorTrail } from "@/components/ui/CursorTrail";

const CARD_SELECTOR = ".card-clean, .card-dark, .card-accent, [data-tilt]";
const MAGNET_SELECTOR = "a[data-magnetic], button[data-magnetic], .btn-magnetic";

/**
 * Camada global de efeitos:
 * - cursor luminoso que segue o mouse com inércia
 * - spotlight + tilt 3D nos cartões
 * - botões magnéticos
 * - barra de progresso de rolagem
 * Tudo desativado em toque e em prefers-reduced-motion.
 */
export const EffectsLayer = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Barra de progresso (sempre, é barata)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      // Parallax suave em elementos marcados
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(-center * speed).toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!fine || reduced) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    document.body.classList.add("has-cursor-fx");

    let activeCard: HTMLElement | null = null;
    let activeMagnet: HTMLElement | null = null;

    const resetCard = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
      el.classList.remove("is-spotlit");
    };

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // ── Spotlight + tilt
      const card = target.closest<HTMLElement>(CARD_SELECTOR);
      if (card !== activeCard) {
        if (activeCard) resetCard(activeCard);
        activeCard = card;
        if (card) card.classList.add("is-spotlit");
      }
      if (card) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        const strength = r.width > 520 ? 4 : 6;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * strength}deg) rotateY(${(px - 0.5) * strength}deg) translateY(-3px)`;
      }

      // ── Botão magnético
      const magnet = target.closest<HTMLElement>(MAGNET_SELECTOR);
      if (magnet !== activeMagnet) {
        if (activeMagnet) activeMagnet.style.transform = "";
        activeMagnet = magnet;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.transform = `translate(${dx * 0.16}px, ${dy * 0.22}px)`;
      }
    };

    const onLeave = () => {
      if (activeCard) resetCard(activeCard);
      activeCard = null;
      if (activeMagnet) activeMagnet.style.transform = "";
      activeMagnet = null;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-cursor-fx");
      onLeave();
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <CursorTrail />
    </>
  );
};

export default EffectsLayer;
