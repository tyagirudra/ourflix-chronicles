import { motion } from "framer-motion";
import { futureOriginals } from "@/data/movies";
import { Bell } from "lucide-react";

export default function FutureOriginals() {
  return (
    <section id="originals" className="relative py-24 px-6 sm:px-14">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Future Originals</p>
            <h2 className="font-display text-4xl sm:text-6xl">Coming next season — us.</h2>
          </div>
          <p className="hidden sm:block max-w-sm text-white/60 text-sm">
            The premieres your future self already loves.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {futureOriginals.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all"
            >
              <img
                src={m.poster}
                alt={m.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-radial-red opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase bg-primary/90 px-2 py-1 rounded-sm shadow-[0_0_20px_rgba(229,9,20,0.7)]">
                Coming Soon
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl leading-tight">{m.title}</h3>
                <p className="text-xs text-white/65 mt-1">{m.description}</p>
                <button className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Bell size={12} /> Remind me
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
