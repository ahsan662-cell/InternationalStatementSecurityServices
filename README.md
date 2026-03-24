# ISS · International Statement Security Services
### Next.js + Framer Motion + Canvas 2D Website

---

## 🚀 QUICK START (3 commands)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

---

## 📁 FOLDER STRUCTURE (what every file does)

```
iss-nextjs/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← SEO metadata, fonts, global wrapper
│   │   ├── page.tsx            ← Main page — assembles all sections
│   │   └── globals.css         ← Design tokens (colors, typography, utilities)
│   │
│   ├── data/
│   │   └── siteData.ts         ← ⭐ EDIT THIS to change ALL content
│   │                              (services, locations, stats, etc.)
│   │
│   ├── components/
│   │   │
│   │   ├── 3d/
│   │   │   └── CinematicCanvas.tsx   ← ✈️ Airplane + HUD rings + Globe + Particles
│   │   │                                Everything animated on canvas
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            ← Fixed navigation bar
│   │   │   └── Footer.tsx            ← Footer with links
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       ← Full-screen hero with title + stats
│   │   │   ├── TickerSection.tsx     ← Scrolling "Trusted by" ticker
│   │   │   ├── ServicesSection.tsx   ← 6-card services grid
│   │   │   ├── WhyUsSection.tsx      ← 6-card why us grid
│   │   │   ├── LocationsSection.tsx  ← Interactive world map + detail panel
│   │   │   └── ContactSection.tsx    ← Form + process steps
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.tsx      ← Cyan dot + ring cursor
│   │       ├── ScrollReveal.tsx      ← Lenis smooth scroll + fade-up reveals
│   │       ├── SectionHeader.tsx     ← Reusable section heading component
│   │       └── HudCard.tsx           ← Reusable cyber-style info card
│   │
│   └── hooks/                  ← (empty — add custom hooks here)
│
├── public/
│   ├── images/                 ← Add your images here (logo, team photos etc.)
│   └── fonts/                  ← Add custom font files here if needed
│
├── package.json                ← Dependencies
├── tailwind.config.js          ← Tailwind theme tokens
├── next.config.js              ← Next.js config
└── tsconfig.json               ← TypeScript config
```

---

## ✏️ HOW TO EDIT CONTENT

**ALL content (text, locations, services, stats) lives in one file:**

```
src/data/siteData.ts
```

Open it and you'll find clearly labeled sections:
- `SITE_CONFIG` — name, phone, email, response time
- `STATS` — the 4 numbers in the hero stats bar
- `LOCATIONS` — all 8 cities (add/remove cities here)
- `SERVICES` — the 6 service cards
- `WHY_US` — the 6 "Why us" cards
- `TRUSTED_BY` — the ticker items
- `PROCESS_STEPS` — the 4 process steps in the contact section

---

## 🎨 HOW TO CHANGE COLORS

Open `src/app/globals.css` and find the `:root` block at the top:

```css
:root {
  --c:     #00D4FF;   /* ← Main cyan accent — change this */
  --bg:    #03070F;   /* ← Page background */
  --text:  #D8EEFF;   /* ← Primary text color */
  --muted: #6A8BAA;   /* ← Muted/secondary text */
}
```

Change `--c` to any color and it updates the entire site.

---

## ✈️ HOW TO MODIFY THE AIRPLANE ANIMATION

Open `src/components/3d/CinematicCanvas.tsx`

**Change flight path:**
```typescript
// Around line 140 — planePos() function
function planePos(t: number) {
  const cx = W * 0.5   // ← center X (0.5 = middle of screen)
  const cy = H * 0.42  // ← center Y
  const rx = W * 0.38  // ← width of the figure-8 loop
  const ry = H * 0.27  // ← height of the figure-8 loop
  // ...
}
```

**Change airplane speed:**
```typescript
// In the plane state object (around line 60)
const plane: PlaneState = {
  t: 0,
  speed: 0.0011,  // ← increase to fly faster, decrease to slow down
  // ...
}
```

**Change trail length:**
```typescript
maxTrail: 160,  // ← increase for longer trail, decrease for shorter
```

---

## 🔵 HOW TO MODIFY HUD RINGS

In `CinematicCanvas.tsx`, find the `rings` array (around line 185):

```typescript
const rings: [number, number, number[], number, number][] = [
  // [radiusFactor, speed, dashArray, opacity, lineWidth]
  [1.00,  0.30, [],    0.15, 1.0],  // outermost
  [0.92, -0.50, [8,6], 0.22, 0.7], // dashed ring
  // ...
]
```

- **radiusFactor**: 0.0 to 1.0 (1.0 = full size)
- **speed**: positive = clockwise, negative = counter-clockwise, higher = faster
- **dashArray**: `[]` = solid, `[8,6]` = dashed (8px dash, 6px gap)
- **opacity**: 0.0 to 1.0
- **lineWidth**: thickness in pixels

**To add a new ring:** just add a new row to the array.

---

## 🌍 HOW TO ADD A NEW LOCATION

In `src/data/siteData.ts`, add to the `LOCATIONS` array:

```typescript
{
  id: '07',
  city: 'Paris',
  country: 'France',
  region: 'Western Europe · New Hub',
  description: 'Your description here.',
  tags: ['Close Protection', 'VIP Events'],
  mapX: 370,  // ← X position on the SVG map (0-900)
  mapY: 72,   // ← Y position on the SVG map (0-420)
  lat: 48.8,  // ← Real latitude (for globe dots)
  lon: 2.35,  // ← Real longitude (for globe dots)
},
```

The location will automatically appear on the map, in the hero pills, and on the globe.

---

## 🃏 HOW TO ADD A NEW SERVICE

In `src/data/siteData.ts`, add to the `SERVICES` array:

```typescript
{
  id: '07',
  featured: false,
  icon: 'shield',  // ← options: shield, lock, globe, car, home, star
  title: 'Cyber Security',
  description: 'Digital threat monitoring and protection...',
  tags: ['24/7 Monitoring', 'Threat Intel'],
},
```

---

## 📱 HOW TO ADD A NEW PAGE (e.g. /about)

1. Create a new file: `src/app/about/page.tsx`
2. Add the page content
3. Link to it in `Navbar.tsx`

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
    </main>
  )
}
```

---

## 🌐 HOW TO DEPLOY (go live)

**Option 1 — Vercel (recommended, free)**
```bash
npm install -g vercel
vercel
```
Follow the prompts — your site is live in 2 minutes.

**Option 2 — Static export**
```bash
npm run build
# Upload the .next folder to any hosting provider
```

---

## 📦 TECH STACK REFERENCE

| Package | What it does |
|---------|-------------|
| `next` 14 | Framework — routing, SSR, builds |
| `react` 18 | UI component library |
| `framer-motion` | Scroll-triggered animations, entrance effects |
| `gsap` | Timeline animations (available to use, imported as needed) |
| `lenis` | Buttery smooth scroll behavior |
| `@react-three/fiber` | React wrapper for Three.js (ready when you need 3D) |
| `@react-three/drei` | Three.js helpers (globe, env maps, etc.) |
| `three` | 3D engine (used when upgrading canvas to WebGL) |
| `tailwindcss` | Utility CSS classes |
| `clsx` | Conditional className helper |

---

## 🔧 COMMON TASKS CHEAT SHEET

```bash
# Start development
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run start

# Add a new package
npm install package-name
```

---

## 💡 TIPS FOR EXTENDING

1. **New section?** — Create `src/components/sections/NewSection.tsx`, import it in `page.tsx`
2. **New animation?** — Add to `globals.css` under the animations block, use as className
3. **New canvas effect?** — Add a `drawXxx()` function in `CinematicCanvas.tsx`, call it in `render()`
4. **Change fonts?** — Update the Google Fonts import in `globals.css` and `tailwind.config.js`
5. **Contact form backend?** — Create `src/app/api/contact/route.ts` as a Next.js API route

---

*Built with Next.js 14 · Framer Motion · Canvas 2D*
