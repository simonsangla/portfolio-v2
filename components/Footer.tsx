import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-hairline)] py-10 text-sm text-[color:var(--color-muted)]">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/#proofs" className="hover:text-[color:var(--color-ink)]">
                Proofs
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-[color:var(--color-ink)]">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-[color:var(--color-ink)]">
                About
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-[color:var(--color-ink)]"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[color:var(--color-ink)]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[color:var(--color-ink)]"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
