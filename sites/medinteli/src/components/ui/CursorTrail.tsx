import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  life: number;
}

/**
 * Rastro/raio luminoso que segue o cursor.
 * Canvas leve, só em ponteiro fino e sem prefers-reduced-motion.
 */
export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Point[] = [];
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    let mx = -100;
    let my = -100;
    let hx = -100;
    let hy = -100;
    let lastX = -100;
    let lastY = -100;
    let hot = false; // sobre elemento clicável

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      hot = !!t?.closest("a, button, [role='button'], input, .card-clean, .card-dark, .card-accent");

      const speed = Math.hypot(mx - lastX, my - lastY);
      if (speed > 14 && sparks.length < 60) {
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: mx,
            y: my,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.3,
            life: 1,
          });
        }
      }
      lastX = mx;
      lastY = my;
    };

    const onDown = () => {
      for (let i = 0; i < 18; i++) {
        const a = (Math.PI * 2 * i) / 18;
        sparks.push({ x: mx, y: my, vx: Math.cos(a) * 2.4, vy: Math.sin(a) * 2.4, life: 1 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);

    let raf = 0;
    const draw = () => {
      // cabeça com inércia -> curva suave
      hx += (mx - hx) * 0.22;
      hy += (my - hy) * 0.22;

      points.push({ x: hx, y: hy, life: 1 });
      if (points.length > 26) points.shift();

      ctx.clearRect(0, 0, w, h);

      // rastro afilado
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(171, 70%, ${38 + t * 22}%, ${t * 0.55})`;
        ctx.lineWidth = t * (hot ? 7 : 5);
        ctx.shadowBlur = 14 * t;
        ctx.shadowColor = "hsla(168, 80%, 45%, 0.6)";
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // núcleo
      const r = hot ? 6.5 : 4;
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, r * 5);
      g.addColorStop(0, "hsla(168, 90%, 55%, 0.95)");
      g.addColorStop(0.35, "hsla(171, 81%, 32%, 0.35)");
      g.addColorStop(1, "hsla(171, 81%, 32%, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(hx, hy, r * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "hsla(168, 95%, 92%, 0.95)";
      ctx.beginPath();
      ctx.arc(hx, hy, r * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // faíscas
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.035;
        s.life -= 0.028;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `hsla(168, 85%, 50%, ${s.life * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6 * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
};

export default CursorTrail;
