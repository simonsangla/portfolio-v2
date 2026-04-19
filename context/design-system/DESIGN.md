---
created: 2026-04-16T00:00:00Z
last_edited: 2026-04-18T00:00:00Z
---

# DESIGN.md — simonsangla.com

Visual spec for the personal portfolio. Every agent building UI in this repo reads this file first. Tokens are the single source of truth; do not introduce inline hex values, ad-hoc shadows, or one-off radii.

---

## 1. Visual Theme & Atmosphere

A practitioner landing page for a data-and-AI builder. Direct, utilitarian, evidence-first. The reader should land, scan three things in under ten seconds — who, what, proof — and either start the intake or close the tab. No editorial flourish, no pull-quotes, no bookish serif quirk. A wider hero with the headline on one to two lines, a scannable work grid, a single price block, a short about. Every element earns its pixel with a fact.

Movement is functional. Elements fade up as the reader meets them; the bottom nav floats. No marquee personality, no serif accents inside grotesque body, no dog-eared corners. Mono is used for eyebrows, meta rows, and numeric labels — the residue of a terminal, used with intent. Everything else is Inter across the whole scale, from 15px captions through the 56px hero h1, because a practitioner page should read like a well-designed technical README — not a quarterly.

**Key attributes:** direct, utilitarian, evidence-first, confident
**Density:** medium — wider hero, scannable grids, fewer words per line
**Personality:** a builder's landing page — disciplined, signal-heavy, zero ornament
**Reference spirit:** Linear / Vercel / Stripe docs home — single typeface, tight numeric meta, CTAs that act like commands
**Audience:** B2C scale-up founders, CTOs, CPOs; async, written, data-literate

A first-time reader should feel the page was built by someone who ships, using the same taste they apply to a production codebase.

---

## 2. Color Palette

All tokens below live in `app/globals.css` under `@theme`. Hexes are canonical; Tailwind class access is via the `@theme` variable names. No dark-mode variant in this phase — `themeColor` meta respects `prefers-color-scheme`, but the page itself stays light.

### Core

| Name | Hex | Role | Tailwind v4 token |
|------|-----|------|--------------------|
| Page | `#FFFFFF` | Page background, everywhere | `--color-bg` |
| Ink | `#051A24` | Primary body text, logo, primary CTA bg, pricing card dark surface | `--color-ink` |
| Ink Soft | `#0D212C` | Display/serif headings | `--color-ink-soft` |
| Muted | `#273C46` | Secondary text, author/meta, eyebrows (on light) | `--color-muted` |
| Hairline | `#E0EBF0` | Dividers, card borders, subtle separators | `--color-hairline` |

### Inverted (dark surfaces)

| Name | Hex | Role | Tailwind v4 token |
|------|-----|------|--------------------|
| Surface Invert | `#051A24` | Dark pricing card background, dark CTA background | `--color-surface-invert` |
| On Invert | `#F6FCFF` | Primary text on dark surfaces | `--color-on-invert` |
| On Invert Soft | `#E0EBF0` | Secondary text on dark surfaces | `--color-on-invert-soft` |

### Accent

| Name | Hex | Role | Tailwind v4 token |
|------|-----|------|--------------------|
| Accent | `#B8341A` | `:focus-visible` rings, MDX inline link colour, rare accent marks | `--color-accent` |

### Notes on existing `app/globals.css`

- `--color-bg`, `--color-ink`, `--color-muted`, `--color-accent` already exist — keep names.
- **Add:** `--color-ink-soft`, `--color-hairline`, `--color-surface-invert`, `--color-on-invert`, `--color-on-invert-soft`.
- Drop any legacy tokens named for hue ("blue-900", "slate-50", etc.) — rename to the semantic tokens above.

### Rules

- Never use `#000`. Black is `--color-ink` (`#051A24`).
- Never use `#F5F5F5`-style off-whites. Soft light is `--color-hairline` or `--color-on-invert-soft`.
- The accent is a focus colour, not a brand colour. Do not paint surfaces with it.

---

## 3. Typography

### Font stack

| Role | Family | Load | CSS variable |
|------|--------|------|--------------|
| Sans (everything) | Inter | `next/font/google`, weights 400/500/600 | `--font-inter` |
| Mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, monospace` | System | `--font-mono` |

Inter carries the entire page — body, headings, display. No serif, no Fraunces import. Weight drives hierarchy: 400 for body, 500 for section headings, 600 only on the hero h1. Mono is reserved for eyebrows, meta rows, numeric labels, and MDX code blocks — never body.

Enable Inter's disambiguated alternates globally on `html`:

```css
html { font-feature-settings: "ss01", "cv11"; }
```

`ss01` gives the open `a`/`g` and upright `R`/`J`; `cv11` disambiguates `1`/`l`/`I`/`0`. This is the closest Inter gets to a practitioner voice without a second family.

### Type scale

| Level | Family | Mobile | Desktop | Weight | Line-height | Tracking | Usage |
|-------|--------|--------|---------|--------|-------------|----------|-------|
| Eyebrow | Mono | 11px | 12px | 400 | 1.2 | `0.16em` uppercase | Section labels, meta rows, numeric prefixes |
| Body Small | Inter | 14px | 15px | 400 | 1.55 | `-0.005em` | Captions, footnotes, chip text |
| Body | Inter | 16px | 17px | 400 | 1.6 | `-0.005em` | Default prose, card body |
| Lead | Inter | 18px | 20px | 400 | 1.5 | `-0.01em` | Hero lead paragraph, section subheads, testimonial body |
| Display-S | Inter | 20px | 22px | 500 | 1.2 | `-0.015em` | Price number, card title, project name |
| Display-M | Inter | 28px | 36px→40px (lg) | 500 | 1.15 | `-0.02em` | Section heading |
| Display-L | Inter | 40px | 48px→56px (lg) | 600 | 1.05 | `-0.025em` | Hero h1 only |

### Principles

- One typeface across the page. No serif, no Fraunces, no axis overrides.
- Max prose measure: `max-w-[42rem]` (~65ch at 17px).
- Hero column: `max-w-[640px] lg:max-w-[960px]` — wide enough to fit the practitioner headline on one-to-two lines, never three.
- Mono is reserved for eyebrows, meta rows, numeric labels, and MDX code blocks. Never body.
- Weight ceiling is 600, and only on the hero h1. Section headings stop at 500. Body is always 400.
- Italics are never used. Emphasis comes from weight, mono, or color (`--color-ink` vs `--color-muted`).

---

## 4. Components

Every component below lists default + hover + `:focus-visible` + active + disabled. Concrete Tailwind v4 class strings show the canonical composition; they are prescriptive, not illustrative.

### 4.1 Button

Three variants. All `rounded-full`, padding `px-7 py-3`, `text-[15px] leading-none`, transition `all 150ms ease-out`. Minimum target 44x44px.

**Primary** — dark CTA, used for Start-a-chat, intake submit, bottom nav pill CTA.

- Default: `bg-[var(--color-ink)] text-[var(--color-on-invert)] shadow-primary rounded-full px-7 py-3`
- Hover: `hover:opacity-90`
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]`
- Active: `active:translate-y-[1px]`
- Disabled: `disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`

**Secondary** — white pill on light background, paired with primary in the bottom nav and hero.

- Default: `bg-[var(--color-bg)] text-[var(--color-ink)] shadow-secondary rounded-full px-7 py-3`
- Hover: `hover:opacity-90`
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]`
- Active: `active:translate-y-[1px]`
- Disabled: `disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`

**Tertiary** — white on light, for low-emphasis inline actions (e.g. carousel controls).

- Default: `bg-[var(--color-bg)] text-[var(--color-ink)] shadow-card rounded-full px-6 py-2 text-sm`
- Hover: `hover:opacity-90`
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]`
- Active: `active:translate-y-[1px]`
- Disabled: `disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`

### 4.2 Eyebrow

Pure text style, not a container.

- `font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]`
- No hover or interactive states.

### 4.3 Display heading

- `font-[var(--font-inter)] font-medium text-[var(--color-ink-soft)] tracking-tight leading-[1.15]`
- Hero h1 variant: `font-semibold leading-[1.05] tracking-[-0.025em] max-w-[640px] lg:max-w-[960px]` — do not set `whitespace-nowrap`; the headline may wrap to a second line.
- No axis overrides, no `font-variation-settings` on `h1/h2`.

### 4.4 Card

Two forms.

**Light Card** — testimonials, proof cards. Non-interactive by default (no hover / focus / active / disabled).

- Default: `bg-[var(--color-bg)] text-[var(--color-ink)] rounded-[32px] md:rounded-[40px] shadow-card pl-10 pr-10 md:pr-24 pt-3 pb-10`

**Dark Card** — pricing surface. Non-interactive by default.

- Default: `bg-[var(--color-surface-invert)] text-[var(--color-on-invert)] rounded-[32px] md:rounded-[40px] shadow-primary pl-10 pr-10 md:pr-24 pt-3 pb-10`
- The `shadow-primary` inset highlight gives the dark card its luminous edge — do not swap for a flat shadow.

If a card is made interactive (rare), add `hover:-translate-y-0.5 transition-transform duration-200` and a `:focus-visible` ring identical to Button.

### 4.5 Marquee

Full-width row of proof images; duplicates its children once for seamless loop.

- Row: `flex overflow-hidden w-full`
- Image: `h-[280px] md:h-[500px] w-auto object-cover mx-3 rounded-2xl shadow-float shrink-0`
- Animation: `animate-marquee` (see Section 6: Motion). `hover:[animation-play-state:paused]` on desktop (`md:` prefix).
- Duplicate children so the strip translates `-50%` without seam.
- Under `prefers-reduced-motion: reduce`, animation stops and the row scrolls manually.

### 4.6 Testimonial carousel card

- Container: `relative rounded-[32px] md:rounded-[40px] shadow-card bg-[var(--color-bg)] px-6 md:pl-10 md:pr-24 py-8 w-[calc(100vw-48px)] md:w-[427.5px] shrink-0`
- Contents: Lucide `Quote` icon (`w-6 h-6 text-[var(--color-ink)]`) → body (`Lead` scale) → avatar row (`flex items-center gap-3 pt-6`) with `rounded-full` avatar (`w-10 h-10`), name (`font-medium text-[var(--color-ink-soft)]`), role (`text-sm text-[var(--color-muted)]`).
- Carousel behaviour: auto-advance every 3000ms, `hover:pause`, transform transition `0.8s cubic-bezier(0.4, 0, 0.2, 1)`. Controls (if shown) use Tertiary button with Lucide `ChevronLeft` / `ChevronRight`.

### 4.7 Project item

Vertical block: offset text, full-width image below.

- Text block: `ml-20 md:ml-28 max-w-[42rem] mb-6`
  - Name: `font-medium text-[var(--color-ink-soft)] text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em]` (Display-S)
  - Description: `text-[var(--color-muted)] mt-2 text-[15px] md:text-[17px]`
- Image: `w-full aspect-[16/9] md:aspect-[21/9] object-cover rounded-2xl shadow-float`
- Wraps in `useInViewAnimation` hook → `animate-fadeInUp` (Section 6). Each project animates independently.

### 4.8 Bottom nav pill

- `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-bg)] rounded-full px-8 py-2 shadow-float flex items-center gap-6`
- Monogram: `font-semibold text-[20px] text-[var(--color-ink-soft)]` (the "S")
- CTA: Primary button (possibly with shortened label on `sm:` → `md:` swaps).
- `aria-label="Primary navigation"`; focus ring on each child follows Button rules.

### 4.9 Quote block

Used once on-page as the editorial pull-quote.

- `Quote` icon (Lucide, `w-6 h-6 text-[var(--color-ink)]`) → Display-M heading (Inter, weight 500, no inline serif) → author (`text-[var(--color-muted)] text-[15px] md:text-[17px] mt-6`) → credential row (mono, `text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)] mt-2`).
- No interactive states.

### 4.10 Pricing card

Composed from Dark Card.

- Price row: `flex items-baseline gap-2`
  - Number: `font-medium text-[22px] text-[var(--color-on-invert)] tracking-[-0.015em]`
  - Label: `text-[13px] uppercase tracking-[0.12em] text-[var(--color-on-invert-soft)]` — "Monthly" or "Minimum".
- Bullet list: `space-y-2 text-[15px] md:text-[17px] text-[var(--color-on-invert-soft)]` with Lucide `Star` (`w-4 h-4 text-[var(--color-on-invert)]`) prefix.
- CTA is Primary button, but with swapped surfaces: `bg-[var(--color-on-invert)] text-[var(--color-ink)] shadow-primary` (the inset highlight reads as a cool white rim against the dark card).

### 4.11 Secondary surface (price panel, intake box)

Low-emphasis enclosing surface used inside narrow columns for grouping a price + timeline pair, an intake callout, or similar. Non-interactive by default.

- Default: `bg-[var(--color-bg)] border border-[var(--color-hairline)] rounded-xl p-6 sm:p-8`
- No shadow — relies on hairline border for separation against `--color-bg`.
- If made interactive, upgrade to a Light Card (Section 4.4) rather than attaching a shadow to this surface.

### 4.12 Lucide icon set (curated)

Only these icons may appear on-page: `Quote`, `Star`, `ArrowUpRight`, `ChevronLeft`, `ChevronRight`. Stroke `1.5`, size `w-4 h-4` (inline) or `w-6 h-6` (headline accent). Colour inherits from parent `text-*`. Do not introduce decorative icons or emojis anywhere.

---

## 5. Layout & Spacing

### Spacing scale

Base unit `4px` (`0.25rem`). Tailwind's default scale is used — stops below are the **intended** set; other stops should not appear in UI code.

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0 | Reset |
| `1` | 4px | Icon-to-text gap, chip inner padding |
| `2` | 8px | Tight stack, between icon and caption |
| `3` | 12px | Button inner vertical (paired with `px-7`) |
| `4` | 16px | Default inline gap, MDX paragraph margin |
| `5` | 20px | Price row baseline gap |
| `6` | 24px | Page horizontal padding (`px-6`), avatar row |
| `8` | 32px | Card internal padding, gallery gutter |
| `10` | 40px | Card inner padding left, eyebrow → heading |
| `12` | 48px | Vertical rhythm between subsections |
| `16` | 64px | Hero top padding, section gap mobile |
| `20` | 80px | Section gap desktop, project offset (`ml-20`) |
| `24` | 96px | Card right padding on desktop (`pr-24`) |
| `32` | 128px | Marquee top/bottom breathing |
| `48` | 192px | Partner section `py-48` |

### Section vertical rhythm

| Section | Padding |
|---------|---------|
| Default | `py-12 md:py-20` |
| Hero | `py-16 md:py-24` |
| Partner headline | `py-48` |

### Containers

| Container | Width | Usage |
|-----------|-------|-------|
| Hero column | `max-w-[640px] lg:max-w-[960px]` | Hero body — two-step widen at `lg` for the full practitioner headline |
| Prose | `max-w-[42rem]` | MDX articles, project descriptions |
| Content | `max-w-[1200px] mx-auto` | Section wrappers |
| Pricing row | `max-w-4xl mx-auto` | Two pricing cards side-by-side on `md:` |

### Horizontal padding

- Page default: `px-6`
- Full-bleed rows (marquee, partner background): no horizontal padding; inner text still respects `max-w-[1200px]`.

### Radius scale

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-full` | 9999px | Pills, avatars, buttons, bottom nav |
| `rounded-2xl` | 16px | Marquee images, project images |
| `rounded-xl` | 12px | Secondary surfaces (price panel, intake box) |
| `rounded-[32px]` | 32px | Cards on mobile |
| `rounded-[40px]` | 40px | Cards on `md:` and up |

No other radii. Sharp corners (`rounded-none`, `rounded-sm`) are not used on interactive chrome.

---

## 6. Elevation & Effects

### Shadow tokens (exactly four)

Register under `@theme` in `app/globals.css`. Do not inline shadow strings anywhere else.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-primary` | `0 1px 2px 0 rgba(5,26,36,0.10), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0.00), inset 0 2px 8px 0 rgba(255,255,255,0.50)` | Dark pill buttons, dark pricing card |
| `shadow-secondary` | `0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)` | White pill buttons |
| `shadow-card` | `0 4px 16px rgba(0,0,0,0.08)` | Light pricing + testimonial cards |
| `shadow-float` | `0 8px 24px rgba(5,26,36,0.10), 0 2px 6px rgba(5,26,36,0.06)` | Bottom nav pill, marquee images, project images |

### Surface hierarchy

1. **Base** — page background `#FFFFFF`, no shadow
2. **Raised light** — light cards, Testimonial, Project image (`shadow-card` or `shadow-float`)
3. **Raised dark** — Pricing dark card (`shadow-primary` — the inset highlight is what gives it the luminous depth)
4. **Floating** — Bottom nav pill, marquee images (`shadow-float`)

### Motion tokens

All animations respect `prefers-reduced-motion: reduce` (already enforced globally at `app/globals.css:53-58`). The rule there disables all `transition-duration` and `animation-duration`.

Keyframes (`@keyframes fadeInUp`, `@keyframes marquee`) and their Tailwind utility aliases (`animate-fadeInUp`, `animate-marquee`) are declared in `app/globals.css`. Any new motion utility must be added there first, then referenced by name — do not inline `@keyframes` in component files.

| Name | Definition | Trigger |
|------|------------|---------|
| `fadeInUp` | `0%: opacity 0, translateY(30px)` → `100%: opacity 1, translateY(0)`. `0.8s ease-out forwards`. | `IntersectionObserver` threshold `0.1`, once. Stagger via `animationDelay: 0.1s → 0.5s`. |
| `marquee` | `translateX(0)` → `translateX(-50%)`. `30s linear infinite` desktop, `10s` mobile. | Always on (unless reduced motion). `hover:pause` desktop only. |
| `carousel` | Transform transition `0.8s cubic-bezier(0.4, 0, 0.2, 1)`. Auto-advance every `3000ms`. | Pauses on hover. |
| `parallax` | `IntersectionObserver` + scroll + `requestAnimationFrame`. Max `translateY` offset `200px`. | On visible sections with parallax opt-in. |
| `mouse-trail` | Spawn GIF thumbnail at cursor, random rotation `-10..+10deg`, `1000ms` fade + scale-down. Min `80ms` between spawns, rAF cleanup. | Partner section only, desktop only. |

### Motion hook

All entrance animations go through a shared `useInViewAnimation` hook (located at `lib/hooks/use-in-view-animation.ts` if not yet extracted — flag to extract). The hook returns a `ref` + a `inView` boolean and applies `animate-fadeInUp` with the appropriate delay.

---

## 7. Do's and Don'ts

### DO

**DO: Use Inter across the whole scale — weight drives hierarchy.**
```tsx
<h2 className="font-medium text-[36px] lg:text-[40px] leading-[1.15] tracking-[-0.02em]">
  Revenue Root Cause Engine
</h2>
<p className="text-[17px] leading-[1.6] text-[var(--color-ink)]">
  A four-week engagement for B2C scale-ups.
</p>
```

**DO: Use `rounded-full` or `rounded-[40px]` on interactive chrome.**
```tsx
<button className="rounded-full px-7 py-3 bg-[var(--color-ink)]">Start a chat</button>
<article className="rounded-[32px] md:rounded-[40px] shadow-card">...</article>
```

**DO: Put `shadow-primary` on every dark CTA.**
```tsx
<button className="bg-[var(--color-ink)] text-[var(--color-on-invert)] shadow-primary rounded-full px-7 py-3">
  Book intake
</button>
```

**DO: Wrap entrance motion in `useInViewAnimation`.**
```tsx
const { ref, inView } = useInViewAnimation();
<div ref={ref} className={inView ? "animate-fadeInUp" : "opacity-0"} style={{ animationDelay: "0.2s" }}>...</div>
```

**DO: Use `--color-ink` (#051A24) for primary dark, never `#000`.**
```tsx
<p className="text-[var(--color-ink)]">Paris I Sorbonne, M.Sc. Statistics & Econometrics.</p>
```

**DO: Use `max-w-[640px] lg:max-w-[960px]` for the hero column, `max-w-[42rem]` for prose.**
```tsx
<section className="mx-auto px-6 max-w-[640px] lg:max-w-[960px]">...</section>
<article className="mx-auto px-6 max-w-[42rem] prose">...</article>
```

### DON'T

**DON'T: Use pure black.**
```tsx
/* Bad */ <p className="text-black">...</p>
/* Good */ <p className="text-[var(--color-ink)]">...</p>
```

**DON'T: Import or reference Fraunces (or any serif).**
```tsx
/* Bad */ <h2 className="font-[var(--font-fraunces)]">Section heading</h2>
/* Good */ <h2 className="font-medium tracking-tight">Section heading</h2>
```

**DON'T: Inline new shadow recipes.**
```tsx
/* Bad */ <div style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}>...</div>
/* Good */ <div className="shadow-card">...</div>
```

**DON'T: Use emojis or icons outside the curated Lucide set.**
```tsx
/* Bad */ <span>Start a chat →</span>
/* Good */ <span>Start a chat <ArrowUpRight className="w-4 h-4" /></span>
```

**DON'T: Stack two display-size headings per viewport.**
```tsx
/* Bad — two Display-M in the same visible region */
<h2 className="text-[40px]">...</h2>
<h3 className="text-[40px]">...</h3>
/* Good — one display per section */
<h2 className="text-[40px]">...</h2>
<p className="text-[18px]">Supporting copy.</p>
```

**DON'T: Narrow the hero below `max-w-[640px]` or past `max-w-[960px]`.**
```tsx
/* Bad */ <section className="max-w-[440px]">...</section>
/* Bad */ <section className="max-w-[1200px]">...</section>
/* Good */ <section className="max-w-[640px] lg:max-w-[960px]">...</section>
```

**DON'T: Add decorative gradients or pure-hue surfaces.**
```tsx
/* Bad */ <div className="bg-gradient-to-r from-orange-400 to-pink-500">...</div>
/* Good */ <div className="bg-[var(--color-surface-invert)] text-[var(--color-on-invert)]">...</div>
```

**DON'T: Exceed weight 600, and reserve 600 for the hero h1.**
```tsx
/* Bad */ <span className="font-bold">MetricPilot</span>
/* Bad */ <h2 className="font-semibold">Section</h2>
/* Good */ <span className="font-medium">MetricPilot</span>
/* Good */ <h1 className="font-semibold">Hero</h1>
```

---

## 8. Responsive Strategy

### Breakpoints (Tailwind v4 defaults)

| Name | Min width | Target |
|------|-----------|--------|
| _(base)_ | 0 | Mobile portrait |
| `sm` | 640px | Mobile landscape, small tablet |
| `md` | 768px | Tablet / small laptop |
| `lg` | 1024px | Laptop / desktop |

No `xl` / `2xl` overrides are used in this phase.

### Touch targets

- Minimum interactive area: 44x44px.
- Pills achieve this via `px-7 py-3` (56x44px). The Bottom nav pill clears it via `px-8 py-2` plus line-height.
- Spacing between targets: minimum 8px (`gap-2`).

### Per-component mobile rules

| Component | Mobile adaptation |
|-----------|-------------------|
| Hero | Column is `max-w-[640px]` at base/`md`, widens to `max-w-[960px]` at `lg`. Display h1 `40px` base → `48px md` → `56px lg`. Mono tagline 14px. |
| Marquee | `h-[280px]` images; `10s` animation duration (perceived faster); no `hover:pause`. |
| Pricing cards | Stack vertically, full-bleed within `px-6`; radius `rounded-[32px]`. |
| Testimonial carousel | Card width `calc(100vw - 48px)`; right padding collapses to `pr-10`. |
| Project item | `ml-20` offset (holds); image `aspect-[16/9]`. |
| Bottom nav | Same layout; CTA label can shorten (e.g. "Chat" vs "Start a chat") at `< sm`. |
| Partner headline | `text-[48px]` at base → `text-[64px]` at `md` → `text-[80px]` at `lg`. Mouse-trail effect disabled on touch. |

### Behaviour patterns

- Horizontal scrolling is only used inside the marquee and carousel; never for layout.
- Images use `next/image` with responsive `sizes` and `priority` only on the hero / above-the-fold marquee.
- Tables in MDX wrap in a `overflow-x-auto` container below `md`.
- `prefers-reduced-motion: reduce` disables marquee, fadeInUp, carousel auto-advance, parallax, and mouse-trail.

---

## 9. Agent Prompt Guide

### Quick reference

| Token family | Value |
|--------------|-------|
| Page background | `#FFFFFF` (`var(--color-bg)`) |
| Primary ink | `#051A24` (`var(--color-ink)`) |
| Display ink | `#0D212C` (`var(--color-ink-soft)`) |
| Muted | `#273C46` (`var(--color-muted)`) |
| Hairline | `#E0EBF0` (`var(--color-hairline)`) |
| Dark surface | `#051A24` (`var(--color-surface-invert)`) |
| On invert | `#F6FCFF` (`var(--color-on-invert)`) |
| Accent (focus, MDX link) | `#B8341A` (`var(--color-accent)`) |
| Body font | Inter (`var(--font-inter)`) |
| Display font | Inter (`var(--font-inter)`) — weight 500/600, tracking `-0.02em` / `-0.025em` |
| Mono | System (`var(--font-mono)`) |
| Shadows | `shadow-primary`, `shadow-secondary`, `shadow-card`, `shadow-float` |
| Radii | `rounded-full`, `rounded-2xl`, `rounded-xl`, `rounded-[32px]`, `rounded-[40px]` |
| Spacing stops | 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 48 (× 4px) |
| Containers | `max-w-[640px] lg:max-w-[960px]` hero · `max-w-[42rem]` prose · `max-w-[1200px]` content · `max-w-4xl` pricing row |
| Section rhythm | `py-12 md:py-20` default · `py-16 md:py-24` hero · `py-48` partner |
| Breakpoints | `sm` 640 · `md` 768 · `lg` 1024 |

### How to use this document

1. Read the full DESIGN.md before writing any UI code.
2. Reference sections by name in commits and PR descriptions ("Following Section 4.10: Pricing card").
3. Use CSS custom properties via Tailwind `text-[var(--color-ink)]` syntax — do not inline hex.
4. Before submitting, run through Section 7.
5. If a component is not in Section 4, implement it using existing token composition and flag a DESIGN.md update.

### Example prompts

**Example 1 — Hero section**

> Build the hero section using `--color-ink` for body text, `--color-ink-soft` for the display h1 (Inter, weight 600, tracking `-0.025em`), Inter for the lead paragraph under the heading, and the system mono stack for the eyebrow tagline. Column is `max-w-[640px] lg:max-w-[960px]`, centered with `px-6`. The headline may wrap to two lines; do not set `whitespace-nowrap`. The "Start a chat" CTA is a Primary button (`bg-[var(--color-ink)] text-[var(--color-on-invert)] shadow-primary rounded-full px-7 py-3`). Wrap eyebrow → heading → body → CTA in `useInViewAnimation`, stagger `animationDelay` from `0.1s` to `0.5s` in `0.1s` steps. Respect `prefers-reduced-motion`.

**Example 2 — Dark pricing card**

> Build the pricing card (dark variant) at Section 4.10 spec. Use `bg-[var(--color-surface-invert)]` for the surface, `text-[var(--color-on-invert)]` for primary text, `text-[var(--color-on-invert-soft)]` for bullets. Radius `rounded-[32px] md:rounded-[40px]`. Apply `shadow-primary` for the inset highlight (do not substitute `shadow-card`). Price row: Inter Display-S (weight 500, tracking `-0.015em`), followed by a mono uppercase label "Minimum" at `text-[13px] tracking-[0.12em]`. Bullets use Lucide `Star` prefix (`w-4 h-4 text-[var(--color-on-invert)]`). CTA uses the inverted Primary pattern: `bg-[var(--color-on-invert)] text-[var(--color-ink)] shadow-primary rounded-full px-7 py-3`. No hover translate; focus-visible ring uses `--color-accent`.

**Example 3 — Marquee**

> Add the marquee component with 8 proof images, duplicated to 16 children for a seamless loop. Each image: `h-[280px] md:h-[500px] w-auto object-cover mx-3 rounded-2xl shadow-float shrink-0`. Row wrapper: `flex overflow-hidden w-full animate-marquee`. Duration `30s` on desktop, `10s` on mobile (split via `md:` animation class). Pause on hover with `hover:[animation-play-state:paused]` on `md:` and up only. Under `prefers-reduced-motion: reduce`, the animation halts — rely on the global rule at `app/globals.css:53-58`. Do not add a parallax effect or scale on hover.

### When to update DESIGN.md

- New component pattern shipped → add under Section 4 with full state matrix before merging.
- Token value changes → update Section 2 / 3 / 5 / 6 and note the change at the top of this file's frontmatter (`last_edited`).
- Responsive rule introduced → add to Section 8 table.
- Never duplicate this file's content into kits or plans — reference by section/token name only.
