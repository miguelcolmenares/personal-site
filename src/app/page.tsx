import Link from "next/link";

import { formatDate, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/*
 * Deliberately short. This is the smallest home page that can carry an
 * article, not the finished portfolio — case studies and project work land
 * here once there is writing to hang them on.
 */
export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl leading-[1.15] font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
        I build front ends that stay fast{" "}
        <span className="text-accent">after they ship.</span>
      </h1>

      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          Senior frontend engineer, {site.location}. Nine production Next.js
          platforms since 2023, and a performance thread that runs six years
          further back than that — through service workers and PWAs on
          storefronts, long before the current stack existed.
        </p>
        <p>
          I write up what each project actually taught me: the bug that took a
          week to find, the fix that turned out to be configuration, the
          assumption that measurement destroyed.
        </p>
      </div>

      <section className="mt-14">
        <p className="eyebrow">Writing</p>

        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            First article in progress.
          </p>
        ) : (
          <ul className="mt-5 border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-4 transition-colors hover:bg-muted/40"
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
