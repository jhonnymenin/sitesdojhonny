import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  originalX: number;
  originalY: number;
}

const COLORS = {
  blue: '#0066FF',
  cyan: '#00D4FF',
  purple: '#7C3AED',
  background: '#080B0E',
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const smoothMousePos = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const gradientPhase = useRef(0);
  const animationFrameRef = useRef<number>();
  const frameCount = useRef(0);
  const isVisibleRef = useRef(true);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getParticleCount = useCallback(() => {
    if (typeof window === 'undefined') return 50;
    if (window.innerWidth < 768) return 6;
    if (window.innerWidth < 1024) return 30;
    return 50;
  }, []);

  const createParticles = useCallback((width: number, height: number) => {
    const colors = [COLORS.blue, COLORS.cyan, COLORS.purple];
    const count = getParticleCount();
    
    return Array.from({ length: count }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x, y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.4 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, [getParticleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = isMobile;

    const resizeCanvas = () => {
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(window.innerWidth, window.innerHeight);
    };

    resizeCanvas();

    // Visibility change — pause when tab hidden
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Mouse tracking — disabled on mobile
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (mobile) return;
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdate = now;
      }
    };
    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    const drawAnimatedGradient = (width: number, height: number) => {
      gradientPhase.current += 0.0002;
      const t = gradientPhase.current % 1;

      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(
        width * (0.3 + Math.sin(t * Math.PI * 2) * 0.2), 0,
        width * (0.7 + Math.cos(t * Math.PI * 2) * 0.2), height
      );
      const phase1 = (t + 0) % 1;
      const phase2 = (t + 0.33) % 1;
      const phase3 = (t + 0.66) % 1;
      gradient.addColorStop(0, hexToRgba(COLORS.blue, 0.04 + Math.sin(phase1 * Math.PI * 2) * 0.015));
      gradient.addColorStop(0.5, hexToRgba(COLORS.purple, 0.025 + Math.sin(phase2 * Math.PI * 2) * 0.01));
      gradient.addColorStop(1, hexToRgba(COLORS.cyan, 0.04 + Math.sin(phase3 * Math.PI * 2) * 0.015));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const updateParticles = (width: number, height: number) => {
      const returnForce = 0.008;
      const friction = 0.96;

      if (!mobile) {
        smoothMousePos.current.x += (mousePos.current.x - smoothMousePos.current.x) * 0.1;
        smoothMousePos.current.y += (mousePos.current.y - smoothMousePos.current.y) * 0.1;
      }

      const repelRadius = 250;
      const repelForce = 2.5;

      particlesRef.current.forEach((particle) => {
        // Repulsion from cursor (desktop only)
        if (!mobile) {
          const dx = particle.x - smoothMousePos.current.x;
          const dy = particle.y - smoothMousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < repelRadius && distance > 0) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / repelRadius) * repelForce;
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        }

        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;
        particle.vx += (particle.originalX - particle.x) * returnForce;
        particle.vy += (particle.originalY - particle.y) * returnForce;
        particle.vx *= friction;
        particle.vy *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) { particle.x = 0; particle.vx *= -0.5; }
        if (particle.x > width) { particle.x = width; particle.vx *= -0.5; }
        if (particle.y < 0) { particle.y = 0; particle.vy *= -0.5; }
        if (particle.y > height) { particle.y = height; particle.vy *= -0.5; }
      });
    };

    // Mobile: simple filled circles. Desktop: radial gradient per particle.
    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        if (mobile) {
          ctx.fillStyle = hexToRgba(particle.color, particle.opacity * 0.7);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, hexToRgba(particle.color, particle.opacity));
          gradient.addColorStop(0.5, hexToRgba(particle.color, particle.opacity * 0.5));
          gradient.addColorStop(1, hexToRgba(particle.color, 0));
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // Desktop only: draw connections
    const drawConnections = () => {
      if (mobile) return;
      const maxDistance = 80;

      particlesRef.current.forEach((particle, i) => {
        if (smoothMousePos.current.x > 0) {
          const dxMouse = smoothMousePos.current.x - particle.x;
          const dyMouse = smoothMousePos.current.y - particle.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 150) {
            const opacity = (1 - distMouse / 150) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(smoothMousePos.current.x, smoothMousePos.current.y);
            ctx.strokeStyle = hexToRgba(COLORS.cyan, opacity);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = hexToRgba(COLORS.cyan, opacity);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const drawCursorGlow = () => {
      if (mobile) return;
      if (smoothMousePos.current.x < 0) return;
      const glowRadius = 100;
      const gradient = ctx.createRadialGradient(
        smoothMousePos.current.x, smoothMousePos.current.y, 0,
        smoothMousePos.current.x, smoothMousePos.current.y, glowRadius
      );
      gradient.addColorStop(0, hexToRgba(COLORS.cyan, 0.08));
      gradient.addColorStop(0.4, hexToRgba(COLORS.blue, 0.03));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(smoothMousePos.current.x, smoothMousePos.current.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      // Skip frame if hidden
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Mobile: render every 2nd frame
      frameCount.current++;
      if (mobile && frameCount.current % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      drawAnimatedGradient(width, height);
      updateParticles(width, height);
      drawConnections();
      drawParticles();
      drawCursorGlow();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [createParticles, isMobile]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1, willChange: 'transform' }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
};
