# IITBHF Boston Chapter Website — Constitution

This document is the durable statement of what this project is, what it is built on, and
what happens next. Read this first, before touching code. It supersedes ad hoc decisions
made in chat threads or commit messages — if this file and a conversation disagree,
update this file.

Source plan: `IITBHF_Boston_Web_Presence_Plan_v0.docx` (approved in spirit by the
President, Jun 27 2026; formal EC sign-off pending — see §7).

---

## 1. Mission

Three nested scopes:

- **IITBHF (national)** — fund and promote education and research among IIT Bombay
  students; provide financial and other resources to IIT Bombay.
- **IITBHF Boston chapter** — a self-sustaining local avenue for alumni to give back,
  built on a predictable calendar of at least four in-person events a year.
- **This website** — the chapter's *local front door*. Its single job is converting a
  stranger at a Boston-area community event into an aware, engaged, and eventually
  participating member of the chapter.

**Positioning boundary (the most load-bearing constraint in this project):**
`iitbombay.org` remains the system of record. Membership, donations, and the alumni
directory stay there and are linked prominently from every page here. This site never
replicates them — attempting to would be expensive, redundant, and would fragment member
data.

**Content policy**, carried from EC guidance and binding on everything published here:
no religious or political events or material; no fundraising for causes outside the
foundation; no pay-to-play speaker slots; events open to the public unless the chapter
explicitly limits them to IITB alumni/participants.

**Success criteria (12 months from launch):**
- ≥50% of flyer-QR-code scans convert to a site visit
- ≥30 new mailing-list signups from non-`iitbombay.org` sources
- <1 hour/month of EC time spent on maintenance
- <$50 total year-one cost

---

## 2. Audience

1. **Primary** — unengaged or lapsed IITB alumni in Greater Boston (~800 in the area).
2. **Secondary** — the broader Indian-origin community at events like Colors of India,
   Diwali Mela, India Day — general awareness and goodwill.
3. **Tertiary** — prospective speakers, co-hosts (notably IIT AGNE), sponsors,
   journalists.

**Functional consequence:** the EC skews to batches '82–'10, and the highest-value
visitor arrives by scanning a printed QR code on a phone, outdoors, in daylight.
Mobile-first layout, high-contrast text, and large tap targets are requirements, not
preferences.

**Out of scope at launch:** membership management, donation processing, member
directory, user logins.

---

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 7.x**, `output: 'static'` | No build server needed; local toolchain is Node + pnpm, not Go, so this replaces the source plan's Hugo recommendation. Content collections + `astro:assets` handle a growing event-photo archive well. |
| Content | Markdown + Astro **content collections** with Zod schemas | Typed frontmatter catches editor mistakes at build time, not in production. |
| Styling | Tailwind CSS + a small design-token layer | Tokens are defined once in §5 and consumed everywhere; no ad hoc colors in components. |
| Hosting | **Cloudflare Workers** (static assets), via `wrangler.jsonc` | Free tier, global CDN, automatic HTTPS. This is Astro's current documented Cloudflare deploy path (Pages is legacy for new projects). |
| Registrar | **Cloudflare Registrar**, at-cost, no markup | Target domain `iitbhfboston.org` (~$12/yr). Fallbacks in priority order: `iitbhf-boston.org`, `iitbboston.org`, `iitbombayboston.org`. |
| CMS (non-technical editing) | **Sveltia CMS** | A maintained, Decap-compatible, git-based CMS: runs client-side, no build step, authenticates via GitHub OAuth. Lets an EC member edit an event post from a form without touching Git. |
| Email | **Cloudflare Email Routing** (free) | `hello@iitbhfboston.org` → forwards to `Boston_CEC-group@iitbombay.org`, which stays the system of record. |
| Analytics | **Cloudflare Web Analytics** | Free, privacy-respecting, no cookie banner required. |
| QR codes | **`qrencode` CLI** | Generated in-house — no third-party service, no expiry, no tracking pixel from the generator itself. |

**Standing constraints on any future change to this table:**
1. Recurring cost stays at the domain fee alone (~$12/yr) unless the EC explicitly
   approves a new line item.
2. All content stays as Markdown in Git — the next committee must be able to move the
   site to any other host in an afternoon, with no proprietary lock-in.

---

## 4. Information architecture

Six pages, no logins, no database:

1. **Home** — hero, one-sentence mission, next upcoming event(s), links to social and to
   `iitbombay.org`.
2. **About** — chapter history, relationship to IITBHF national and IITBAA, geographic
   scope, the IIT AGNE partnership.
3. **Executive Committee** — photo, batch/branch, one-line bio, LinkedIn link, for each
   EC member.
4. **Events** — upcoming (top) and a chronological past-events archive with recaps and
   photos.
5. **Get Involved** — how to join the mailing list, volunteer opportunities, link to
   `iitbombay.org` for formal IITBHF membership and donations.
6. **Contact** — `Boston_CEC-group@iitbombay.org` and social handles.

Plus a redirect namespace: `/from/{event}` (e.g. `/from/colors-of-india`) logs the
traffic source and forwards to Home — the mechanism that makes flyer ROI measurable.

**Launch content already available**, sourced from the live `iitbombay.org` chapter
page, so no one has to wait on it:

- President Shrikant Kshirsagar ('10, MechE)
- Vice President Shailesh Nirgudkar ('88, MechE)
- Treasurer Divi Lohiya ('02, MechE)
- Trustees Alkesh Shah ('85, EE) and Raj Laad ('82, MechE)
- Six past events: Spring Lunch with Karaoke (May 2026), Diwali Meet (Oct 2025), Gen AI
  Panel Discussion (Sep 2025), Annual Picnic with IIT AGNE (Sep 2025), Alumni Meet with
  IIT Bombay Visiting Team (Jun 2025), Startup Operations Panel (May 2025)

---

## 5. Design principles

**Direction — "the local front door."** Institutional enough to be credible to a
sponsor; warm enough to look like the picnics and karaoke nights the chapter actually
runs. Light-dominant, not dark-navy — justified by the outdoor phone-scan use case in
§2.

**Color** (5 tokens):

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B1F3A` | Body text, hero band, footer |
| `--powai` | `#1B4B7A` | Primary brand color, links |
| `--brick` | `#A6432B` | Accent only — CTAs, event dates, batch tags |
| `--linen` | `#FBFAF7` | Page background — reads as paper, not as a cream-toned aesthetic default |
| `--crest` | `#C89A3C` | Hairline rules under section eyebrows only |

**Type** (3 roles):

- **Display — Zilla Slab.** A slab serif reads as engineering drafting, on-brief for an
  IIT chapter.
- **Body — IBM Plex Sans.** Engineering heritage; its Devanagari sibling covers event
  names like Diwali Mela without a second family.
- **Data — IBM Plex Mono.** Dates, batch/branch tags, QR source slugs.

**Signature element — the scan greeting.** A visitor who arrives via
`/from/colors-of-india` is greeted by name: *"You scanned us at Colors of India."* It
follows directly from the flyer strategy, costs nothing to build, and is the one moment
on the site no generic template would produce. Spend the design's one real risk here;
keep everything else quiet.

**Supporting motif — the batch tag.** Every person on the site is identified as
`'10 · MechE` in Plex Mono, `--brick`. It's how IITB alumni actually introduce
themselves.

**Rules:**
- Structural markers are dates, never decorative `01/02/03` numbering — the events
  archive is genuinely chronological, so order carries real information.
- One hero fade on page load; no scattered scroll effects. `prefers-reduced-motion`
  respected.
- Visible keyboard focus on every interactive element.
- Responsive down to 360px width.

---

## 6. Roadmap

**Phase 0 — Colors of India sprint (Aug 11–15, 2026).** The event is Aug 15; this phase
targets it directly.
- Aug 11: register the domain; scaffold Astro; first deploy to Cloudflare; claim
  `@iitbhfboston` on LinkedIn, Facebook, and Instagram under a shared chapter Google
  account (not a personal one); send courtesy notice to `webmaster@iitbombay.org`
  (also ask whether a chapter brand kit exists)
- Aug 12: mission sentence sent to the EC for async sign-off; build Home, About, EC
  pages; back-fill the six known past events; design pass against §5
- Aug 13: build `/from/colors-of-india` redirect + analytics; design flyer in Canva;
  generate QR with `qrencode`; **place the flyer print order** — this is the actual
  hard deadline, not the website
- Aug 14: buffer day; test the live QR code on a phone over cellular data; soft launch
- Aug 15: Colors of India — distribute ~200 flyers

**Phase 1 — Make it maintainable (Aug 16–31).** Wire Sveltia CMS to the repo; commit a
two-page runbook; get at least one other EC member deploy access, with credentials in a
shared password manager. Deliberately deferred out of Phase 0 — Shrikant is the only
editor for those four days, so a CMS buys nothing before Aug 15.

**Phase 2 — Retrospective and iterate (September 2026).** Report scan-to-visit
conversion and signup rate to the EC. Decide the deferred mailing-list question
(MailerLite free tier, 1,000 subscribers). Publish a predictable forward calendar — the
EC's own stated best practice, and the thing most likely to drive repeat visits.

**Phase 3 — Durability (before EC handoff).** Transfer the repo to an `iitbhf-boston`
GitHub org (starts under `krishkshir` for Phase 0 speed). Move the domain and Cloudflare
account to chapter-owned credentials, not a personal account.

**Known dated commitments to plan around:**
- **Sep 12, 2026** — go/no-go deadline for hosting FAN 2027 in Boston
- **Oct 2, 2026** — IITB Global Unity Walk

---

## 7. Risks

- **Bus factor on the technical owner.** Mitigation: this document plus a runbook
  (Phase 1), credentials in a shared password manager, and a second EC member with
  deploy access from early on.
- **EC turnover every two years.** Markdown-in-Git means the next committee can migrate
  to any platform without lock-in.
- **Brand confusion with IITBHF national.** Mitigation: prominent link to
  `iitbombay.org` on every page; explicit "we are the local chapter, not a separate
  organization" language on About; courtesy notice to `webmaster@iitbombay.org` before
  wide promotion.
- **Brand confusion with IIT AGNE.** Mitigation: explicitly acknowledge the partnership
  on About; flag co-hosted events on the Events page.
- **Photo and content rights.** Publish only wide, non-identifiable crowd shots or
  photos with explicit consent; add a photo-release line to future event RSVPs.
- **EC approval is not yet formal.** The June plan was written for the EC but has not
  had a recorded vote. Launch content is provisional until the mission sentence gets
  explicit sign-off (see Phase 0, Aug 12).

---

## 8. Working agreements

- Conventional commits.
- Every content change goes through Git — attributable, reversible, no exceptions.
- No new dependency without a one-line reason in the commit message.
- `pnpm` is the package manager.
- No analytics or embed that would require a cookie consent banner.
