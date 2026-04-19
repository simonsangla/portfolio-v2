import type { Artifact } from "@/lib/artifacts";
import { primaryLink, statusLabel, yearFromDate } from "@/lib/artifacts";
import { CTA } from "./CTA";

export function ArtifactHero({ artifact }: { artifact: Artifact }) {
  const primary = primaryLink(artifact.links);
  const secondaries = artifact.links.filter((l) => l !== primary);

  return (
    <section className="pb-4 pt-3 sm:pt-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
        {statusLabel(artifact.status)}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
        <span>{artifact.category}</span>
        <span aria-hidden className="text-[color:var(--color-hairline)]">•</span>
        <span>{artifact.role}</span>
        <span aria-hidden className="text-[color:var(--color-hairline)]">•</span>
        <span>{artifact.protection_level.toUpperCase()}</span>
        <span aria-hidden className="text-[color:var(--color-hairline)]">•</span>
        <span>{yearFromDate(artifact.date)}</span>
      </div>
      <h1 className="display-axis mt-3 font-serif text-[2.25rem] leading-[1.05] tracking-tight text-[color:var(--color-ink-soft)] sm:mt-5 sm:text-6xl">
        {artifact.name}
      </h1>
      <p className="mt-3 max-w-[52ch] text-xl text-[color:var(--color-muted)] sm:mt-5 sm:text-2xl">
        {artifact.tagline}
      </p>

      <div className="mt-5 max-w-[60ch] space-y-4 text-[color:var(--color-ink)]/90 sm:mt-8">
        <p className="text-lg leading-relaxed">{artifact.promise}</p>
        <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
          {artifact.business_value}
        </p>
      </div>

      <ul className="mt-5 max-w-[60ch] space-y-2 text-[color:var(--color-ink)]/90 sm:mt-8">
        {artifact.highlights.map((h, i) => (
          <li key={`${i}-${h}`} className="flex gap-3 text-base leading-relaxed">
            <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
        {artifact.tech_stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[color:var(--color-hairline)] px-2.5 py-0.5 text-[11px] text-[color:var(--color-muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      {(primary || secondaries.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-9">
          {primary && (
            <CTA href={primary.url} external>
              {primary.label === "Live" ? "Visit live site" : primary.label}
            </CTA>
          )}
          {secondaries.map((l) => (
            <CTA key={l.url} href={l.url} variant="ghost" external>
              {l.label}
            </CTA>
          ))}
        </div>
      )}
    </section>
  );
}
