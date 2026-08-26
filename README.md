# Larry Otieno — Portfolio

Cybersecurity and digital forensics portfolio. Built with [Astro](https://astro.build),
Tailwind CSS v4 and TypeScript; deployed to GitHub Pages.

**Live:** https://larry-otieno.github.io/My-Porfolio/

---

## Running it

```bash
npm install     # once
npm run dev     # dev server at http://localhost:4321/My-Porfolio
npm run build   # type check + static build into dist/
npm run preview # serve the built site locally
```

Node 20 or newer.

---

## Layout

```
src/
├── components/          Header, Footer, ThemeToggle, CommandPalette,
│                        HashTool, ProjectCard, ProjectCover, SecurityQuiz,
│                        Seo, SocialIcon
├── config/site.ts       ALL personal data — name, contact, skills,
│                        certifications, timeline, social links, nav
├── content/projects/     one Markdown file per project
├── content/writeups/     one Markdown file per writeup
├── content.config.ts    schemas for both collections
├── layouts/BaseLayout.astro
├── pages/               index, about, contact, 404,
│                        projects/, writeups/, rss.xml.ts
└── styles/global.css    design tokens + primitives
public/                  favicon, OG image, robots.txt
scripts/stage-lhci.mjs   stages the build under the base path for Lighthouse
```

## Making changes

**Personal details, skills, certifications, timeline, social links** live in
[`src/config/site.ts`](src/config/site.ts). Change them once, they update everywhere
including meta tags and structured data.

**Adding a project** — drop a new Markdown file into `src/content/projects/`:

```markdown
---
title: Project Name
summary: One or two sentences for the card.
order: 6                  # lower sorts first
featured: false           # true = also shown on the home page
year: '2025'
status: complete          # in-progress | complete | ongoing
category: security        # ai-ml | forensics | security | database
tags: ['Python', 'Nmap']
hue: 214                  # 0–360, seeds the generated cover art
repo: https://github.com/... # optional
---

## The problem
...
```

The frontmatter is schema-validated at build time, so a typo fails the build
rather than silently rendering wrong.

Cover art is **generated** from the project slug — no image files, nothing to
optimise, and no third-party CDN to break.

**Adding a writeup** — the same idea in `src/content/writeups/`:

```markdown
---
title: Keep it under ~55 chars (the page title has a 70-char budget)
summary: One or two sentences for the index and RSS feed.
published: 2025-03-18
updated: 2025-04-02        # optional
tags: ['Forensics', 'Incident Response']
readingTime: 6
draft: false              # true hides it from the site and the feed
---

## First section
...
```

Writeups appear on `/writeups`, get their own page with a table of contents,
join the tag filter, feed the `/rss.xml` feed, and surface in the command
palette — all automatically. Fenced code blocks are highlighted with Shiki
using a light/dark theme pair, so they stay readable in both themes.

## Interactive pieces

- **Command palette** (`Ctrl`/`⌘`+`K`, or `/`) — fuzzy search across pages,
  projects, writeups and actions, fully keyboard-driven. Defined in
  `CommandPalette.astro`; it reads the same content collections, so new content
  is searchable with no extra wiring.
- **Hash calculator** (home page) — SHA-1/256/384/512 of a string or file,
  computed in the browser with the Web Crypto API. Nothing is uploaded.
- **Security quiz** (about page) — four questions, accessible radio semantics,
  nothing stored.

---

## Contact form

The form has no backend by default. Until one is configured it opens the
visitor's mail client with the message pre-filled, so nothing is silently lost.

To make it deliver mail properly:

1. Create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Paste the endpoint URL into `formEndpoint` in [`src/config/site.ts`](src/config/site.ts).

The form posts `FormData` and expects a 2xx response. It includes a honeypot
field and falls back to the mail client if the request fails.

---

## Theming

Colour, type, spacing and radii are CSS custom properties in
[`src/styles/global.css`](src/styles/global.css). Dark is the default identity;
light is a separately tuned theme, not an inversion. The toggle cycles
system → light → dark and persists the choice; an inline head script applies it
before first paint so there is no flash.

To change the accent colour, edit `--accent` (and `--accent-hover`,
`--accent-muted`, `--accent-contrast`) in all three theme blocks.

---

## Deploying

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds, runs a **Lighthouse** audit, and publishes to GitHub Pages. Enable
it once under **Settings → Pages → Source → GitHub Actions**.

The Lighthouse gate ([`lighthouserc.json`](lighthouserc.json)) fails the build if
performance drops below 90 or accessibility/SEO below 95. It audits the staged
build under the real base path — `npm run lhci:stage` mirrors what CI does, so
you can reproduce it locally.

Moving to a custom domain: set `site` in [`astro.config.mjs`](astro.config.mjs) to
the new origin and delete the `base` line.

---

## The previous version

The original hand-written HTML site is preserved in [`legacy/`](legacy/) for
reference. It is not built or deployed.
