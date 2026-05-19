import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import MemoryModal from "@/components/MemoryModal";
import Timeline from "@/components/Timeline";
import Quiz from "@/components/Quiz";
import SecretSection from "@/components/SecretSection";
import FutureOriginals from "@/components/FutureOriginals";
import Finale from "@/components/Finale";
import CustomCursor from "@/components/CustomCursor";
import WhosWatching from "@/components/WhosWatching";
import SoundtrackPlayer from "@/components/SoundtrackPlayer";
import { memoryRows, type Memory } from "@/data/memories";

/*
 * Main page — all data now comes from src/data/memories.ts
 * To update content, edit that file. No need to touch this component.
 */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OURFLIX — A Love Story, Now Streaming" },
      { name: "description", content: "A cinematic Netflix-style birthday experience: every memory of us, premiered for you tonight." },
      { property: "og:title", content: "OURFLIX — A Love Story, Now Streaming" },
      { property: "og:description", content: "A cinematic Netflix-style birthday experience for the one I love." },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [memory, setMemory] = useState<Memory | null>(null);
  const [showApp, setShowApp] = useState(false);

  const start = () => document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });

  if (!showApp) {
    return (
      <div className="bg-[#050505] text-white selection:bg-primary min-h-screen">
        <CustomCursor />
        <WhosWatching onSelect={() => setShowApp(true)} />
      </div>
    );
  }

  return (
    <div id="top" className="relative bg-[#050505] text-white selection:bg-primary">
      <CustomCursor />
      <SoundtrackPlayer />
      <Preloader onDone={() => setReady(true)} />
      <Navbar muted={muted} setMuted={setMuted} />

      {ready && (
        <main>
          <Hero onPlay={start} />

          {/* ── Memory Rows (Netflix-style) ── */}
          <section id="memories" className="relative -mt-32 pt-32 pb-10">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-[#050505]" />
            {memoryRows.map((row) => (
              <MovieRow key={row.title} title={row.title} items={row.items} onOpen={setMemory} />
            ))}
          </section>

          <Timeline />
          <Quiz />
          <SecretSection />
          <FutureOriginals />
          <Finale />
        </main>
      )}

      <MemoryModal movie={memory} onClose={() => setMemory(null)} />
    </div>
  );
}
