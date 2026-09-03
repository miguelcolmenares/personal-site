import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";

import { formatDate, getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  // notFound() rather than rendering an empty shell, so an unknown slug
  // answers 404 instead of a 200 with nothing in it.
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <header className="border-b border-border pb-8">
        <time
          dateTime={post.date}
          className="font-mono text-[11px] text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 text-3xl leading-[1.15] font-semibold tracking-[-0.03em] text-balance">
          {post.title}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {post.summary}
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
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
      </header>

      <div className="prose-article mt-10">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeShiki,
                  {
                    themes: { light: "github-light", dark: "github-dark" },
                  },
                ],
              ],
            },
          }}
        />
      </div>

      <footer className="mt-14 border-t border-border pt-6">
        <Link
          href="/writing"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All writing
        </Link>
      </footer>
    </article>
  );
}
