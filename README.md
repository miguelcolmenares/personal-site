# personal-site

Miguel Colmenares' personal site: a short index page and a writing section.
Next.js 16 (App Router), React 19, Tailwind CSS v4, MDX articles read from the
filesystem.

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Writing an article

Add an `.mdx` file to `src/content/blog/`. The filename becomes the slug, so
`the-symlink-that-expired.mdx` is served at `/writing/the-symlink-that-expired`.

```mdx
---
title: "The symlink that expired five months later"
date: "2026-09-02"
summary: "One sentence, used on the index and as the meta description."
tags: ["debugging", "open source"]
published: true
---

Body goes here.
```

`title`, `date` and `summary` are required and **the build fails if any is
missing or is not a string** — a typo should stop the build rather than render
`undefined` into a heading. `published: false` keeps a draft out of the index
and off the routes.

Code blocks are highlighted at build time by Shiki, with paired light and dark
themes, so no highlighting JavaScript is shipped to the browser.

## Structure

```text
src/app/
├── page.tsx              # Index: the claim + the five most recent articles
├── writing/              # Article index
│   └── [slug]/           # One article, statically generated
└── icon.tsx              # Generated monogram favicon
src/content/blog/         # The articles, as MDX
src/lib/
├── posts.ts              # Reads and validates the MDX frontmatter
└── site.ts               # Name, URL, links — change the domain here only
```

## Scope

Deliberately small: the smallest site that can publish an article well. Project
case studies, a portfolio grid and an about page are all worth adding — **after**
there is writing to hang them on. The common failure mode for a developer site
is being beautifully built and permanently empty, so content leads and structure
follows.

## Design

The visual system comes from a v0 template generated against the
[codebymike.tech](https://codebymike.tech/) reference: near-black ground
(`#101211`), a single high-chroma lime accent (`#c4f269`), Geist and Geist
Mono, display type at `clamp(3.2rem, 8vw, 7rem)` with `-0.075em` tracking, and
mono uppercase micro-labels numbering each section.

Three things were changed on the way in, and they are worth keeping changed:

1. **The CSS was reformatted.** v0 emits every rule on one line, which is fine
   as generated output and unworkable as a file people edit.
2. **The site commits to a single dark look** — `color-scheme: dark`, no light
   palette. That is deliberate: the identity is the dark ground plus one
   accent, and a light variant would need a different accent to hold contrast,
   which is a second design rather than a theme of this one.
3. **The "product direction / design systems" capability framing was dropped.**
   `AGENTS.md` states plainly that Miguel is not a designer and consumes design
   rather than authoring it, so that copy would have contradicted the source of
   truth. The three capabilities now describe performance, Next.js platforms
   and CI — all of which the record supports.

The template also shipped placeholder projects (Northstar, Field Notes,
Signal) and placeholder art. None of it was kept; invented work has no place
on a portfolio.

## Domain

The site serves on its Vercel hostname today. `miguelcolmenares.com` is
registered and is where it moves.

`src/lib/site.ts` reads `NEXT_PUBLIC_SITE_URL`, so attaching the domain is one
environment variable in the Vercel project — no code change, no redeploy from
a commit:

```bash
NEXT_PUBLIC_SITE_URL=https://miguelcolmenares.com
```

That value feeds `metadataBase`, so Open Graph and canonical URLs follow it
automatically. Setting it is the whole migration.

## Facts

Anything factual on this site (years, platform counts, performance numbers) must
match `AGENTS.md` in the `professional-profile` repo, which is the source of
truth the CV, LinkedIn and Upwork are all kept consistent against. Change it
there first, then propagate.
