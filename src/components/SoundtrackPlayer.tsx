import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function SoundtrackPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const handlePause = () => {
      if (audioRef.current && isPlaying) {
        wasPlayingRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    const handleResume = () => {
      if (audioRef.current && wasPlayingRef.current && !isPlaying) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
        setIsPlaying(true);
        wasPlayingRef.current = false;
      }
    };
    window.addEventListener("pause-soundtrack", handlePause);
    window.addEventListener("resume-soundtrack", handleResume);
    return () => {
      window.removeEventListener("pause-soundtrack", handlePause);
      window.removeEventListener("resume-soundtrack", handleResume);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.3; // Nice quiet background volume
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 left-6 z-[9998]"
    >
      <audio ref={audioRef} src="/assets/voicenotes/soundtrack.mp3" loop />
      
      <button 
        onClick={togglePlay}
        className="group relative flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 p-3 pr-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-black/80 hover:border-primary/50 transition-all duration-300"
      >
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]' : 'bg-white/10 text-white/70'}`}>
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Our Soundtrack</span>
          <span className="text-xs text-white/70 truncate max-w-[100px] group-hover:text-white transition-colors">
            {isPlaying ? "Playing..." : "Paused"}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
