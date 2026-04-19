import Link from "next/link";
import type { Artifact } from "@/lib/artifacts";

export function ArtifactRelated({
  artifact,
  all,
}: {
  artifact: Artifact;
  all: Artifact[];
}) {
  const slugs = artifact.related ?? [];
  if (slugs.length === 0) return null;

  const items = slugs
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is Artifact => a !== undefined && a.slug !== artifact.slug);

  if (items.length === 0) return null;

  return (
    <section
      aria-label="Related artifacts"
      className="mt-10 border-t border-[color:var(--color-hairline)] pt-6 sm:mt-16 sm:pt-8"
    >
      <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
        See also
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        {items.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/proofs/${a.slug}`}
              className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-[color:var(--color-hairline)]/30 sm:p-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-xl tracking-tight text-[color:var(--color-ink-soft)] transition-colors group-hover:text-[color:var(--color-accent)]">
                  {a.name}
                </span>
                <span className="mt-1 block text-sm text-[color:var(--color-muted)]">
                  {a.tagline}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-1 shrink-0 font-serif text-xl text-[color:var(--color-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--color-accent)]"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
