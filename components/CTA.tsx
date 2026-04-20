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
  // When set, fires intake_open with the given source and opens in the same
  // tab so the Tally referrer is preserved for attribution.
  intakeSource?: string;
};

export function CTA({
  href,
  children,
  variant = "primary",
  external,
  onTrack,
  intakeSource,
}: Props) {
  function handleClick() {
    if (onTrack) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      track(onTrack[0] as any, onTrack[1] as any);
    }
    if (intakeSource) {
      track("intake_open", { source: intakeSource });
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
    const openInNewTab = href.startsWith("http") && !intakeSource;
    return (
      <a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer" : undefined}
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
