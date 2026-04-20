"use client";

import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const links = [
  { href: "/services", label: "Services" },
  { href: "/training", label: "Training" },
  { href: "/products", label: "Products" },
  { href: "/fractional", label: "Fractional" },
  { href: "/faq", label: "FAQ" },
  { href: "/cv", label: "CV" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-bg)]/85 backdrop-blur [backdrop-filter:saturate(180%)_blur(12px)]">
      <Container>
        <nav className="flex items-center justify-between py-5">
          <Link
            href="/cv"
            className="text-[15px] font-semibold tracking-[-0.015em] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] transition-colors"
            aria-label={`${site.name} — CV`}
            onClick={() => track("nav_click", { target: "/cv" })}
          >
            {site.name}
          </Link>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:gap-x-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors"
                  onClick={() => track("nav_click", { target: l.href })}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
