import { useMemo } from "react";

export default function Particles({ count = 40, color = "rgba(255,59,92,0.7)" }: { count?: number; color?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: 12 + Math.random() * 18,
        delay: -Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.6,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-10vh] block rounded-full animate-float-up"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: color,
            boxShadow: `0 0 ${d.size * 4}px ${color}`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
