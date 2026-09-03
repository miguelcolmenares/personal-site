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

Tokens in `src/app/globals.css` intentionally share their architecture with
`image-optimizer-web`: cool-biased neutrals rather than default grey, a
near-zero radius so structure is drawn with hairline rules instead of cards, and
mono type promoted from small print to structural furniture (`.eyebrow`, article
metadata, tag chips).

The accent differs on purpose. There, amber is the product's brand mark; here
the accent marks *the writing* — links, the emphasised half of the headline. The
two sites should read as siblings, not as clones.

## Facts

Anything factual on this site (years, platform counts, performance numbers) must
match `AGENTS.md` in the `professional-profile` repo, which is the source of
truth the CV, LinkedIn and Upwork are all kept consistent against. Change it
there first, then propagate.
