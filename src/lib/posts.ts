import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). Used for ordering and the printed date. */
  date: string;
  /** One sentence shown on the index and used as the meta description. */
  summary: string;
  /** Short topic labels, rendered as mono chips. */
  tags: string[];
  /** Set false to keep a draft out of the index and the sitemap. */
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  // Frontmatter is authored by hand, so every field is checked rather than
  // cast — a typo should fail the build, not render "undefined" in a heading.
  const missing = (["title", "date", "summary"] as const).filter(
    (key) => typeof data[key] !== "string",
  );
  if (missing.length > 0) {
    throw new Error(
      `${fileName}: missing or non-string frontmatter: ${missing.join(", ")}`,
    );
  }

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    published: data.published !== false,
    content,
  };
}

/** Every published post, newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map(parseFile)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** One published post, or `null` when the slug does not resolve. */
export function getPost(slug: string): Post | null {
  return getPosts().find((post) => post.slug === slug) ?? null;
}

/** Formats an ISO date for display, in UTC so it cannot drift by a day. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
