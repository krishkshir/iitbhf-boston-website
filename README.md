# IITBHF Boston Chapter Website

The public website for the IIT Bombay Heritage Foundation (IITBHF) Boston alumni
chapter. Its job is to be the chapter's local front door — turning someone who scans a
QR-code flyer at a Boston-area community event into an aware, engaged member of the
chapter. Primary audience: unengaged or lapsed IITB alumni in Greater Boston.

This site is a companion to, not a replacement for, `iitbombay.org`, which remains the
system of record for membership, donations, and the alumni directory.

## Status

**Phase 0 scaffold complete and deployed.** The Astro site is live at
<https://iitbhf-boston.cloudflare-atop596.workers.dev> — the free `*.workers.dev`
subdomain, since a custom domain has not been secured yet (see
`docs/CONSTITUTION.md` §6/§7). `docs/CONSTITUTION.md` remains the source of truth for
mission, audience, and roadmap.

### Install

```sh
pnpm install
```

### Develop

```sh
pnpm dev        # http://localhost:4321
pnpm check      # type-check + content-collection schema validation
```

### Build and deploy

```sh
pnpm build      # outputs to ./dist
pnpm deploy     # pnpm build && wrangler deploy — requires `wrangler login` once
```

`wrangler deploy` reads `wrangler.jsonc` and publishes `./dist` as static assets to
Cloudflare Workers. No adapter is used — this is a purely static site
(`output: 'static'`).

## Tech stack

- **Astro 7.x** (`output: 'static'`) — no build server required
- **Markdown + Astro content collections** with Zod schemas, for typed content
- **Tailwind CSS** with a small design-token layer
- **Cloudflare Workers** for hosting static assets, via `wrangler.jsonc`
- **Cloudflare Registrar** for the domain
- **Sveltia CMS** — a git-based CMS for non-technical EC members to edit content
- **Cloudflare Email Routing** and **Cloudflare Web Analytics** (both free)
- **`qrencode` CLI** for generating flyer QR codes in-house

`pnpm` is the package manager once the project is scaffolded.

## Before contributing

Read `docs/CONSTITUTION.md` in full first. It is the authoritative spec for this project —
mission, audience, tech stack rationale, information architecture, design tokens,
roadmap, and known risks all live there. If anything here or in a chat thread
contradicts it, the constitution wins; update it rather than working around it.

## Ownership

This is chapter property, not a personal project. The repository currently lives under
`github.com/krishkshir` for Phase 0 speed, per `docs/CONSTITUTION.md` §6 (Phase 3). It
will be transferred to an `iitbhf-boston` GitHub org, with the domain and Cloudflare
account moved to chapter-owned credentials, before EC handoff.

## Working agreements

- Conventional commits.
- Every content change goes through Git.
- No new dependency without a one-line reason in the commit message.
- No analytics or embed that would require a cookie consent banner.

See `docs/CONSTITUTION.md` §8 for the full list.
