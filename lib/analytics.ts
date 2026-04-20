export type AnalyticsEvent =
  | "hero_cta_click"
  | "differentiator_view"
  | "fractional_cta_click"
  | "intake_open"
  | "product_card_click"
  | "case_study_view"
  | "case_study_cta_click"
  | "faq_search"
  | "faq_tag_filter"
  | "faq_ask_cta_click"
  | "demo_video_play"
  | "nav_click";

export type AnalyticsEventProps = {
  hero_cta_click: { variant: "fractional" | "products" | "training" };
  differentiator_view: Record<string, never>;
  fractional_cta_click: { position: "hero" | "engagement" | "footer" };
  intake_open: { source: string };
  product_card_click: { slug: string };
  case_study_view: { slug: string };
  case_study_cta_click: { slug: string; target: "fractional" | "product" };
  faq_search: { query: string; results: number };
  faq_tag_filter: { tag: string };
  faq_ask_cta_click: Record<string, never>;
  demo_video_play: { source: "hero" | "product"; slug?: string };
  nav_click: { target: string };
};

export function track<E extends AnalyticsEvent>(
  event: E,
  props: AnalyticsEventProps[E],
): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props);
  }
  import("@vercel/analytics")
    .then((m) => m.track(event, props as Record<string, string | number | boolean>))
    .catch(() => undefined);
}
