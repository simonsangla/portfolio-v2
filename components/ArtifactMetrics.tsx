import type { Artifact } from "@/lib/artifacts";

// Values up to this length render as display-serif proof figures.
// Longer values (phrases like "9 domains · 36 tasks mapped") drop to a
// smaller serif treatment with balanced wrapping so the grid column can hold.
const DISPLAY_VALUE_MAX_CHARS = 10;

export function ArtifactMetrics({ artifact }: { artifact: Artifact }) {
  if (!artifact.metrics || artifact.metrics.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-16">
      <div className="rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
          Proof
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-3 sm:gap-10">
          {artifact.metrics.map((m) => {
            const isDisplay = m.value.trim().length <= DISPLAY_VALUE_MAX_CHARS;
            return (
              <div key={m.label}>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                  {m.label}
                </dt>
                <dd
                  className={
                    isDisplay
                      ? "mt-2 font-serif text-[2.25rem] leading-[1.05] tracking-tight tabular-nums text-[color:var(--color-ink-soft)] sm:text-[2.75rem]"
                      : "mt-2 font-serif text-[1.375rem] leading-[1.25] tracking-tight text-[color:var(--color-ink-soft)] sm:text-[1.5rem] [text-wrap:balance]"
                  }
                >
                  {m.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
