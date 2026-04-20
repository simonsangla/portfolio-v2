"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { track, type AnalyticsEvent, type AnalyticsEventProps } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  onTrack?: [AnalyticsEvent, AnalyticsEventProps[AnalyticsEvent]];
};

export function CTA({ href, children, variant = "primary", external, onTrack }: Props) {
  function handleClick() {
    if (onTrack) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      track(onTrack[0] as any, onTrack[1] as any);
    }
  }
  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-[background-color,color,transform] duration-150";
  const styles =
    variant === "primary"
      ? "bg-[color:var(--color-ink)] text-[color:var(--color-bg)] shadow-primary hover:bg-[color:var(--color-accent)] hover:-translate-y-[1px]"
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
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`} onClick={handleClick}>
      {content}
    </Link>
  );
}
