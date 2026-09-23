import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { QuizLink } from "@/components/ui/TrackedLink";

export const MobileStickyCTA = () => {
  const [scrolled, setScrolled] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("cta-final");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFinalCtaVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !finalCtaVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <QuizLink className="block w-full" origin="sticky_mobile">
            <span className="flex items-center justify-center w-full h-[52px] rounded-xl bg-gradient-brand text-primary-foreground font-semibold text-base shadow-lg shadow-brand/25 active:scale-[0.98] transition-transform">
              Fazer diagnóstico gratuito
              <ArrowRight aria-hidden="true" className="ml-2 w-4 h-4" />
            </span>
          </QuizLink>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
