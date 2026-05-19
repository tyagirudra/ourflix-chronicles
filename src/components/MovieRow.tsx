import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Plus, Heart, Info, Mic } from "lucide-react";
import type { Memory } from "@/data/memories";

/*
 * MovieRow — Netflix-style horizontal scrollable row of memory cards.
 *
 * Each card supports:
 *   - Thumbnail image (required)
 *   - Video preview on hover (optional)
 *   - Netflix zoom + glow hover effects
 *   - Lazy loading for images
 *   - Smooth transitions
 *
 * The data comes from src/data/memories.ts — edit that file to update content.
 */

export default function MovieRow({
  title, items, onOpen,
}: { title: string; items: Memory[]; onOpen: (m: Memory) => void }) {
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
        {/* ← Scroll button */}
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-14 w-10 glass rounded-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="scroll left"
        >
          <ChevronLeft />
        </button>
        {/* → Scroll button */}
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
            <Card key={m.id} memory={m} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/*
 * Card — Individual memory card with:
 *   - Netflix zoom effect on hover
 *   - Red glow shadow on hover
 *   - Optional video preview on hover (autoplay, muted, looped)
 *   - Smooth fade transitions
 *   - Lazy loading images for performance
 */
function Card({ memory, index, onOpen }: { memory: Memory; index: number; onOpen: (m: Memory) => void }) {
  const [hover, setHover] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  // Start playing video after a short delay (Netflix-style)
  const handleMouseEnter = useCallback(() => {
    setHover(true);
    if (memory.video && videoRef.current) {
      hoverTimeout.current = setTimeout(() => {
        videoRef.current?.play().catch(() => {/* ignore autoplay block */});
      }, 400); // slight delay before video starts, like Netflix
    }
  }, [memory.video]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
    setVideoReady(false);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={(e) => {
        handleMouseLeave();
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(memory)}
      className="relative shrink-0 w-[240px] sm:w-[300px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        scrollSnapAlign: "start",
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: hover ? rotateX : 0,
        rotateY: hover ? rotateY : 0,
        /* Netflix zoom effect */
        scale: hover ? 1.08 : 1,
        zIndex: hover ? 30 : 1,
        /* Red glow on hover */
        boxShadow: hover
          ? "0 30px 80px -10px rgba(229,9,20,0.55), 0 0 0 1px rgba(229,9,20,0.6)"
          : "0 8px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Thumbnail Image (lazy loaded) ── */}
      <img
        src={memory.image}
        alt={memory.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2.5s]"
        style={{ transform: hover ? "scale(1.1)" : "scale(1)" }}
      />

      {/* ── Optional Video Preview on Hover ── */}
      {memory.video && (
        <video
          ref={videoRef}
          src={memory.video}
          muted
          loop
          playsInline
          preload="none"
          onCanPlayThrough={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: hover && videoReady ? 1 : 0 }}
        />
      )}

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-white/5 rounded-lg" />

      {/* ── Card Content ── */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
          <span className="text-gold">{memory.match ?? 98}% Match</span>
          <span className="text-white/60">{memory.year}</span>
        </div>
        <h3 className="font-display text-lg sm:text-xl leading-tight">{memory.title}</h3>
        <p className="text-[11px] text-white/60 mt-0.5">{memory.duration} · {memory.category}</p>

        {/* ── Hover Action Buttons ── */}
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

      {/* ── Preview Badge (shows on hover) ── */}
      {hover && (
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase bg-primary/90 px-2 py-1 rounded-sm shadow-[0_0_20px_rgba(229,9,20,0.7)]">
          {memory.video ? "▶ Preview" : "▶ View"}
        </span>
      )}
      {/* ── Voice Note Indicator ── */}
      {memory.audio && (
        <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-gold shadow-[0_0_10px_rgba(255,209,102,0.3)]">
          <Mic size={12} />
        </div>
      )}
    </motion.div>
  );
}
