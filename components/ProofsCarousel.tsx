"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProofsCarousel({
  items,
}: {
  items: { key: string; node: ReactNode }[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      setActive(cards.length - 1);
      return;
    }
    const padL = parseInt(getComputedStyle(track).paddingLeft || "0", 10);
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - padL - track.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (t) clearTimeout(t);
      t = setTimeout(updateActive, 60);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    updateActive();
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (t) clearTimeout(t);
    };
  }, [updateActive]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const target = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (!target) return;
    const padL = parseInt(getComputedStyle(track).paddingLeft || "0", 10);
    track.scrollTo({ left: target.offsetLeft - padL, behavior: "smooth" });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const total = items.length;
  const atStart = active === 0;
  const atEnd = active >= total - 1;

  return (
    <div className="md:hidden">
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Artifacts carousel"
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] focus:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <li key={it.key} className="w-[82%] shrink-0 snap-start last:mr-2">
            {it.node}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.key}
              type="button"
              aria-label={`Go to artifact ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all ${
                i === active
                  ? "w-9 bg-[color:var(--color-ink)]"
                  : "w-6 bg-[color:var(--color-hairline)] hover:bg-[color:var(--color-muted)]"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-[color:var(--color-muted)]">
            {pad(active + 1)} / {pad(total)}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous artifact"
              onClick={() => goTo(active - 1)}
              disabled={atStart}
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-on-invert)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[color:var(--color-hairline)] disabled:hover:bg-[color:var(--color-bg)] disabled:hover:text-[color:var(--color-ink)]"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              aria-label="Next artifact"
              onClick={() => goTo(active + 1)}
              disabled={atEnd}
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-on-invert)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[color:var(--color-hairline)] disabled:hover:bg-[color:var(--color-bg)] disabled:hover:text-[color:var(--color-ink)]"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
