"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FaqEntry } from "@/lib/faq";
import { track } from "@/lib/analytics";
import { CTA } from "./CTA";
import { FaqCard } from "./FaqCard";

type Props = {
  entries: FaqEntry[];
  allTags: string[];
  intakeUrl: string;
};

export function FaqSearch({ entries, allTags, intakeUrl }: Props) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  // Hydrate from URL on mount, then mirror state back to the URL on change.
  // Avoids useSearchParams + Suspense dance (which raced on streamed SSR).
  const hydrated = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qInit = params.get("q") ?? "";
    const tagInit = params.get("tag") ?? "";
    if (qInit) setQ(qInit);
    if (tagInit) setTag(tagInit);
    hydrated.current = true;
  }, []);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return entries.filter((e) => {
      if (tag && !e.tags.includes(tag)) return false;
      if (qLower) {
        const haystack = `${e.question.toLowerCase()} ${e.tags
          .join(" ")
          .toLowerCase()} ${e.bodyPlain}`;
        if (!haystack.includes(qLower)) return false;
      }
      return true;
    });
  }, [q, tag, entries]);

  // Mirror state to URL (debounced). Preserves unrelated params (e.g. UTM).
  useEffect(() => {
    if (!hydrated.current) return;
    const handle = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (q) params.set("q", q);
      else params.delete("q");
      if (tag) params.set("tag", tag);
      else params.delete("tag");
      const qs = params.toString();
      const next = qs ? `/faq?${qs}` : "/faq";
      if (window.location.pathname + window.location.search !== next) {
        window.history.replaceState(null, "", next);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [q, tag]);

  // Fire faq_search only when the user actively types — not on URL hydration
  // and not on reloads of deep-linked `?q=`. Track the last user-typed value.
  const lastTypedQ = useRef<string | null>(null);
  const resultsRef = useRef(filtered.length);
  resultsRef.current = filtered.length;
  useEffect(() => {
    if (lastTypedQ.current === null) return; // never typed this session
    const qTrim = q.trim();
    if (!qTrim) return;
    const handle = setTimeout(() => {
      track("faq_search", {
        query: qTrim.slice(0, 64),
        results: resultsRef.current,
      });
    }, 250);
    return () => clearTimeout(handle);
  }, [q]);

  const handleTagClick = useCallback(
    (nextTag: string) => {
      const next = tag === nextTag ? "" : nextTag;
      setTag(next);
      if (next) track("faq_tag_filter", { tag: next });
    },
    [tag],
  );

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
            Search
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              lastTypedQ.current = e.target.value;
              setQ(e.target.value);
            }}
            placeholder="Try “pricing”, “security”, “training”…"
            className="w-full rounded-md border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] px-3 py-2 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
            aria-label="Search FAQ"
          />
        </label>
        <p
          className="text-sm text-[color:var(--color-muted)]"
          aria-live="polite"
        >
          {filtered.length} of {entries.length}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTagClick(t)}
            aria-pressed={tag === t}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
              tag === t
                ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]"
                : "border-[color:var(--color-hairline)] text-[color:var(--color-muted)] hover:border-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink-soft)]"
            }`}
          >
            {t}
          </button>
        ))}
        {tag && (
          <button
            type="button"
            onClick={() => setTag("")}
            className="rounded-full border border-[color:var(--color-hairline)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
          >
            Clear filter ×
          </button>
        )}
      </div>

      <div className="mt-8 border-t border-[color:var(--color-hairline)]">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-[color:var(--color-muted)]">
              No matches. Try a different term or clear the filter.
            </p>
          </div>
        ) : (
          filtered.map((entry) => (
            <FaqCard
              key={entry.slug}
              entry={entry}
              onTagClick={handleTagClick}
              activeTag={tag || undefined}
            />
          ))
        )}
      </div>

      <div className="mt-12 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
        <h2 className="text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl">
          Didn&rsquo;t find your answer?
        </h2>
        <p className="mt-3 text-[color:var(--color-muted)]">
          Send the question through the intake form. I reply in writing within
          48 hours.
        </p>
        <div className="mt-6">
          <CTA
            href={intakeUrl}
            external
            intakeSource="faq-bottom"
            onTrack={["faq_ask_cta_click", {}]}
          >
            Ask anything
          </CTA>
        </div>
      </div>
    </div>
  );
}
