# CLAUDE.md

IITBHF Boston chapter website — the local front door converting event flyer scans into
engaged alumni. Static marketing/community site, no logins, no database.

**Read `docs/CONSTITUTION.md` first for any non-trivial task.** It is the source of truth
for mission, audience, information architecture, roadmap, and risks — do not rely on this
file for those. If this file and the constitution disagree, the constitution wins;
flag the conflict.

## Status: Phase 0 scaffold complete and deployed

The Astro app exists under `src/`, `public/`, `astro.config.mjs`, `wrangler.jsonc`. Six
pages (Home, About, Executive Committee, Events, Get Involved, Contact) plus the
`/from/{slug}` scan namespace are built and deployed to
<https://iitbhf-boston.cloudflare-atop596.workers.dev> (the free `*.workers.dev`
subdomain — no custom domain secured yet, see Constitution §7). `docs/RUNBOOK.md` is a
stub pending Phase 1. Sveltia CMS, the mailing-list tool, and the GitHub org transfer
are still Phase 1–3 work per Constitution §6 — don't assume they exist.

The `events` schema (`src/content.config.ts`) declares `heroImage`/`heroImageAlt`,
`openToPublic`, and a Markdown body, but nothing in `src/` renders any of them yet — an
editor can fill them in, get a green build, and see no change on the site. Known Phase 1
gap, not a bug; build the rendering (or an event detail page) before relying on them.

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

## Before pushing to remote

Update the affected docs in the same change — this file, `README.md`, and anything
under `docs/` — so they reflect what's actually true after the change, before pushing.
This has already bitten this exact repo once: `CONSTITUTION.md` moved into `docs/`, and
every path reference to it in `README.md` and this file had to be corrected in the same
commit as the move, not left for a later session to catch.

## Tool usage

- For any library documentation (framework/SDK/API/CLI syntax, config, version
  migration) — Astro, Tailwind, Cloudflare Workers/`wrangler`, Sveltia CMS, etc. — use
  context7 (per the global `context7` rule) instead of relying on training data, which
  may be stale.
- For any UI/UX/front-end design work — layout, visual styling, component aesthetics,
  typography — automatically invoke the `/frontend-design:frontend-design` skill rather
  than designing ad hoc.

## Visual verification and debugging

Once the Astro dev server exists (`pnpm dev`) or a Cloudflare Workers deployment URL is
live, use the `claude-for-safari` skill to load the page in the user's real Safari and
screenshot it for visual verification — confirming a rendered layout, checking the
design tokens (Constitution §5) actually rendered, debugging a CSS issue, etc. Prefer
this over asking the user to manually check.

- Open the target in a **new tab**, not the user's current tab — don't navigate away
  from tabs they already have open. Close that tab when done.
- A sibling project on this machine (`msk_ppal_calc`) found the skill's documented
  screenshot path (`safari_wid` + `screencapture -l <CGWindowID>`) unreliable —
  intermittently a bogus small window or nothing, even with Screen Recording permission
  working (plain `screencapture -x` full-screen succeeds immediately). If that route
  fails or returns implausible bounds here too, fall back to: activate Safari, read
  `bounds of window 1` via AppleScript, then `screencapture -x -R<x>,<y>,<width>,<height>`
  in the same shell call (activation and capture must happen back-to-back or focus
  reverts to the terminal). If the window is in a tiled/Split View arrangement, `bounds
  of window 1` can report stale full-screen values that don't match what's visibly on
  screen (confirmed on this machine) — force a clean size first with `set bounds of
  window 1 to {x, y, x2, y2}` via AppleScript, then re-read and capture that.
- Save screenshots to `.playwright-mcp/` in the project root (per the global Playwright
  convention), per the global CLAUDE.md.
- Clean up when done: close the tab you opened, delete any screenshots and compiled
  helper binaries (e.g. under `/tmp/claude-for-safari`) you created for the check, and
  confirm `git status` is clean before finishing. Don't touch the user's other tabs.

## GitHub account

Always use the **`krishkshir`** GitHub account (the repo owner/admin) for any GitHub
action against this repo — `git push`, `gh pr create`, `gh pr comment`, etc. The `gh`
CLI's default active account may be a different, lower-privilege account (e.g. one with
only read access), which fails non-obviously: `gh pr create` errors with "must be a
collaborator" rather than an auth error. Before any `gh` write action, check the active
account with `gh auth status` and, if it isn't `krishkshir`, switch with `gh auth switch
--user krishkshir` first.
