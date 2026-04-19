import Link from "next/link";
import type { Artifact } from "@/lib/artifacts";
import { statusLabel, yearFromDate } from "@/lib/artifacts";

type Variant = "row" | "card";

export function ArtifactCard({
  artifact,
  variant = "row",
}: {
  artifact: Artifact;
  variant?: Variant;
}) {
  const chips = artifact.tech_stack.slice(0, 3);
  const eyebrow = (
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
      {statusLabel(artifact.status)}
    </p>
  );
  const title = (
    <h3 className="mt-2 text-[1.7rem] font-medium leading-[1.08] tracking-[-0.02em] text-[color:var(--color-ink-soft)] transition-colors group-hover:text-[color:var(--color-accent)] sm:text-[2rem]">
      {artifact.name}
    </h3>
  );
  const meta = (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
      <span>{artifact.category}</span>
      <span aria-hidden className="text-[color:var(--color-hairline)]">•</span>
      <span>{yearFromDate(artifact.date)}</span>
      {chips.length > 0 && (
        <span aria-hidden className="text-[color:var(--color-hairline)]">•</span>
      )}
      {chips.map((c) => (
        <span
          key={c}
          className="rounded-full border border-[color:var(--color-hairline)] px-2.5 py-0.5 text-[10px] normal-case tracking-normal text-[color:var(--color-muted)]"
        >
          {c}
        </span>
      ))}
    </div>
  );

  if (variant === "card") {
    return (
      <Link
        href={`/proofs/${artifact.slug}`}
        className="group flex h-full flex-col rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-5 transition-colors hover:border-[color:var(--color-ink-soft)]/40"
      >
        {eyebrow}
        {title}
        <p className="mt-2 line-clamp-3 text-[color:var(--color-muted)]">
          {artifact.tagline}
        </p>
        {meta}
        <span
          aria-hidden
          className="mt-5 text-2xl text-[color:var(--color-muted)] transition-all group-hover:translate-x-1 group-hover:text-[color:var(--color-accent)]"
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/proofs/${artifact.slug}`}
      className="group flex items-start justify-between gap-6 border-t border-[color:var(--color-hairline)] py-6 transition-colors hover:bg-[color:var(--color-hairline)]/30 sm:gap-10 sm:py-7"
    >
      <div className="min-w-0 flex-1">
        {eyebrow}
        {title}
        <p className="mt-2 max-w-[54ch] text-[color:var(--color-muted)] sm:text-lg">
          {artifact.tagline}
        </p>
        {meta}
      </div>
      <span
        aria-hidden
        className="mt-3 shrink-0 text-2xl text-[color:var(--color-muted)] transition-all group-hover:translate-x-1 group-hover:text-[color:var(--color-accent)] sm:mt-4"
      >
        →
      </span>
    </Link>
  );
}
