# Theme — Simon Sangla design template

Portable, single-file CSS theme. Drop `theme.css` into any project and the tokens, base styles, motion, and component primitives work immediately.

## Files

| File | Role |
|------|------|
| `theme.css` | **Single entry.** Tokens + base + motion + components. The only file consumers need. |
| `README.md` | This doc. |

## Install

### 1. Copy the file

```
public/theme/theme.css      →  any-other-project/public/theme/theme.css
                             or  any-other-project/src/styles/theme.css
```

### 2. Link it

Static HTML:
```html
<link rel="stylesheet" href="/theme/theme.css">
```

Next.js (App Router):
```tsx
// app/layout.tsx
import "/public/theme/theme.css";
// or import "./theme.css" if colocated with global.css
```

Vite / CRA:
```tsx
// src/main.tsx
import "./styles/theme.css";
```

### 3. Load fonts

The theme references `Inter` and `Fraunces`. Load them separately. Cheapest option — Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..500,50,0..1&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

Next.js native:
```tsx
import { Inter, Fraunces } from "next/font/google";
const inter    = Inter({    subsets: ["latin"], weight: ["400","500"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT","WONK","opsz"], variable: "--font-fraunces" });
```

## Theme switching

Default palette is **Pays basque** (forest green + rouge). Swap at the root:

```html
<html data-theme="teal">          <!-- alternate: cool dark teal + rouge -->
<html>                            <!-- default basque -->
```

Add new palettes by duplicating the `[data-theme="teal"]` block in `theme.css` with new hex values — only the `--color-*` tokens need overriding. Shadows, spacing, type scale stay.

## Token reference

### Palette
| Token | Basque | Teal | Role |
|-------|--------|------|------|
| `--color-bg`             | `#FFFFFF` | `#FFFFFF` | Page background |
| `--color-ink`            | `#2A493F` | `#051A24` | Body text, logo, primary button bg |
| `--color-ink-soft`       | `#1E332C` | `#0D212C` | Display headings |
| `--color-muted`          | `#5D7569` | `#273C46` | Secondary text, meta |
| `--color-hairline`       | `#E2EBE6` | `#E0EBF0` | Dividers, card borders |
| `--color-surface-invert` | `#2A493F` | `#051A24` | Dark card surface |
| `--color-on-invert`      | `#F7FBF8` | `#F6FCFF` | Text on dark |
| `--color-on-invert-soft` | `#D8E4DD` | `#E0EBF0` | Secondary text on dark |
| `--color-accent`         | `#753539` | `#B8341A` | Focus rings, links, rouge |

### Fonts
| Token | Value |
|-------|-------|
| `--font-sans`        | Inter stack |
| `--font-serif`       | Fraunces stack |
| `--font-mono`        | System monospace |
| `--font-serif-axes`  | `"opsz" 144, "SOFT" 50, "WONK" 1` |

### Type scale
| Token | Mobile | Desktop |
|-------|--------|---------|
| `--fs-eyebrow`    | 11px | `--fs-eyebrow-md` 12px |
| `--fs-body-sm`    | 14px | `--fs-body-sm-md` 16px |
| `--fs-body`       | 16px | `--fs-body-md` 18px |
| `--fs-lead`       | 18px | `--fs-lead-md` 20px |
| `--fs-display-s`  | 22px | `--fs-display-s-md` 24px |
| `--fs-display-m`  | 32px | `--fs-display-m-md` 40px → `--fs-display-m-lg` 44px |
| `--fs-display-l`  | 48px | `--fs-display-l-md` 64px → `--fs-display-l-lg` 80px |

Line-heights: `--lh-body` 1.65, `--lh-lead` 1.55, `--lh-display` 1.1, `--lh-display-l` 1.05.
Tracking: `--tracking-body` -0.005em, `--tracking-lead` -0.01em, `--tracking-tight` -0.02em, `--tracking-eyebrow` 0.16em.

### Spacing (4px base)
`--space-1`..`--space-48` → 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96, 128, 192 px.

### Radius
`--radius-xl` 12px · `--radius-2xl` 16px · `--radius-32` 32px · `--radius-40` 40px · `--radius-full` 9999px.

### Shadows
All ink-tinted shadows derive from `--color-ink-rgb`; they re-tint automatically when you swap the palette.

- `--shadow-primary` — layered dark-pill shadow with inset highlight (dark CTAs + dark cards)
- `--shadow-secondary` — hairline ring + soft bloom (white pills)
- `--shadow-card` — flat card drop
- `--shadow-float` — soft two-layer lift (marquee images, bottom nav)

### Motion
- Durations: `--duration-fast` 150ms · `--duration-normal` 300ms · `--duration-slow` 800ms
- Easings: `--ease-out`, `--ease-in-out`
- Periods: `--marquee-duration-desktop` 30s · `--marquee-duration-mobile` 10s · `--carousel-interval` 3000ms
- Keyframes: `@keyframes fadeInUp`, `@keyframes marquee`
- Utilities: `.animate-fadeInUp`, `.animate-marquee`
- All respect `prefers-reduced-motion: reduce` globally.

### Layout
| Token | Value |
|-------|-------|
| `--container-hero`    | 440px |
| `--container-prose`   | 42rem |
| `--container-content` | 1200px |
| `--container-pricing` | 56rem |
| `--page-px`           | 1.5rem |

## Component classes

### Buttons
```html
<button class="btn btn-primary">Start the intake</button>
<button class="btn btn-secondary">See the proofs</button>
<button class="btn btn-tertiary">View details</button>
<button class="btn btn-inverted">Inverted on dark card</button>
<button class="btn btn-accent">Rouge accent</button>

<button class="btn-icon" aria-label="Previous">‹</button>
```

### Cards
```html
<article class="card card-light">Content</article>
<article class="card card-dark">Content</article>
```

### Marquee
```html
<div class="marquee">
  <div class="marquee-track">
    <div class="marquee-item">...</div>
    <!-- duplicate children for seamless loop -->
  </div>
</div>
```

### Bottom nav
```html
<nav class="bottom-nav" aria-label="Primary navigation">
  <span class="serif">S</span>
  <button class="btn btn-primary">Start a chat</button>
</nav>
```

### Secondary surface
```html
<div class="surface-secondary">
  <p class="eyebrow">Label</p>
  <h3 class="serif">Title</h3>
</div>
```

### Typography helpers
```html
<p class="eyebrow">Shipped, not pitched</p>
<span class="serif">display word</span>
<code class="mono">tokenName</code>
```

### Layout helpers
```html
<div class="container-hero mx-auto px-page">...</div>
<div class="container-content mx-auto px-page">...</div>
```

## Porting to Tailwind v4

Token names align with Tailwind v4's `@theme` convention. To wire up:

```css
/* app/globals.css */
@import "tailwindcss";
@import "../public/theme/theme.css";

@theme inline {
  --color-bg:      var(--color-bg);
  --color-ink:     var(--color-ink);
  --color-ink-soft: var(--color-ink-soft);
  /* ...etc — Tailwind now exposes bg-ink, text-ink-soft, shadow-primary, etc. */
  --font-sans:  var(--font-sans);
  --font-serif: var(--font-serif);
  --shadow-primary:   var(--shadow-primary);
  --shadow-secondary: var(--shadow-secondary);
  --shadow-card:      var(--shadow-card);
  --shadow-float:     var(--shadow-float);
  --radius-2xl:  var(--radius-2xl);
  --radius-32:   var(--radius-32);
  --radius-40:   var(--radius-40);
}
```

Then `className="bg-ink text-on-invert shadow-primary rounded-full"` works.

## Versioning

- `1.0` · 2026-04-16 · Pays basque default, Teal alternate, all 9 DESIGN.md sections token-backed.

## Related

- `/DESIGN.md` — full design system spec this theme implements
- `/design-preview/index.html` — live demo consuming this theme
