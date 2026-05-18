import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Fireworks from "./Fireworks";
import Particles from "./Particles";

const phrases = [
  "Every memory with you became my favorite movie.",
  "Every fight became a plot twist.",
  "Every laugh became a soundtrack.",
  "And every quiet moment — became home.",
];

export default function Finale() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [typed, setTyped] = useState<string[]>(["", "", "", ""]);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!inView) return;
    let line = 0;
    let char = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (line >= phrases.length) { setPhase(1); setTimeout(() => setPhase(2), 1400); return; }
      const full = phrases[line];
      if (char <= full.length) {
        setTyped((arr) => {
          const cp = [...arr];
          cp[line] = full.slice(0, char);
          return cp;
        });
        char++;
        setTimeout(tick, 38);
      } else {
        line++;
        char = 0;
        setTimeout(tick, 380);
      }
    };
    const start = setTimeout(tick, 600);
    return () => { cancelled = true; clearTimeout(start); };
  }, [inView]);

  return (
    <section ref={ref} id="finale" className="relative min-h-[120vh] overflow-hidden bg-black">
      <Fireworks active={inView && phase >= 1} />
      <Particles count={60} color="rgba(255,209,102,0.7)" />

      {/* stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.8,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-radial-red opacity-30" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="text-xs tracking-[0.5em] uppercase text-primary mb-8"
        >
          The Final Episode
        </motion.p>

        <div className="space-y-4 max-w-3xl">
          {typed.map((t, i) => (
            <p key={i} className="font-display text-2xl sm:text-4xl leading-snug text-white/95">
              {t}
              {t && t.length < phrases[i].length && <span className="inline-block w-2 h-6 align-middle bg-primary ml-1 animate-pulse" />}
            </p>
          ))}
        </div>

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16"
          >
            <h2 className="font-display text-7xl sm:text-9xl text-primary text-glow-red leading-none">
              HAPPY BIRTHDAY
            </h2>
            <p className="font-script text-5xl sm:text-7xl text-gold text-glow-gold mt-4">
              my love
            </p>
            <p className="mt-8 max-w-lg mx-auto text-white/70">
              Press play on the rest of our story. I'll be right here, in every scene.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs tracking-[0.3em] uppercase">Voice note · 00:47</span>
                <button className="ml-2 h-8 px-4 rounded-full bg-primary text-white text-xs font-semibold hover:scale-105 transition shadow-[0_0_20px_rgba(229,9,20,0.6)]">
                  ▶ Play
                </button>
              </div>
              <p className="text-xs text-white/40 mt-2">Best heard with headphones in.</p>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="relative z-10 text-center text-xs text-white/40 py-10 tracking-[0.3em] uppercase">
        © Ourflix Originals · Made entirely for you
      </footer>
    </section>
  );
}
