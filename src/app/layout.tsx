import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col overflow-x-hidden`}
      >
        <header className="border-b border-border">
          <nav
            className="container-page flex h-[92px] items-center justify-between"
            aria-label="Main"
          >
            <Link
              href="/"
              className="flex items-baseline gap-1.5 text-base font-semibold tracking-[-0.04em]"
            >
              <span className="text-[22px] text-primary">+</span>
              {site.name}
            </Link>

            <div className="hidden gap-8 text-xs text-muted-foreground sm:flex">
              <Link href="/writing" className="transition-colors hover:text-primary">
                Writing
              </Link>
              <a
                href={site.links.github}
                className="transition-colors hover:text-primary"
              >
                GitHub
              </a>
              <a
                href={site.links.email}
                className="transition-colors hover:text-primary"
              >
                Contact
              </a>
            </div>

            <a
              href={site.links.email}
              className="flex items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-primary sm:text-xs"
            >
              <span className="status-dot" aria-hidden />
              {site.availability}
            </a>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="container-page flex flex-wrap justify-between gap-4 py-6 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
            <span>{site.location}</span>
            <div className="flex flex-wrap gap-6">
              {Object.entries(site.links).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition-colors hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
