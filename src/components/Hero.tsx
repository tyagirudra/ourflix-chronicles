import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Info } from "lucide-react";
import hero from "@/assets/hero.jpg";
import Particles from "./Particles";

export default function Hero({ onPlay }: { onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={hero}
          alt="cinematic"
          className="h-full w-full object-cover animate-kenburns"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/55 to-black/40" />
      <div className="absolute inset-0 bg-vignette" />
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />
      <Particles count={28} />

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end pb-28 sm:pb-32 px-6 sm:px-14 max-w-[1500px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs sm:text-sm tracking-[0.5em] uppercase text-primary mb-4 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-primary" /> An Ourflix Original
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-8xl md:text-[8.5rem] leading-[0.95] max-w-5xl"
        >
          Happy Birthday <br />
          <span className="font-script text-primary text-glow-red text-7xl sm:text-9xl md:text-[10rem] normal-case">
            My Love
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-white/80"
        >
          Tonight we relive our story — every laugh, every fight, every 3AM call, every quiet forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button
            onClick={onPlay}
            className="group flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-md font-semibold hover:bg-white/90 transition-all hover:scale-[1.03] shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
          >
            <Play size={20} className="fill-black group-hover:translate-x-0.5 transition-transform" />
            Start Watching
          </button>
          <button className="flex items-center gap-3 glass text-white px-7 py-3.5 rounded-md font-semibold hover:bg-white/10 transition-all">
            <Info size={20} /> Watch Trailer
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 right-8 hidden sm:flex items-center gap-3 text-xs text-white/60 uppercase tracking-[0.3em]"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Now Streaming
        </motion.div>
      </motion.div>
    </section>
  );
}
