/**
 * Single place for the identity strings, so switching to a real domain later
 * is a one-line change rather than a search across the tree.
 *
 * Numbers here must stay consistent with `AGENTS.md` in the
 * `professional-profile` repo, which is the source of truth recruiters
 * compare the CV, LinkedIn and Upwork against.
 */
export const site = {
  name: "Miguel Colmenares",
  role: "Senior Frontend Engineer",
  // Replace with the real domain once it is registered; Vercel serves a URL
  // in the meantime and nothing else depends on this value.
  url: "https://miguelcolmenares.vercel.app",
  description:
    "Senior Frontend Engineer. Nine production Next.js platforms since 2023, a long performance thread that predates them, and notes on what each one taught me.",
  location: "Madrid, Cundinamarca, Colombia",
  links: {
    github: "https://github.com/miguelcolmenares",
    linkedin: "https://linkedin.com/in/miguelension",
    npm: "https://npmjs.com/~miguel.colmenares",
    email: "mailto:miguelension@gmail.com",
  },
} as const;
