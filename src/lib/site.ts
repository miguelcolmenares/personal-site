/**
 * Single place for the identity strings, so switching to a real domain later
 * is a one-line change rather than a search across the tree.
 *
 * Every factual claim here must match `AGENTS.md` in the
 * `professional-profile` repo, which is the source of truth the CV, LinkedIn
 * and Upwork are all kept consistent against. Recruiters compare them.
 */
export const site = {
  name: "Miguel Colmenares",
  role: "Senior Frontend Engineer",
  /*
   * Canonical origin, used for Open Graph and metadataBase.
   *
   * Serving on Vercel's hostname for now. `miguelcolmenares.com` is already
   * registered (on Cloudflare, serving nothing yet) and is where this moves,
   * so the switch is a single environment variable in the Vercel project
   * rather than a code change and redeploy:
   *
   *   NEXT_PUBLIC_SITE_URL=https://miguelcolmenares.com
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://personal-site-miguelcolmenares-projects.vercel.app",
  description:
    "Senior Frontend Engineer with 17+ years of experience. A performance habit older than any framework I use, and open-source code — one widget alone serves 11M+ requests a month.",
  location: "Madrid, Cundinamarca, Colombia",
  availability: "Open to senior frontend roles",
  links: {
    github: "https://github.com/miguelcolmenares",
    linkedin: "https://linkedin.com/in/miguelension",
    npm: "https://npmjs.com/~miguel.colmenares",
    packagist: "https://packagist.org/users/miguelcolmenares/",
    email: "mailto:miguelension@gmail.com",
  },
} as const;

/**
 * The marquee. Only technologies with production work behind them — the
 * standard stack recorded in `AGENTS.md`, not an aspirational list.
 */
export const stack = [
  "NEXT.JS",
  "REACT 19",
  "TYPESCRIPT",
  "TAILWIND",
  "WPGRAPHQL",
  "NODE",
  "PHP 8.2",
  "AWS",
] as const;

/**
 * What Miguel actually does, phrased against the record.
 *
 * Deliberately not the "product direction / design systems" framing the v0
 * template shipped with: `AGENTS.md` states plainly that he is not a designer
 * and consumes design rather than authoring it. Claiming otherwise here would
 * contradict the source of truth and fail at the first interview question.
 */
export const capabilities = [
  {
    number: "01",
    title: "Performance that survives the release",
    description:
      "96 desktop Lighthouse, 0.8 s LCP, 0 CLS on a production platform — and six years of the same work before the current stack, back to service workers and PWAs on storefronts.",
  },
  {
    number: "02",
    title: "Next.js platforms, nine of them",
    description:
      "App Router, Server Components and Server Actions against headless WordPress and REST, shipped and maintained rather than prototyped.",
  },
  {
    number: "03",
    title: "Pipelines that catch things early",
    description:
      "Matrix testing, CodeQL, Dependabot with auto-merge and SHA-pinned actions across 18+ repositories, plus CI that provisions and requests automated review.",
  },
] as const;
