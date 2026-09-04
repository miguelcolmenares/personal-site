import Link from "next/link";

import { formatDate, getPosts } from "@/lib/posts";
import { capabilities, site, stack } from "@/lib/site";

export default function Home() {
  const posts = getPosts().slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="container-page flex min-h-[560px] flex-col justify-between pt-20 pb-9 sm:min-h-[650px] sm:pt-28">
        <p className="eyebrow flex items-center gap-2.5">
          <span className="status-dot" aria-hidden />
          {site.role} / {new Date().getFullYear()}
        </p>

        <div className="mt-16 grid items-end gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
          <h1 className="display max-w-[790px]">
            I build front ends that stay <em>fast after they ship.</em>
          </h1>

          <div className="max-w-[280px] pb-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              I&apos;m <strong className="font-medium text-foreground">Miguel</strong>,
              a senior frontend engineer in Colombia with 17+ years of
              experience. A performance habit older than any framework I use,
              and open-source code — one widget alone serves 11M+ requests a
              month.
            </p>
            <Link
              href="/writing"
              className="mt-5 inline-flex items-center gap-3.5 border-b border-primary pb-1.5 text-[13px]"
            >
              Read the writing <span className="text-primary">↘</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
          <span>Scroll</span>
          <span className="h-px w-[70px] bg-border" aria-hidden />
          <span>01 / 03</span>
        </div>
      </section>

      {/* ── Stack marquee ────────────────────────────────────────── */}
      <section className="ticker" aria-label="Technologies">
        <div className="ticker-track">
          {/* Duplicated so the -50% keyframe loops seamlessly. */}
          {[...stack, ...stack].map((item, i) => (
            <span key={`${item}-${i}`} className="text-primary">
              {item}
              <span aria-hidden>✳</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── What I do ────────────────────────────────────────────── */}
      <section className="container-page grid gap-10 pt-24 sm:pt-32 lg:grid-cols-[25%_1fr]">
        <p className="eyebrow flex gap-4">
          <span className="text-primary">02</span>
          <span>What I do</span>
        </p>

        <div>
          <p className="display-mid max-w-[770px]">
            The interesting part is never the first release. It&apos;s{" "}
            <em>whether it still holds up a year later.</em>
          </p>

          <ul className="mt-10 border-t border-border">
            {capabilities.map((item) => (
              <li
                key={item.number}
                className="grid grid-cols-[40px_1fr] items-start gap-4 border-b border-border py-6 sm:grid-cols-[60px_1fr] sm:gap-[18px]"
              >
                <span className="font-mono text-[11px] text-primary">
                  {item.number}
                </span>
                <div>
                  <h2 className="text-[19px] font-normal tracking-[-0.04em]">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Writing ──────────────────────────────────────────────── */}
      <section className="container-page grid gap-10 pt-24 pb-28 sm:pt-32 lg:grid-cols-[25%_1fr]">
        <p className="eyebrow flex gap-4">
          <span className="text-primary">03</span>
          <span>Writing</span>
        </p>

        <div>
          <p className="display-mid max-w-[770px]">
            What each project <em>actually taught me.</em>
          </p>
          <p className="mt-6 max-w-[490px] text-sm leading-relaxed text-muted-foreground">
            Not tutorials. The bug that took a week to find, the fix that turned
            out to be configuration, the assumption that measurement destroyed.
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
                    className="group grid grid-cols-[1fr_20px] items-start gap-4 py-6"
                  >
                    <div>
                      <time
                        dateTime={post.date}
                        className="font-mono text-[11px] text-muted-foreground"
                      >
                        {formatDate(post.date)}
                      </time>
                      <h3 className="mt-1.5 text-[19px] font-normal tracking-[-0.04em] transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
                    </div>
                    <span
                      className="text-xl text-primary transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
