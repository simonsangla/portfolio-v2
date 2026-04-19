import { site } from "@/lib/site";

export function HeroStatus() {
  return (
    <p
      className="inline-flex items-center gap-2.5 rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)]/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-[12px]"
      style={{ ["--pulse-color" as string]: "#2e9a5e" }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pulse-color)] motion-safe:animate-[pulse-dot_2s_ease-in-out_infinite]"
      />
      {site.heroStatus}
    </p>
  );
}
