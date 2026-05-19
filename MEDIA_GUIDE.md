# 📸 How to Add Your Photos, Videos & Voice Notes

## Quick Start

### Step 1 — Add your files

| Media Type   | Put files here                  | Supported formats          |
|--------------|---------------------------------|----------------------------|
| **Photos**   | `public/assets/photos/`         | .jpg, .jpeg, .png, .webp   |
| **Videos**   | `public/assets/videos/`         | .mp4, .webm, .mov          |
| **Audio**    | `public/assets/videos/`         | .mp3, .ogg, .wav           |

### Step 2 — Edit the data file

Open **`src/data/memories.ts`** and update the entries.

#### Example memory entry:
```ts
{
  id: "c1",
  title: "The First Time We Talked",
  subtitle: "A nervous hello that quietly rewrote two entire lives.",
  year: "2023",
  duration: "1h 12m",
  category: "Romance · Drama",
  description: "A nervous hello that quietly rewrote two entire lives.",
  image: "/assets/photos/first-talk.jpg",     // ← your photo filename
  video: "/assets/videos/first-talk.mp4",      // ← optional video (remove line if none)
  match: 99,
}
```

### Step 3 — Hero background

To change the main banner:
- **Image**: Place your image in `public/assets/photos/` and update `heroConfig.backgroundImage`
- **Video**: Place your .mp4 in `public/assets/videos/` and uncomment `heroConfig.backgroundVideo`

---

## 📁 Example File Structure

```
public/
  assets/
    photos/
      hero.jpg              ← hero banner background
      first-talk.jpg        ← memory card thumbnail
      3am-call.jpg
      best-night.jpg
      kitchen-dance.jpg
      forehead-kiss.jpg
      rain-date.jpg
      poster1.jpg           ← default placeholder (already included)
      poster2.jpg
      ...
    videos/
      hero-background.mp4   ← optional hero loop video
      first-talk.mp4        ← plays on card hover & in modal
      best-night.mp4
      3am-call.mp4
      ...
```

## 🎯 Tips

- **Images**: Use landscape orientation for best results. 600×900px (2:3) works great for cards.
- **Videos**: Keep hover preview videos short (5-15 seconds). Compress to keep file sizes small.
- **Hero video**: Use a cinematic, atmospheric clip. It plays muted on loop behind the title.
- **Naming**: Use lowercase with hyphens: `first-talk.jpg`, not `First Talk.jpg`

## 🔧 Features

| Feature                    | Status |
|---------------------------|--------|
| Custom photo thumbnails    | ✅     |
| Video preview on hover     | ✅     |
| Autoplay muted loop videos | ✅     |
| Fallback image if no video | ✅     |
| Lazy loading               | ✅     |
| Netflix zoom + glow hover  | ✅     |
| Responsive mobile layout   | ✅     |
| Easy data file editing     | ✅     |
| Hero background video      | ✅     |

## ❓ FAQ

**Q: Do I need to restart the server after adding files?**
A: No! Just save the files and edit `memories.ts`. Vite hot-reloads automatically.

**Q: What if my video doesn't play?**
A: The card/modal will show the fallback image instead. Make sure the video is in .mp4 format (H.264 codec).

**Q: Can I add more rows?**
A: Yes! Just add a new object to the `memoryRows` array in `memories.ts`.

**Q: Can I remove a row?**
A: Yes! Delete the row object from the `memoryRows` array.
