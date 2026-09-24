import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "ambient-audio";
const TARGET_VOLUME = 0.12;
const FADE_MS = 400;

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "on") setOn(true);
  }, []);

  // Fade helper
  const fadeTo = (target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / FADE_MS);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (t < 1) requestAnimationFrame(step);
      else if (target === 0) audio.pause();
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!mounted) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (on) {
      audio.volume = 0;
      const tryPlay = () =>
        audio
          .play()
          .then(() => fadeTo(TARGET_VOLUME))
          .catch(() => {
            // Autoplay blocked — wait for user interaction
            const resume = () => {
              audio.play().then(() => fadeTo(TARGET_VOLUME)).catch(() => {});
              window.removeEventListener("pointerdown", resume);
              window.removeEventListener("keydown", resume);
              window.removeEventListener("touchstart", resume);
            };
            window.addEventListener("pointerdown", resume, { once: true });
            window.addEventListener("keydown", resume, { once: true });
            window.addEventListener("touchstart", resume, { once: true });
          });
      tryPlay();
    } else {
      fadeTo(0);
    }
  }, [on, mounted]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="metadata" />
      {mounted && (
        <button
          type="button"
          onClick={toggle}
          aria-label={on ? "Desligar música ambiente" : "Ligar música ambiente"}
          title="Música ambiente"
          className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-white/95 backdrop-blur border border-[var(--brand-soft)]/60 shadow-soft flex items-center justify-center text-[var(--brand-deep)] hover:text-[var(--brand)] hover:border-[var(--brand-soft)] transition-colors"
        >
          {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </>
  );
}
