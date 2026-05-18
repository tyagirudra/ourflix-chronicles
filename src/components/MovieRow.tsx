import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Plus, Heart, Info } from "lucide-react";
import type { Movie } from "@/data/movies";

export default function MovieRow({
  title, items, onOpen,
}: { title: string; items: Movie[]; onOpen: (m: Movie) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-6 sm:py-10 group/row"
    >
      <div className="flex items-center justify-between px-6 sm:px-14 mb-4">
        <h2 className="font-display text-2xl sm:text-3xl tracking-wider flex items-center gap-3">
          {title}
          <span className="text-primary text-xs tracking-[0.4em] uppercase opacity-0 group-hover/row:opacity-100 transition-opacity">
            Explore →
          </span>
        </h2>
      </div>
      <div className="relative">
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-14 w-10 glass rounded-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="scroll left"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-14 w-10 glass rounded-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="scroll right"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none px-6 sm:px-14 pb-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((m, i) => (
            <Card key={m.id} movie={m} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Card({ movie, index, onOpen }: { movie: Movie; index: number; onOpen: (m: Movie) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(movie)}
      className="relative shrink-0 w-[240px] sm:w-[300px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        scrollSnapAlign: "start",
        transform: hover ? "scale(1.08)" : "scale(1)",
        zIndex: hover ? 30 : 1,
        boxShadow: hover
          ? "0 30px 80px -10px rgba(229,9,20,0.55), 0 0 0 1px rgba(229,9,20,0.6)"
          : "0 8px 30px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2.5s]"
        style={{ transform: hover ? "scale(1.1)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-white/5 rounded-lg" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
          <span className="text-gold">{movie.match}% Match</span>
          <span className="text-white/60">{movie.year}</span>
        </div>
        <h3 className="font-display text-lg sm:text-xl leading-tight">{movie.title}</h3>
        <p className="text-[11px] text-white/60 mt-0.5">{movie.duration} · {movie.genre}</p>

        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="mt-3 flex items-center gap-2"
        >
          <button className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
            <Play size={14} className="fill-black" />
          </button>
          <button className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-white/40 transition">
            <Plus size={14} />
          </button>
          <button className="h-9 w-9 rounded-full glass flex items-center justify-center hover:text-primary transition">
            <Heart size={14} />
          </button>
          <button className="h-9 w-9 ml-auto rounded-full glass flex items-center justify-center hover:text-primary transition">
            <Info size={14} />
          </button>
        </motion.div>
      </div>

      {hover && (
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase bg-primary/90 px-2 py-1 rounded-sm shadow-[0_0_20px_rgba(229,9,20,0.7)]">
          ▶ Preview
        </span>
      )}
    </motion.div>
  );
}
