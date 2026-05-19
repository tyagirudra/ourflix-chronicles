import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Volume2, VolumeX } from "lucide-react";

const links = ["Home", "Memories", "Timeline", "Quiz", "Originals", "Finale"];

export default function Navbar({ muted, setMuted }: { muted: boolean; setMuted: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/5" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] flex items-center justify-between px-6 sm:px-10 py-4">
        <a href="#top" className="font-display text-2xl sm:text-3xl text-primary text-glow-red tracking-wider">
          OURFLIX
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-sm text-white/75 hover:text-white transition-colors story-link">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-white/80">
          <button onClick={() => setMuted(!muted)} className="hover:text-primary transition-colors" aria-label="toggle sound">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <Search size={18} className="hidden sm:block hover:text-primary cursor-pointer transition-colors" />
          <Bell size={18} className="hidden sm:block hover:text-primary cursor-pointer transition-colors" />
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent shadow-[0_0_18px_rgba(229,9,20,0.5)]" />
        </div>
      </div>
    </motion.header>
  );
}
