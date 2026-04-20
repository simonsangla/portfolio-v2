import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { FaqEntry } from "@/lib/faq";

type Props = {
  entry: FaqEntry;
  onTagClick?: (tag: string) => void;
  activeTag?: string;
};

export function FaqCard({ entry, onTagClick, activeTag }: Props) {
  return (
    <article
      id={entry.slug}
      className="scroll-mt-24 border-b border-[color:var(--color-hairline)] py-8 last:border-b-0 sm:py-10"
    >
      <div className="flex flex-wrap items-center gap-2">
        {entry.tags.map((t) =>
          onTagClick ? (
            <button
              key={t}
              type="button"
              onClick={() => onTagClick(t)}
              aria-pressed={activeTag === t}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                activeTag === t
                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]"
                  : "border-[color:var(--color-hairline)] text-[color:var(--color-muted)] hover:border-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink-soft)]"
              }`}
            >
              {t}
            </button>
          ) : (
            <span
              key={t}
              className="rounded-full border border-[color:var(--color-hairline)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]"
            >
              {t}
            </span>
          ),
        )}
      </div>
      <h2 className="mt-4 text-2xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-3xl">
        <a
          href={`#${entry.slug}`}
          className="hover:text-[color:var(--color-accent)]"
        >
          {entry.question}
        </a>
      </h2>
      <div className="prose-simon mt-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
      </div>
    </article>
  );
}
