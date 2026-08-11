# CLAUDE.md

IITBHF Boston chapter website — the local front door converting event flyer scans into
engaged alumni. Static marketing/community site, no logins, no database.

**Read `CONSTITUTION.md` first for any non-trivial task.** It is the source of truth for
mission, audience, information architecture, roadmap, and risks — do not rely on this
file for those. If this file and the constitution disagree, the constitution wins;
flag the conflict.

## Status: pre-scaffold

This repo currently has no Astro app — only `CONSTITUTION.md`,
`IITBHF_Boston_Web_Presence_Plan_v0.docx`, `.gitignore`, and `README.md`. "Scaffold the
project" is a live, not-yet-done task. Do not assume any folder structure, config file,
or component exists until you've checked or created it yourself.

## Tech stack (for writing correct code here)

- **Astro 7.x**, `output: 'static'` — no build server, no SSR.
- **Content collections** with **Zod schemas** for all Markdown content (events, EC
  members, etc.) — typed frontmatter, validated at build time.
- **Tailwind CSS** for styling, built on the design tokens below — no ad hoc colors.
- **pnpm** is the only package manager. Never use npm or yarn.
- **Cloudflare Workers** deploy via `wrangler.jsonc` — this is the current Astro
  Cloudflare path; Pages is legacy, do not use it or `wrangler.toml`.
- **Sveltia CMS** is the editing surface for non-technical EC members (git-based,
  client-side, GitHub OAuth). Content structure should stay CMS-friendly.

## Design tokens (Constitution §5)

Color:
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B1F3A` | Body text, hero band, footer |
| `--powai` | `#1B4B7A` | Primary brand color, links |
| `--brick` | `#A6432B` | Accent only — CTAs, event dates, batch tags |
| `--linen` | `#FBFAF7` | Page background |
| `--crest` | `#C89A3C` | Hairline rules under section eyebrows only |

Type: **Display** — Zilla Slab. **Body** — IBM Plex Sans. **Data** (dates,
batch/branch tags, QR slugs) — IBM Plex Mono.

Mobile-first, high-contrast, large tap targets are requirements (primary visitor:
outdoor QR scan on a phone). Respect `prefers-reduced-motion`; visible keyboard focus
on every interactive element; responsive down to 360px.

## Working agreements (Constitution §8)

- Conventional commits.
- Every content change goes through Git — attributable, reversible, no exceptions.
- No new dependency without a one-line reason in the commit message.
- `pnpm` only.
- No analytics or embed that would require a cookie consent banner.
