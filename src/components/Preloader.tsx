import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "./Particles";

const lines = [
  "Loading Memories…",
  "Preparing Tonight's Premiere…",
  "Starring You.",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1100);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setIntro(true), 3300);
    const t4 = setTimeout(() => { setShow(false); onDone(); }, 6200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          <Particles count={50} />
          <div className="absolute inset-0 bg-radial-red opacity-60" />
          <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />

          {!intro ? (
            <div className="relative z-10 w-full max-w-xl px-8 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5 }}
                  className="font-body text-sm uppercase tracking-[0.4em] text-white/80 mb-8"
                >
                  {lines[step]}
                </motion.p>
              </AnimatePresence>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_24px_#E50914]"
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center"
            >
              <div className="relative inline-block overflow-hidden">
                <h1 className="font-display text-7xl sm:text-9xl text-primary text-glow-red leading-none">
                  OURFLIX
                </h1>
                <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sweep" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.9 }}
                className="mt-6 font-script text-2xl text-white/85"
              >
                A story about love, chaos, distance, memories and forever.
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
