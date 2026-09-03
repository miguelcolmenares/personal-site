import type { Metadata } from "next";
import Link from "next/link";

import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from real projects: what broke, what was tried, and what it taught me.",
};

export default function WritingIndex() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="eyebrow">Writing</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-balance">
        Notes from real projects
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Not tutorials. What broke, what I tried, and what it taught me — written
        for whoever hits the same thing next.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          First article in progress.
        </p>
      ) : (
        <ul className="mt-10 border-t border-border">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link
                href={`/writing/${post.slug}`}
                className="group block py-5 transition-colors hover:bg-muted/40"
              >
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 font-medium tracking-[-0.01em] group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
                {post.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
