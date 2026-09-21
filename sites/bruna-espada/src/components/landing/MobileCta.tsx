import { useEffect, useState } from "react";

import { WHATSAPP_URL } from "./ui";

export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-offwhite/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-md transition-all duration-500 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-3 bg-ink text-[0.6875rem] uppercase tracking-[0.22em] text-champagne"
      >
        Agendar minha avaliação
        <span aria-hidden="true">&#8594;</span>
      </a>
    </div>
  );
}
