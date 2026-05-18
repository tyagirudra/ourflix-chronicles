import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/movies";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 sm:px-14 mb-10 max-w-[1500px] mx-auto w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">The Timeline</p>
          <h2 className="font-display text-4xl sm:text-6xl">A scroll through our seasons.</h2>
        </div>

        <div className="relative">
          {/* glowing rail */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-primary via-accent to-gold shadow-[0_0_20px_rgba(229,9,20,0.8)]"
          />

          <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-14 will-change-transform">
            {timeline.map((t, i) => (
              <div key={i} className="shrink-0 w-[320px] sm:w-[380px]">
                <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
                  <span className="text-xs tracking-[0.4em] uppercase text-gold">{t.date}</span>
                  <h3 className="font-display text-3xl sm:text-4xl mt-3">{t.title}</h3>
                  <p className="mt-4 text-white/75 leading-relaxed">{t.text}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs text-white/50 uppercase tracking-widest">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Episode {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
