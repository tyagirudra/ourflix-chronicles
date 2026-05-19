import { AnimatePresence, motion } from "framer-motion";
import { X, Play, Plus, Heart, Share2 } from "lucide-react";
import type { Memory } from "@/data/memories";
import { useEffect, useRef, useState } from "react";

/*
 * MemoryModal — Full-screen detail view for a memory.
 *
 * Supports:
 *   - Background image or video (autoplay muted loop with fade-in)
 *   - Fallback to image if video fails
 *   - All the same Netflix-style overlays
 */

export default function MemoryModal({ movie, onClose }: { movie: Memory | null; onClose: () => void }) {
  const [videoReady, setVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (movie) {
      document.body.style.overflow = "hidden";
      setVideoReady(false);
      setIsMuted(true);
    }
    return () => { 
      document.body.style.overflow = ""; 
      window.dispatchEvent(new Event("resume-soundtrack"));
    };
  }, [movie]);

  const handlePlayWithSound = () => {
    if (videoRef.current) {
      window.dispatchEvent(new Event("pause-soundtrack"));
      setIsMuted(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0b0b0b] rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(229,9,20,0.25)] my-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 h-10 w-10 rounded-full bg-black/70 hover:bg-primary transition-colors flex items-center justify-center"
              aria-label="close"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-video w-full overflow-hidden">
              {/* ── Poster / Fallback Image ── */}
              <img
                src={movie.image}
                alt={movie.title}
                className="absolute inset-0 h-full w-full object-cover scale-110 animate-kenburns"
              />

              {/* ── Video (autoplay muted loop, smooth fade-in) ── */}
              {movie.video && (
                <video
                  ref={videoRef}
                  src={movie.video}
                  autoPlay
                  muted={isMuted}
                  controls={!isMuted}
                  loop
                  onPause={() => window.dispatchEvent(new Event("resume-soundtrack"))}
                  onEnded={() => window.dispatchEvent(new Event("resume-soundtrack"))}
                  playsInline
                  onCanPlayThrough={() => setVideoReady(true)}
                  onError={() => setVideoReady(false)} // fallback to image if video fails
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                  style={{ opacity: videoReady ? 1 : 0 }}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />
              <div className="absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h2 className="font-display text-4xl sm:text-6xl leading-none text-glow-red">{movie.title}</h2>
                <div className="mt-3 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/70">
                  <span className="text-gold">{movie.match ?? 98}% Match</span>
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                  <span className="border border-white/20 px-2 py-0.5 rounded-sm">HD</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 grid sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 space-y-5">
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handlePlayWithSound}
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-md font-semibold hover:scale-[1.03] transition"
                  >
                    <Play size={16} className="fill-black" /> Play
                  </button>
                  <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary"><Plus size={16} /></button>
                  <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary"><Heart size={16} /></button>
                  <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary"><Share2 size={16} /></button>
                </div>
                <p className="text-white/85 leading-relaxed">{movie.description}</p>
                {/* ── Subtitle shown as script text ── */}
                <p className="font-script text-2xl text-primary text-glow-red">
                  {movie.subtitle || "Press play. Remember everything."}
                </p>
                {/* ── Voice Note Player (shows only if audio is set) ── */}
                {movie.audio && (
                  <div className="mt-2 glass rounded-xl p-4">
                    <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      Voice Note
                    </p>
                    <audio
                      src={movie.audio}
                      controls
                      onPlay={() => window.dispatchEvent(new Event("pause-soundtrack"))}
                      onPause={() => window.dispatchEvent(new Event("resume-soundtrack"))}
                      onEnded={() => window.dispatchEvent(new Event("resume-soundtrack"))}
                      className="w-full h-10 [&::-webkit-media-controls-panel]:bg-white/10 [&::-webkit-media-controls-panel]:rounded-lg"
                      style={{ filter: "invert(1) hue-rotate(180deg)", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-white/50">Genre: </span>{movie.category}</p>
                <p><span className="text-white/50">Cast: </span>You. Me.</p>
                <p><span className="text-white/50">Director: </span>Us, accidentally.</p>
                <p><span className="text-white/50">Rating: </span><span className="text-gold">★★★★★</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
