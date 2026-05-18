import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };

export default function Fireworks({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let particles: P[] = [];
    let last = 0;
    const colors = ["#E50914", "#FF3B5C", "#FFD166", "#ffffff"];

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = (x: number, y: number) => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 80; i++) {
        const a = (Math.PI * 2 * i) / 80;
        const s = 2 + Math.random() * 4;
        particles.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 0, max: 80 + Math.random() * 40, color: c, size: 2 + Math.random() * 1.5,
        });
      }
    };

    const loop = (t: number) => {
      if (!active) { raf = requestAnimationFrame(loop); return; }
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      if (t - last > 700) {
        burst(Math.random() * window.innerWidth, window.innerHeight * (0.2 + Math.random() * 0.4));
        last = t;
      }

      particles = particles.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.99;
        const alpha = 1 - p.life / p.max;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.shadowBlur = 16;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return p.life < p.max;
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [active]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[1]" />;
}
