import { useEffect } from "react";

/**
 * Adds `is-revealed` to every [data-reveal] element as it enters the viewport.
 * Motion itself is handled in CSS and disabled by prefers-reduced-motion.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }

    // Anything already on screen at first paint reveals right away.
    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) n.classList.add("is-revealed");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    nodes.forEach((n) => {
      if (!n.classList.contains("is-revealed")) observer.observe(n);
    });
    return () => observer.disconnect();
  }, []);
}
