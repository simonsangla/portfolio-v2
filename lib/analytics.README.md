# Analytics

Typed event taxonomy over Vercel Analytics. No new runtime deps — uses the `@vercel/analytics` package already installed.

## How to add a new event

1. Add the event name to the `AnalyticsEvent` union in `lib/analytics.ts`.
2. Add its props shape to `AnalyticsEventProps` (use `Record<string, never>` for zero props).
3. Call `track("your_event", { ...props })` at the relevant interaction site.

## Event taxonomy

| Event | Props |
|---|---|
| `hero_cta_click` | `{ variant: "fractional" \| "products" \| "training" }` |
| `differentiator_view` | — |
| `fractional_cta_click` | `{ position: "hero" \| "engagement" \| "footer" }` |
| `intake_open` | `{ source: string }` |
| `product_card_click` | `{ slug: string }` |
| `case_study_view` | `{ slug: string }` |
| `case_study_cta_click` | `{ slug: string, target: "fractional" \| "product" }` |
| `faq_search` | `{ query: string, results: number }` |
| `faq_tag_filter` | `{ tag: string }` |
| `faq_ask_cta_click` | — |
| `demo_video_play` | `{ source: "hero" \| "product", slug?: string }` |
| `nav_click` | `{ target: string }` |
