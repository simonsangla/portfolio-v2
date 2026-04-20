# Design System — simonsangla.com

> Google Stitch 9-section format. Tokens sourced from `app/theme.generated.css` and `app/globals.css`. Do not invent tokens — document what exists.

---

## 1. Brand

Simon Sangla is a data and AI practitioner who ships revenue-diagnostic products for B2C scale-ups. The voice is direct, technical, and low-ceremony — no hype, concrete outcomes up front. The tagline ("Revenue root causes, shipped in four weeks.") sets a fixed-scope, time-boxed contract tone. Copy favours short declarative sentences, metric specificity, and first-person accountability. The palette (deep navy + brick-red accent on white) reinforces precision over personality.

<!-- TODO: audit / expand — full brand guidelines pending -->

---

## 2. Color

All tokens defined in `app/theme.generated.css` and aliased into Tailwind via `@theme {}` in `app/globals.css`.

| Token (`--tf-color-*`) | Hex | Tailwind alias (`--color-*`) | Usage |
|---|---|---|---|
| `primary` | `#B8341A` | `accent` | CTAs, links, focus ring |
| `secondary` | `#0D212C` | `ink-soft` | Headings, inverted surfaces |
| `background` | `#FFFFFF` | `bg` | Page background |
| `text` / `ink` | `#051A24` | `ink` | Body text |
| `muted` | `#273C46` | `muted` | Secondary text |
| `muted-soft` | `#4A5D66` | `muted-soft` | Tertiary text |
| `hairline` | `#E0EBF0` | `hairline` | Borders, dividers |
| `hairline-soft` | `#EEF4F7` | `hairline-soft` | Subtle backgrounds |
| `surface-invert` | `#051A24` | `surface-invert` | Dark section backgrounds |
| `on-invert` | `#F6FCFF` | `on-invert` | Text on dark surfaces |
| `on-invert-soft` | `#E0EBF0` | `on-invert-soft` | Muted text on dark surfaces |

<!-- TODO: audit / expand — dark mode tokens not yet defined -->

---

## 3. Typography

Single typeface: **Inter** (variable, loaded via `next/font/google` in `app/layout.tsx`), exposed as `--font-sans`. Monospace stack (`ui-monospace, SFMono-Regular, Menlo…`) for code blocks.

**Scale (from `@layer base`):**

| Element | Weight | Letter-spacing | Line-height |
|---|---|---|---|
| `h1–h4` | 500 | `-0.02em` | `1.05` |
| Body (`body`) | 400 | — | `1.65` |
| Code (`.prose-simon code`) | — | — | inherited |

**Prose class:** `.prose-simon` — max-width `42rem`, line-height `1.75`. Used in MDX case-study pages.

<!-- TODO: audit / expand — display size scale (hero title) not yet formalised -->

---

## 4. Spacing & Radii

**Spacing base:** `--tf-spacing-base: 4px` (4-pt grid). Tailwind spacing scale inherits this via `@theme`.

**Container widths:**
- `--container-prose: 42rem` — MDX body
- `--container-page: 70rem` — full-width page sections

**Radii:**

| Token | Value | Usage |
|---|---|---|
| `--tf-radius-sm` | `4px` | Inline code, small chips |
| `--tf-radius-md` | `8px` | Buttons, inputs |
| `--tf-radius-panel` | `12px` | Cards, panels |
| `--tf-radius-lg` | `16px` | Modals |
| `--tf-radius-xl` | `32px` | Large cards |
| `--tf-radius-2xl` | `40px` | Hero surfaces |
| `--tf-radius-pill` | `9999px` | Pill badges |

---

## 5. Shadows

| Token | Value |
|---|---|
| `--tf-shadow-primary` | Multi-layer elevation + inset highlight (buttons) |
| `--tf-shadow-secondary` | `0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)` |
| `--tf-shadow-card` | `0 4px 16px rgba(0,0,0,0.08)` |
| `--tf-shadow-float` | `0 8px 24px rgba(5,26,36,0.10), 0 2px 6px rgba(5,26,36,0.06)` |

Aliased in `@theme`: `--shadow-primary`, `--shadow-secondary`, `--shadow-card`, `--shadow-float`.

---

## 6. Components

Existing UI primitives (all in `components/`):

| Component | File | Notes |
|---|---|---|
| `Container` | `components/Container.tsx` | Width-constrained wrapper |
| `CTA` | `components/CTA.tsx` | Primary/secondary button |
| `SectionReveal` | `components/SectionReveal.tsx` | Intersection-observer fade-in |
| `HeroStatus` | `components/HeroStatus.tsx` | Availability badge |
| `HeroSignals` | `components/HeroSignals.tsx` | Social proof strip |
| `ProofsCarousel` | `components/ProofsCarousel.tsx` | Horizontal scroll card carousel |
| `ArtifactCard` | `components/ArtifactCard.tsx` | Product card |
| `ArtifactDemo` | `components/ArtifactDemo.tsx` | Demo embed block |
| `ArtifactHero` | `components/ArtifactHero.tsx` | Case-study hero |
| `ArtifactMetrics` | `components/ArtifactMetrics.tsx` | Outcome metrics strip |
| `ArtifactRelated` | `components/ArtifactRelated.tsx` | Related content links |
| `Nav` | `components/Nav.tsx` | Top navigation |
| `Footer` | `components/Footer.tsx` | Site footer |

<!-- TODO: audit / expand — document prop APIs per component -->

---

## 7. Motion

**Entry animation:** `fadeInUp` keyframe — elements enter from `translateY(1rem)` at `opacity: 0` to resting state over `0.6s ease-out`. Applied via class `.animate-fadeInUp` or the `SectionReveal` component (uses `[data-reveal]` attribute + IntersectionObserver).

**Reduced-motion:** `@media (prefers-reduced-motion: reduce)` in `@layer base` sets all animations/transitions to `0.001ms` and forces `[data-reveal]` to `opacity: 1; transform: none` — no JS changes needed.

Secondary animation: `pulse-dot` keyframe for the availability indicator in `HeroStatus`.

<!-- TODO: audit / expand — timing tokens not yet defined -->

---

## 8. Iconography

TBD — Heroicons v2 outline as needed.

<!-- TODO: audit / expand — no icon library imported yet; add when first icon is required -->

---

## 9. Accessibility

TBD — audit pending.

Current baseline: `:focus-visible` global rule (2px `--color-accent` outline, 3px offset, 2px radius). All interactive elements inherit this.

<!-- TODO: audit / expand — full WCAG 2.1 AA audit not yet run -->
