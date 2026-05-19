import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quiz } from "@/data/memories";
import { Check, Sparkles } from "lucide-react";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [rewards, setRewards] = useState<string[]>([]);
  const done = step >= quiz.length;
  const q = quiz[step];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setTimeout(() => {
      setRewards((r) => [...r, quiz[step].reward]);
      setStep((s) => s + 1);
      setPicked(null);
    }, 1400);
  };

  return (
    <section id="quiz" className="relative py-24 px-6 sm:px-14">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Interactive</p>
        <h2 className="font-display text-4xl sm:text-6xl">How well do you know us?</h2>
        <p className="mt-4 text-white/65">Three questions. Three unlocks. One very predictable winner.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!done && q ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, rotateY: -25, y: 30 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, rotateY: 25, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-red opacity-30 pointer-events-none" />
              <div className="relative">
                <span className="text-xs tracking-[0.4em] uppercase text-gold">Question {step + 1} / {quiz.length}</span>
                <h3 className="font-display text-2xl sm:text-4xl mt-3">{q.q}</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {q.options.map((o, i) => {
                    const isPicked = picked === i;
                    const isCorrect = picked !== null && i === q.correct;
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isCorrect
                            ? "border-gold bg-gold/15 shadow-[0_0_30px_rgba(255,209,102,0.45)]"
                            : isPicked
                            ? "border-primary bg-primary/15"
                            : "border-white/10 hover:border-primary/60 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{o}</span>
                          {isCorrect && <Check size={18} className="text-gold" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-gold flex items-center gap-2"
                  >
                    <Sparkles size={16} /> {q.reward}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-red opacity-40" />
              <div className="relative">
                <h3 className="font-display text-4xl sm:text-5xl text-glow-red">Perfect Score, Obviously.</h3>
                <p className="mt-4 text-white/75">You unlocked everything. Including me. Again. Forever.</p>
                <div className="mt-6 space-y-2 text-sm text-gold">
                  {rewards.map((r, i) => <p key={i}>✦ {r}</p>)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
