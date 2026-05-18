import p1 from "@/assets/poster1.jpg";
import p2 from "@/assets/poster2.jpg";
import p3 from "@/assets/poster3.jpg";
import p4 from "@/assets/poster4.jpg";
import p5 from "@/assets/poster5.jpg";
import p6 from "@/assets/poster6.jpg";

export type Movie = {
  id: string;
  title: string;
  year: string;
  duration: string;
  genre: string;
  poster: string;
  description: string;
  match?: number;
};

const pool = [p1, p2, p3, p5, p6, p4];

const make = (
  id: string, title: string, year: string, duration: string, genre: string,
  description: string, posterIdx: number, match = 98
): Movie => ({
  id, title, year, duration, genre, description,
  poster: pool[posterIdx % pool.length], match,
});

export const rows: { title: string; items: Movie[] }[] = [
  {
    title: "Continue Watching",
    items: [
      make("c1", "The First Time We Talked", "2023", "1h 12m", "Romance · Drama",
        "A nervous hello that quietly rewrote two entire lives.", 0, 99),
      make("c2", "That 3AM Call", "2023", "47m", "Late Night · Intimate",
        "Two voices, one city asleep, infinite things left unsaid.", 3, 97),
      make("c3", "The Best Night", "2024", "1h 38m", "Romance · Memory",
        "Lights, laughter, and a moment we'll keep forever.", 4, 100),
      make("c4", "Us Being Idiots", "2024", "32m", "Comedy",
        "A documentary on two people who can't stop laughing.", 2, 96),
    ],
  },
  {
    title: "Romantic Moments",
    items: [
      make("r1", "Slow Dance In The Kitchen", "2024", "22m", "Romance", "No music. Just us.", 5, 98),
      make("r2", "The Way You Looked", "2024", "1h 04m", "Drama · Romance", "That one second I knew.", 0, 99),
      make("r3", "Forehead Kisses Vol. I", "2024", "18m", "Romance · Soft", "A series of small forevers.", 1, 97),
      make("r4", "Rain & Us", "2023", "54m", "Romance", "Wet streets, warm hands.", 2, 96),
      make("r5", "Stay A Little Longer", "2024", "41m", "Romance", "Goodbyes that never finish.", 3, 95),
    ],
  },
  {
    title: "Funny Episodes",
    items: [
      make("f1", "The Pizza Incident", "2023", "12m", "Comedy", "Nobody saw it coming.", 2, 92),
      make("f2", "Autocorrect Wars", "2024", "9m", "Comedy", "Banned from group chats.", 3, 90),
      make("f3", "The Karaoke Disaster", "2024", "28m", "Comedy · Musical", "Off-key. On purpose.", 0, 94),
      make("f4", "Sleepy Voicenote Era", "2024", "06m", "Comedy", "Pure unhinged genius.", 4, 91),
      make("f5", "Selfie Outtakes", "2024", "15m", "Comedy", "Director's cut of chaos.", 5, 93),
    ],
  },
  {
    title: "Late Night Calls",
    items: [
      make("ln1", "3AM Diaries", "2023", "1h 22m", "Intimate", "When the world finally got quiet.", 3, 99),
      make("ln2", "Pillow Talk", "2024", "44m", "Romance", "Half-asleep, fully in love.", 0, 98),
      make("ln3", "Voice Memo No. 47", "2024", "07m", "Audio · Romance", "Play me back when you miss me.", 4, 100),
      make("ln4", "Silence That Felt Like Love", "2024", "31m", "Drama", "Breathing on the line.", 1, 97),
    ],
  },
  {
    title: "Chaos & Fights",
    items: [
      make("cf1", "The Jealousy Episode", "2023", "38m", "Drama", "Petty. Loud. Healed.", 1, 88),
      make("cf2", "Read 7:14pm", "2024", "22m", "Suspense", "Three dots that lasted years.", 3, 89),
      make("cf3", "The Apology That Worked", "2024", "1h 02m", "Drama · Romance", "We rebuilt it stronger.", 0, 95),
      make("cf4", "The Argument About Nothing", "2024", "19m", "Comedy · Drama", "Iconic, in hindsight.", 2, 91),
    ],
  },
];

export const futureOriginals: Movie[] = [
  make("fo1", "Our First Trip", "Coming Soon", "Feature", "Adventure · Romance",
    "A passport, a playlist, and the rest of the world.", 2, 100),
  make("fo2", "The Apartment", "Coming Soon", "Limited Series", "Slice of Life",
    "Two coffee mugs, one impossibly small kitchen.", 5, 100),
  make("fo3", "Still In Love", "Coming Soon", "Documentary", "Romance",
    "Twenty years from now, same eyes, same fire.", 0, 100),
  make("fo4", "Forever Together", "Coming Soon", "Original Film", "Romance · Drama",
    "The sequel that never ends.", 4, 100),
];

export const reels = [
  { caption: "Us >> Everything", sub: "no comparison, ever", color: "from-red-600/40" },
  { caption: "Still obsessed with you", sub: "5pm. 5am. always.", color: "from-pink-600/40" },
  { caption: "My favorite human", sub: "and my favorite trouble", color: "from-rose-700/40" },
  { caption: "Happy Birthday Beautiful", sub: "the world spins for you today", color: "from-amber-600/40" },
];

export const timeline = [
  { date: "Mar 14", title: "First Talk", text: "A message I almost didn't send." },
  { date: "Apr 02", title: "First Call", text: "We hung up at sunrise." },
  { date: "May 21", title: "First Date", text: "I forgot how to breathe normally." },
  { date: "Jul 09", title: "First Fight", text: "And the first real I'm sorry." },
  { date: "Sep 17", title: "First Trip", text: "New city, same person I'd choose." },
  { date: "Dec 31", title: "Midnight Kiss", text: "A year, sealed." },
  { date: "Today",  title: "Your Birthday", text: "The premiere you didn't know about." },
  { date: "Forever", title: "Future Dreams", text: "Every season renewed. Always." },
];

export const quiz = [
  {
    q: "What's the exact moment I knew?",
    options: ["The laugh", "The way you said my name", "The 3am call", "All of the above"],
    correct: 3,
    reward: "You unlocked: a voice note saved for tonight.",
  },
  {
    q: "Our most-used inside joke is…",
    options: ["The pizza one", "The autocorrect one", "The karaoke one", "All of them, obviously"],
    correct: 3,
    reward: "You unlocked: a hidden chapter.",
  },
  {
    q: "If our story had a tagline, it would be…",
    options: ["Loud, soft, ours.", "Two idiots, one forever.", "Made for each other.", "All of these."],
    correct: 3,
    reward: "You unlocked: the secret room.",
  },
];
