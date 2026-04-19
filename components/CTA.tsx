import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function CTA({ href, children, variant = "primary", external }: Props) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[color:var(--color-ink)] text-[color:var(--color-bg)] shadow-primary hover:bg-[color:var(--color-accent)]"
      : "bg-[color:var(--color-bg)] text-[color:var(--color-ink)] shadow-secondary";

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={`${base} ${styles}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {content}
    </Link>
  );
}
