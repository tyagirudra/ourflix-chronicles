/*
 * ============================================================
 *  OURFLIX CHRONICLES — Dynamic Memories Data
 * ============================================================
 *
 *  HOW TO ADD YOUR OWN PHOTOS, VIDEOS & VOICE NOTES:
 *
 *  1. Place your PHOTOS inside:   public/assets/photos/
 *     Example filenames:
 *       - first-talk.jpg
 *       - 3am-call.jpg
 *       - best-night.jpg
 *       - kitchen-dance.jpg
 *       (supports .jpg, .jpeg, .png, .webp)
 *
 *  2. Place your VIDEOS inside:   public/assets/videos/
 *     Example filenames:
 *       - first-talk.mp4
 *       - best-night.mp4
 *       - hero-background.mp4
 *       (supports .mp4, .webm, .mov)
 *
 *  3. Place your VOICE NOTES inside:   public/assets/voicenotes/
 *     Example filenames:
 *       - voice-memo-47.mp3
 *       - sleepy-voicenote.m4a
 *       - 3am-diaries.ogg
 *       (supports .mp3, .m4a, .ogg, .wav)
 *
 *  4. Reference them using paths like:
 *       image: "/assets/photos/first-talk.jpg"
 *       video: "/assets/videos/first-talk.mp4"
 *       audio: "/assets/voicenotes/voice-memo-47.mp3"
 *
 *  5. The image field is REQUIRED (used as thumbnail + fallback).
 *     The video and audio fields are OPTIONAL.
 *
 *  6. To update content later, just edit this file!
 *     No need to touch any components.
 *
 * ============================================================
 */

// ── Types ──────────────────────────────────────────────────

export type Memory = {
  id: string;
  /** Title displayed on the card */
  title: string;
  /** Subtitle / tagline shown below the title */
  subtitle: string;
  /** Year or "Coming Soon" */
  year: string;
  /** Duration string, e.g. "1h 12m" or "Feature" */
  duration: string;
  /** Category / genre, e.g. "Romance · Drama" */
  category: string;
  /** Longer description shown in the modal */
  description: string;
  /**
   * REQUIRED — Thumbnail / poster image path
   * Place your image in: public/assets/photos/
   * Example: "/assets/photos/first-talk.jpg"
   */
  image: string;
  /**
   * OPTIONAL — Video path for hover preview & modal playback
   * Place your video in: public/assets/videos/
   * Example: "/assets/videos/first-talk.mp4"
   * If not provided, the card will show the image only.
   */
  video?: string;
  /**
   * OPTIONAL — Voice note / audio path
   * Place your audio in: public/assets/voicenotes/
   * Example: "/assets/voicenotes/voice-memo-47.mp3"
   * Shows a play button in the modal when set.
   * Supports: .mp3, .m4a, .ogg, .wav
   */
  audio?: string;
  /** Match percentage (like Netflix), 0–100. Default: 98 */
  match?: number;
};

// ── Hero Configuration ─────────────────────────────────────
// Change these to customise the hero banner at the top.
// You can use EITHER a background image OR a looping video (or both as fallback).

export const heroConfig = {
  /**
   * Background IMAGE for the hero section.
   * Place your file in: public/assets/photos/
   * Example: "/assets/photos/hero.jpg"
   */
  backgroundImage: "/assets/photos/hero.jpeg",

  /**
   * OPTIONAL — Background VIDEO for the hero section.
   * If provided, this plays on loop (muted, autoplay) behind the text.
   * The image above is used as a fallback while the video loads.
   * Place your file in: public/assets/videos/
   * Example: "/assets/videos/hero-background.mp4"
   */
  backgroundVideo: undefined as string | undefined,
  // backgroundVideo: "/assets/videos/hero-background.mp4",  // ← uncomment & add your file

  /** Main heading line 1 */
  headingLine1: "Happy Birthday",
  /** Main heading line 2 (script font, glowing) */
  headingLine2: "My Love",
  /** Subtitle text */
  subtitle:
    "Tonight we relive our story — every laugh, every fight, every 3AM call, every quiet forever.",
};

// ── Memory Rows ────────────────────────────────────────────
// Each row is a category section on the homepage (like Netflix rows).
// Edit the memories below or add new ones — the UI updates automatically!

export const memoryRows: { title: string; items: Memory[] }[] = [
  // ─── ROW 1: Continue Watching ────────────────────────────
  {
    title: "Continue Watching",
    items: [
      {
        id: "c1",
        title: "First Time We Talked On Call",
        subtitle: "A nervous hello that quietly rewrote two entire lives.",
        year: "2021",
        duration: "1h 12m",
        category: "Romance · Drama",
        description: "A nervous hello that quietly rewrote two entire lives.",
        image: "/assets/photos/first-talk.jpeg", // ← mapped from desktop
        // video: "/assets/videos/first-talk.mp4", // ← uncomment & add your video
        match: 99,
      },

      {
        id: "c4",
        title: "Us Being Idiots",
        subtitle: "A documentary on two people who can't stop laughing.",
        year: "2026",
        duration: "32m",
        category: "Comedy",
        description: "A documentary on two people who can't stop laughing.",
        image: "/assets/photos/us-idiots.jpeg", // ← mapped from desktop
        video: "/assets/videos/us-idiots.mp4",  // ← mapped from desktop
        match: 96,
      },
    ],
  },

  // ─── ROW 2: Romantic Moments ─────────────────────────────
  {
    title: "Romantic Moments",
    items: [
      {
        id: "r2",
        title: "The Way You Looked",
        subtitle: "That one second I knew.",
        year: "2024",
        duration: "1h 04m",
        category: "Drama · Romance",
        description: "That one second I knew.",
        image: "/assets/photos/the-way-you-looked.jpeg",
        video: "/assets/videos/the-way-you-looked.mp4",
        match: 99,
      },
      {
        id: "r3",
        title: "Forehead Kisses Vol. I",
        subtitle: "A series of small forevers.",
        year: "2024",
        duration: "18m",
        category: "Romance · Soft",
        description: "A series of small forevers.",
        image: "/assets/photos/forehead-kiss.jpeg",
        match: 97,
      },
    ],
  },




];

// ── Future Originals ───────────────────────────────────────
// These show in the "Coming Next Season" section.

export const futureOriginals: Memory[] = [
  {
    id: "fo1",
    title: "Our First Trip",
    subtitle: "A passport, a playlist, and the rest of the world.",
    year: "Coming Soon",
    duration: "Feature",
    category: "Adventure · Romance",
    description: "A passport, a playlist, and the rest of the world.",
    image: "/assets/photos/poster3.jpg",
    match: 100,
  },
  {
    id: "fo2",
    title: "The Apartment",
    subtitle: "Two coffee mugs, one impossibly small kitchen.",
    year: "Coming Soon",
    duration: "Limited Series",
    category: "Slice of Life",
    description: "Two coffee mugs, one impossibly small kitchen.",
    image: "/assets/photos/poster6.jpg",
    match: 100,
  },
  {
    id: "fo3",
    title: "Still In Love",
    subtitle: "Twenty years from now, same eyes, same fire.",
    year: "Coming Soon",
    duration: "Documentary",
    category: "Romance",
    description: "Twenty years from now, same eyes, same fire.",
    image: "/assets/photos/poster1.jpg",
    match: 100,
  },
  {
    id: "fo4",
    title: "Forever Together",
    subtitle: "The sequel that never ends.",
    year: "Coming Soon",
    duration: "Original Film",
    category: "Romance · Drama",
    description: "The sequel that never ends.",
    image: "/assets/photos/poster5.jpg",
    match: 100,
  },
];

// ── Timeline Data ──────────────────────────────────────────
// These show on the horizontal-scroll timeline section.

export const timeline = [
  { date: "Jan 5", title: "First Talk", text: "A message I almost didn't send." },
  { date: "Feb 5", title: "First Call", text: "We hung up at sunrise." },
  { date: "17 March", title: "First Date", text: "I forgot how to breathe normally." },
  { date: "4 June", title: "First Kiss", text: "A year, sealed." },
  { date: "Today", title: "Your Birthday", text: "The premiere you didn't know about." },
  { date: "Forever", title: "Future Dreams", text: "Every season renewed. Always." },
  { date: "Episode 7", title: "Till The Very End", text: "I will love you forever, till the very end. And even after the credits roll, I'll be right there beside you, rewatching our favorite parts." },
];

// ── Quiz Data ──────────────────────────────────────────────

export const quiz = [
  {
    q: "Out of all the versions of you that exist, which one do you think I love the absolute most?",
    options: [
      "Sleepy, cozy My Bulbul wrapped up like a burrito in blankets.",
      "Happy, laughing My Bulbul when she's laughing at my terrible jokes.",
      "Dressed-up, stunning My Bulbul when we go out on special dates.",
      "Trick question—literally every single second, version, and mood of you"
    ],
    correct: 3,
    reward: "You unlocked: a voice note saved for tonight.",
  },
  {
    q: "If I had to pick the one thing about you that I love the most, what would it be?",
    options: [
      "Your beautiful eyes that I could completely drown in every single time you look at me.",
      "Your gorgeous smile that instantly makes my entire day ten times better.",
      "Your heart, your kindness, and how incredibly safe and happy I feel when I'm around you.",
      "Absolutely all of the above, plus a million more reasons I couldn't fit into a quiz."
    ],
    correct: 3,
    reward: "You unlocked: a hidden chapter.",
  },
  {
    q: "Let’s be completely honest: Who is the absolute love of my life, my favorite person, and my entire world?",
    options: [
      "My Bulbul ❤️",
      "The birthday girl (who happens to be My Bulbul).",
      "The prettiest girl reading this screen right now.",
      "My amazing girlfriend (yep, still My Bulbul)."
    ],
    correct: 3,
    reward: "You unlocked: the secret room.",
  },
];
