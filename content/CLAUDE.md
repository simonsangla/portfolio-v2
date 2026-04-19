# Content

MDX proofs + registry. Loaded at build time by `lib/artifacts.ts`.

## Conventions
- Proofs live in `content/proofs/*.mdx`
- Registry (`content/artifacts.registry.json`) defines ordering + metadata
- Dates in proof frontmatter: `YYYY-MM-DD`
- gray-matter parses YAML dates to `Date`; `lib/artifacts.ts` coerces to ISO string
- See context/kits/ for schema/validation requirements
