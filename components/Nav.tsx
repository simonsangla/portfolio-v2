import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

const links = [
  { href: "/#proofs", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#training", label: "Training" },
  { href: "/#about", label: "About" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-bg)]/85 backdrop-blur [backdrop-filter:saturate(180%)_blur(12px)]">
      <Container>
        <nav className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.015em] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] transition-colors"
            aria-label={`${site.name} — home`}
          >
            {site.name}
          </Link>
          <ul className="flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors"
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
