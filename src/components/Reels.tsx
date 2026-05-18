import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { reels } from "@/data/movies";
import { Heart, MessageCircle, Send } from "lucide-react";

export default function Reels() {
  return (
    <section id="reels" className="relative py-24 px-6 sm:px-14">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Vertical Reels</p>
            <h2 className="font-display text-4xl sm:text-6xl">Tiny films. Big feelings.</h2>
          </div>
          <p className="hidden sm:block max-w-sm text-white/60 text-sm">
            Swipe through the loop we keep replaying in our heads.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((r, i) => <Reel key={i} reel={r} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Reel({ reel, i }: { reel: typeof reels[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 group"
    >
      <motion.div
        style={{ y }}
        className={`absolute inset-0 bg-gradient-to-br ${reel.color} via-black to-black`}
      />
      <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-red opacity-30" />

      {/* floating ambient blobs */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/40 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />

      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_rgba(229,9,20,0.6)]" />
          <span className="text-xs font-medium">@us.always</span>
          <span className="text-[10px] text-white/50 ml-auto uppercase tracking-widest">Reel · {i + 1}</span>
        </div>

        <div>
          <h3 className="font-display text-2xl sm:text-3xl leading-tight text-glow-red">{reel.caption}</h3>
          <p className="font-script text-xl text-white/85 mt-2">{reel.sub}</p>
        </div>
      </div>

      <div className="absolute right-3 bottom-20 flex flex-col gap-4 text-white/90">
        <button className="flex flex-col items-center gap-1">
          <div className="h-10 w-10 rounded-full glass flex items-center justify-center group-hover:text-primary transition">
            <Heart size={18} />
          </div>
          <span className="text-[10px]">12.4k</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="h-10 w-10 rounded-full glass flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <span className="text-[10px]">∞</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="h-10 w-10 rounded-full glass flex items-center justify-center">
            <Send size={18} />
          </div>
          <span className="text-[10px]">share</span>
        </button>
      </div>
    </motion.div>
  );
}
