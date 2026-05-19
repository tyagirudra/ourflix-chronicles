import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

export default function SecretSection() {
  const [pw, setPw] = useState("");
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const v = pw.trim().toLowerCase();
    if (["200504"].includes(v)) {
      setOpen(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <section id="secret" className="relative py-28 px-6 sm:px-14 overflow-hidden">
      <div className="absolute inset-0 bg-radial-red opacity-40" />
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Restricted Section</p>
        <h2 className="font-display text-4xl sm:text-6xl">The Private Room.</h2>
        <p className="mt-4 text-white/65 max-w-xl mx-auto">
          Only for you. Whisper the password. (hint: it's something you already know.)
        </p>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.form
              key="lock"
              onSubmit={tryUnlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, x: shake ? [0, -12, 12, -8, 8, 0] : 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10 glass max-w-md mx-auto p-8 rounded-2xl"
            >
              <Lock className="mx-auto text-primary" size={32} />
              <div className="mt-5 flex gap-2">
                <input
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  type="password"
                  placeholder="enter the word…"
                  className="flex-1 bg-black/50 border border-white/15 focus:border-primary outline-none rounded-md px-4 py-3 text-white placeholder:text-white/30"
                />
                <button className="bg-primary text-white px-5 rounded-md font-semibold hover:bg-primary/90 transition shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                  Open
                </button>
              </div>
              <p className="mt-3 text-xs text-white/40">hint: 200504</p>
            </motion.form>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 glass max-w-2xl mx-auto p-10 rounded-2xl text-left"
            >
              <Unlock className="mx-auto text-gold mb-4" size={32} />
              <h3 className="font-display text-3xl text-center text-glow-gold">A Letter Just For You</h3>
              <div className="mt-6 font-script text-2xl leading-snug text-white/90 space-y-4">
                <p>My permanent one 🔐</p>
                <p>
                  I just wanna tell you how much i love you how much i miss you all the time it's beyond anybody's expectations the way i love you it's like your birthday is a festival for me i pray to god and thank him saying how beautiful, gorgeous and very dil ka saaf person he sent for me how grateful I'm to have you in my life i literally wanna say thankyou for being mine for giving this precious opportunity to love you thankyou for being a little chaotic and a lot of home you are sukoon to my bhasad wali zindagi i love youu beyond this universe 🫶🏻🥹💋
                </p>
                <p>Happiest birthday my darling 🌹💗, enjoy your day have a wonderful life ahead with me 🧿</p>
                <p className="text-primary text-glow-red">— always, me</p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" /> Private · 1 listener · You.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
